import React, { useState, useEffect, useRef } from 'react'

export const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef(callback)
  const savedInterval = useRef(delay)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    savedInterval.current = delay
  }, [delay])

  useEffect(() => {
    const tick = () => {
      savedCallback.current && savedCallback.current()
    }

    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
