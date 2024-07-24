import { motion } from 'framer-motion'
import { textContainer, textVariant2 } from '@/lib/motion'

interface TypingTextProps {
  title: string
  textStyles: string
}

interface TitleTextProps {
  title: string
  textStyles: string
}

export const TypingText: React.FC<TypingTextProps> = ({
  title,
  textStyles,
}) => (
  <motion.p
    variants={textContainer}
    className={`font-normal text-secondary-white ${textStyles}`}
  >
    {Array.from(title).map((letter, index) => (
      <motion.span variants={textVariant2} key={index}>
        {letter === ' ' ? '\u00A0' : letter}
      </motion.span>
    ))}
  </motion.p>
)

export const TitleText: React.FC<TitleTextProps> = ({ title, textStyles }) => (
  <motion.h2
    variants={textVariant2}
    initial='hidden'
    whileInView='show'
    className={textStyles}
  >
    {title}
  </motion.h2>
)
