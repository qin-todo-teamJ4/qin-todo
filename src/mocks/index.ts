const isBrowser = typeof window != "undefined";

export const setupMocks = async () => {
  if (isBrowser) {
    const { mswWorker } = await import("./mswWorker");
    mswWorker.start();
  } else {
    const { mswServer } = await import("./mswServer");
    mswServer.listen();
  }
};
