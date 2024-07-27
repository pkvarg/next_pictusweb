'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/motion'
import { TitleText, TypingText } from '../CustomTexts'
import { useTranslations } from 'next-intl'

const Hero = () => {
  const t = useTranslations('Home')
  const title1 = t('heroTitle1')
  const title2 = t('heroTitle2')
  const title3 = t('heroTitle3')

  const styles = {
    innerWidth: '2xl:max-w-[1280px] w-full',
    interWidth: 'lg:w-[80%] w-[100%]',

    paddings: 'sm:p-16 xs:p-8 px-6 py-12',
    yPaddings: 'sm:py-16 xs:py-8 py-12',
    xPaddings: 'sm:px-16 px-6',
    topPaddings: 'sm:pt-16 xs:pt-8 pt-12',
    bottomPaddings: 'sm:pb-16 xs:pb-8 pb-12',

    flexCenter: 'flex justify-center items-center',
    flexStart: 'flex justify-start items-start',
    flexEnd: 'flex justify-end',
    navPadding: 'pt-[98px]',

    // hero section
    heroHeading:
      'font-bold lg:text-[144px] md:text-[100px] sm:text-[60px] text-[44px] lg:leading-[158.4px] md:leading-[114.4px] sm:leading-[74.4px] leading-[64.4px] uppercase text-white',
    heroDText:
      'md:w-[212px] sm:w-[80px] w-[60px] md:h-[108px] sm:h-[48px] h-[38px] md:border-[18px] border-[9px] rounded-r-[50px] border-white sm:mx-2 mx-[6px]',
  }
  return (
    <main className='flex lg:flex-row flex-col justify-center items-center mx-[10%] py-[100px]'>
      <motion.div
        variants={staggerContainer(0.1, 0.3)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8 lg:py-[100px] py-[50px]`}
      >
        <div className='flex flex-col justify-left'>
          <h1 className='text-white text-[5rem]'>
            <TypingText title={title1} />
          </h1>
          <h1 className='text-white text-[50px] mb-[2rem]'>
            <TypingText title={title2} />
          </h1>

          <div className='text-white text-[40px]'>
            <TitleText title={title3} />
          </div>
        </div>
      </motion.div>
      <div className='lg:w-[100%]'>
        <img
          className='w-[100%] ml-auto lg:mt-0 mt-[6rem]'
          src='/hero-builders.webp'
          alt='hero'
        />
      </div>
    </main>
  )
}

export default Hero
