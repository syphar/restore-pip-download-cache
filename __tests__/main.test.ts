import * as utils from '../src/utils'

test('get cache key', () => {
  expect(utils.cache_key()).toBe(`${process.env.RUNNER_OS}-pip-download-cache-v1`)
})

test('get cache directory', () => {
  expect(utils.pip_cache_directory()).toContain('pip')
})
