import * as core from '@actions/core'
import * as cache from '@actions/cache'
import * as utils from './utils'

async function run(): Promise<void> {
  try {
    try {
      await cache.saveCache([utils.pip_cache_directory()], utils.cache_key())
    } catch (error) {
      // see https://github.com/actions/cache/blob/0781355a23dac32fd3bac414512f4b903437991a/src/save.ts#L43-L54
      if (error.name === cache.ValidationError.name) {
        throw error
      } else if (error.name === cache.ReserveCacheError.name) {
        core.info(error.message)
      } else {
        utils.logWarning(error.message)
      }
    }
  } catch (error) {
    utils.logWarning(error.message)
  }
}

run()
