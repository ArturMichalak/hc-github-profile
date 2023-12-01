export function debounce(
  callback: Function,
  delay: number,
  signal?: AbortSignal
) {
  signal?.addEventListener("abort", handleAbort);
  const timer = setTimeout(handleDone, delay);

  function handleDone() {
    signal?.removeEventListener("abort", handleAbort);
    callback();
  }

  function handleAbort() {
    clearTimeout(timer);
  }
}
