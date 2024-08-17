import React from 'react'
import db from '@/db/db'
import EditBlogButton from './EditBlogButton'
import DeleteBlogButton from './DeleteBlogButton'
import RefreshButton from './RefreshButton'
import EditPodcastButton from './EditPodcastButton'
import DeletePodcastButton from './DeletePodcastButton'
import Image from 'next/image'
import PreviewAudio from '@/lib/PreviewAudio'

export default async function AllPodcasts() {
  const podcasts = await db.podcast.findMany({
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
    orderBy: { updatedAt: 'desc' },
  })
  if (podcasts.length === 0) return <p>No podcasts found</p>

  return (
    <div className='mt-8'>
      <RefreshButton />
      <h1 className='text-[30px] text-center text-white'>All Podcasts</h1>

      <div className='flex flex-col justify-center items-center mx-4 lg:mx-[5%]'>
        <div className='gap-4 text-white text-[25px] py-8'>
          {podcasts.map((podcast) => (
            <div
              className='py-4 flex flex-col justify-center items-center'
              key={podcast.id}
            >
              <div>
                <h1 className='text-green-500'>Title: {podcast.title}</h1>
                <h2 className='text-green-200'>Category: {podcast.category}</h2>
                <div className='flex flex-row items-center gap-2'>
                  <p>Audio Path</p>
                  {podcast.audioPath !== '' ? (
                    <p className='text-[18.5px]'>{podcast.audioPath}</p>
                  ) : (
                    <p className='text-red-500'>no url</p>
                  )}
                </div>
                {podcast.imagePath && (
                  <>
                    <p>Image Path: {podcast.imagePath}</p>
                    <Image
                      src={podcast.imagePath}
                      alt={podcast.title}
                      height={250}
                      width={250}
                    />
                  </>
                )}

                <p className='text-[20px]'>
                  Description: {podcast.description}
                </p>

                <PreviewAudio audioPath={podcast.audioPath as string} />

                <p
                  className={
                    podcast.english ? 'text-green-500' : 'text-red-500'
                  }
                >
                  English: {podcast.english ? 'true' : 'false'}
                </p>
              </div>
              <div className='flex flex-col gap-2 items-start mt-2'>
                <EditPodcastButton
                  link={`/en/admin/podcasts/edit/${podcast.id}`}
                />
                <DeletePodcastButton podcastId={`${podcast.id}`} />
              </div>

              {/* <p>Dátum: {getDate(blog.updatedAt)}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
