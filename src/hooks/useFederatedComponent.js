import React, { useEffect, useState } from 'react'
import getModuleFromScope from '../utils/getModuleFromScope'
import useDynamicScript from './useDynamicScript'

export const useFederatedComponent = ({
  remoteUrl,
  scope,
  module,
  remoteEntryLoadedCallback = () => {},
  errorLogCallback = () => {},
}) => {
  const [Component, setComponent] = useState(null)
  const { ready, error } = useDynamicScript({
    remoteUrl,
    onLoadCallback: remoteEntryLoadedCallback,
    errorLogCallback,
    scope,
  })

  useEffect(() => {
    if (ready && !Component) {
      const Comp = React.lazy(
        getModuleFromScope({
          scope,
          module,
          errorLogCallback,
        }),
      )
      setComponent(Comp)
    }
  }, [Component, ready])
  return { error, Component }
}

export default useFederatedComponent
