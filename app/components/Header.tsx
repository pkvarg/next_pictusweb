'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import LanguageBar from './LanguageBar'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

const Header = () => {
  const [navbar, setNavbar] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const t = useTranslations('Home')
  const { locale } = useParams()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      id='navbar'
      className={
        isSticky
          ? 'sticky top-0  w-full text-white nav-font bg-[#768c51] z-9999'
          : 'top-0  w-full text-white nav-font'
      }
    >
      <div className='justify-between px-4 mx-auto md:items-center md:flex md:px-8'>
        <div className='mb-0 lg:mb-2'>
          <div className='flex items-center justify-between py-3 md:py-5 md:block'>
            <Link className='text-[2.05rem] font-normal' href='/'>
              {t('headerTitle')}
            </Link>
            <div className='md:hidden'>
              <button
                className='p-2 text-white rounded-md outline-none focus:border-gray-400 focus:border'
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-10 h-10'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-10 h-10'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center h-[80vh] lg:h-auto pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? 'block' : 'hidden'
            }`}
          >
            <ul className='justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 text-[30px] lg:text-[25px] items-center'>
              <li>
                <Link
                  href='/#about'
                  className='hover:text-red-600 cursor-pointer'
                >
                  {t('headerAbout')}
                </Link>
              </li>
              <li>
                <Link
                  href={`${locale}/admin`}
                  className='hover:text-red-600 cursor-pointer'
                >
                  Admin
                  {/* {t('headerBlog')} */}
                </Link>
              </li>
              <li>
                <Link
                  href='/#events'
                  className='hover:text-red-600 cursor-pointer'
                >
                  {t('headerEvents')}
                </Link>
              </li>

              <div className='group relative  cursor-pointer'>
                <div className='flex items-center justify-between'>
                  <p className='hover:text-red-600'>{t('headerGallery')}</p>
                </div>
                <div className='invisible absolute z-50 flex w-max flex-col px-4 py-1 text-white shadow-xl group-hover:visible group-hover:bg-[#768c51]'>
                  <Link
                    href={`${locale}/gallery`}
                    className='cursor-pointer hover:text-red-600'
                  >
                    {t('headerPhotos')}
                  </Link>
                  <Link
                    href={`${locale}/podcasts`}
                    className='cursor-pointer hover:text-red-600'
                  >
                    Audio
                  </Link>
                  <Link
                    href={`${locale}/video`}
                    className='cursor-pointer hover:text-red-600'
                  >
                    Video
                  </Link>
                  <li>
                    <Link href={'/download'} className='hover:text-red-600'>
                      {t('headerDownload')}
                    </Link>
                  </li>
                </div>
              </div>

              <li>
                <Link
                  href='/#contact'
                  className='hover:text-red-600 cursor-pointer'
                >
                  {t('headerContact')}
                </Link>
              </li>

              <li>
                <LanguageBar />
              </li>
              {/* <li>
                <Link href='/login'>
                  <FiLogIn className='hover:text-red-600 font-extrabold' />
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
