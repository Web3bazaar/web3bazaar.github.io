import Vue from 'vue'

Vue.filter('truncate', (text = '', length, clamp = '...', lastChars = 4) => {
  const content = text ? text.toString() : ''

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
