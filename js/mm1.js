const mm1 = (
  halfService,
  averageArrival,
  ws,
  wq,
  ls,
  lq,
  poblation,
  checkMin,
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

  if (checkMin) {
    internalHalfService = Number(averageArrival / 60);
    internalAverageArrival = Number(halfService / 60);
    internalWs = Number(ws);
    internalWq = Number(wq);
  } else {
    internalHalfService = Number(halfService);
    internalAverageArrival = Number(averageArrival);
    internalWs = Number(ws);
    internalWq = Number(wq);
  }

  if (ws == "" || ws == 0) {
    internalWs = Number(internalWq + 1 / internalHalfService);
  } else if (wq == "" || wq == 0) {
    internalWq = Number(internalWs - 1 / internalHalfService);
  }

  if (lq == "" || lq == 0) {
    internalLq = Number(internalAverageArrival * internalWq);
    console.log(averageArrival);
    console.log(internalWq);
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
    flag: "9",
  };
  return result;
};

export { mm1 };
