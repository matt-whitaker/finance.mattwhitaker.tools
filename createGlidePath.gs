/**
 * Creates a glide path function that interpolates asset allocations for any given year.
 *
 * @param {number[]} years - Array of years defining the glide path.
 * @param {number[]} allocations - Array of corresponding asset allocations.
 * @return {function} A function that takes a year and returns the interpolated allocation.
 */
function createGlidePath(target, glidepath) {
  return function(year) {
    const horizon = target - year;

    // too far out or after final threshold
    if (horizon >= glidepath[0][0]) {
      return RISK_PROFILE + glidepath[0][1];
    } else if (horizon <= glidepath[glidepath.length - 1][0]) {
      return RISK_PROFILE + glidepath[glidepath.length - 1][1];
    }

    // which two thresholds are we between then
    // 
    for (var i = 0; i < glidepath.length - 1; i++) {
      if (horizon <= glidepath[i][0] && horizon >= glidepath[i + 1][0]) {
        return RISK_PROFILE + glidepath[i][1] + ((glidepath[i + 1][1] - glidepath[i][1]) / (glidepath[i + 1][0] - glidepath[i][0]) * (horizon - glidepath[i][0])) ;
      }
    }
  };
}
