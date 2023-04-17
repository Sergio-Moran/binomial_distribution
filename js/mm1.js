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
  let results = 0;
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

  if (
    (halfService == "" && averageArrival == "") ||
    (halfService == 0 && averageArrival == 0)
  ) {
    return alert(
      "Debe de ingresar almenos uno de los siguientes datos: Media de Llegada ó Media de Servicio"
    );
  }

  if (halfService == "" || halfService == 0) {
    results = mirrorAverageArrival(ws, wq, ls, lq, averageArrival);
    halfService = results;
  }

  if (averageArrival == "" || averageArrival == 0) {
    results = mirrorHalfService(ws, wq, ls, lq, halfService);
    console.log("dentro");
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
  internalLs = Number(ls);
  internalLq = Number(lq);

  if (internalWs == "" || internalWs == 0) {
    internalWs = Number(
      1 / (internalHalfService - internalAverageArrival)
    ).toFixed(4);
  }

  if (internalWq == "" || internalWq == 0) {
    internalWq = Number(
      internalAverageArrival /
        (
          internalHalfService *
          (internalHalfService - internalAverageArrival)
        ).toFixed(4)
    );
  }

  if (internalLs == "" || internalLs == 0) {
    internalLs = Number(
      internalAverageArrival / (internalHalfService - internalAverageArrival)
    ).toFixed(4);
  }

  if (internalLq == "" || internalLq == 0) {
    internalLq = Number(
      Math.pow(internalAverageArrival, 2) /
        (internalHalfService * (internalHalfService - internalAverageArrival))
    ).toFixed(4);
  }

  /*   if (ws == "" || ws == 0) {
    internalWs = Number(internalWq + 1 / internalHalfService);
  } else if (wq == "" || wq == 0) {
    internalWq = Number(internalWs - 1 / internalHalfService);
  }

  if (lq == "" || lq == 0) {
    internalLq = Number(internalAverageArrival * internalWq);
  }

  if (ls == "" || ls == 0) {
    internalLs = Number(internalAverageArrival * internalWs);
  } */

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
  /* const result2 = {
    internalHalfService: internalHalfService,
    internalAverageArrival: internalAverageArrival,
    internalWs: internalWs,
    internalWq: internalWq,
    internalLs: internalLs,
    internalLq: internalLq,
    flag: "9",
  };
  console.log(result2); */
  return result;
};

const mirrorAverageArrival = (ws, wq, ls, lq, halfService) => {
  let internalAverageArrival = 0;
  ws = Number(ws);
  wq = Number(wq);
  ls = Number(ls);
  lq = Number(lq);
  halfService = Number(halfService);

  if (ws != "" || ws != 0) {
    internalAverageArrival = Number(halfService - 1 / ws).toFixed(4);
  } else if (wq != "" || wq != 0) {
    internalAverageArrival = Number(
      (wq * Math.pow(halfService, 2)) / (1 + wq * halfService)
    ).toFixed(4);
  } else if (ls != "" || ls != 0) {
    internalAverageArrival = Number((ls * halfService) / (1 + ls)).toFixed(4);
  }
  return internalAverageArrival;
};

const mirrorHalfService = (ws, wq, ls, lq, averageArrival) => {
  let internalHalfService = 0;
  ws = Number(ws);
  wq = Number(wq);
  ls = Number(ls);
  lq = Number(lq);
  averageArrival = Number(averageArrival);

  if (ws != "" || ws != 0) {
    internalHalfService = Number(1 / ws + averageArrival).toFixed(4);
  } else if (ls != "" || ls != 0) {
    internalHalfService = Number(averageArrival / ls + averageArrival).toFixed(
      4
    );
    return internalHalfService;
  }
};

export { mm1 };
