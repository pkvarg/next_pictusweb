// app/Audio.tsx
'use client'

import React, { useState } from 'react'
import { createSpeech } from './../../../components/admin/BackAi'

const Audio = () => {
  const [inputText, setInputText] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value)
  }

  const handleButtonClick = async () => {
    await createSpeech(inputText)
    alert('Speech created and saved to the server.')
  }

  return (
    <div>
      <h1>Text to Speech</h1>
      <input
        className='text-black pl-2'
        type='text'
        value={inputText}
        onChange={handleInputChange}
        placeholder='Enter text to convert to speech'
      />
      <button onClick={handleButtonClick}>Create Speech</button>
    </div>
  )
}

export default Audio
