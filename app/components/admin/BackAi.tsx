'use server'

import fs from 'fs'
import path from 'path'
import OpenAI from 'openai'

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
