/** @satisfies {import('@webcontainer/api').FileSystemTree} */

const globList = import.meta.glob('../containers/*.*', { as: 'raw', eager: true })

export const getFiles = () => {
  const keys = Object.keys(globList)
  const modules = {}

  for (const key of keys) {
    modules[key.replace('../containers/', '')] = {
      file: {
        contents: globList[key]
      }
    }
  }

  return modules
}