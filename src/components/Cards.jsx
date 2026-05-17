import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', hover = true, glow = false, ...props }) {
  return (
    <motion.div
      className={`glass ${glow ? 'pulse-glow' : ''} ${className}`}
      style={{ padding: '24px' }}
      whileHover={hover ? { y: -2, transition: { duration: 0.3 } } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function HUDCard({ children, className = '', ...props }) {
  return (
    <motion.div
      className={`hud-border bg-white/60 backdrop-blur-md ${className}`}
      style={{ padding: '20px', borderRadius: '16px' }}
      whileHover={{ y: -2, transition: { duration: 0.3 } }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedCounter({ value, suffix = '', duration = 1.5 }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span
        initial={{ counterValue: 0 }}
        animate={{ counterValue: value }}
        transition={{ duration, ease: "easeOut" }}
      >
        {({ counterValue }) => `${Math.round(counterValue)}${suffix}`}
      </motion.span>
    </motion.span>
  )
}
