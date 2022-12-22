import { Octokit } from '@octokit/rest'
import fsp from 'node:fs'
import { text } from 'stream/consumers'

const octokit = new Octokit({ auth: process.env.TOKEN })

const main = async () => {

  const res = await octokit.rest.repos.getReadme({
    owner: 'type-challenges',
    repo: 'type-challenges',
    ref: 'main',
  })


  fsp.writeFileSync(
    'README.md',
    Buffer
      .from(res.data.content, 'base64')
      .toString()
      .replaceAll('./questions', 'https://github.com/type-challenges/type-challenges/blob/main/questions'),
    { encoding: 'utf-8' },
  )

  process.exit(0)
}

void main()
