import { Octokit } from '@octokit/rest'
import fsp from 'node:fs'

const octokit = new Octokit({ auth: process.env.TOKEN })

const main = async () => {

  const res = await octokit.rest.repos.getReadme({
    owner: 'type-challenges',
    repo: 'type-challenges',
  })

  fsp.writeFileSync('README.md', res.data.content, { encoding: 'base64' })
  process.exit(0)
}

void main()
