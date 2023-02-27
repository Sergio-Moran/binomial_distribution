const maths = (
  N,
  n,
  x,
  xn,
  p,
  q,
  k,
  checkPoblation,
  check,
  checkK,
  approach
) => {
  let valuesResult;
  let resultPoblation = 0;
  let total = 0;
  let valueQ = 0;
  let valueP = 0;
  let valueK = 0;
  let flag = "";
  if (N < 0 || n < 0 || x < 0 || xn < 0 || p < 0 || q < 0 || k < 0) {
    return alert("No coloque valores negativos");
  }

  if (!checkK) {
    if (p == 0 && q == 0 && k == 0) {
      return alert(
        "La probabilidad de exito o de fracaso no pueden estar vacias"
      );
    } else if (p == 0) {
      valueP = Number(1 - q).toFixed(7);
      valueQ = q;
    } else if (q == 0) {
      valueQ = Number(1 - p).toFixed(7);
      valueP = p;
    } else {
      valueQ = q;
      valueP = p;
    }
  } else {
    switch (checkK) {
      case p != 0 && q != 0 && k != 0:
        valueP = p;
        valueQ = q;
        valueK = k;
        break;

      case p != 0 && k == 0 && q == 0:
        valueQ = Number(1 - p).toFixed(7);
        valueK = Number(p * N).toFixed(7);
        valueP = p;
        break;

      case q != 0 && p == 0 && k == 0:
        valueP = Number(1 - q).toFixed(7);
        valueK = Number(valueP * N).toFixed(7);
        valueQ = q;
        break;

      case k != 0 && p == 0 && q == 0:
        valueP = Number(k / N).toFixed(7);
        valueQ = Number(1 - valueP).toFixed(7);
        valueK = k;
        break;

      case p != 0 && q != 0 && k == 0:
        valueP = p;
        valueQ = q;
        valueK = Number(p * N).toFixed(7);
        break;

      case p != 0 && q == 0 && k != 0:
        valueP = p;
        valueQ = Number(1 - valueP).toFixed(7);
        valueK = Number(p * N).toFixed(7);
        break;

      case q != 0 && p == 0 && k != 0:
        valueP = Number(1 - q).toFixed(7);
        valueQ = q;
        valueK = Number(valueP * N).toFixed(7);
        break;
      default:
        break;
    }
  }

  /* When we need to do by approach */
  if (approach && checkK) {
    valuesResult = hypergeometricApproach(N, n, x, valueP, valueQ, valueK);
    flag = "5";
    return { valuesResult, resultPoblation, total, flag };
  } else if (!checkK && approach) {
    return alert("No cumple, solo se puede por distribución binomial ");
  }

  /* When we have N and x to xn */
  if (checkPoblation && check) {
    if (x == xn) {
      return alert("x1 y x2 son iguales, colocar otro intervalo");
    }
    valuesResult = calculatorPoblation(n, valueP, N, valueQ, x, valueK);
    resultPoblation = valuesResult;
    if (x == 0) {
      if (checkK) {
        valuesResult = calculatorsHypergeometric(n, N, 0, xn, valueK);
      } else {
        valuesResult = calculators(0, xn, n, valueP);
      }
      valuesResult.values.forEach((e) => {
        total += Number(e);
      });
    } else if (x > xn) {
      if (checkK) {
        valuesResult = calculatorsHypergeometric(n, N, xn, x, valueK);
      } else {
        valuesResult = calculators(xn, x, n, valueP);
      }
      valuesResult.values.forEach((e) => {
        total += Number(e);
      });
    } else if (x < xn) {
      if (checkK) {
        valuesResult = calculatorsHypergeometric(n, N, x, xn, valueK);
      } else {
        valuesResult = calculators(x, xn, n, valueP);
      }

      valuesResult.values.forEach((e) => {
        total += Number(e);
      });
    }
    total = Number(total).toFixed(7);

    flag = "3";
    valuesResult = valuesResult.values;
    return { valuesResult, resultPoblation, total, flag };
  }

  /* When we have N */
  if (checkPoblation && !check) {
    valuesResult = calculatorPoblation(n, valueP, N, valueQ, x, valueK);
    resultPoblation = valuesResult;
    if (valuesResult.flagSample == "HIPERGEOMÉTRICA") {
      valuesResult = calculatorHypergeometric(n, N, x, valueK);
    } else {
      valuesResult = calculator(n, x, valueP);
    }
    flag = "4";
    valuesResult = valuesResult.probability;
    return { valuesResult, resultPoblation, total, flag };
  }

  /* We have a range of values */
  if (!checkPoblation && check) {
    if (x == xn) {
      return alert("x1 y x2 son iguales, colocar otro intervalo");
    }
    if (x == 0) {
      valuesResult = calculators(0, xn, n, valueP, valueQ);
      valuesResult.values.forEach((e) => {
        total += Number(e);
      });
    } else if (x > xn) {
      valuesResult = calculators(xn, x, n, valueP, valueQ);
      valuesResult.values.forEach((e) => {
        total += Number(e);
      });
    } else if (x < xn) {
      valuesResult = calculators(x, xn, n, valueP, valueQ);
      valuesResult.values.forEach((e) => {
        total += Number(e);
      });
    }
    total = Number(total).toFixed(7);
    resultPoblation = {
      half: valuesResult.half,
      deviation: valuesResult.deviation,
      kurtosis: valuesResult.kurtosis,
    };
    valuesResult = valuesResult.values;
    flag = "2";
    return { valuesResult, resultPoblation, total, flag };
  }
  /* Most simple function */
  if (!check && !checkPoblation) {
    total = calculator(n, x, valueP, valueQ);
    flag = "1";
    return { valuesResult, resultPoblation, total, flag };
  }
};

/**
 * Function that is in charge of carrying out the calculations in the event that there is only one sample without population
 * @param {Number} n
 * @param {Number} x
 * @param {Number} p
 * @returns
 */
const calculator = (n, x, p, q) => {
  let half = 0;
  let deviation = 0;
  let kurtosis = 0;
  let numerator = factorial(n);
  let nLessX = factorial(Number(n - x));
  let xFactorial = factorial(x);
  let denominator = Number(nLessX * xFactorial).toFixed(7);
  let probability = Number(
    (numerator / denominator) * Math.pow(p, x) * Math.pow(1 - p, n - x)
  ).toFixed(7);
  half = Number(n * p).toFixed(7);
  deviation = Number(Math.sqrt(Number(n * p * q))).toFixed(7);
  kurtosis = Number(Number(q - p) / Number(Math.sqrt(n * p * q))).toFixed(7);
  const result = {
    half: half,
    deviation: deviation,
    kurtosis: kurtosis,
    probability: probability,
  };
  return result;
};

/**
 * When you need to calculate a range of values then this function is used which determines each of the probabilities of the data separately to then be returned in an array
 * @param {Number} x
 * @param {Number} xn
 * @param {Number} n
 * @param {Number} p
 * @returns array
 */
const calculators = (x, xn, n, p, q) => {
  let values = [];
  let numerator = 0;
  let nLessX = 0;
  let xFactorial = 0;
  let denominator = 0;
  let probability = 0;
  let half = 0;
  let deviation = 0;
  let kurtosis = 0;
  for (var i = x; i <= xn; i++) {
    numerator = factorial(n);
    nLessX = factorial(Number(n - i));
    xFactorial = factorial(i);
    denominator = Number(nLessX * xFactorial).toFixed(7);
    probability = Number(
      (numerator / denominator) * Math.pow(p, i) * Math.pow(1 - p, n - i)
    ).toFixed(7);
    values.push(probability);
  }
  half = Number(n * p).toFixed(7);
  deviation = Number(Math.sqrt(Number(n * p * q))).toFixed(7);
  kurtosis = Number(Number(q - p) / Number(Math.sqrt(n * p * q))).toFixed(7);
  const result = {
    half: half,
    deviation: deviation,
    kurtosis: kurtosis,
    values: values,
  };
  return result;
};

/**
 * Function in charge of calculating the probability of a ranch of values when it is a case of hypergeometric type
 * @param {Number} n
 * @param {Number} N
 * @param {Number} x
 * @param {Number} xn
 * @param {Number} k
 * @returns
 */
const calculatorsHypergeometric = (n, N, x, xn, k) => {
  let values = [];
  let valueNK = factorial(Number(N - k));
  let valueK = factorial(k);
  let valuen = factorial(n);
  let valueNn = factorial(Number(N - n));
  let valuenx = 0;
  let valueNKnx = 0;
  let valuex = 0;
  let valueKx = 0;
  let valueN = factorial(N);
  let probability = 0;

  for (var i = x; i <= xn; i++) {
    valuenx = factorial(Number(n - i));
    valueNKnx = factorial(Number(N - k - n + Number(i)));
    valueKx = factorial(Number(k - i));
    valuex = factorial(x);
    probability = Number(
      (valueNK * valueK * valuen * valueNn) /
        (valuenx * valueNKnx * valuex * valueKx * valueN)
    ).toFixed(7);
    values.push(probability);
  }
  const result = {
    values: values,
  };
  return result;
};

/**
 * This function is responsible for calculating the mean, correction factor when a FINITE flag is returned, the kurtosis deviation and the bias.
 * Returns an object with all these values plus the flag of what type of distribution it is
 * @param {Number} n
 * @param {Number} p
 * @param {Number} N
 * @param {Number} q
 * @returns
 */
const calculatorPoblation = (n, p, N, q, x, k) => {
  let half = 0;
  let correctionFactor = 0;
  let deviation = 0;
  let kurtosis = 0;
  let bias = 0;
  let result = determineSampleType(n, N);
  half = Number(n * p).toFixed(7);

  if (result == "FINITA") {
    let resulte = finite(n, p, N, q);
    correctionFactor = resulte.correctionFactor;
    deviation = resulte.deviation;
  } else if (result == "INFINITA") {
    let resulte = infinity(n, p, q);
    deviation = resulte.deviation;
  } else if (result == "HIPERGEOMÉTRICA") {
    let resulte = hypergeometric(n, p, N, q, x, k);
    half = resulte.half;
    deviation = resulte.deviation;
  }

  kurtosis = Number(Number(q - p) / Number(Math.sqrt(n * p * q))).toFixed(7);
  bias = Number(3 + (1 - 6 * p * q) / Math.sqrt(n * p * q)).toFixed(7);
  const resultPoblation = {
    half: half,
    correctionFactor: correctionFactor,
    deviation: deviation,
    kurtosis: kurtosis,
    bia: bias,
    flagSample: result,
  };
  return resultPoblation;
};

/**
 * Function in charge of calculating the probability when it is a case of hypergeometric type
 * @param {Number} n
 * @param {Number} N
 * @param {Number} x
 * @param {Number} k
 * @returns
 */
const calculatorHypergeometric = (n, N, x, k) => {
  let valueNK = factorial(Number(N - k));
  let valueK = factorial(k);
  let valuen = factorial(n);
  let valueNn = factorial(Number(N - n));
  let valuenx = factorial(Number(n - x));
  let valueNKnx = factorial(Number(N - k - n + Number(x)));
  let valuex = factorial(x);
  let valueKx = factorial(Number(k - x));
  let valueN = factorial(N);
  let probability = 0;
  probability = Number(
    (valueNK * valueK * valuen * valueNn) /
      (valuenx * valueNKnx * valuex * valueKx * valueN)
  ).toFixed(7);
  const result = { probability: probability };
  return result;
};

/**
 * Function when poblation is more than 5% and less than 20%
 * @param {Number} n
 * @param {Number} p
 * @param {Number} N
 * @param {Number} q
 * @returns
 */
const finite = (n, p, N, q) => {
  let correctionFactor = 0;
  let deviation = 0;

  correctionFactor = Math.sqrt(
    Number(N - n).toFixed(7) / Number(N - 1).toFixed(7)
  ).toFixed(7);
  deviation = Number(correctionFactor * Math.sqrt(Number(n * p * q))).toFixed(
    7
  );

  const result = { correctionFactor: correctionFactor, deviation: deviation };
  return result;
};

/**
 * Function when the poblation is less than 5%
 * @param {Number} n
 * @param {Number} p
 * @param {Number} q
 * @returns
 */
const infinity = (n, p, q) => {
  let deviation = 0;
  deviation = Number(Math.sqrt(Number(n * p * q))).toFixed(7);
  const result = {
    deviation: deviation,
  };
  return result;
};

/**
 * Function in charge of calculating the deviation and mean when it is a case of hypergeometric type
 * @param {Number} n
 * @param {Number} p
 * @param {Number} N
 * @param {Number} q
 * @param {Number} x
 * @param {Number} k
 * @returns
 */
const hypergeometric = (n, p, N, q, x, k) => {
  let half = 0;
  let deviation = 0;

  half = Number((n * k) / N);
  deviation =
    Number(Math.sqrt(n * p * q)).toFixed(7) *
    Number(Math.sqrt((N - n) / (N - 1))).toFixed(7);

  const result = { half: half, deviation: deviation };
  return result;
};

/**
 *
 * @param {Number} N
 * @param {Number} n
 * @param {Number} x
 * @param {Number} p
 * @param {Number} q
 * @param {Number} k
 * @returns
 */
const hypergeometricApproach = (N, n, x, p, q, k) => {
  let binomialResult = calculator(n, x, p, q);
  let hypergeometricResult = calculatorHypergeometric(n, N, x, k);
  let kurtosis = Number(Number(q - p) / Number(Math.sqrt(n * p * q))).toFixed(7);
  let bia = Number(3 + (1 - 6 * p * q) / Math.sqrt(n * p * q)).toFixed(7);
  const result = {
    binomialProbability: binomialResult.probability,
    hypergeometricProbability: hypergeometricResult.probability,
    kurtosis: kurtosis,
    bia: bia,
  };
  return result;
};

/**
 * Determine the type of population
 * @param {Number} n
 * @param {Number} N
 * @returns
 */
const determineSampleType = (n, N) => {
  let sample = "";
  let result = Number((n * 100) / N).toFixed(2);
  if (result <= 5) {
    sample = "INFINITA";
  } else if (result > 5 && result < 20) {
    sample = "FINITA";
  } else if (result >= 20) {
    sample = "HIPERGEOMÉTRICA";
  }
  return sample;
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

export { maths, calculator, determineSampleType };
