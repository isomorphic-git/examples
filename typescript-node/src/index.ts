import git from 'isomorphic-git'
import http from 'isomorphic-git/http/node'

console.log(`Using isomorphic-git version: ${git.version()}`)
git.getRemoteInfo({
  http,
  url: 'https://github.com/isomorphic-git/isomorphic-git.git'
}).then(data => {
  if (data && data.refs && data.refs.heads) {
    console.log('List of remote branches')
    console.log(Object.keys(data.refs.heads))
  }
})
