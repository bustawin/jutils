import { useNavigation } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar'

export default function GlobalLoading() {
  const navigation = useNavigation()

  const ref = useRef<LoadingBarRef>(null)

  useEffect(() => {
    if (navigation.state === 'loading') ref.current?.continuousStart()
    if (navigation.state === 'idle') ref.current?.complete()
  }, [navigation.state])

  return <LoadingBar color="var(--bs-gray-100)" waitingTime={500} ref={ref} />
}
