import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import { pipeline, Readable } from 'stream'
import { promisify } from 'util'
import { getTimeStamp } from '@/lib/timestamp'
import { CloudCog } from 'lucide-react'
import { log } from 'console'
const pump = promisify(pipeline)

function readableStreamToNodeReadable(
  readableStream: ReadableStream
): Readable {
  const reader = readableStream.getReader()
  const nodeReadable = new Readable({
    async read() {
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          this.push(null)
          break
        }
        this.push(value)
      }
    },
  })
  return nodeReadable
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const fileEntry = formData.getAll('files')[0]
    console.log('own file', fileEntry)
    //process.exit

    // Type guard to ensure fileEntry is a File
    if (fileEntry && fileEntry instanceof File) {
      const timestamp = getTimeStamp()
      const filePath = `./public/podcast/images/${timestamp}_${fileEntry.name}`
      const nodeReadableStream = readableStreamToNodeReadable(
        fileEntry.stream()
      )

      // eslint-disable-next-line
      await pump(nodeReadableStream, fs.createWriteStream(filePath))

      const frontendPath = `/podcast/images/${timestamp}_${fileEntry.name}`

      return NextResponse.json({ status: 'success', data: frontendPath })
    } else {
      throw new Error('The provided form data entry is not a file.')
    }
  } catch (e: any) {
    return NextResponse.json({ status: 'fail', data: e.message })
  }
}
