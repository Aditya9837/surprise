import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { getLatestWeekId, getWeekMeta } from './weeks/registry'
import { WeekExperience } from './weeks/WeekExperience'
import { ScrollToTop } from './components/layout/ScrollToTop'

const MemoriesArchive = lazy(() => import('./pages/MemoriesArchive'))

function Loader() {
  return (
    <div className="section-full flex items-center justify-center romantic-veil">
      <div className="w-10 h-10 border-2 border-blush/20 border-t-blush rounded-full animate-spin" />
    </div>
  )
}

function WeekRoute({ weekId }: { weekId: number }) {
  if (!getWeekMeta(weekId)) {
    return <Navigate to="/memories" replace />
  }
  // key forces a full remount so each week starts fresh (gate + music + scroll)
  return <WeekExperience key={weekId} weekId={weekId} />
}

function WeekByParam() {
  const { weekId } = useParams()
  const id = Number(weekId)
  if (!Number.isFinite(id) || id < 1) {
    return <Navigate to="/memories" replace />
  }
  return <WeekRoute weekId={id} />
}

export default function App() {
  const latest = getLatestWeekId()

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<WeekRoute weekId={latest} />} />
          <Route path="/memories" element={<MemoriesArchive />} />
          <Route path="/week/:weekId" element={<WeekByParam />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}
