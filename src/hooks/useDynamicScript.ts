import { useEffect, useState } from 'react'
import injectScript from '../utils'

export const useDynamicScript = ({
  remoteUrl,
  onLoadCallback = null,
  scope = null,
  errorLogCallback = () => {},
}) => {
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)
  const scriptId = scope ? `remote-entry-${scope}` : null

  const onSuccess = (isAlreadyLoaded = false) => {
    if (typeof onLoadCallback === 'function') {
      onLoadCallback()
    }
    if (!isAlreadyLoaded) {
      document.getElementById(scriptId).setAttribute('data-loaded', 'true')
    }
    setReady(true)
  }
  const onError = () => {
    setError(true)
    errorLogCallback({
      errorMessage: `error while loading remoteEntry.js for ${scope}`,
    })
  }

  useEffect(() => {
    if (!remoteUrl) return
    const existingScript = document.getElementById(scriptId)

    if (existingScript) {
      if (existingScript.hasAttribute('data-loaded')) {
        onSuccess(true)
      } else {
        existingScript.addEventListener('load', onSuccess)
      }
      return () => {
        existingScript.removeEventListener('load', onSuccess)
      }
    }
    injectScript({
      onSuccess,
      onError,
      scriptId,
      scope,
      remoteUrl,
    })
  }, [remoteUrl])
  return { ready, error }
}

export default useDynamicScript
