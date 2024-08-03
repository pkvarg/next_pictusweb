'use client'

import React, { useEffect, useState } from 'react'
import { createSpeech } from './../../../components/admin/BackAi'

import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AiOutlineDelete } from 'react-icons/ai'
import { Loader } from 'lucide-react'

const Audio = () => {
  const { toast } = useToast()
  const [inputText, setInputText] = useState('')
  const [podcastTitle, setPodcastTitle] = useState('')

  const [openOwnImg, setOpenOwnImage] = useState<boolean>(false)
  const [media, setMedia] = useState('')

  const [openAiImg, setOpenAiImage] = useState<boolean>(false)

  const [file, setFile] = useState<File | null>(null)
  // State to hold the preview URL of the selected file
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [imagePrompt, setImagePrompt] = useState('')

  const [aiImage, setAiImage] = useState('')

  const voiceCategories = ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx']
  const [voiceType, setVoiceType] = useState<string | null>(null)

  useEffect(() => {
    if (openOwnImg) {
      setOpenAiImage(false)
    }
    if (openAiImg) {
      setOpenOwnImage(false)
    }
  }, [openOwnImg, openAiImg])

  const handleGetAiImage = async (e: any) => {
    e.preventDefault()
    setPreviewUrl(null)
    if (!imagePrompt || !podcastTitle) {
      toast({ title: 'Title and Prompt must not be empty.' })
    } else {
      const data = {
        title: podcastTitle,
        prompt: imagePrompt,
      }
      setIsSubmitting(true)
      const response = await fetch('/api/podcastAiImg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(data), // Convert the data object to a JSON string
      })
      const result = await response.json()
      console.log('returned', result)

      setIsSubmitting(false)
      setPreviewUrl(result.data as string)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!podcastTitle || !inputText) {
      toast({
        title: 'Title and Input Text must not be empty.',
        variant: 'destructive',
      })
      return
    }
    setIsSubmitting(true)
    //await createSpeech(podcastTitle, inputText)
    // save file to server
    if (file) {
      try {
        const formdata = new FormData()
        if (file) formdata.append('files', file)

        const requestOptions = { method: 'POST', body: formdata }

        const response = await fetch('/api/podcastOwnImg', requestOptions)
        const result = await response.json()
        console.log('returned', result)
        setPreviewUrl(result.data as string)
      } catch (error) {
        console.log('hs', error)
      }
    }
    setIsSubmitting(false)
    toast({ title: 'Podcast created and saved to the server.' })
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
          onChange={(e) => setInputText(e.target.value)}
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
            value={voiceType || 'choose voice'}
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
        <div className='flex flex-col gap-2 my-4'>
          <p
            onClick={() => setOpenOwnImage((prev) => !prev)}
            className='cursor-pointer hover:text-blue-500'
          >
            Upload your own Image
          </p>

          {openOwnImg && (
            <div className='flex relative bg-[#2e2236] my-8'>
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
                  <Image src='/plus.png' alt='' width={16} height={16} />
                </label>
              </button>
              <button
                type='button'
                className='ml-16 border border-white w-[36px] h-[36px] 100 flex items-center justify-center cursor-pointer'
              >
                <label htmlFor='image'>
                  <AiOutlineDelete
                    className='text-red-700'
                    onClick={removeFile}
                  />
                </label>
              </button>
            </div>
          )}

          <p
            onClick={() => setOpenAiImage((prev) => !prev)}
            className='cursor-pointer hover:text-blue-500'
          >
            Use AI to create an Image
          </p>
        </div>

        {openAiImg && (
          <div className='flex flex-col relative bg-[#2e2236] mt-8'>
            <textarea
              className='text-black text-[18px] pl-2 w-[100%] mt-2 h-[300px]'
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              placeholder='Enter promt for AI image creation'
            />

            {isSubmitting ? (
              <Loader size={60} className='animate-spin ml-[45%] mt-4' />
            ) : (
              <button
                onClick={handleGetAiImage}
                className='mt-4 hover:text-blue-500'
              >
                Get AI Image from Prompt
              </button>
            )}
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

        {isSubmitting ? (
          <Loader size={60} className='animate-spin ml-[45%] mt-4' />
        ) : (
          <button onClick={handleSubmit} className='mt-4 hover:text-green-500'>
            Create Speech
          </button>
        )}
      </form>
    </div>
  )
}

export default Audio
