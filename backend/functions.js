function calculateMajority(arr) {
  let trueCount = 0;
  let falseCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "true") {
      trueCount++;
    } else {
      falseCount++;
    }
  }

  if (trueCount > falseCount) {
    return true;
  } else {
    return false;
  }
}

function calculatePercentage(arr) {
  let trueCount = 0;
  let falseCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "true") {
      trueCount++;
    } else {
      falseCount++;
    }
  }

  const truePercentage = (trueCount / arr.length) * 100;
  const falsePercentage = (falseCount / arr.length) * 100;

  return { truePercentage, falsePercentage };
}

exports.calculateMajority = calculateMajority;
exports.calculatePercentage = calculatePercentage;
