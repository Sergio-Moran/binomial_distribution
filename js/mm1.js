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
  let internalPoblation = 0;
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

  if (checkMin) {
    internalHalfService = Number(halfService / 60);
    internalAverageArrival = Number(averageArrival / 60);
    internalWs = Number(ws / 60);
    internalWq = Number(wq / 60);
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
};

export { mm1 };
