'use client'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const Offer = () => {
  const t = useTranslations('Home')
  const { locale } = useParams()
  const [showOffer1, setShowOffer1] = useState<boolean>(false)
  const [showOffer2, setShowOffer2] = useState<boolean>(false)
  const [showOffer3, setShowOffer3] = useState<boolean>(false)
  const [showOffer4, setShowOffer4] = useState<boolean>(false)
  return (
    <div className='lg:border border-1 mx-4 lg:mx-[10%] mt-8 mb-16 rounded-xl'>
      <h1 className='text-[35px] mt-8 text-center text-green-500'>
        {t('offerTitle')}
      </h1>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-col lg:grid lg:grid-cols-2 justify-center items-center lg:items-between my-16 text-[30px] lg:text-[30px] lg:gap-16'>
          <div className='flex flex-col items-center'>
            <p
              className='cursor-pointer hover:text-green-500'
              onClick={() => setShowOffer1((prev) => !prev)}
            >
              {t('offer1')} +
            </p>
            {showOffer1 && (
              <p className='text-[#93A7B7] text-[25px] text-justify lg:max-w-[250px] my-4'>
                {t('offer1desc')}
              </p>
            )}
            <p
              className='cursor-pointer hover:text-green-500'
              onClick={() => setShowOffer3((prev) => !prev)}
            >
              {t('offer3')} +
            </p>
            {showOffer3 && (
              <p className='text-[#93A7B7] text-[25px] text-justify lg:max-w-[250px] my-4'>
                {t('offer3desc')}
              </p>
            )}
          </div>

          <div className='ml-0 lg:ml-[25%] flex flex-col items-center'>
            <p
              className='cursor-pointer hover:text-green-500'
              onClick={() => setShowOffer2((prev) => !prev)}
            >
              {t('offer2')} +
            </p>
            {showOffer2 && (
              <p className='text-[#93A7B7] text-[25px] text-justify lg:max-w-[350px] my-4'>
                {t('offer2desc')}
              </p>
            )}
            <p
              className='cursor-pointer hover:text-green-500'
              onClick={() => setShowOffer4((prev) => !prev)}
            >
              {t('offer4')} +
            </p>
            {showOffer4 && (
              <p className='text-[#93A7B7] text-[25px] text-justify lg:max-w-[350px] my-4'>
                {t('offer4desc')}
              </p>
            )}
          </div>
        </div>
        <Link
          href={`${locale}/contact`}
          className='mb-12 bg-green-500 px-8 lg:px-16 py-2 lg:py-4 rounded-xl cursor-pointer hover:bg-[#0388f4]'
        >
          {t('offerButton')}
        </Link>
      </div>
    </div>
  )
}

export default Offer
