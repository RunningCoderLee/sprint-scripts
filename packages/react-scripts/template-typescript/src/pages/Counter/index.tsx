import React, { useState, memo } from 'react'

const Counter = memo(() => {
  const [dolphins, setDolphins] = useState(0)
  const [sharks, setSharks] = useState(0)

  const incrementDolphins = (): void => {
    setDolphins(dolphins + 1)
  }

  const incrementSharks = (): void => {
    setSharks(sharks + 1)
  }

  const incrementDolphinsAsync = (): void => {
    setTimeout(() => {
      setDolphins(dolphins + 1)
    }, 1000)
  }

  const incrementSharksAsync = (): void => {
    setTimeout(() => {
      setSharks(sharks + 1)
    }, 1000)
  }

  const incrementSharksAsync2 = (): void => {
    setTimeout(() => {
      setSharks(sharks + 2)
    }, 1000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ width: 120 }}>
        <h3>Dolphins1</h3>
        <h1>{dolphins}</h1>
        <button type="button" onClick={incrementDolphins}>
          +1
        </button>
        <button type="button" onClick={incrementDolphinsAsync}>
          Async +1
        </button>
      </div>
      <div style={{ width: 200 }}>
        <h3>Sharks</h3>
        <h1>{sharks}</h1>
        <button type="button" onClick={incrementSharks}>
          +1
        </button>
        <button type="button" onClick={incrementSharksAsync}>
          Async +1
        </button>
        <button type="button" onClick={incrementSharksAsync2}>
          Async +2
        </button>
      </div>
      <p>Using React Hooks</p>
    </div>
  )
})

export default Counter
