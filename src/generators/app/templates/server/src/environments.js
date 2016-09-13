export function debug() {
  process.env.MM_LOG_LEVEL = 'silly';
}

export function development() {
  process.env.MM_LOG_LEVEL = 'info';
}

export function production() {
  process.env.MM_LOG_LEVEL = 'error';
}
