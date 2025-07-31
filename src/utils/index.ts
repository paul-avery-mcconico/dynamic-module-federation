import { InjectScriptProps } from "../types"

export const injectScript = ({
  remoteUrl,
  scriptId,
  scope,
  type = 'text/javascript',
  onSuccess = () => {},
  onError = () => {},
}: InjectScriptProps) => {
  const element = document.createElement('script')
  element.src = remoteUrl
  element.type = type
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
