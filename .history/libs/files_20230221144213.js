/** @satisfies {import('@webcontainer/api').FileSystemTree} */

const globList = import.meta.glob('../containers/*.*', { as: 'raw' })

const getFiles = async () => {
  const keys = Object.keys(globList)
  const modules = {}

  for (const key in keys) {
    console.log('%c [ key ]-10', 'font-size:14px; background:#41b883; color:#ffffff;', key)
    const k = key.replace('../containers/', '')
    modules[k] = {
      file: {
        content: await globList[key]()
      }
    }
  }

  console.log('%c [ modules ]-18', 'font-size:14px; background:#41b883; color:#ffffff;', modules)
  return modules
}

getFiles()


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
