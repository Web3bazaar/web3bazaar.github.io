import Vue from 'vue'

Vue.filter('truncate', (text = '', length, clamp) => {
  clamp = clamp || '...'

  const content = text ? text.toString() : ''

  return content.length > length
    ? content.slice(0, length - 4) +
        clamp +
        content.slice(content.length - 4, content.length)
    : content
})
