import useFederatedComponent from "../hooks/useFederatedComponent";

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
  });
  const errorMessage = `could not load component ${mocdule} from ${scope}`;
  useEffect(() => {
    if (error) {
      errorLogCallback({ errorMessage });
    }
  }, [error]);
  if (!Component) return "";
  return (
    <Suspense fallback={loadingComponent}>
      {error ? <>{errorMessage}</> : Component && <Component {...props} />}
    </Suspense>
  );
};

MFLoader.defaultProps = {
  loadingComponent: () => {},
  remoteEntryLoadedCallback: () => {},
  errorLogCallback: () => {},
};

MFLoader.propTypes = {
  remoteUrl: PropTypes.string.isRequired,
  scope,
  module,
  props,
  loadingComponent,
  remoteEntryLoadedCallback,
  errorLogCallback,
};

export default MFLoader;
