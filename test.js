/**
 * Splits an array into subarrays of a specified size.
 *
 * @param {Array} inputArray - The array to be split.
 * @param {number} subArraySize - The size of each subarray.
 * @return {Array} - An array of subarrays.
 */
function splitArray(inputArray, subArraySize) {
  const arrayLength = inputArray.length;
  const tempArray = [];

  for (let index = 0; index < arrayLength; index += subArraySize) {
    const chunk = inputArray.slice(index, index + subArraySize);
    tempArray.push(chunk);
  }

  return tempArray;
}

const result = splitArray(
  Array.from({length: 1200}, () => Math.floor(Math.random() * 1000)),
  500
);
console.log(result);
