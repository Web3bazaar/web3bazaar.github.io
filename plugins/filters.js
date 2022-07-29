import Vue from 'vue'

Vue.filter('truncate', (text = '', length, clamp = '...') => {
  const content = text ? text.toString() : ''

  const lastChars = 7

  if (clamp === 'start') {
    return content.length > length
      ? content.slice(0, length - lastChars) + '...'
      : content
  } else {
    return content.length > length
      ? content.slice(0, length - lastChars) +
          clamp +
          content.slice(content.length - lastChars, content.length)
      : content
  }
})
