import { WebContainer } from '@webcontainer/api'
import { getFiles } from './files'

async function runCommand(webcontainerInstance, command, commandArgs = []) {
  // Install dependencies
  const process = await webcontainerInstance.spawn(command, commandArgs)
  const state = await process.exit
  console.log('%c [ state ]-8', 'font-size:14px; background:#41b883; color:#ffffff;', state)

  const outputFunction = (callback) => {
    // process.output.pipeTo(
    //   new WritableStream({
    //     write(data) {
    //       callback(data)
    //     }
    //   })
    // )
  }

  // if (state !== 0) throw new Error(`${command} ${commandArgs.join(' ')} run error !`)
  return [process, state, output: outputFunction]
}

export const initWebContainer = async () => {
  const files = await getFiles()
  console.log('%c [ files ]-18', 'font-size:14px; background:#41b883; color:#ffffff;', files)

  /** @type {HTMLIFrameElement | null} */
  const iframeEl = document.querySelector('iframe')

  /** @type {HTMLTextAreaElement | null} */
  const textareaEl = document.querySelector('textarea')

  window.addEventListener('load', async () => {
    textareaEl.value = files['index.js'].file.contents

    // Call only once
    const webcontainerInstance = await WebContainer.boot()

    await webcontainerInstance.mount(files)

    // const packageJSON = await webcontainerInstance.fs.readFile('package.json', 'utf-8')
    // console.log(packageJSON)
    // webcontainerInstance.spawn('npm', ['install']);

    // const [ls, lsState] = await runCommand(webcontainerInstance, 'ls', ['src', '-l'])

    const [installDep, installDepState, installDepOut] = await runCommand(webcontainerInstance, 'npm', ['install'])
    console.log('%c [ installDepState ]-51', 'font-size:14px; background:#41b883; color:#ffffff;', installDepState)

    installDepOut((res) => {
      console.log('%c [ res ]-52', 'font-size:14px; background:#41b883; color:#ffffff;', res)
    })

    webcontainerInstance.on('server-ready', (port, url) => {
      console.log('%c [ port ]-58', 'font-size:14px; background:#41b883; color:#ffffff;', port)
      console.log('%c [ url ]-58', 'font-size:14px; background:#41b883; color:#ffffff;', url)
      iframeEl.src = url
    })
  })
}
