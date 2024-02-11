import { GetModuleFromScopeProps, Factory, Container } from "../types"

export const getModuleFromScope = ({
  scope,
  module,
  errorLogCallback = () => {},
}: GetModuleFromScopeProps) => {
  return async () => {
    try {
      if (window[scope] && window[scope].initialized) {
        const factory: Factory = await window[scope].get(module)
        const Module = factory()
        return Module
      }
      await __webpack_init_sharing__('default')
      const container: Container = window[scope]
      if (!container) return null
      await container.init(__webpack_share_scope__.default)
      const factory = await window[scope].get(module)
      const Module = factory()
      window[scope].initialized = true
      return Module
    } catch (error) {
      errorLogCallback({
        error,
        errorMessage: `error while initializing remote scope for ${scope} and module ${module}`,
      })
    }
  }
}
