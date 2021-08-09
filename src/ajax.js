/**
 * 解析 URL
 * @param {String} url
 */
export const parseUrl = (url = '') => {
  url = new URL(url)

  url.queryParams = key => {
    if (key) return res.searchParams.get(key)

    const params = {}
    const paramGroup = res.search.replace(/^\?/, '').split('&')

    paramGroup.forEach(param => {
      const [key, val] = param.split('=')
      params[key] = val
    })

    return params
  }

  return url
}
