import * as core from '@actions/core'
import * as cache from '@actions/cache'
import * as utils from './utils'

async function run(): Promise<void> {
  try {
    const cache_dir: string = utils.pip_cache_directory()
    const cache_key: string = utils.cache_key()

    core.info(`cache key: ${cache_key}`)
    core.info(`directory to cache: ${cache_dir}`)

    const matched_key = await cache.restoreCache([cache_dir], cache_key, [])
    if (!matched_key) {
      core.info('Cache not found')
      return
    }

    const isExactKeyMatch = matched_key === cache_key
    core.setOutput('cache-hit', isExactKeyMatch.toString())

    core.info(`Cache restored from key: ${cache_key}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
