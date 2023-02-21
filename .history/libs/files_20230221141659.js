/** @satisfies {import('@webcontainer/api').FileSystemTree} */

const globList = import.meta.glob('../containers/*.*', { as: 'raw' })

const modules = {}

Object.keys(globList).forEach((key) => {
  modules[key.replace('../containers/', '')] = modules[key]
})
console.log('%c [ modules ]-4', 'font-size:14px; background:#41b883; color:#ffffff;', modules)

export const files = {
  'index.js': {
    file: {
      contents: `
import express from 'express';
const app = express();
const port = 3111;

app.get('/', (req, res) => {
  res.send('Welcome to a WebContainers app! 🥳');
});

app.listen(port, () => {
  console.log(\`App is live at http://localhost:\${port}\`);
});`,
    },
  },
  'package.json': {
    file: {
      contents: `
{
  "name": "example-app",
  "type": "module",
  "dependencies": {
    "express": "latest",
    "nodemon": "latest"
  },
  "scripts": {
    "start": "nodemon --watch './' index.js"
  }
}`,
    },
  },
};
