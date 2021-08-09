/**
 * 同步阻塞法实现sleep函数
 * @param {Number} delay
 */
export const sleep = delay => {
  const start = new Date().getTime()

  while (new Date().getTime() < start + delay) {
    continue
  }
}

/**
 * 复制文本到剪切板
 * @param {*} content
 * @returns
 */
export const copyToClipboard = content => {
  const clipboardData = window.clipboardData

  if (clipboardData) {
    clipboardData.clearData()
    clipboardData.setData('Text', content)
    return true
  } else if (document.execCommand) {
    const el = document.createElement('textarea')
    el.value = content
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    return true
  }
  return false
}
