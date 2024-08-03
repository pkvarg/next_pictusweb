import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
const pump = promisify(pipeline)

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.formData()
    const file = formData.getAll('files')[0]

    const filePath = `./public/${file.name}`
    await pump(file.stream(), fs.createWriteStream(filePath))
    // return NextResponse.json({ status: 'success', data: file.size })
    return NextResponse.json({ status: 'success' })
  } catch (e) {
    return NextResponse.json({ status: 'fail', data: e })
  }
}
