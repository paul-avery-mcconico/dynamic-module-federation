import { InjectScriptProps } from "../types"

export const injectScript = ({
  remoteUrl,
  scriptId,
  scope,
  onSuccess = () => {},
  onError = () => {},
}: InjectScriptProps) => {
  const element = document.createElement('script')
  element.src = remoteUrl
  element.type = 'text/javascript'
  element.async = true
  if (scriptId) {
    element.id = scriptId
  }
  element.onload = () => onSuccess()
  element.onerror = () => {
    onError()
    console.error(`caught error while loading remote entry for ${scope}`)
  }
  document.head.appendChild(element)
}
export default injectScript
