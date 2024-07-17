function buildRows([,summary], strategy, target, horizon, totalValue, data, glidepath) {
  const rows = [];

  let expRatioSum = 0,
    stockAlloc = 0,
    bondAlloc = 0;

  // Collection pass, fundamental data and linear summations

  const applyPosData = (strat) => editTuple((tuple) => {
    tuple[COL_POS_SYMB] = strat[STRAT_INDX_POS_SYMB];
    tuple[COL_POS_DESC] = vLookup(tuple[COL_POS_SYMB], data, 2);
    tuple[COL_POS_QUANT] = parseFloat(vLookup(tuple[COL_POS_SYMB], data, 3)) || 0.0;
    tuple[COL_POS_MARKET] = parseFloat(vLookup(tuple[COL_POS_SYMB], data, 4)) || 0.0;
    tuple[COL_POS_BASIS] = parseFloat(vLookup(tuple[COL_POS_SYMB], data, 8)) || 0.0;
    tuple[COL_POS_CHANGE] = parseFloat(vLookup(tuple[COL_POS_SYMB], data, 10)) || 0.0;
    tuple[COL_ACTUAL_VALUE] = parseFloat(vLookup(tuple[COL_POS_SYMB], data, 5)) || 0.0;

    tuple[COL_POS_REINV] = strat[STRAT_INDX_REINVEST];
    tuple[COL_TARGET_PERC] = strat[STRAT_INDX_POS_TARGET_PERC];
    tuple[COL_EXP_RATIO] = strat[STRAT_INDX_EXP_RATIO];
  });

  const applyIntraData = (sum, strat) => editTuple((tuple) => {
    tuple[COL_ACTUAL_VALUE] = sum;
    tuple[COL_INTRA_NAME] = strat[STRAT_INDX_INTRA_NAME];
    tuple[COL_TARGET_PERC] = strat[STRAT_INDX_INTRA_TARGET_PERC];
  });

  const applyMacroData = (sum, strat) => editTuple((tuple) => {
    tuple[COL_ACTUAL_VALUE] = sum;
    tuple[COL_MACRO_NAME] = strat[STRAT_INDX_MACRO_NAME];

    // Apply glidepath adjustment
    const [stockAlloc, incomeAlloc] = glidepath(CURRENT_YEAR);
    if (tuple[COL_MACRO_NAME] === INTRA_INCOME) {
      tuple[COL_TARGET_PERC] = incomeAlloc;
    } else {
      tuple[COL_TARGET_PERC] = strat[STRAT_INDX_MACRO_TARGET_PERC] / RISK_PROFILE * stockAlloc;
    }
  })

  let i = 0;
  while (i < strategy.length && strategy[i][0] !== "") {
    const macroStrat = strategy[i];
    const collectI = [];
    let macroSum = 0;

    let ii = i + 1;
    while(ii < strategy.length && strategy[ii][0] === "" && strategy[ii][1] !== "") {
      const intraStrat = strategy[ii];
      const collectP = [];
      let intraSum = 0;

      let iii = ii + 1;
      while (iii < strategy.length && strategy[iii][0] === "" && strategy[iii][1] === "") {
        const posStrat = strategy[iii];
        const position = applyPosData(posStrat)([]);

        intraSum += position[COL_ACTUAL_VALUE];
        collectP.push(position);
        iii++;
      }

      const intra = applyIntraData(intraSum, intraStrat)([]);

      macroSum += intraSum;
      collectI.push(intra, ...collectP);
      ii = iii;
    }

    const macro = applyMacroData(macroSum, macroStrat)([]);

    if (macro[COL_MACRO_NAME] === INTRA_INCOME) {
      bondAlloc += macro[COL_TARGET_PERC];
    } else {
      stockAlloc += macro[COL_TARGET_PERC];
    }

    rows.push(macro, ...collectI);
    i = ii;
  }

  // Derivative pass, anything that couldn't be linearly summed.

  const applyCommonCalc = (parent, total) => editTuple((tuple) => {
    tuple[COL_ACTUAL_PERC] = (tuple[COL_ACTUAL_VALUE] / parent[COL_ACTUAL_VALUE]) || 0.0;
    tuple[COL_TARGET_VALUE] = tuple[COL_TARGET_PERC] * parent[COL_TARGET_VALUE];
    tuple[COL_DIFF_VALUE] = tuple[COL_TARGET_VALUE] - tuple[COL_ACTUAL_VALUE];
    tuple[COL_ACTUAL_ALLOC] = tuple[COL_ACTUAL_VALUE] / total;
    tuple[COL_TARGET_ALLOC] = tuple[COL_TARGET_VALUE] / total;
  });

  const applyPosCalc = () => editTuple((tuple) => {
    tuple[COL_DIFF_COUNT] = Math.floor(tuple[COL_DIFF_VALUE] / tuple[COL_POS_MARKET]);
  })

  let j = 0;
  while(j < rows.length && typeof rows[j][COL_MACRO_NAME] === "string") {
    const macro = applyCommonCalc(summary, totalValue)(rows[j]);

    let jj = j + 1;
    while(jj < rows.length && typeof rows[jj][COL_INTRA_NAME] === "string") {
      const intra = applyCommonCalc(macro, totalValue)(rows[jj]);

      let jjj = jj + 1;
      while(jjj < rows.length && typeof rows[jjj][COL_POS_SYMB] === "string") {
        applyCommonCalc(intra, totalValue)(rows[jjj]);
        applyPosCalc()(rows[jjj])
        jjj++;
      }

      jj = jjj;
    }

    j = jj;
  }

  // Update summary row

  editTuple((tuple) => {
    tuple[COL_DESC] = `TARGET YEAR: ${target}, HORIZON: ${horizon}, ALLOCATIONS: ${stockAlloc.toFixed(2)*100}% / ${bondAlloc.toFixed(2)*100}%`;
    tuple[COL_EXP_RATIO] = expRatioSum;
  })(summary);

  return rows;
}

// Just a helper to add two rows for cash and money market "sweep" (remainder investment)
function buildSweepRows(sweep, data) {
  return [
    ,
    editTuple((tuple) => {
      tuple[COL_POS_SYMB] = POS_CASH;
      tuple[COL_ACTUAL_VALUE] = vLookup(POS_CASH, data, 5);
    })([]),
    editTuple((tuple) => {
      tuple[COL_POS_SYMB] = sweep;
      tuple[COL_ACTUAL_VALUE] = vLookup(sweep, data, 5);
      tuple[COL_POS_DESC] = vLookup(sweep, data, 2);
    })([])
  ];
}

/**
 * Generates an overview of the portfolio, pulling in actual positions and comparing them to targets
 *
 * @customfunction
 */
function GenerateOverview(name, target, strategy, data, glidepath, sweep) {
  const totalAccountValue = vLookup(ACCOUNT_TOTAL_KEY, data, 5);

  const title = editTuple((tuple) => {
    tuple[COL_TITLE] = name;
    tuple[COL_ACTUAL_VALUE] = totalAccountValue;
    tuple[COL_TARGET_VALUE] = totalAccountValue;
  })([]);

  const rows = buildRows(
    [,title],
    strategy.filter((row) => row[0] !== "--"),
    target,
    target - CURRENT_YEAR,
    totalAccountValue,
    data,
    createGlidePath(target, glidepath)
  );

  const sweepRows = buildSweepRows(sweep, data);

  return [title, ...rows, ...sweepRows];
}