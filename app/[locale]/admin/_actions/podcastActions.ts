'use server'
import db from '@/db/db'
import fs from 'fs'
import path from 'path'
import OpenAI from 'openai'
import { getTimeStamp } from '@/lib/timestamp'

const openai = new OpenAI()

interface PodcastData {
  title: string
  description: string | null // Allow null
  textPrompt: string
  imagePrompt: string | null
  audioPath: string
  imagePath: string
  category: string
  english: boolean
}

interface Podcast extends PodcastData {
  id: string
}

export async function createSpeech(podcastTitle: string, inputText: string) {
  try {
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy',
      input: inputText,
    })

    const timestamp = getTimeStamp()

    const frontendPath = `/podcast/mp3s/${podcastTitle}_${timestamp}.mp3`

    const speechFile = path.resolve(
      `./public/podcast/mp3s/${podcastTitle}_${timestamp}.mp3`
    )

    const buffer = Buffer.from(await mp3.arrayBuffer())
    await fs.promises.writeFile(speechFile, buffer)
    return { frontendPath }
  } catch (error) {
    console.log(error)
  }
}

export async function create(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  'use server'

  try {
    console.log('here create formData', formData)
    const data: PodcastData = {
      title: formData.get('title')?.toString() || '',
      description: formData.get('description')?.toString() || '',
      textPrompt: formData.get('textPrompt')?.toString() || '',
      imagePrompt: formData.get('imagePrompt')?.toString() || '',
      audioPath: formData.get('audioPath')?.toString() || '',
      imagePath: formData.get('imagePath')?.toString() || '',
      category: formData.get('category')?.toString() || '',
      english: formData.get('english') === 'true',
    }

    await db.podcast.create({
      data,
    })

    return { success: true, message: 'Podcast created successfully' }
  } catch (error) {
    console.error('Error creating podcast:', error)
    return { success: false, message: 'Failed to create podcast' }
  }
}

export async function getAllPodcasts(): Promise<{
  allPodcasts: {}
  success: boolean
  message: string
}> {
  'use server'
  try {
    const allPodcasts = await db.podcast.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        textPrompt: true,
        imagePrompt: true,
        audioPath: true,
        imagePath: true,
        category: true,
        english: true,
      },
      orderBy: { title: 'asc' },
    })
    return { allPodcasts, success: true, message: 'Podcasts success' }
  } catch (error) {
    console.error('Error getting podcasts:', error)
    return {
      allPodcasts: {},
      success: false,
      message: 'Failed to get podcasts',
    }
  }
}

export async function getSinglePodcast(podcastId: string): Promise<{
  podcast: Podcast | null
  success: boolean
  message: string
}> {
  'use server'
  try {
    const podcast = await db.podcast.findUnique({
      where: {
        id: podcastId,
      },
    })
    if (podcast) {
      return {
        podcast: podcast as Podcast,
        success: true,
        message: 'Podcasts success',
      }
    }
    return { podcast: null, success: true, message: 'Podcasts success' }
  } catch (error) {
    console.error('Error getting podcasts:', error)
    return { podcast: null, success: false, message: 'Failed to get podcasts' }
  }
}

export async function deleteSinglePodcast(
  podcastId: string
): Promise<{ success: boolean; message: string }> {
  try {
    await db.podcast.delete({
      where: {
        id: podcastId,
      },
    })
    return { success: true, message: 'Podcast successfuly deleted' }
  } catch (error) {
    return { success: false, message: 'Podcast not deleted' }
  }
}

export async function editSinglePodcast(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  'use server'

  try {
    const data: Podcast = {
      id: formData.get('id')?.toString() || '',
      title: formData.get('title')?.toString() || '',
      description: formData.get('description')?.toString() || '',
      textPrompt: formData.get('textPrompt')?.toString() || '',
      imagePrompt: formData.get('imagePrompt')?.toString() || '',
      audioPath: formData.get('audioPath')?.toString() || '',
      imagePath: formData.get('imagePath')?.toString() || '',
      category: formData.get('category')?.toString() || '',
      english: formData.get('english') === 'true',
    }

    if (!data.id) {
      throw new Error('Podcast ID is required')
    }

    await db.podcast.update({
      where: {
        id: data.id,
      },
      data,
    })

    return { success: true, message: 'Podcast updated successfully' }
  } catch (error) {
    console.error('Error updating podcast:', error)
    return { success: false, message: 'Failed to update podcast' }
  }
}
