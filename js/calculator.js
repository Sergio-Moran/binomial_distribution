const maths = (N, n, x, xn, p, q, checkPoblation, check) => {
  let valuesResult;
  let resultPoblation = 0;
  let total = 0;
  let valueQ = 0;
  let flag = "";

  if (q == 0) {
    valueQ = Number(1 - p).toFixed(7);
  } else {
    valueQ = q;
  }

  if (checkPoblation && check) {
    if (x == xn) {
      return alert("x1 y x2 son iguales, colocar otro intervalo");
    }
    valuesResult = calculatorPoblation(n, p, N, valueQ);
    resultPoblation = valuesResult;
    if (x == 0) {
      valuesResult = calculators(0, xn, n, p);
      valuesResult.forEach((e) => {
        total += Number(e);
      });
    } else if (x > xn) {
      valuesResult = calculators(xn, x, n, p);
      valuesResult.forEach((e) => {
        total += Number(e);
      });
    } else if (x < xn) {
      valuesResult = calculators(x, xn, n, p);
      valuesResult.forEach((e) => {
        total += Number(e);
      });
    }
    total = Number(total).toFixed(7);
    flag = "3";

    return { valuesResult, resultPoblation, total, flag };
  }

  /**
   * When we have N
   */
  if (checkPoblation && !check) {
    valuesResult = calculatorPoblation(n, p, N, valueQ);
    resultPoblation = valuesResult;
    valuesResult = calculator(n, x, p);
    flag = "4";
    return { valuesResult, resultPoblation, total, flag };
  }

  if (!checkPoblation && check) {
    if (x == xn) {
      return alert("x1 y x2 son iguales, colocar otro intervalo");
    }
    if (x == 0) {
      valuesResult = calculators(0, xn, n, p);
      valuesResult.forEach((e) => {
        total += Number(e);
      });
    } else if (x > xn) {
      valuesResult = calculators(xn, x, n, p);
      valuesResult.forEach((e) => {
        total += Number(e);
      });
    } else if (x < xn) {
      valuesResult = calculators(x, xn, n, p);
      valuesResult.forEach((e) => {
        total += Number(e);
      });
    }
    flag = "2";
    return { valuesResult, resultPoblation, total, flag };
  }

  if (!check && !checkPoblation) {
    total = calculator(n, x, p);
    flag = "1";
    return { valuesResult, resultPoblation, total, flag };
  }
};

const calculator = (n, x, p) => {
  let numerator = factorial(n);
  let nLessX = factorial(Number(n - x));
  let xFactorial = factorial(x);
  let denominator = Number(nLessX * xFactorial).toFixed(7);
  let probability = Number(
    (numerator / denominator) * Math.pow(p, x) * Math.pow(1 - p, n - x)
  ).toFixed(7);
  return probability;
};

const calculators = (x, xn, n, p) => {
  let values = [];
  let numerator = 0;
  let nLessX = 0;
  let xFactorial = 0;
  let denominator = 0;
  let probability = 0;
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
  return values;
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
const calculatorPoblation = (n, p, N, q) => {
  let half = 0;
  let correctionFactor = 0;
  let deviation = 0;
  let kurtosis = 0;
  let bias = 0;
  let result = determineSampleType(n, p);
  half = Number(n * p).toFixed(7);

  if (result == "FINITA") {
    correctionFactor = Math.sqrt(
      Number(N - n).toFixed(7) / Number(N - 1).toFixed(7)
    ).toFixed(7);
    deviation = Number(correctionFactor * Math.sqrt(Number(n * p * q))).toFixed(
      7
    );
  } else if (result == "INFINITA") {
    deviation = Number(Math.sqrt(Number(n * p * q))).toFixed(7);
  }

  kurtosis = Number(Number(q - p) / Number(Math.sqrt(n * p * q))).toFixed(7);
  bias = Number(3 + (1 - 6 * p * q) / Math.sqrt(N * p * q)).toFixed(7);
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

const determineSampleType = (n, N) => {
  let sample = "";
  let result = Number((n * 100) / N).toFixed(2);

  if (result <= 5) {
    sample = "INFINITA";
  } else if (result > 5) {
    sample = "FINITA";
  }
  return sample;
};

const factorial = (num) => {
  if (num < 0) return -1;
  else if (num == 0) return 1;
  else {
    return num * factorial(num - 1);
  }
};

export { maths, calculator };
