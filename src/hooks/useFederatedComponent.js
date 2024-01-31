import getModuleFromScope from "../utils/getModuleFromScope";
import useDynamicScipt from "./useDynamicScipt";

export const useFederatedComponent = ({
  remoteUrl,
  scope,
  module,
  remoteEntryLoadedCallback = () => {},
  errorLogCallback = () => {},
}) => {
  const [Component, setComponent] = useState(null);
  const { ready, error } = useDynamicScipt({
    remoteUrl,
    onLoadCallback: remoteEntryLoadedCallback,
    errorLogCallback,
    scope,
  });

  useeffect(() => {
    if (ready && !Component) {
      const Comp = React.lazy(
        getModuleFromScope({
          scope,
          module,
          errorLogCallback,
        })
      );
      setComponent(Comp);
    }
  }, [Component, ready]);
  return { error, Component };
};

export default useFederatedComponent;
