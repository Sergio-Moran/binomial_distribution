/* Overall variable */
const euler = 2.71828;

/**
 * Function in charge of calling the other functions for data processing
 * @param {Number} poblation
 * @param {Number} numberX
 * @param {Number} numberX2
 * @param {Number} probability
 * @param {Number} valueQ
 * @param {Number} sample
 * @param {Number} half
 * @param {Number} tar
 * @param {Boolean} checkApproach
 * @param {Boolean} checkH
 * @returns Returns an alert or an object with the data already processed
 */
const poisson = (
  poblation,
  numberX,
  numberX2,
  probability,
  valueQ,
  sample,
  half,
  tar,
  checkApproach,
  checkH
) => {
  let verify;
  let verifyH;
  let finalProbability = 0;
  let deviation = 0;
  let kurtosis = 0;
  let bias = 0;
  let internalHalf = 0;
  if (half != "" || half != 0) {
    verify = half > 10 ? false : true;
    internalHalf = half;
  } else {
    probability = probability > 1 ? Number(probability / 100) : probability;
    verifyH = verifyHalf(probability, sample);
    verify = verifyH.result;
    internalHalf = verifyH.half;
  }
  if (verify) {
    if (checkH && checkApproach) {
      return alert("Elija solo uno");
    } else if (checkApproach) {
      finalProbability = poissonBinomial(numberX, numberX2, internalHalf);
      const result = {
        probability: finalProbability.probability,
        deviation: finalProbability.deviation,
        flag: "7",
      };
      return result;
    } else if (checkH) {
      finalProbability = poissonHyper(
        poblation,
        numberX,
        probability,
        sample,
        internalHalf,
        tar
      );
      const result = {
        probability: finalProbability.probability,
        deviation: finalProbability.deviation,
        flag: "8",
      };
      return result;
    } else {
      finalProbability = calculateProbability(internalHalf, numberX);
      deviation = calculateDeviation(probability, sample, half);
      kurtosis = calculateKurtosis(numberX, probability);
      bias = calculateBias(numberX, probability);

      const result = {
        probability: finalProbability,
        deviation: deviation,
        kurtosis: kurtosis,
        bias: bias,
        flag: "6",
      };
      return result;
    }
  } else {
    return alert("La media excede el 10%, cambie el metodo de resolucion");
  }
};

/**
 * Function that is in charge of validating if the data corresponds to this method
 * @param {Number} probability
 * @param {Number} sample
 * @returns returns a boolean
 */
const verifyHalf = (probability, sample) => {
  let half = 0;
  let result = false;
  half = Number(probability * sample).toFixed(2);
  if (half < 10 && probability < 0.1) {
    result = true;
  } else {
    result = false;
  }
  const response = {
    half: half,
    result: result,
  };
  return response;
};

/**
 * Function to calculate the probability
 * @param {Number} numberX
 * @returns returns a number
 */
const calculateProbability = (half, numberX) => {
  let numberXFactorial = 0;
  let probability = 0;

  numberXFactorial = factorial(Number(numberX));
  probability =
    Math.pow(Number(euler), Number(-1 * half)) *
    Number(Math.pow(Number(half), Number(numberX)) / numberXFactorial);
  return probability;
};

/**
 * Function to calculate the deviation
 * @param {Number} probability
 * @param {Number} sample
 * @returns returns a number
 */
const calculateDeviation = (probability, sample, half) => {
  let internalHalf = 0;
  let deviation = 0;
  if (half != 0 || half != "") {
    internalHalf = Number(half);
  } else {
    internalHalf = Number(probability * sample).toFixed(4);
  }
  deviation = Math.sqrt(internalHalf).toFixed(7);
  return deviation;
};

/**
 * Function to calculate kurtosis
 * @param {Number} numberX
 * @param {Number} probability
 * @returns returns a number
 */
const calculateKurtosis = (numberX, probability) => {
  let kurtosis = 0;
  let probabilityQ = Number(1 - probability);
  kurtosis = Number(
    Number(probabilityQ - probability) /
      Number(Math.sqrt(numberX * probability * probabilityQ))
  ).toFixed(7);
  return kurtosis;
};

/**
 * Function to calculate the bias
 * @param {Number} numberX
 * @param {Number} probability
 * @returns returns a number
 */
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
 *
 * @param {Number} numberX
 * @param {Number} numberX2
 * @param {Number} half
 * @returns
 */
const poissonBinomial = (numberX, numberX2, half) => {
  let probability = 0;
  let deviation = 0;
  for (let i = numberX; i <= numberX2; i++) {
    let iFactorial = factorial(Number(i));
    probability += Number(
      Math.pow(Number(half), Number(i)) /
        Number(iFactorial * Math.pow(Number(euler), Number(half)))
    );
  }
  deviation = Math.sqrt(Number(half));
  const response = {
    probability: probability,
    deviation: deviation,
  };
  return response;
};

/**
 *
 * @param {Number} poblation
 * @param {Number} numberX
 * @param {Number} probability
 * @param {Number} sample
 * @param {Number} half
 * @param {Number} tar
 * @returns
 */
const poissonHyper = (poblation, numberX, probability, sample, half, tar) => {
  let internalProbability = 0;
  let internalHalf = 0;
  let deviation = 0;

  if (probability == 0 || probability == "") {
    internalProbability = Number(tar / poblation);
  } else {
    internalProbability = Number(probability);
  }

  if (half == 0 || half == "") {
    internalHalf = Number(internalProbability * sample);
  } else {
    internalHalf = Number(half);
  }
  let iFactorial = factorial(Number(numberX));
  probability = Number(
    Math.pow(Number(internalHalf), Number(numberX)) /
      Number(iFactorial * Math.pow(Number(euler), Number(internalHalf)))
  );

  deviation = Math.sqrt(Number(internalHalf));
  const response = {
    probability: probability,
    deviation: deviation,
  };
  return response;
};

/**
 *
 * @param {Number} numberX
 * @param {Number} probability
 * @param {Number} sample
 * @param {Number} half
 * @returns a number
 */
const tablePoissonChart = (numberX, probability, sample, half) => {
  let internalHalf = 0;
  let probabilities = 0;
  let numberXFactorial = 0;
  if (half != 0 || half != "") {
    internalHalf = Number(half);
  } else {
    internalHalf = Number(probability * sample).toFixed(4);
  }

  numberXFactorial = factorial(numberX);
  probabilities =
    Math.pow(Number(internalHalf), Number(numberX)) /
    (Number(numberXFactorial) * Math.pow(Number(euler), Number(internalHalf)));
  return probabilities;
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

export { poisson, tablePoissonChart };
