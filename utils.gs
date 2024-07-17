const vLookup = (searchValue, searchRange, columnIndex) => searchRange
  .filter((row) => row[0] == searchValue)
  .map((row) => row[columnIndex - 1])
  [0] || "N/A";

const letterToColumn = (letter) => Array.prototype
  .reduce.call(letter, (m, v) => (m * 26 + (v.charCodeAt(0) - 65)), 0);

const editTuple = (fn) => (tuple) => (fn(tuple), tuple);