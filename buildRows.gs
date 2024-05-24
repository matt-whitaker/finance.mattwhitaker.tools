function buildRows([summary], strategy, target, horizon, data, glidepath) {
  const rows = [];
  let expRatioSum = 0, stockAlloc = 0, bondAlloc = 0;

  let i = 0;
  while (i < strategy.length && strategy[i][0] !== "") {
    const macroRow = strategy[i];
    
    const newIntraRows = [];
    let macroSum = 0;
    
    let ii = i + 1;
    while(ii < strategy.length && strategy[ii][0] === "" && strategy[ii][1] !== "") {
      const intraRow = strategy[ii];
      const newPositionRows = [];
      let intraSum = 0;

      let iii = ii + 1;
      while (iii < strategy.length && strategy[iii][0] === "" && strategy[iii][1] === "") {
        const positionRow = strategy[iii];
        const key = positionRow[3];

        const position = editTuple((tuple) => {
          tuple[COL_POS_SYMB] = key;
          tuple[COL_POS_DESC] = vLookup(key, data, 2);
          tuple[COL_POS_QUANT] = parseFloat(vLookup(key, data, 3)) || 0.0;
          tuple[COL_POS_MARKET] = parseFloat(vLookup(key, data, 4)) || 0.0;
          tuple[COL_POS_BASIS] = parseFloat(vLookup(key, data, 8)) || 0.0;
          tuple[COL_POS_CHANGE] = parseFloat(vLookup(key, data, 10)) || 0.0;
          tuple[COL_ACTUAL_VALUE] = parseFloat(vLookup(key, data, 5)) || 0.0;
          tuple[COL_TARGET_PERC] = positionRow[2];
          tuple[COL_EXP_RATIO] = positionRow[4];
        })([]);
        
        intraSum += position[COL_ACTUAL_VALUE];
        newPositionRows.push(position);

        iii++;
      }

      const intra = editTuple((tuple) => {
        tuple[COL_INTRA_NAME] = intraRow[2];
        tuple[COL_ACTUAL_VALUE] = intraSum;
        tuple[COL_TARGET_PERC] = intraRow[1];
      })([]);

      macroSum += intraSum;
      newIntraRows.push(intra, ...newPositionRows);

      ii = iii;
    }

    const macro = editTuple((tuple) => {
      tuple[COL_MACRO_NAME] = macroRow[1];
      tuple[COL_ACTUAL_VALUE] = macroSum;

      const alloc = glidepath(CURRENT_YEAR);
          
      if (tuple[COL_MACRO_NAME] === "Income") {
        bondAlloc += (tuple[COL_TARGET_PERC] = 1 - alloc);
      } else {
        stockAlloc += (tuple[COL_TARGET_PERC] = macroRow[0] / RISK_PROFILE * alloc);
      }
    })([]);

    rows.push(macro, ...newIntraRows);
    
    i = ii;
  }

  let j = 0;
  while(j < rows.length && typeof rows[j][COL_MACRO_NAME] === "string") {
    const macro = editTuple((tuple) => {
      tuple[COL_ACTUAL_PERC] = tuple[COL_ACTUAL_VALUE] / summary[COL_ACTUAL_VALUE];
      tuple[COL_TARGET_VALUE] = tuple[COL_TARGET_PERC] * summary[COL_ACTUAL_VALUE];
      tuple[COL_DIFF_VALUE] = tuple[COL_ACTUAL_VALUE]- tuple[COL_TARGET_VALUE];
      tuple[COL_DIFF_PERC] = tuple[COL_DIFF_VALUE] / tuple[COL_ACTUAL_VALUE];
    })(rows[j]);

    let jj = j + 1;
    while(jj < rows.length && typeof rows[jj][COL_INTRA_NAME] === "string") {
      const intra = editTuple((tuple) => {
        tuple[COL_ACTUAL_PERC] = tuple[COL_ACTUAL_VALUE] / macro[COL_ACTUAL_VALUE];
        tuple[COL_TARGET_VALUE] = tuple[COL_TARGET_PERC] * macro[COL_TARGET_VALUE];
        tuple[COL_DIFF_VALUE] = tuple[COL_ACTUAL_VALUE]- tuple[COL_TARGET_VALUE];
        tuple[COL_DIFF_PERC] = tuple[COL_DIFF_VALUE] / tuple[COL_ACTUAL_VALUE];
      })(rows[jj]);

      let jjj = jj + 1;
      while(jjj < rows.length && typeof rows[jjj][COL_POS_SYMB] === "string") {
        const position = editTuple((tuple) => {
          tuple[COL_ACTUAL_PERC] = tuple[COL_ACTUAL_VALUE] / intra[COL_ACTUAL_VALUE];
          tuple[COL_TARGET_VALUE] = tuple[COL_TARGET_PERC] * intra[COL_TARGET_VALUE];
          tuple[COL_DIFF_VALUE] = tuple[COL_ACTUAL_VALUE]- tuple[COL_TARGET_VALUE];
          tuple[COL_DIFF_PERC] = tuple[COL_DIFF_VALUE] / tuple[COL_ACTUAL_VALUE];

          expRatioSum += (tuple[COL_EXP_RATIO] * (tuple[COL_TARGET_VALUE] / summary[COL_ACTUAL_VALUE]))
        })(rows[jjj])

        jjj++;
      }

      jj = jjj;
    }

    j = jj;
  }

  editTuple((tuple) => {
    tuple[COL_DESC] = `TARGET YEAR: ${target}, HORIZON: ${horizon}, ALLOCATIONS: ${stockAlloc.toFixed(2)*100}% / ${bondAlloc.toFixed(2)*100}%`;
    tuple[COL_EXP_RATIO] = expRatioSum;
  })(summary);

  return rows;
}
