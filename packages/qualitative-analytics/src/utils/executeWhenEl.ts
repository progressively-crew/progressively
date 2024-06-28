export const executeWhenEl = (
  selector: string,
  fn: (e: HTMLElement) => void
) => {
  const el = document.querySelector(selector);
  if (el) return fn(el as HTMLElement);

  let attempts = 0;
  const maxAttempts = 10;
  const interval = 500; // in milliseconds

  const intervalId = setInterval(() => {
    attempts++;
    const element = document.querySelector(selector);

    if (element) {
      fn(element as HTMLElement);
      clearInterval(intervalId);
    } else if (attempts >= maxAttempts) {
      clearInterval(intervalId);
    }
  }, interval);
};
