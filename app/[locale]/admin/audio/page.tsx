'use client'

import React, { useState } from 'react'
import { createSpeech } from './../../../components/admin/BackAi'

import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

const Audio = () => {
  const { toast } = useToast()
  const [inputText, setInputText] = useState('')
  const [podcastTitle, setPodcastTitle] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [imageUrl, setImageUrl] = useState('')

  const [audioUrl, setAudioUrl] = useState('')

  const voiceCategories = ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx']
  const [voiceType, setVoiceType] = useState<string>('onyx')

  const handleInputChange = (event: any) => {
    setInputText(event.target.value)
  }

  const handleSubmit = async () => {
    await createSpeech(podcastTitle, inputText)
    //alert('Speech created and saved to the server.')
    toast({ title: 'Speech created and saved to the server.' })
  }

  const handleVoiceType = (value: string) => {
    setVoiceType(value)
    console.log('hvt', voiceType)
    setTimeout(() => {
      const audio = document.getElementById('voiceAudio') as HTMLAudioElement
      if (audio) {
        audio.play().catch((e) => console.error('Error playing audio:', e))
      }
    }, 100)
  }

  return (
    <div className='flex flex-col gap-2 justify-center items-center my-16 w-full'>
      <h1>Text to Speech</h1>
      <form>
        <input
          className='text-black pl-2'
          type='text'
          value={podcastTitle}
          onChange={(e) => setPodcastTitle(e.target.value)}
          placeholder='Enter Podcast title'
        />
        <textarea
          className='text-black text-[18px] pl-2 w-[100%] mt-2 h-[300px]'
          value={inputText}
          onChange={handleInputChange}
          placeholder='Enter text to convert to speech'
        />
        <div className='flex flex-col gap-2.5'>
          <label className='text-16 font-bold text-white-1'>
            Select AI Voice
          </label>

          <select
            id='category'
            name='category'
            className='mt-2 text-[#2e2236]'
            value={voiceType}
            onChange={(e) => handleVoiceType(e.target.value)}
          >
            {voiceCategories.map((category) => (
              <option
                key={category}
                value={category}
                className='capitalize focus:bg-orange-500 w-full px-16 bg-black'
              >
                {category}
              </option>
            ))}
          </select>

          {voiceType && (
            <audio src={`/${voiceType}.mp3`} autoPlay className='hidden' />
          )}
        </div>
        <button onClick={handleSubmit} className='mt-4'>
          Create Speech
        </button>
      </form>
    </div>
  )
}

export default Audio
