import React from 'react'
import { useTranslations } from 'next-intl'
import Header from '../components/Header'

const Home = () => {
  const t = useTranslations('Home')
  return (
    <div className='text-white text-[25px] hero-gradient h-screen'>
      <Header />
      <h1>{t('headerTitle')}</h1>
    </div>
  )
}

export default Home
