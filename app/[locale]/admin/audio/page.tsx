'use client'

import React, { useState } from 'react'
import { createSpeech } from './../../../components/admin/BackAi'

import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AiOutlineDelete } from 'react-icons/ai'

const Audio = () => {
  const { toast } = useToast()
  const [inputText, setInputText] = useState('')
  const [podcastTitle, setPodcastTitle] = useState('')

  const [openOwnImg, setOpenOwnImage] = useState<boolean>(false)
  const [media, setMedia] = useState('')

  const [openAiImg, setOpenAiImage] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  // State to hold the preview URL of the selected file
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [imageUrl, setImageUrl] = useState('')

  const [audioUrl, setAudioUrl] = useState('')

  const voiceCategories = ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx']
  const [voiceType, setVoiceType] = useState<string>('onyx')

  const handleInputChange = (event: any) => {
    setInputText(event.target.value)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    //await createSpeech(podcastTitle, inputText)

    try {
      console.log('1hS file', file)

      var formdata = new FormData()
      if (file) formdata.append('files', file)

      var requestOptions = { method: 'POST', body: formdata }

      const response = await fetch('/api/podcastImg', requestOptions)
      const result = await response.text()
      console.log(result)
    } catch (error) {
      console.log('hs', error)
    }

    //console.log(podcastTitle, inputText)
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Update preview URL state
      const reader = new FileReader()
      reader.readAsDataURL(selectedFile)
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
    } else {
      setFile(null)
      setPreviewUrl(null)
    }
  }
  const removeFile = () => {
    console.log('remove')
    setFile(null)
    setPreviewUrl(null)
    setMedia('')
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
        <div className='flex flex-col lg:flex-row gap-2 my-4'>
          <p
            onClick={() => setOpenOwnImage(true)}
            className='cursor-pointer hover:text-blue-500'
          >
            Upload your own Image
          </p>

          <p
            onClick={() => setOpenAiImage(true)}
            className='cursor-pointer hover:text-blue-500'
          >
            Use AI to create an Image
          </p>
        </div>

        {openOwnImg && (
          <div className='flex relative bg-[#2e2236] mt-8'>
            <button
              type='button'
              className='w-[36px] h-[36px] border border-green-100 flex items-center justify-center cursor-pointer'
              onClick={() => setOpen(!open)}
            >
              <Image src='/plus.png' alt='' width={16} height={16} />
            </button>
            {open && (
              <div className='flex gap-[20px] z-999 w-[100%] absolute left-[50px]'>
                <input
                  type='file'
                  id='image'
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <button
                  type='button'
                  className='border border-white w-[36px] h-[36px] 100 flex items-center justify-center cursor-pointer'
                >
                  <label htmlFor='image'>
                    <Image src='/image.png' alt='' width={16} height={16} />
                  </label>
                </button>
              </div>
            )}
            <button
              type='button'
              className='ml-16 border border-white w-[36px] h-[36px] 100 flex items-center justify-center cursor-pointer'
            >
              <label htmlFor='image'>
                <AiOutlineDelete
                  className='text-red-700'
                  onClick={() => removeFile}
                />
              </label>
            </button>
          </div>
        )}

        {previewUrl ? (
          <Image
            className='my-4 w-[150px] h-auto'
            src={previewUrl}
            alt={podcastTitle}
            width={50}
            height={50}
          />
        ) : (
          media !== '' && (
            <Image className='w-[250px] my-4' src={media} alt={podcastTitle} />
          )
        )}

        <button onClick={handleSubmit} className='mt-4'>
          Create Speech
        </button>
      </form>
    </div>
  )
}

export default Audio
