import React from 'react'
import { useTranslations } from 'next-intl'

const About = () => {
  const t = useTranslations('Home')
  return (
    <div className='flex flex-col  justify-center items-center gap-4 text-[25px] mx-4 my-16'>
      <h1 className='lg:text-[25x] text-[35px] py-8'>
        {' '}
        {t('contactAboutTitle')}
      </h1>
      <div className='flex flex-col lg:flex-row justify-center items-center lg:items-start gap-4 lg:gap-[15%] w-full'>
        <div>
          <p>Pictusweb.s.r.o.</p>
          <p>Nábrežná 42</p>
          <p>Nové Zámky</p>
          <p>940 02</p>
          <p>{t('contactAboutSR')}</p>
          <p>+421 904 798 505</p>
          <p>IČO: 54631068</p>
          <p>DIČ: 2121741424</p>
        </div>

        <div className='flex flex-col items-start'>
          <p>{t('contactAboutAccount')}</p>
          <p>SK68 8330 0000 0022 0221 4313</p>
          <p>{t('contactAboutReg1')}</p>
          <p>{t('contactAboutReg2')}</p>
          <p>{t('contactAboutReg3')}</p>
          <p>{t('contactAboutReg4')}</p>
        </div>
      </div>
    </div>
  )
}

export default About
