import { WebContainer } from '@webcontainer/api'
import { files } from './libs/files'


/** @type {HTMLIFrameElement | null} */
const iframeEl = document.querySelector('iframe')

/** @type {HTMLTextAreaElement | null} */
const textareaEl = document.querySelector('textarea')

/** @type {import('@webcontainer/api').WebContainer}  */
let webcontainerInstance

window.addEventListener('load', async () => {
  // Call only once
  webcontainerInstance = await WebContainer.boot()
  await webcontainerInstance.mount(files)
  const packageJSON = await webcontainerInstance.fs.readFile('package.json', 'utf-8');
  console.log(packageJSON);
})