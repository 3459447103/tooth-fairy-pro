import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LoginPage from './pages/LoginPage'
import PatientHome from './pages/PatientHome'
import AIAnalysisPage from './pages/AIAnalysisPage'
import TreatmentProgress from './pages/TreatmentProgress'
import HealthCenter from './pages/HealthCenter'
import DoctorDashboard from './pages/DoctorDashboard'
import PatientDetail from './pages/PatientDetail'
import AIDecisionCenter from './pages/AIDecisionCenter'
import ProjectValue from './pages/ProjectValue'
import EndingPage from './pages/EndingPage'
import NavIndicator from './components/NavIndicator'

const PATIENT_PAGES = [
  { component: PatientHome, label: '患者首页' },
  { component: AIAnalysisPage, label: 'AI分析' },
  { component: TreatmentProgress, label: '疗程进度' },
  { component: HealthCenter, label: '健康中心' },
]

const DOCTOR_PAGES = [
  { component: DoctorDashboard, label: '医生首页' },
  { component: PatientDetail, label: '患者详情' },
  { component: AIDecisionCenter, label: 'AI决策' },
]

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [role, setRole] = useState(null) // 'patient' | 'doctor'
  const [pageIndex, setPageIndex] = useState(0)

  const handleLogin = (selectedRole) => {
    setRole(selectedRole)
    setLoggedIn(true)
    setPageIndex(0)
  }

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      setPageIndex(prev => Math.min(prev + 1, getMaxPages() - 1))
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      setPageIndex(prev => Math.max(prev - 1, 0))
    }
  }, [role])

  const getMaxPages = () => {
    if (role === 'patient') return PATIENT_PAGES.length + 2 // + Login + ProjectValue + Ending
    return DOCTOR_PAGES.length + 2
  }

  // Total pages = role pages + ProjectValue + Ending
  const totalPages = role === 'patient'
    ? PATIENT_PAGES.length + DOCTOR_PAGES.length + 3
    : DOCTOR_PAGES.length + PATIENT_PAGES.length + 3

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const renderPage = () => {
    if (!loggedIn) {
      return <LoginPage onLogin={handleLogin} />
    }

    if (pageIndex === totalPages - 1) {
      return <EndingPage />
    }

    if (pageIndex === totalPages - 2) {
      return <ProjectValue />
    }

    if (role === 'patient') {
      if (pageIndex < PATIENT_PAGES.length) {
        const Page = PATIENT_PAGES[pageIndex].component
        return <Page />
      }
      // Then doctor pages
      const idx = pageIndex - PATIENT_PAGES.length
      if (idx < DOCTOR_PAGES.length) {
        const Page = DOCTOR_PAGES[idx].component
        return <Page />
      }
    } else {
      // Doctor first, then patient pages
      if (pageIndex < DOCTOR_PAGES.length) {
        const Page = DOCTOR_PAGES[pageIndex].component
        return <Page />
      }
      const idx = pageIndex - DOCTOR_PAGES.length
      if (idx < PATIENT_PAGES.length) {
        const Page = PATIENT_PAGES[idx].component
        return <Page />
      }
    }

    return <EndingPage />
  }

  const getLabel = () => {
    if (!loggedIn || pageIndex >= totalPages - 2) return ''
    const allPages = role === 'patient'
      ? [...PATIENT_PAGES, ...DOCTOR_PAGES]
      : [...DOCTOR_PAGES, ...PATIENT_PAGES]
    return allPages[pageIndex]?.label || ''
  }

  const labels = role === 'patient'
    ? [...PATIENT_PAGES.map(p => p.label), ...DOCTOR_PAGES.map(p => p.label)]
    : [...DOCTOR_PAGES.map(p => p.label), ...PATIENT_PAGES.map(p => p.label)]

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={loggedIn ? `page-${pageIndex}` : 'login'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      {loggedIn && (
        <NavIndicator
          current={pageIndex}
          total={totalPages}
          onPrev={() => setPageIndex(p => Math.max(0, p - 1))}
          onNext={() => setPageIndex(p => Math.min(totalPages - 1, p + 1))}
          labels={labels}
        />
      )}

      {/* Progress bar */}
      {loggedIn && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: '2px',
          zIndex: 200, background: 'rgba(0,0,0,0.04)'
        }}>
          <motion.div
            animate={{ width: `${((pageIndex + 1) / totalPages) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ height: '100%', background: '#0A84FF' }}
          />
        </div>
      )}
    </div>
  )
}
