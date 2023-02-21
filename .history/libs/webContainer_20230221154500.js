import { WebContainer } from '@webcontainer/api'
import { getFiles } from './files'

async function installDependencies(webcontainerInstance) {
  // Install dependencies
  const installProcess = await webcontainerInstance.spawn('npm', ['install']);
  // Wait for install command to exit
  return installProcess.exit;
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
    const installDependenciesState = await installDependencies(webcontainerInstance)
    if (installDependenciesState !== 0) {
      throw new Error('installDependencies failed');
    };
    console.log('%c [ state ]-37', 'font-size:14px; background:#41b883; color:#ffffff;', state)
  })
}
