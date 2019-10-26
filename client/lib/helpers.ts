export const isEnv = (env: 'server' | 'client') =>
  typeof window === 'undefined' ? env === 'server' : env === 'client'
