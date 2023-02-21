import './style.css'
import { initWebContainer } from './libs/webContainer'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <div class="editor">
      <textarea>I am a textarea</textarea>
    </div>
    <div class="preview">
      <iframe src=""></iframe>
    </div>
  </div>
`
initWebContainer()