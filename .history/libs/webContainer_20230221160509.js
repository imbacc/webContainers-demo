import { WebContainer } from '@webcontainer/api'
import { getFiles } from './files'

async function runCommand(webcontainerInstance, spawn = { head: '', list: [] }) {
  // Install dependencies
  const process = await webcontainerInstance.spawn(spawn.head, spawn.list)
  const state = await process.exit

  const output = await () => {
    return () => {
      return new Promise((resolve) => {
        process.output.pipeTo(
          new WritableStream({
            write(data) {
              resolve(data)
            }
          })
        )
      })
    }
  }()

  if (state !== 0) throw new Error(`${head} ${list.join(' ')} run error !`)
  return [process, state, output]
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
    textareaEl.value = files['index.js'].file.contents

    // Call only once
    webcontainerInstance = await WebContainer.boot()
    console.log('%c [ files ]-18', 'font-size:14px; background:#41b883; color:#ffffff;', files)
    await webcontainerInstance.mount(files)
    const packageJSON = await webcontainerInstance.fs.readFile('package.json', 'utf-8')
    console.log(packageJSON)
    // webcontainerInstance.spawn('npm', ['install']);
    webcontainerInstance.spawn('ls', ['src', '-l'])
    const { process, state, output } = await installDependencies(webcontainerInstance)
    console.log('%c [ state ]-36', 'font-size:14px; background:#41b883; color:#ffffff;', state)

    webcontainerInstance.on('server-ready', (port, url) => {
      console.log('%c [ port ]-58', 'font-size:14px; background:#41b883; color:#ffffff;', port)
      console.log('%c [ url ]-58', 'font-size:14px; background:#41b883; color:#ffffff;', url)
      iframeEl.src = url
    })
  })
}
