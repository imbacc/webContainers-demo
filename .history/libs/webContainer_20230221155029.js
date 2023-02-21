import { WebContainer } from '@webcontainer/api'
import { getFiles } from './files'

async function installDependencies(webcontainerInstance) {
  // Install dependencies
  const installProcess = await webcontainerInstance.spawn('npm', ['install']);
  const state = installProcess.exit

  if (state !== 0) {
    throw new Error('installDependencies failed');
  };
  // Wait for install command to exit
  return { installProcess, state  };
}


export const initWebContainer = async () => {
  const files = await getFiles()

  /** @type {HTMLIFrameElement | null} */
  const iframeEl = document.querySelector('iframe')

  /** @type {HTMLTextAreaElement | null} */
  const textareaEl = document.querySelector('textarea')

  /** @type {import('@webcontainer/api').WebContainer}  */
  let webcontainerInstance

  window.addEventListener('load', async () => {
    textareaEl.value = files['index.js'].file.contents;

    // Call only once
    webcontainerInstance = await WebContainer.boot()
    console.log('%c [ files ]-18', 'font-size:14px; background:#41b883; color:#ffffff;', files)
    await webcontainerInstance.mount(files)
    const packageJSON = await webcontainerInstance.fs.readFile('package.json', 'utf-8')
    console.log(packageJSON)
    // webcontainerInstance.spawn('npm', ['install']);
    webcontainerInstance.spawn('ls', ['src', '-l']);
    const { installProcess, state } = await installDependencies(webcontainerInstance)
    console.log('%c [ state ]-36', 'font-size:14px; background:#41b883; color:#ffffff;', state)
   
  })
}
