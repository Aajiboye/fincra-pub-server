export function isProduction() {
  return process.env.NODE_ENV === 'production';
}

export function getEnvironmentName() {
  return process.env.NODE_ENV === 'production' ? 'prod' : 'uat';
}
