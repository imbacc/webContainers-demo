/** @satisfies {import('@webcontainer/api').FileSystemTree} */

const globList = import.meta.glob('../containers/*.*', { as: 'raw' })

const getFiles = async () => {
  const keys = Object.keys(globList)
  const modules = {}

  for (const key in keys) {
    modules[key.replace('../containers/', '')] = {
      file: {
        content: await globList[key]()
      }
    }
  }

  return modules
}


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
