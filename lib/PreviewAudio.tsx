'use client'
import React, { useRef } from 'react'

type PreviewAudioProps = {
  audioPath: string
}

const PreviewAudio: React.FC<PreviewAudioProps> = ({ audioPath }) => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const handlePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  return (
    <div>
      <audio ref={audioRef} src={audioPath} />
      {/* <p className='text-white'>{audioPath}</p> */}
      <button
        className='cursor-pointer hover:text-green-500'
        onClick={handlePlay}
      >
        Play Audio
      </button>
    </div>
  )
}

export default PreviewAudio
