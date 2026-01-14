export const trackPerformance = (label: string, fn: () => void) => {
  const start = Date.now();
  fn();
  const end = Date.now();
  console.log(`[PERF] ${label}: ${end - start}ms`);
};
