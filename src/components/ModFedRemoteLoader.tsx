import React, { Suspense, useEffect } from 'react'
import PropTypes from 'prop-types'
import useFederatedComponent from '../hooks/useFederatedComponent'

/**
 *
 * @param {string} remoteUrl //url of the remote entry script to be loaded
 * @param {string} scope // scope to initialize remote entry
 * @param {string} module // component name exposed from remote app
 * @param {Function} errorLogCallback // error callback to log error
 * @param {Function} loadingComponent // intermediate loader component
 * @param {Function} remoteEntryLoadedCallback // callback to invoke on successful loading of remote entry script
 * @param {Object} props // props required to render a remote component
 * @returns
 */
export const MFLoader = ({
  remoteUrl,
  scope,
  module,
  props,
  loadingComponent,
  remoteEntryLoadedCallback,
  errorLogCallback,
}) => {
  const { error, Component } = useFederatedComponent({
    remoteUrl,
    scope,
    module,
    remoteEntryLoadedCallback,
    errorLogCallback,
  })
  const errorMessage = `could not load component ${module} from ${scope}`
  useEffect(() => {
    if (error) {
      errorLogCallback({ errorMessage })
    }
  }, [error])
  if (!Component) return ''
  return (
    <Suspense fallback={loadingComponent}>
      {error ? <>{errorMessage}</> : Component && <Component {...props} />}
    </Suspense>
  )
}

MFLoader.defaultProps = {
  loadingComponent: () => {},
  remoteEntryLoadedCallback: () => {},
  errorLogCallback: () => {},
}

MFLoader.propTypes = {
  remoteUrl: PropTypes.string.isRequired,
  scope: PropTypes.string.isRequired,
  module: PropTypes.string.isRequired,
  props: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  loadingComponent: PropTypes.func,
  remoteEntryLoadedCallback: PropTypes.func,
  errorLogCallback: PropTypes.func,
}

export default MFLoader
