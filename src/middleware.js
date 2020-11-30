const ComposeMiddleware = (...middleware) => {
  const mCtxProvider = middleware
    .filter((i) => i.ctxProvider)
    .map((i) => i.ctxProvider);
  const mInitState = middleware
    .filter((i) => i.initState)
    .map((i) => i.initState);
  return {
    ctxProvider: ({children}) =>
      mCtxProvider.reduceRight((a, Comp) => <Comp>{a}</Comp>, children),
    initState: (snap) => mInitState.forEach((i) => i(snap)),
  };
};

export {ComposeMiddleware as default, ComposeMiddleware};
