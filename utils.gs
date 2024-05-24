function vLookup(searchValue, searchRange, columnIndex) {
  // Iterate through each row in the search range
  for (var i = 0; i < searchRange.length; i++) {
    // Check if the search value matches the value in the first column of the current row
    
    if (searchRange[i][0] == searchValue) {
      // If a match is found, return the value in the specified column index
      return searchRange[i][columnIndex - 1];
    }
  }

  // If no match is found, return an error message or value
  return "N/A"; // or you can return null or any other value
}

function columnToLetter (num) {
  let letter = '';
  while (num > 0) {
    let mod = (num - 1) % 26;
    letter = String.fromCharCode(65 + mod) + letter;
    num = Math.floor((num - mod) / 26);
  }
  return letter;
}

function letterToColumn(letter) {
  let num = 0;
  for (let i = 0; i < letter.length; i++) {
    num = num * 26 + (letter.charCodeAt(i) - 65);
  }
  return num;
}
  
function parseMarketCap(input) {
  var cleanedInput = input.replace('$', '').trim();
  var lastChar = cleanedInput.slice(-1);
  var number = parseFloat(cleanedInput.slice(0, -1));
  
  var multiplier = 1;
  switch (lastChar.toUpperCase()) {
    case 'B':
      multiplier = 1000000000;
      break;
    case 'M':
      multiplier = 1000000;
      break;
    case 'K':
      multiplier = 1000;
      break;
  }
  
  return number * multiplier;
}

function editTuple(fn) {
  return function(tuple) {
    fn(tuple);
    return tuple;
  }
}
