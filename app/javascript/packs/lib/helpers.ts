import { ApiPlayer } from '../types'

export const isEnv = (env: 'server' | 'client') =>
  typeof window === 'undefined' ? env === 'server' : env === 'client'

export const progressToMs = (progress: number, playerStatus: ApiPlayer) =>
  Math.round((progress / 100) * playerStatus.trackDuration)

const padNumbers = (number: number) => number.toString().padStart(2, '0')

export const msToTime = (duration: number) => {
  let s = duration / 1000
  const h = Math.round(s / 3600)
  s = s % 3600
  const m = Math.round(s / 60)
  s = Math.round(s % 60)

  return `${h > 0 ? h + ':' : ''}${padNumbers(m)}:${padNumbers(s)}`
}
