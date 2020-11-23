import * as core from '@actions/core'

export function cache_key(): string {
  //TODO: use requirements-files hash. try to find
  //(pypoetry.lock, Pipfile.lock, requirements*.txt, requirements/*.txt),
  //merge hash
  return `${process.env['RUNNER_OS']}-pip-download-cache-v1`
}

export function pip_cache_directory(): string {
  switch (process.platform) {
    case 'linux':
      return '~/.cache/pip'
    case 'win32':
      return '~\\AppData\\Local\\pip\\Cache'
    case 'darwin':
      return '~/Library/Caches/pip'
    default:
      core.setFailed(
        `could not find pip cache directory for platform ${process.platform}`
      )
      return ''
  }
}

export function logWarning(message: string): void {
  const warningPrefix = '[warning]'
  core.info(`${warningPrefix}${message}`)
}
