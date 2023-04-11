/* Overall variable */
const euler = 2.71828;

const mm1 = (
  halfService,
  averageArrival,
  ws,
  wq,
  ls,
  lq,
  poblation,
  time,
  checkMin1,
  checkMin2,
  checkTMin,
  checkPoblation
) => {
  let internalHalfService = 0;
  let internalAverageArrival = 0;
  let internalWs = 0;
  let internalWq = 0;
  let internalLs = 0;
  let internalLq = 0;
  let internalProbability = 0;
  let internalProbabilityN = 0;
  let internalProbabilityOsio = 0;
  let internalProbabilityWait = 0;
  let internalProbabilityWaitSystem = 0;
  let internalTime = 0;
  let internalPoblation = Number(poblation);
  if (
    halfService == "" &&
    averageArrival == "" &&
    ws == "" &&
    wq == "" &&
    ls == "" &&
    lq == "" &&
    poblation == ""
  ) {
    return alert("Debe de ingresar datos");
  }
  if (halfService > averageArrival) {
    return alert("El sistema tiende a infinito");
  }

  if (checkMin1) {
    internalAverageArrival = Number(halfService / 60);
  } else {
    internalAverageArrival = Number(halfService);
  }

  if (checkMin2) {
    internalHalfService = Number(averageArrival / 60);
  } else {
    internalHalfService = Number(averageArrival);
  }

  if (checkTMin) {
    internalTime = Number(time / 60);
  } else {
    internalTime = Number(time);
  }

  internalWs = Number(ws);
  internalWq = Number(wq);

  if (ws == "" || ws == 0) {
    internalWs = Number(internalWq + 1 / internalHalfService);
  } else if (wq == "" || wq == 0) {
    internalWq = Number(internalWs - 1 / internalHalfService);
  }

  if (lq == "" || lq == 0) {
    internalLq = Number(internalAverageArrival * internalWq);
  }

  if (ls == "" || ls == 0) {
    internalLs = Number(internalAverageArrival * internalWs);
  }

  internalProbability = Number(halfService / averageArrival).toFixed(2);
  internalProbabilityOsio = Number(1 - internalProbability).toFixed(2);

  internalProbabilityN =
    Number(1 - Number(halfService / averageArrival)) *
    Number(
      Math.pow(Number(halfService / averageArrival), Number(internalPoblation))
    );

  internalProbabilityWait =
    internalProbability *
    Math.pow(
      Number(euler),
      -1 * internalHalfService * (1 - internalProbability) * internalTime
    );

  internalProbabilityWaitSystem = Math.pow(
    Number(euler),
    -1 * internalHalfService * (1 - internalProbability) * internalTime
  );

  const result = {
    internalHalfService: internalHalfService,
    internalAverageArrival: internalAverageArrival,
    internalWs: internalWs,
    internalWq: internalWq,
    internalLs: internalLs,
    internalLq: internalLq,
    internalProbability: internalProbability,
    internalProbabilityOsio: internalProbabilityOsio,
    internalProbabilityN: internalProbabilityN,
    internalProbabilityWait: internalProbabilityWait,
    internalProbabilityWaitSystem: internalProbabilityWaitSystem,
    flag: "9",
  };

  return result;
};

export { mm1 };
