export function requestAnimationFrame(callback) {
  const executor = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || (cb => setTimeout(cb, 17));

  return executor(callback);
}

export function cancelAnimationFrame(handler) {
  const executor = window.cancelAnimationFrame
    || window.webkitCancelAnimationFrame
    || window.mozCancelAnimationFrame
    || clearTimeout;

  return executor(handler);
}
