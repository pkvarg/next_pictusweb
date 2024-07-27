'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/motion'
import { styles } from '@/lib/styles'
import { fadeIn, textVariant } from '@/lib/motion'

interface Testimonial {
  testimonial: string
  name: string
  designation: string
  company: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    testimonial:
      'Peter succeeded to make me a website with professionalism promptitude, good quality and reasonable price. I am very happy with the result. Thank you Peter ❤️.',
    name: 'Ioana Mindrila',
    designation: 'Designer',
    company: 'IoanaM',
    image: 'ionuca.webp',
  },
  {
    testimonial:
      'Cooperation with Peter is excellent, great communication and result. He enjoys his job, does it honestly and thoroughly. I definitely count on him in my next projects.',
    name: 'Tomas Dovala',
    designation: 'CEO',
    company: 'DVL Construct',
    image: 'tomas.webp',
  },
  {
    testimonial:
      'I have been working with Peter for many years in different areas and I am always pleased by his friendly approach and willingness to help. Thank you.',
    name: 'Leo Grman',
    designation: 'Manager',
    company: 'prud.sk',
    image: 'leo.webp',
  },
  {
    testimonial:
      'I have been working with Peter for many years in different areas and I am always pleased by his friendly approach and willingness to help. Thank you.',
    name: 'Michal Dovala',
    designation: 'Manager',
    company: 'prud.sk',
    image: 'leo.webp',
  },
  {
    testimonial:
      'I have been working with Peter for many years in different areas and I am always pleased by his friendly approach and willingness to help. Thank you.',
    name: 'Samuel Koriťák',
    designation: 'Manager',
    company: 'prud.sk',
    image: 'leo.webp',
  },
]

interface FeedbackCardProps extends Testimonial {
  index: number
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
    className='p-6 rounded-3xl xs:w-[320px] w-full bg-gray-800'
  >
    {/* <p className='text-white font-black text-[38px]'>"</p> */}

    <div className='mt-1'>
      <p className='text-white tracking-wider text-[22.5px]'>"{testimonial}"</p>

      <div className='mt-7 flex flex-row justify-end mr-[5%] items-center gap-8'>
        <p className='text-white font-medium text-[18px]'>
          <span className='blue-text-gradient'>@</span> {name}
        </p>
        <p className='text-secondary text-[16px]'>
          {designation} at {company}
        </p>

        <img
          src={image}
          alt={`feedback_by-${name}`}
          className='w-10 h-10 rounded-full object-cover'
        />
      </div>
    </div>
  </motion.div>
)

const Feedbacks: React.FC = () => {
  return (
    <div className={`lg:mx-[2.5%] mt-[125px] lg:mt-12 rounded-[20px] `}>
      <div className={`rounded-2xl ${styles.padding} min-h-[300px]`}>
        <motion.div variants={textVariant(0)}>
          <h2 className='text-center text-[30px]'>Testimonials</h2>
        </motion.div>
      </div>
      <div className={`-mt-40 lg:-mt-20 pb-14 mx-4  flex flex-col  gap-4`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  )
}

export default Feedbacks

//export default SectionWrapper(Feedbacks, '')
