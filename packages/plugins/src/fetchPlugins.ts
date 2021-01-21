import { getFiles } from './getFiles'

export async function fetchPlugins(): Promise<string[]> {
  const packageName = '@spiderweb/plugins'
  const plugins: string[] = []

  for await (const f of getFiles(`${__dirname}/../scripts`)) {
    plugins.push(packageName + f.split('plugins')[1])
  }

  return plugins
}
