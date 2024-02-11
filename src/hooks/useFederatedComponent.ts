import React, { useEffect, useState, ComponentType } from 'react'
import { getModuleFromScope } from '../utils/getModuleFromScope'
import { useDynamicScript } from './useDynamicScript'
import { UseFederatedComponentProps } from '../types'

export const useFederatedComponent = ({
  remoteUrl,
  scope,
  module,
  remoteEntryLoadedCallback = () => {},
  errorLogCallback = () => {},
}: UseFederatedComponentProps) => {
  const [Component, setComponent] = useState<ComponentType | null>(null)
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
