const euler = 2.71828;

const poisson = (lambda, numberX, probability, sample, half) => {
  let verify = true;
  let finalProbability = 0;
  let deviation = 0;
  let kurtosis = 0;
  let bias = 0;
  if (half != "" || half != 0) {
    verify = half > 10 ? false : true;
  } else {
    probability = probability > 1 ? Number(probability / 100) : probability;
    verify = verifyHalf(probability, sample);
  }

  if (verify) {
    finalProbability = calculateProbability(lambda, numberX);
    deviation = calculateDeviation(probability, sample);
    kurtosis = calculateKurtosis(numberX, probability);
    bias = calculateBias(numberX, probability);

    const result = {
      probability: finalProbability,
      deviation: deviation,
      kurtosis: kurtosis,
      bias: bias,
      flag: "6",
    };
    console.log(result);
    return result;
  } else {
    return alert("La media excede el 10%, cambie el metodo de resolucion");
  }
};

const verifyHalf = (probability, sample) => {
  let half = 0;
  let result = false;
  half = Number(probability * sample).toFixed(2);
  if (half < 10 && probability < 0.1) {
    result = true;
  } else {
    result = false;
  }
  return result;
};

const calculateProbability = (lambda, numberX) => {
  let numberXFactorial = 0;
  let probability = 0;

  numberXFactorial = factorial(Number(numberX));
  probability =
    Math.pow(Number(euler), Number(-1 * lambda)) *
    Number(Math.pow(Number(lambda), Number(numberX)) / numberXFactorial);
  return probability;
};

const calculateDeviation = (probability, sample) => {
  let half = 0;
  let deviation = 0;
  half = Number(probability * sample).toFixed(2);
  deviation = Math.sqrt(half).toFixed(7);
  return deviation;
};

const calculateKurtosis = (numberX, probability) => {
  let kurtosis = 0;
  let probabilityQ = Number(1 - probability);
  kurtosis = Number(
    Number(probabilityQ - probability) /
      Number(Math.sqrt(numberX * probability * probabilityQ))
  ).toFixed(7);
  return kurtosis;
};

const calculateBias = (numberX, probability) => {
  let bias = 0;
  let probabilityQ = Number(1 - probability);
  bias = Number(
    3 +
      (1 - 6 * probability * probabilityQ) /
        Math.sqrt(numberX * probability * probabilityQ)
  ).toFixed(7);
  return bias;
};

/**
 * In charge of doing the calculations for the factorials
 * @param {Number} num
 * @returns
 */
const factorial = (num) => {
  if (num < 0) return -1;
  else if (num == 0) return 1;
  else {
    return num * factorial(num - 1);
  }
};

export { poisson };
