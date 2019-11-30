import { ApiPlayer } from '../types'

export const isEnv = (env: 'server' | 'client') =>
  typeof window === 'undefined' ? env === 'server' : env === 'client'

export const progressToMs = (progress: number, playerStatus: ApiPlayer) =>
  Math.round((progress / 100) * playerStatus.trackDuration)
