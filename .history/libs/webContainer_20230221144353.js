import { WebContainer } from '@webcontainer/api'
import { getFiles, files } from './files'

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
    const file = await getFiles()
    console.log('%c [ file ]-18', 'font-size:14px; background:#41b883; color:#ffffff;', file)
    console.log('%c [ files ]-20', 'font-size:14px; background:#41b883; color:#ffffff;', files)
    await webcontainerInstance.mount(files)
    const packageJSON = await webcontainerInstance.fs.readFile('package.json', 'utf-8')
    console.log(packageJSON)
  })
}
