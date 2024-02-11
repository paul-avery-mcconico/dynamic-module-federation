import { useEffect, useState } from 'react'
import { injectScript } from '../utils'
import { UseDynamicScriptProps } from '../types'

export const useDynamicScript = ({
  remoteUrl,
  onLoadCallback = () => {},
  scope,
  errorLogCallback = () => {},
}: UseDynamicScriptProps) => {
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)
  const scriptId = scope ? `remote-entry-${scope}` : null

  const onSuccess = (isAlreadyLoaded = false) => {
    if (typeof onLoadCallback === 'function') {
      onLoadCallback()
    }
    if (!isAlreadyLoaded && scriptId) {
      document.getElementById(scriptId)?.setAttribute('data-loaded', 'true')
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
    if (scriptId) {
      const existingScript = document.getElementById(
        scriptId,
      ) as HTMLScriptElement

      if (existingScript) {
        if (existingScript.hasAttribute('data-loaded')) {
          onSuccess(true)
        } else {
          existingScript.addEventListener('load', () => onSuccess())
        }
        return () => {
          existingScript.removeEventListener('load', () => onSuccess())
        }
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
