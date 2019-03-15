import { BusinessError, CancelError, NetError } from './errors'

export class AxiosCancelablePromise extends Promise {
  constructor(executor, cancelTokenSource) {
    super(executor)

    this.cancelTokenSource = cancelTokenSource
  }

  cancel() {
    this.cancelTokenSource.cancel()
  }
}

class Wrapper {
  constructor(axiosInstance) {
    this.axiosInstance = axiosInstance
  }

  static wrapRequest(request, cancelTokenSource) {
    return new AxiosCancelablePromise((resolve, reject) => {
      request
        .then(res => {
          const { data } = res

          if (data.errcode > 0) {
            return reject(new BusinessError(data.errcode, data.errmsg))
          }

          return resolve(data, res)
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            return reject(new CancelError('Request canceled'))
          }

          if (error.response) {
            return reject(new NetError(error.response.status))
          }

          return reject(error)
        })
    }, cancelTokenSource)
  }

  head(url, config) {
    const cancelTokenSource = axios.CancelToken.source()

    return Wrapper.wrapRequest(
      this.axiosInstance.head(
        url,
        Object.assign({}, config, {
          withCredentials: true,
          cancelToken: cancelTokenSource.token,
        })
      ),
      cancelTokenSource
    )
  }

  get(url, config) {
    const cancelTokenSource = axios.CancelToken.source()

    return Wrapper.wrapRequest(
      this.axiosInstance.get(
        url,
        Object.assign({}, config, {
          withCredentials: true,
          cancelToken: cancelTokenSource.token,
        })
      ),
      cancelTokenSource
    )
  }

  delete(url, config) {
    const cancelTokenSource = axios.CancelToken.source()

    return Wrapper.wrapRequest(
      this.axiosInstance.delete(
        url,
        Object.assign({}, config, {
          withCredentials: true,
          cancelToken: cancelTokenSource.token,
        })
      ),
      cancelTokenSource
    )
  }

  post(url, data, config) {
    const cancelTokenSource = axios.CancelToken.source()

    return Wrapper.wrapRequest(
      this.axiosInstance.post(
        url,
        data,
        Object.assign({}, config, {
          withCredentials: true,
          cancelToken: cancelTokenSource.token,
        })
      ),
      cancelTokenSource
    )
  }

  put(url, data, config) {
    const cancelTokenSource = axios.CancelToken.source()

    return Wrapper.wrapRequest(
      this.axiosInstance.put(
        url,
        data,
        Object.assign({}, config, {
          withCredentials: true,
          cancelToken: cancelTokenSource.token,
        })
      ),
      cancelTokenSource
    )
  }

  patch(url, data, config) {
    const cancelTokenSource = axios.CancelToken.source()

    return Wrapper.wrapRequest(
      this.axiosInstance.patch(
        url,
        data,
        Object.assign({}, config, {
          withCredentials: true,
          cancelToken: cancelTokenSource.token,
        })
      ),
      cancelTokenSource
    )
  }
}

export default Wrapper
