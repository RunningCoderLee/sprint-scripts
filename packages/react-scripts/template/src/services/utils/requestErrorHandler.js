// 错误处理函数

import { BusinessError, NetError, CancelError } from './errors'

export default function errorHandler(error, config) {
  const isCustomError =
    error instanceof BusinessError || error instanceof CancelError || error instanceof NetError

  if (!isCustomError) {
    throw error
  }

  if (!config) {
    error.defaultHandler()
  } else if (error instanceof BusinessError && typeof config.business === 'function') {
    config.business(error.code, error.message)
  } else if (error instanceof CancelError && typeof config.cancel === 'function') {
    config.cancel()
  } else if (error instanceof NetError && typeof config.net === 'function') {
    config.net(error.code)
  }
}
