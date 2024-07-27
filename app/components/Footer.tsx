'use client'
import { motion } from 'framer-motion'

import { footerVariants } from '@/lib/motion'

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

const Footer = () => (
  <>
    <div className='mx-8 mt-16'>
      <motion.footer
        variants={footerVariants}
        initial='hidden'
        whileInView='show'
      >
        <div className={`flex flex-col gap-8`}>
          <div className='mb-[10px] h-[2px] bg-white opacity-10' />

          <div className='flex flex-col text-[20px]'>
            <div className='flex lg:flex-row flex-col items-center justify-between flex-wrap gap-4 mx-0  lg:mx-12'>
              <div className='flex lg:flex-row flex-col gap-2 justify-center items-center'>
                <h4 className='font-extrabold  flex-nowrap text-white'>
                  Copyright &copy; {Date().substring(11, 15)}
                </h4>
                <h4 className='font-extrabold text-white'>Pictusweb s.r.o.</h4>
              </div>
              <a className='font-extrabold text-white' href='/about'>
                O firme
              </a>

              <a className='font-extrabold text-white' href='/gdpr'>
                GDPR
              </a>
              <a className='font-extrabold text-white' href='/trade-rules'>
                Obchodné podmienky
              </a>
              <p className='font-normal text-white  text-[17.5px] opacity-50'>
                WhatsApp: +421 904 798 505
                <br />
                <a href='mailto:info@pictusweb.sk'>email: info@pictusweb.sk</a>
              </p>
            </div>
          </div>
        </div>
      </motion.footer>
      <div className='bg:hero-gradient h-10'></div>
    </div>
  </>
)

export default Footer
