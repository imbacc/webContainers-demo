import { WebContainer } from '@webcontainer/api'
import { getFiles } from './files'

export const initWebContainer = () => {
  /** @type {HTMLIFrameElement | null} */
  const iframeEl = document.querySelector('iframe')

  /** @type {HTMLTextAreaElement | null} */
  const textareaEl = document.querySelector('textarea')

  /** @type {import('@webcontainer/api').WebContainer}  */
  let webcontainerInstance

  window.addEventListener('load', async () => {
    // Call only once
    webcontainerInstance = await WebContainer.boot()
    const files = await getFiles()
    await webcontainerInstance.mount(files)
    // const packageJSON = await webcontainerInstance.fs.readFile('package.json', 'utf-8')
    // console.log(packageJSON)
  })
}
