import { motion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'

interface SectionWrapperProps {
  id: string
  children: ReactNode
  className?: string
  dark?: boolean
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.15 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
}

export function SectionWrapper({ id, children, className = '', dark = true }: SectionWrapperProps) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15 })

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`section-full ${dark ? 'bg-[#050510]' : ''} ${className}`}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {children}
    </motion.section>
  )
}

export function SectionItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}
