/**
 * Generates an overview of the portfolio, pulling in actual positions and comparing them to targets
 * 
 * @customfunction
 */
function GenerateOverview(name, target, strategy, data, glidepath) {
  const totalAccountValue = vLookup(ACCOUNT_TOTAL_KEY, data, 5);
  
  const title = editTuple((tuple) => {
    tuple[COL_TITLE] = name;
    tuple[COL_ACTUAL_VALUE] = totalAccountValue;
  })([]);

  const rows = buildRows(
    [title], 
    strategy.filter((row) => row[0] !== "--"),
    target,
    target - CURRENT_YEAR,
    data,
    glidepath ? createGlidePath(target, glidepath) : null
  )

  return [title, ...rows];
}
