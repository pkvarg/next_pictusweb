'use server'

import fs from 'fs'
import path from 'path'
import OpenAI from 'openai'
import axios from 'axios'

const openai = new OpenAI()

export async function createSpeech(
  podcastTitle: string,
  inputText: string
): Promise<void> {
  console.log('bck', podcastTitle, inputText)
  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'alloy',
    input: inputText,
  })

  const speechFile = path.resolve(`./public/podcast/mp3s/${podcastTitle}.mp3`)

  const buffer = Buffer.from(await mp3.arrayBuffer())
  await fs.promises.writeFile(speechFile, buffer)
}

// export async function createImage(podcastTitle: string, imagePrompt: string) {
//   console.log('c Image', podcastTitle, imagePrompt)

//   try {
//     const image = await openai.images.generate({
//       model: 'dall-e-3',
//       prompt: imagePrompt,
//     })
//     console.log('c Img res', image)

//     const response = await axios.post('/api/podcastAimg', {
//       image,
//       podcastTitle,
//     })
//     console.log('BaI res', response)
//     return response.data.filePath

//     //const imageFile = path.resolve(`./public/podcast/images/${podcastTitle}.xxxx`)

//     // const buffer = Buffer.from(await image.arrayBuffer())
//     // await fs.promises.writeFile(imageFile, buffer)
//     //return { imageFile }
//   } catch (error) {
//     console.log('error image', error)
//     return { error: error }
//   }
// }
