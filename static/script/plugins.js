// Avoid `console` errors in browsers that lack a console.
;(function () {
  let method
  const noop = function noop() {}
  const methods = [
    'assert',
    'clear',
    'count',
    'debug',
    'dir',
    'dirxml',
    'error',
    'exception',
    'group',
    'groupCollapsed',
    'groupEnd',
    'info',
    'log',
    'markTimeline',
    'profile',
    'profileEnd',
    'table',
    'time',
    'timeEnd',
    'timeStamp',
    'trace',
    'warn',
  ]
  let length = methods.length
  const console = (window.console = window.console || {})
  while (length--) {
    method = methods[length]
    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop
    }
  }
})()

/*! Magnific Popup - v1.0.0 - 2014-12-12
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2014 Dmitry Semenov; */
;(function (e) {
  typeof define === 'function' && define.amd
    ? define(['jquery'], e)
    : typeof exports === 'object'
    ? e(require('jquery'))
    : e(window.jQuery || window.Zepto)
})(function (e) {
  let t
  let n
  let i
  let o
  let r
  let a
  let s
  const l = 'Close'
  const c = 'BeforeClose'
  const d = 'AfterClose'
  const u = 'BeforeAppend'
  const p = 'MarkupParse'
  const f = 'Open'
  const m = 'Change'
  const g = 'mfp'
  const h = '.' + g
  const v = 'mfp-ready'
  const C = 'mfp-removing'
  const y = 'mfp-prevent-close'
  const w = function () {}
  const b = !!window.jQuery
  const I = e(window)
  const x = function (e, n) {
    t.ev.on(g + e + h, n)
  }
  const k = function (t, n, i, o) {
    let r = document.createElement('div')
    return (
      (r.className = 'mfp-' + t),
      i && (r.innerHTML = i),
      o ? n && n.appendChild(r) : ((r = e(r)), n && r.appendTo(n)),
      r
    )
  }
  const T = function (n, i) {
    t.ev.triggerHandler(g + n, i),
      t.st.callbacks &&
        ((n = n.charAt(0).toLowerCase() + n.slice(1)),
        t.st.callbacks[n] && t.st.callbacks[n].apply(t, e.isArray(i) ? i : [i]))
  }
  const E = function (n) {
    return (
      (n === s && t.currTemplate.closeBtn) ||
        ((t.currTemplate.closeBtn = e(
          t.st.closeMarkup.replace('%title%', t.st.tClose)
        )),
        (s = n)),
      t.currTemplate.closeBtn
    )
  }
  const _ = function () {
    e.magnificPopup.instance ||
      ((t = new w()), t.init(), (e.magnificPopup.instance = t))
  }
  const S = function () {
    const e = document.createElement('p').style
    const t = ['ms', 'O', 'Moz', 'Webkit']
    if (void 0 !== e.transition) return !0
    for (; t.length; ) if (t.pop() + 'Transition' in e) return !0
    return !1
  }
  ;(w.prototype = {
    constructor: w,
    init() {
      const n = navigator.appVersion
      ;(t.isIE7 = n.includes('MSIE 7.')),
        (t.isIE8 = n.includes('MSIE 8.')),
        (t.isLowIE = t.isIE7 || t.isIE8),
        (t.isAndroid = /android/gi.test(n)),
        (t.isIOS = /iphone|ipad|ipod/gi.test(n)),
        (t.supportsTransition = S()),
        (t.probablyMobile =
          t.isAndroid ||
          t.isIOS ||
          /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
            navigator.userAgent
          )),
        (o = e(document)),
        (t.popupsCache = {})
    },
    open(n) {
      i || (i = e(document.body))
      let r
      if (n.isObj === !1) {
        ;(t.items = n.items.toArray()), (t.index = 0)
        let s
        const l = n.items
        for (r = 0; l.length > r; r++)
          if (((s = l[r]), s.parsed && (s = s.el[0]), s === n.el[0])) {
            t.index = r
            break
          }
      } else
        (t.items = e.isArray(n.items) ? n.items : [n.items]),
          (t.index = n.index || 0)
      if (t.isOpen) return t.updateItemHTML(), void 0
      ;(t.types = []),
        (a = ''),
        (t.ev = n.mainEl && n.mainEl.length ? n.mainEl.eq(0) : o),
        n.key
          ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}),
            (t.currTemplate = t.popupsCache[n.key]))
          : (t.currTemplate = {}),
        (t.st = e.extend(!0, {}, e.magnificPopup.defaults, n)),
        (t.fixedContentPos =
          t.st.fixedContentPos === 'auto'
            ? !t.probablyMobile
            : t.st.fixedContentPos),
        t.st.modal &&
          ((t.st.closeOnContentClick = !1),
          (t.st.closeOnBgClick = !1),
          (t.st.showCloseBtn = !1),
          (t.st.enableEscapeKey = !1)),
        t.bgOverlay ||
          ((t.bgOverlay = k('bg').on('click' + h, function () {
            t.close()
          })),
          (t.wrap = k('wrap')
            .attr('tabindex', -1)
            .on('click' + h, function (e) {
              t._checkIfClose(e.target) && t.close()
            })),
          (t.container = k('container', t.wrap))),
        (t.contentContainer = k('content')),
        t.st.preloader &&
          (t.preloader = k('preloader', t.container, t.st.tLoading))
      const c = e.magnificPopup.modules
      for (r = 0; c.length > r; r++) {
        let d = c[r]
        ;(d = d.charAt(0).toUpperCase() + d.slice(1)), t['init' + d].call(t)
      }
      T('BeforeOpen'),
        t.st.showCloseBtn &&
          (t.st.closeBtnInside
            ? (x(p, function (e, t, n, i) {
                n.close_replaceWith = E(i.type)
              }),
              (a += ' mfp-close-btn-in'))
            : t.wrap.append(E())),
        t.st.alignTop && (a += ' mfp-align-top'),
        t.fixedContentPos
          ? t.wrap.css({
              overflow: t.st.overflowY,
              overflowX: 'hidden',
              overflowY: t.st.overflowY,
            })
          : t.wrap.css({
              top: I.scrollTop(),
              position: 'absolute',
            }),
        (t.st.fixedBgPos === !1 ||
          (t.st.fixedBgPos === 'auto' && !t.fixedContentPos)) &&
          t.bgOverlay.css({
            height: o.height(),
            position: 'absolute',
          }),
        t.st.enableEscapeKey &&
          o.on('keyup' + h, function (e) {
            e.keyCode === 27 && t.close()
          }),
        I.on('resize' + h, function () {
          t.updateSize()
        }),
        t.st.closeOnContentClick || (a += ' mfp-auto-cursor'),
        a && t.wrap.addClass(a)
      const u = (t.wH = I.height())
      const m = {}
      if (t.fixedContentPos && t._hasScrollBar(u)) {
        const g = t._getScrollbarSize()
        g && (m.marginRight = g)
      }
      t.fixedContentPos &&
        (t.isIE7
          ? e('body, html').css('overflow', 'hidden')
          : (m.overflow = 'hidden'))
      let C = t.st.mainClass
      return (
        t.isIE7 && (C += ' mfp-ie7'),
        C && t._addClassToMFP(C),
        t.updateItemHTML(),
        T('BuildControls'),
        e('html').css(m),
        t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || i),
        (t._lastFocusedEl = document.activeElement),
        setTimeout(function () {
          t.content
            ? (t._addClassToMFP(v), t._setFocus())
            : t.bgOverlay.addClass(v),
            o.on('focusin' + h, t._onFocusIn)
        }, 16),
        (t.isOpen = !0),
        t.updateSize(u),
        T(f),
        n
      )
    },
    close() {
      t.isOpen &&
        (T(c),
        (t.isOpen = !1),
        t.st.removalDelay && !t.isLowIE && t.supportsTransition
          ? (t._addClassToMFP(C),
            setTimeout(function () {
              t._close()
            }, t.st.removalDelay))
          : t._close())
    },
    _close() {
      T(l)
      let n = C + ' ' + v + ' '
      if (
        (t.bgOverlay.detach(),
        t.wrap.detach(),
        t.container.empty(),
        t.st.mainClass && (n += t.st.mainClass + ' '),
        t._removeClassFromMFP(n),
        t.fixedContentPos)
      ) {
        const i = {
          marginRight: '',
        }
        t.isIE7 ? e('body, html').css('overflow', '') : (i.overflow = ''),
          e('html').css(i)
      }
      o.off('keyup' + h + ' focusin' + h),
        t.ev.off(h),
        t.wrap.attr('class', 'mfp-wrap').removeAttr('style'),
        t.bgOverlay.attr('class', 'mfp-bg'),
        t.container.attr('class', 'mfp-container'),
        !t.st.showCloseBtn ||
          (t.st.closeBtnInside && t.currTemplate[t.currItem.type] !== !0) ||
          (t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach()),
        t._lastFocusedEl && e(t._lastFocusedEl).focus(),
        (t.currItem = null),
        (t.content = null),
        (t.currTemplate = null),
        (t.prevHeight = 0),
        T(d)
    },
    updateSize(e) {
      if (t.isIOS) {
        const n = document.documentElement.clientWidth / window.innerWidth
        const i = window.innerHeight * n
        t.wrap.css('height', i), (t.wH = i)
      } else t.wH = e || I.height()
      t.fixedContentPos || t.wrap.css('height', t.wH), T('Resize')
    },
    updateItemHTML() {
      let n = t.items[t.index]
      t.contentContainer.detach(),
        t.content && t.content.detach(),
        n.parsed || (n = t.parseEl(t.index))
      const i = n.type
      if (
        (T('BeforeChange', [t.currItem ? t.currItem.type : '', i]),
        (t.currItem = n),
        !t.currTemplate[i])
      ) {
        const o = t.st[i] ? t.st[i].markup : !1
        T('FirstMarkupParse', o), (t.currTemplate[i] = o ? e(o) : !0)
      }
      r && r !== n.type && t.container.removeClass('mfp-' + r + '-holder')
      const a = t['get' + i.charAt(0).toUpperCase() + i.slice(1)](
        n,
        t.currTemplate[i]
      )
      t.appendContent(a, i),
        (n.preloaded = !0),
        T(m, n),
        (r = n.type),
        t.container.prepend(t.contentContainer),
        T('AfterChange')
    },
    appendContent(e, n) {
      ;(t.content = e),
        e
          ? t.st.showCloseBtn && t.st.closeBtnInside && t.currTemplate[n] === !0
            ? t.content.find('.mfp-close').length || t.content.append(E())
            : (t.content = e)
          : (t.content = ''),
        T(u),
        t.container.addClass('mfp-' + n + '-holder'),
        t.contentContainer.append(t.content)
    },
    parseEl(n) {
      let i
      let o = t.items[n]
      if (
        (o.tagName
          ? (o = {
              el: e(o),
            })
          : ((i = o.type),
            (o = {
              data: o,
              src: o.src,
            })),
        o.el)
      ) {
        for (let r = t.types, a = 0; r.length > a; a++)
          if (o.el.hasClass('mfp-' + r[a])) {
            i = r[a]
            break
          }
        ;(o.src = o.el.attr('data-mfp-src')),
          o.src || (o.src = o.el.attr('href'))
      }
      return (
        (o.type = i || t.st.type || 'inline'),
        (o.index = n),
        (o.parsed = !0),
        (t.items[n] = o),
        T('ElementParse', o),
        t.items[n]
      )
    },
    addGroup(e, n) {
      const i = function (i) {
        ;(i.mfpEl = this), t._openClick(i, e, n)
      }
      n || (n = {})
      const o = 'click.magnificPopup'
      ;(n.mainEl = e),
        n.items
          ? ((n.isObj = !0), e.off(o).on(o, i))
          : ((n.isObj = !1),
            n.delegate
              ? e.off(o).on(o, n.delegate, i)
              : ((n.items = e), e.off(o).on(o, i)))
    },
    _openClick(n, i, o) {
      const r =
        void 0 !== o.midClick ? o.midClick : e.magnificPopup.defaults.midClick
      if (r || (n.which !== 2 && !n.ctrlKey && !n.metaKey)) {
        const a =
          void 0 !== o.disableOn
            ? o.disableOn
            : e.magnificPopup.defaults.disableOn
        if (a)
          if (e.isFunction(a)) {
            if (!a.call(t)) return !0
          } else if (a > I.width()) return !0
        n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()),
          (o.el = e(n.mfpEl)),
          o.delegate && (o.items = i.find(o.delegate)),
          t.open(o)
      }
    },
    updateStatus(e, i) {
      if (t.preloader) {
        n !== e && t.container.removeClass('mfp-s-' + n),
          i || e !== 'loading' || (i = t.st.tLoading)
        const o = {
          status: e,
          text: i,
        }
        T('UpdateStatus', o),
          (e = o.status),
          (i = o.text),
          t.preloader.html(i),
          t.preloader.find('a').on('click', function (e) {
            e.stopImmediatePropagation()
          }),
          t.container.addClass('mfp-s-' + e),
          (n = e)
      }
    },
    _checkIfClose(n) {
      if (!e(n).hasClass(y)) {
        const i = t.st.closeOnContentClick
        const o = t.st.closeOnBgClick
        if (i && o) return !0
        if (
          !t.content ||
          e(n).hasClass('mfp-close') ||
          (t.preloader && n === t.preloader[0])
        )
          return !0
        if (n === t.content[0] || e.contains(t.content[0], n)) {
          if (i) return !0
        } else if (o && e.contains(document, n)) return !0
        return !1
      }
    },
    _addClassToMFP(e) {
      t.bgOverlay.addClass(e), t.wrap.addClass(e)
    },
    _removeClassFromMFP(e) {
      this.bgOverlay.removeClass(e), t.wrap.removeClass(e)
    },
    _hasScrollBar(e) {
      return (
        (t.isIE7 ? o.height() : document.body.scrollHeight) > (e || I.height())
      )
    },
    _setFocus() {
      ;(t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
    },
    _onFocusIn(n) {
      return n.target === t.wrap[0] || e.contains(t.wrap[0], n.target)
        ? void 0
        : (t._setFocus(), !1)
    },
    _parseMarkup(t, n, i) {
      let o
      i.data && (n = e.extend(i.data, n)),
        T(p, [t, n, i]),
        e.each(n, function (e, n) {
          if (void 0 === n || n === !1) return !0
          if (((o = e.split('_')), o.length > 1)) {
            const i = t.find(h + '-' + o[0])
            if (i.length > 0) {
              const r = o[1]
              r === 'replaceWith'
                ? i[0] !== n[0] && i.replaceWith(n)
                : r === 'img'
                ? i.is('img')
                  ? i.attr('src', n)
                  : i.replaceWith(
                      '<img src="' + n + '" class="' + i.attr('class') + '" />'
                    )
                : i.attr(o[1], n)
            }
          } else t.find(h + '-' + e).html(n)
        })
    },
    _getScrollbarSize() {
      if (void 0 === t.scrollbarSize) {
        const e = document.createElement('div')
        ;(e.style.cssText =
          'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;'),
          document.body.appendChild(e),
          (t.scrollbarSize = e.offsetWidth - e.clientWidth),
          document.body.removeChild(e)
      }
      return t.scrollbarSize
    },
  }),
    (e.magnificPopup = {
      instance: null,
      proto: w.prototype,
      modules: [],
      open(t, n) {
        return (
          _(),
          (t = t ? e.extend(!0, {}, t) : {}),
          (t.isObj = !0),
          (t.index = n || 0),
          this.instance.open(t)
        )
      },
      close() {
        return e.magnificPopup.instance && e.magnificPopup.instance.close()
      },
      registerModule(t, n) {
        n.options && (e.magnificPopup.defaults[t] = n.options),
          e.extend(this.proto, n.proto),
          this.modules.push(t)
      },
      defaults: {
        disableOn: 0,
        key: null,
        midClick: !1,
        mainClass: '',
        preloader: !0,
        focus: '',
        closeOnContentClick: !1,
        closeOnBgClick: !0,
        closeBtnInside: !0,
        showCloseBtn: !0,
        enableEscapeKey: !0,
        modal: !1,
        alignTop: !1,
        removalDelay: 0,
        prependTo: null,
        fixedContentPos: 'auto',
        fixedBgPos: 'auto',
        overflowY: 'auto',
        closeMarkup:
          '<button title="%title%" type="button" class="mfp-close">&times;</button>',
        tClose: 'Close (Esc)',
        tLoading: 'Loading...',
      },
    }),
    (e.fn.magnificPopup = function (n) {
      _()
      const i = e(this)
      if (typeof n === 'string')
        if (n === 'open') {
          let o
          const r = b ? i.data('magnificPopup') : i[0].magnificPopup
          const a = parseInt(arguments[1], 10) || 0
          r.items
            ? (o = r.items[a])
            : ((o = i), r.delegate && (o = o.find(r.delegate)), (o = o.eq(a))),
            t._openClick(
              {
                mfpEl: o,
              },
              i,
              r
            )
        } else
          t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1))
      else
        (n = e.extend(!0, {}, n)),
          b ? i.data('magnificPopup', n) : (i[0].magnificPopup = n),
          t.addGroup(i, n)
      return i
    })
  let P
  let O
  let z
  const M = 'inline'
  const B = function () {
    z && (O.after(z.addClass(P)).detach(), (z = null))
  }
  e.magnificPopup.registerModule(M, {
    options: {
      hiddenClass: 'hide',
      markup: '',
      tNotFound: 'Content not found',
    },
    proto: {
      initInline() {
        t.types.push(M),
          x(l + '.' + M, function () {
            B()
          })
      },
      getInline(n, i) {
        if ((B(), n.src)) {
          const o = t.st.inline
          let r = e(n.src)
          if (r.length) {
            const a = r[0].parentNode
            a &&
              a.tagName &&
              (O || ((P = o.hiddenClass), (O = k(P)), (P = 'mfp-' + P)),
              (z = r.after(O).detach().removeClass(P))),
              t.updateStatus('ready')
          } else t.updateStatus('error', o.tNotFound), (r = e('<div>'))
          return (n.inlineElement = r), r
        }
        return t.updateStatus('ready'), t._parseMarkup(i, {}, n), i
      },
    },
  })
  let F
  const H = 'ajax'
  const L = function () {
    F && i.removeClass(F)
  }
  const A = function () {
    L(), t.req && t.req.abort()
  }
  e.magnificPopup.registerModule(H, {
    options: {
      settings: null,
      cursor: 'mfp-ajax-cur',
      tError: '<a href="%url%">The content</a> could not be loaded.',
    },
    proto: {
      initAjax() {
        t.types.push(H),
          (F = t.st.ajax.cursor),
          x(l + '.' + H, A),
          x('BeforeChange.' + H, A)
      },
      getAjax(n) {
        F && i.addClass(F), t.updateStatus('loading')
        const o = e.extend(
          {
            url: n.src,
            success(i, o, r) {
              const a = {
                data: i,
                xhr: r,
              }
              T('ParseAjax', a),
                t.appendContent(e(a.data), H),
                (n.finished = !0),
                L(),
                t._setFocus(),
                setTimeout(function () {
                  t.wrap.addClass(v)
                }, 16),
                t.updateStatus('ready'),
                T('AjaxContentAdded')
            },
            error() {
              L(),
                (n.finished = n.loadError = !0),
                t.updateStatus(
                  'error',
                  t.st.ajax.tError.replace('%url%', n.src)
                )
            },
          },
          t.st.ajax.settings
        )
        return (t.req = e.ajax(o)), ''
      },
    },
  })
  let j
  const N = function (n) {
    if (n.data && void 0 !== n.data.title) return n.data.title
    const i = t.st.image.titleSrc
    if (i) {
      if (e.isFunction(i)) return i.call(t, n)
      if (n.el) return n.el.attr(i) || ''
    }
    return ''
  }
  e.magnificPopup.registerModule('image', {
    options: {
      markup:
        '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: 'mfp-zoom-out-cur',
      titleSrc: 'title',
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.',
    },
    proto: {
      initImage() {
        const e = t.st.image
        const n = '.image'
        t.types.push('image'),
          x(f + n, function () {
            t.currItem.type === 'image' && e.cursor && i.addClass(e.cursor)
          }),
          x(l + n, function () {
            e.cursor && i.removeClass(e.cursor), I.off('resize' + h)
          }),
          x('Resize' + n, t.resizeImage),
          t.isLowIE && x('AfterChange', t.resizeImage)
      },
      resizeImage() {
        const e = t.currItem
        if (e && e.img && t.st.image.verticalFit) {
          let n = 0
          t.isLowIE &&
            (n =
              parseInt(e.img.css('padding-top'), 10) +
              parseInt(e.img.css('padding-bottom'), 10)),
            e.img.css('max-height', t.wH - n)
        }
      },
      _onImageHasSize(e) {
        e.img &&
          ((e.hasSize = !0),
          j && clearInterval(j),
          (e.isCheckingImgSize = !1),
          T('ImageHasSize', e),
          e.imgHidden &&
            (t.content && t.content.removeClass('mfp-loading'),
            (e.imgHidden = !1)))
      },
      findImageSize(e) {
        let n = 0
        const i = e.img[0]
        var o = function (r) {
          j && clearInterval(j),
            (j = setInterval(function () {
              return i.naturalWidth > 0
                ? (t._onImageHasSize(e), void 0)
                : (n > 200 && clearInterval(j),
                  n++,
                  n === 3 ? o(10) : n === 40 ? o(50) : n === 100 && o(500),
                  void 0)
            }, r))
        }
        o(1)
      },
      getImage(n, i) {
        let o = 0
        var r = function () {
          n &&
            (n.img[0].complete
              ? (n.img.off('.mfploader'),
                n === t.currItem &&
                  (t._onImageHasSize(n), t.updateStatus('ready')),
                (n.hasSize = !0),
                (n.loaded = !0),
                T('ImageLoadComplete'))
              : (o++, o < 200 ? setTimeout(r, 100) : a()))
        }
        var a = function () {
          n &&
            (n.img.off('.mfploader'),
            n === t.currItem &&
              (t._onImageHasSize(n),
              t.updateStatus('error', s.tError.replace('%url%', n.src))),
            (n.hasSize = !0),
            (n.loaded = !0),
            (n.loadError = !0))
        }
        var s = t.st.image
        const l = i.find('.mfp-img')
        if (l.length) {
          let c = document.createElement('img')
          ;(c.className = 'mfp-img'),
            n.el &&
              n.el.find('img').length &&
              (c.alt = n.el.find('img').attr('alt')),
            (n.img = e(c).on('load.mfploader', r).on('error.mfploader', a)),
            (c.src = n.src),
            l.is('img') && (n.img = n.img.clone()),
            (c = n.img[0]),
            c.naturalWidth > 0 ? (n.hasSize = !0) : c.width || (n.hasSize = !1)
        }
        return (
          t._parseMarkup(
            i,
            {
              title: N(n),
              img_replaceWith: n.img,
            },
            n
          ),
          t.resizeImage(),
          n.hasSize
            ? (j && clearInterval(j),
              n.loadError
                ? (i.addClass('mfp-loading'),
                  t.updateStatus('error', s.tError.replace('%url%', n.src)))
                : (i.removeClass('mfp-loading'), t.updateStatus('ready')),
              i)
            : (t.updateStatus('loading'),
              (n.loading = !0),
              n.hasSize ||
                ((n.imgHidden = !0),
                i.addClass('mfp-loading'),
                t.findImageSize(n)),
              i)
        )
      },
    },
  })
  let W
  const R = function () {
    return (
      void 0 === W &&
        (W = void 0 !== document.createElement('p').style.MozTransform),
      W
    )
  }
  e.magnificPopup.registerModule('zoom', {
    options: {
      enabled: !1,
      easing: 'ease-in-out',
      duration: 300,
      opener(e) {
        return e.is('img') ? e : e.find('img')
      },
    },
    proto: {
      initZoom() {
        let e
        const n = t.st.zoom
        const i = '.zoom'
        if (n.enabled && t.supportsTransition) {
          let o
          let r
          const a = n.duration
          const s = function (e) {
            const t = e
              .clone()
              .removeAttr('style')
              .removeAttr('class')
              .addClass('mfp-animated-image')
            const i = 'all ' + n.duration / 1e3 + 's ' + n.easing
            const o = {
              position: 'fixed',
              zIndex: 9999,
              left: 0,
              top: 0,
              '-webkit-backface-visibility': 'hidden',
            }
            const r = 'transition'
            return (
              (o['-webkit-' + r] = o['-moz-' + r] = o['-o-' + r] = o[r] = i),
              t.css(o),
              t
            )
          }
          const d = function () {
            t.content.css('visibility', 'visible')
          }
          x('BuildControls' + i, function () {
            if (t._allowZoom()) {
              if (
                (clearTimeout(o),
                t.content.css('visibility', 'hidden'),
                (e = t._getItemToZoom()),
                !e)
              )
                return d(), void 0
              ;(r = s(e)),
                r.css(t._getOffset()),
                t.wrap.append(r),
                (o = setTimeout(function () {
                  r.css(t._getOffset(!0)),
                    (o = setTimeout(function () {
                      d(),
                        setTimeout(function () {
                          r.remove(), (e = r = null), T('ZoomAnimationEnded')
                        }, 16)
                    }, a))
                }, 16))
            }
          }),
            x(c + i, function () {
              if (t._allowZoom()) {
                if ((clearTimeout(o), (t.st.removalDelay = a), !e)) {
                  if (((e = t._getItemToZoom()), !e)) return
                  r = s(e)
                }
                r.css(t._getOffset(!0)),
                  t.wrap.append(r),
                  t.content.css('visibility', 'hidden'),
                  setTimeout(function () {
                    r.css(t._getOffset())
                  }, 16)
              }
            }),
            x(l + i, function () {
              t._allowZoom() && (d(), r && r.remove(), (e = null))
            })
        }
      },
      _allowZoom() {
        return t.currItem.type === 'image'
      },
      _getItemToZoom() {
        return t.currItem.hasSize ? t.currItem.img : !1
      },
      _getOffset(n) {
        let i
        i = n ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem)
        const o = i.offset()
        const r = parseInt(i.css('padding-top'), 10)
        const a = parseInt(i.css('padding-bottom'), 10)
        o.top -= e(window).scrollTop() - r
        const s = {
          width: i.width(),
          height: (b ? i.innerHeight() : i[0].offsetHeight) - a - r,
        }
        return (
          R()
            ? (s['-moz-transform'] = s.transform =
                'translate(' + o.left + 'px,' + o.top + 'px)')
            : ((s.left = o.left), (s.top = o.top)),
          s
        )
      },
    },
  })
  const Z = 'iframe'
  const q = '//about:blank'
  const D = function (e) {
    if (t.currTemplate[Z]) {
      const n = t.currTemplate[Z].find('iframe')
      n.length &&
        (e || (n[0].src = q), t.isIE8 && n.css('display', e ? 'block' : 'none'))
    }
  }
  e.magnificPopup.registerModule(Z, {
    options: {
      markup:
        '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: 'iframe_src',
      patterns: {
        youtube: {
          index: 'youtube.com',
          id: 'v=',
          src: '//www.youtube.com/embed/%id%?autoplay=1',
        },
        vimeo: {
          index: 'vimeo.com/',
          id: '/',
          src: '//player.vimeo.com/video/%id%?autoplay=1',
        },
        gmaps: {
          index: '//maps.google.',
          src: '%id%&output=embed',
        },
      },
    },
    proto: {
      initIframe() {
        t.types.push(Z),
          x('BeforeChange', function (e, t, n) {
            t !== n && (t === Z ? D() : n === Z && D(!0))
          }),
          x(l + '.' + Z, function () {
            D()
          })
      },
      getIframe(n, i) {
        let o = n.src
        const r = t.st.iframe
        e.each(r.patterns, function () {
          return o.includes(this.index)
            ? (this.id &&
                (o =
                  typeof this.id === 'string'
                    ? o.substr(
                        o.lastIndexOf(this.id) + this.id.length,
                        o.length
                      )
                    : this.id.call(this, o)),
              (o = this.src.replace('%id%', o)),
              !1)
            : void 0
        })
        const a = {}
        return (
          r.srcAction && (a[r.srcAction] = o),
          t._parseMarkup(i, a, n),
          t.updateStatus('ready'),
          i
        )
      },
    },
  })
  const K = function (e) {
    const n = t.items.length
    return e > n - 1 ? e - n : e < 0 ? n + e : e
  }
  const Y = function (e, t, n) {
    return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n)
  }
  e.magnificPopup.registerModule('gallery', {
    options: {
      enabled: !1,
      arrowMarkup:
        '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: 'Previous (Left arrow key)',
      tNext: 'Next (Right arrow key)',
      tCounter: '%curr% of %total%',
    },
    proto: {
      initGallery() {
        const n = t.st.gallery
        const i = '.mfp-gallery'
        const r = Boolean(e.fn.mfpFastClick)
        return (
          (t.direction = !0),
          n && n.enabled
            ? ((a += ' mfp-gallery'),
              x(f + i, function () {
                n.navigateByImgClick &&
                  t.wrap.on('click' + i, '.mfp-img', function () {
                    return t.items.length > 1 ? (t.next(), !1) : void 0
                  }),
                  o.on('keydown' + i, function (e) {
                    e.keyCode === 37 ? t.prev() : e.keyCode === 39 && t.next()
                  })
              }),
              x('UpdateStatus' + i, function (e, n) {
                n.text && (n.text = Y(n.text, t.currItem.index, t.items.length))
              }),
              x(p + i, function (e, i, o, r) {
                const a = t.items.length
                o.counter = a > 1 ? Y(n.tCounter, r.index, a) : ''
              }),
              x('BuildControls' + i, function () {
                if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
                  const i = n.arrowMarkup
                  const o = (t.arrowLeft = e(
                    i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, 'left')
                  ).addClass(y))
                  const a = (t.arrowRight = e(
                    i.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, 'right')
                  ).addClass(y))
                  const s = r ? 'mfpFastClick' : 'click'
                  o[s](function () {
                    t.prev()
                  }),
                    a[s](function () {
                      t.next()
                    }),
                    t.isIE7 &&
                      (k('b', o[0], !1, !0),
                      k('a', o[0], !1, !0),
                      k('b', a[0], !1, !0),
                      k('a', a[0], !1, !0)),
                    t.container.append(o.add(a))
                }
              }),
              x(m + i, function () {
                t._preloadTimeout && clearTimeout(t._preloadTimeout),
                  (t._preloadTimeout = setTimeout(function () {
                    t.preloadNearbyImages(), (t._preloadTimeout = null)
                  }, 16))
              }),
              x(l + i, function () {
                o.off(i),
                  t.wrap.off('click' + i),
                  t.arrowLeft &&
                    r &&
                    t.arrowLeft.add(t.arrowRight).destroyMfpFastClick(),
                  (t.arrowRight = t.arrowLeft = null)
              }),
              void 0)
            : !1
        )
      },
      next() {
        ;(t.direction = !0), (t.index = K(t.index + 1)), t.updateItemHTML()
      },
      prev() {
        ;(t.direction = !1), (t.index = K(t.index - 1)), t.updateItemHTML()
      },
      goTo(e) {
        ;(t.direction = e >= t.index), (t.index = e), t.updateItemHTML()
      },
      preloadNearbyImages() {
        let e
        const n = t.st.gallery.preload
        const i = Math.min(n[0], t.items.length)
        const o = Math.min(n[1], t.items.length)
        for (e = 1; (t.direction ? o : i) >= e; e++) t._preloadItem(t.index + e)
        for (e = 1; (t.direction ? i : o) >= e; e++) t._preloadItem(t.index - e)
      },
      _preloadItem(n) {
        if (((n = K(n)), !t.items[n].preloaded)) {
          let i = t.items[n]
          i.parsed || (i = t.parseEl(n)),
            T('LazyLoad', i),
            i.type === 'image' &&
              (i.img = e('<img class="mfp-img" />')
                .on('load.mfploader', function () {
                  i.hasSize = !0
                })
                .on('error.mfploader', function () {
                  ;(i.hasSize = !0), (i.loadError = !0), T('LazyLoadError', i)
                })
                .attr('src', i.src)),
            (i.preloaded = !0)
        }
      },
    },
  })
  const U = 'retina'
  e.magnificPopup.registerModule(U, {
    options: {
      replaceSrc(e) {
        return e.src.replace(/\.\w+$/, function (e) {
          return '@2x' + e
        })
      },
      ratio: 1,
    },
    proto: {
      initRetina() {
        if (window.devicePixelRatio > 1) {
          const e = t.st.retina
          let n = e.ratio
          ;(n = isNaN(n) ? n() : n),
            n > 1 &&
              (x('ImageHasSize.' + U, function (e, t) {
                t.img.css({
                  'max-width': t.img[0].naturalWidth / n,
                  width: '100%',
                })
              }),
              x('ElementParse.' + U, function (t, i) {
                i.src = e.replaceSrc(i, n)
              }))
        }
      },
    },
  }),
    (function () {
      const t = 1e3
      const n = 'ontouchstart' in window
      const i = function () {
        I.off('touchmove' + r + ' touchend' + r)
      }
      const o = 'mfpFastClick'
      var r = '.' + o
      ;(e.fn.mfpFastClick = function (o) {
        return e(this).each(function () {
          let a
          const s = e(this)
          if (n) {
            let l, c, d, u, p, f
            s.on('touchstart' + r, function (e) {
              ;(u = !1),
                (f = 1),
                (p = e.originalEvent
                  ? e.originalEvent.touches[0]
                  : e.touches[0]),
                (c = p.clientX),
                (d = p.clientY),
                I.on('touchmove' + r, function (e) {
                  ;(p = e.originalEvent ? e.originalEvent.touches : e.touches),
                    (f = p.length),
                    (p = p[0]),
                    (Math.abs(p.clientX - c) > 10 ||
                      Math.abs(p.clientY - d) > 10) &&
                      ((u = !0), i())
                }).on('touchend' + r, function (e) {
                  i(),
                    u ||
                      f > 1 ||
                      ((a = !0),
                      e.preventDefault(),
                      clearTimeout(l),
                      (l = setTimeout(function () {
                        a = !1
                      }, t)),
                      o())
                })
            })
          }
          s.on('click' + r, function () {
            a || o()
          })
        })
      }),
        (e.fn.destroyMfpFastClick = function () {
          e(this).off('touchstart' + r + ' click' + r),
            n && I.off('touchmove' + r + ' touchend' + r)
        })
    })(),
    _()
})

// Ajax Contact Form js

$(function () {
  // Get the form.
  const form = $('#main_contact_form')
  // Get the messages div.
  const formMessages = $('#success_fail_info')
  // Set up an event listener for the contact form.
  $(form).submit(function (e) {
    // Stop the browser from submitting the form.
    e.preventDefault()
    // Serialize the form data.
    const formData = $(form).serialize()
    // Submit the form using AJAX.
    $.ajax({
      type: 'POST',
      url: $(form).attr('action'),
      data: formData,
    })
      .done(function (response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass('error')
        $(formMessages).addClass('success')
        // Set the message text.
        $(formMessages).text('Thanks! Message has been sent successfully.')
        // Clear the form.
        $('#name').val('')
        $('#email').val('')
        $('#subject').val('')
        $('#message').val('')
      })
      .fail(function (data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass('success')
        $(formMessages).addClass('error')
        // Set the message text.
        if (data.responseText !== '') {
          $(formMessages).text(data.responseText)
        } else {
          $(formMessages).text('Oops! An error occured.')
        }
      })
  })
})

/*!
 * jquery.counterup.js 1.0
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Date: Nov 26, 2013
 */
;(function (e) {
  'use strict'
  e.fn.counterUp = function (t) {
    const n = e.extend({ time: 400, delay: 10 }, t)
    return this.each(function () {
      const t = e(this)
      const r = n
      const i = function () {
        const e = []
        const n = r.time / r.delay
        let i = t.text()
        const s = /[0-9]+,[0-9]+/.test(i)
        i = i.replace(/,/g, '')
        const o = /^[0-9]+$/.test(i)
        const u = /^[0-9]+\.[0-9]+$/.test(i)
        const a = u ? (i.split('.')[1] || []).length : 0
        for (let f = n; f >= 1; f--) {
          let l = parseInt((i / n) * f)
          u && (l = parseFloat((i / n) * f).toFixed(a))
          if (s)
            while (/(\d+)(\d{3})/.test(l.toString()))
              l = l.toString().replace(/(\d+)(\d{3})/, '$1,$2')
          e.unshift(l)
        }
        t.data('counterup-nums', e)
        t.text('0')
        const c = function () {
          t.text(t.data('counterup-nums').shift())
          if (t.data('counterup-nums').length)
            setTimeout(t.data('counterup-func'), r.delay)
          else {
            delete t.data('counterup-nums')
            t.data('counterup-nums', null)
            t.data('counterup-func', null)
          }
        }
        t.data('counterup-func', c)
        setTimeout(t.data('counterup-func'), r.delay)
      }
      t.waypoint(i, { offset: '100%', triggerOnce: !0 })
    })
  }
})(jQuery)

// :: jquery-easing.js
;(jQuery.easing.jswing = jQuery.easing.swing),
  jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    swing(n, e, t, r, u) {
      return jQuery.easing[jQuery.easing.def](n, e, t, r, u)
    },
    easeInQuad(n, e, t, r, u) {
      return r * (e /= u) * e + t
    },
    easeOutQuad(n, e, t, r, u) {
      return -r * (e /= u) * (e - 2) + t
    },
    easeInOutQuad(n, e, t, r, u) {
      return (e /= u / 2) < 1
        ? (r / 2) * e * e + t
        : (-r / 2) * (--e * (e - 2) - 1) + t
    },
    easeInCubic(n, e, t, r, u) {
      return r * (e /= u) * e * e + t
    },
    easeOutCubic(n, e, t, r, u) {
      return r * ((e = e / u - 1) * e * e + 1) + t
    },
    easeInOutCubic(n, e, t, r, u) {
      return (e /= u / 2) < 1
        ? (r / 2) * e * e * e + t
        : (r / 2) * ((e -= 2) * e * e + 2) + t
    },
    easeInQuart(n, e, t, r, u) {
      return r * (e /= u) * e * e * e + t
    },
    easeOutQuart(n, e, t, r, u) {
      return -r * ((e = e / u - 1) * e * e * e - 1) + t
    },
    easeInOutQuart(n, e, t, r, u) {
      return (e /= u / 2) < 1
        ? (r / 2) * e * e * e * e + t
        : (-r / 2) * ((e -= 2) * e * e * e - 2) + t
    },
    easeInQuint(n, e, t, r, u) {
      return r * (e /= u) * e * e * e * e + t
    },
    easeOutQuint(n, e, t, r, u) {
      return r * ((e = e / u - 1) * e * e * e * e + 1) + t
    },
    easeInOutQuint(n, e, t, r, u) {
      return (e /= u / 2) < 1
        ? (r / 2) * e * e * e * e * e + t
        : (r / 2) * ((e -= 2) * e * e * e * e + 2) + t
    },
    easeInSine(n, e, t, r, u) {
      return -r * Math.cos((e / u) * (Math.PI / 2)) + r + t
    },
    easeOutSine(n, e, t, r, u) {
      return r * Math.sin((e / u) * (Math.PI / 2)) + t
    },
    easeInOutSine(n, e, t, r, u) {
      return (-r / 2) * (Math.cos((Math.PI * e) / u) - 1) + t
    },
    easeInExpo(n, e, t, r, u) {
      return e == 0 ? t : r * Math.pow(2, 10 * (e / u - 1)) + t
    },
    easeOutExpo(n, e, t, r, u) {
      return e == u ? t + r : r * (-Math.pow(2, (-10 * e) / u) + 1) + t
    },
    easeInOutExpo(n, e, t, r, u) {
      return e == 0
        ? t
        : e == u
        ? t + r
        : (e /= u / 2) < 1
        ? (r / 2) * Math.pow(2, 10 * (e - 1)) + t
        : (r / 2) * (-Math.pow(2, -10 * --e) + 2) + t
    },
    easeInCirc(n, e, t, r, u) {
      return -r * (Math.sqrt(1 - (e /= u) * e) - 1) + t
    },
    easeOutCirc(n, e, t, r, u) {
      return r * Math.sqrt(1 - (e = e / u - 1) * e) + t
    },
    easeInOutCirc(n, e, t, r, u) {
      return (e /= u / 2) < 1
        ? (-r / 2) * (Math.sqrt(1 - e * e) - 1) + t
        : (r / 2) * (Math.sqrt(1 - (e -= 2) * e) + 1) + t
    },
    easeInElastic(n, e, t, r, u) {
      var a = 1.70158
      let i = 0
      let s = r
      if (e == 0) return t
      if ((e /= u) == 1) return t + r
      if ((i || (i = 0.3 * u), s < Math.abs(r))) {
        s = r
        var a = i / 4
      } else var a = (i / (2 * Math.PI)) * Math.asin(r / s)
      return (
        -(
          s *
          Math.pow(2, 10 * (e -= 1)) *
          Math.sin(((e * u - a) * (2 * Math.PI)) / i)
        ) + t
      )
    },
    easeOutElastic(n, e, t, r, u) {
      var a = 1.70158
      let i = 0
      let s = r
      if (e == 0) return t
      if ((e /= u) == 1) return t + r
      if ((i || (i = 0.3 * u), s < Math.abs(r))) {
        s = r
        var a = i / 4
      } else var a = (i / (2 * Math.PI)) * Math.asin(r / s)
      return (
        s * Math.pow(2, -10 * e) * Math.sin(((e * u - a) * (2 * Math.PI)) / i) +
        r +
        t
      )
    },
    easeInOutElastic(n, e, t, r, u) {
      var a = 1.70158
      let i = 0
      let s = r
      if (e == 0) return t
      if ((e /= u / 2) == 2) return t + r
      if ((i || (i = u * (0.3 * 1.5)), s < Math.abs(r))) {
        s = r
        var a = i / 4
      } else var a = (i / (2 * Math.PI)) * Math.asin(r / s)
      return e < 1
        ? -0.5 *
            (s *
              Math.pow(2, 10 * (e -= 1)) *
              Math.sin(((e * u - a) * (2 * Math.PI)) / i)) +
            t
        : s *
            Math.pow(2, -10 * (e -= 1)) *
            Math.sin(((e * u - a) * (2 * Math.PI)) / i) *
            0.5 +
            r +
            t
    },
    easeInBack(n, e, t, r, u, a) {
      return (
        void 0 == a && (a = 1.70158), r * (e /= u) * e * ((a + 1) * e - a) + t
      )
    },
    easeOutBack(n, e, t, r, u, a) {
      return (
        void 0 == a && (a = 1.70158),
        r * ((e = e / u - 1) * e * ((a + 1) * e + a) + 1) + t
      )
    },
    easeInOutBack(n, e, t, r, u, a) {
      return (
        void 0 == a && (a = 1.70158),
        (e /= u / 2) < 1
          ? (r / 2) * (e * e * (((a *= 1.525) + 1) * e - a)) + t
          : (r / 2) * ((e -= 2) * e * (((a *= 1.525) + 1) * e + a) + 2) + t
      )
    },
    easeInBounce(n, e, t, r, u) {
      return r - jQuery.easing.easeOutBounce(n, u - e, 0, r, u) + t
    },
    easeOutBounce(n, e, t, r, u) {
      return (e /= u) < 1 / 2.75
        ? r * (7.5625 * e * e) + t
        : 2 / 2.75 > e
        ? r * (7.5625 * (e -= 1.5 / 2.75) * e + 0.75) + t
        : 2.5 / 2.75 > e
        ? r * (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375) + t
        : r * (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375) + t
    },
    easeInOutBounce(n, e, t, r, u) {
      return u / 2 > e
        ? 0.5 * jQuery.easing.easeInBounce(n, 2 * e, 0, r, u) + t
        : 0.5 * jQuery.easing.easeOutBounce(n, 2 * e - u, 0, r, u) + 0.5 * r + t
    },
  })

/**
 * Owl Carousel v2.2.1
 * Copyright 2013-2017 David Deutsch
 * Licensed under  ()
 */
!(function (a, b, c, d) {
  function e(b, c) {
    ;(this.settings = null),
      (this.options = a.extend({}, e.Defaults, c)),
      (this.$element = a(b)),
      (this._handlers = {}),
      (this._plugins = {}),
      (this._supress = {}),
      (this._current = null),
      (this._speed = null),
      (this._coordinates = []),
      (this._breakpoint = null),
      (this._width = null),
      (this._items = []),
      (this._clones = []),
      (this._mergers = []),
      (this._widths = []),
      (this._invalidated = {}),
      (this._pipe = []),
      (this._drag = {
        time: null,
        target: null,
        pointer: null,
        stage: { start: null, current: null },
        direction: null,
      }),
      (this._states = {
        current: {},
        tags: {
          initializing: ['busy'],
          animating: ['busy'],
          dragging: ['interacting'],
        },
      }),
      a.each(
        ['onResize', 'onThrottledResize'],
        a.proxy(function (b, c) {
          this._handlers[c] = a.proxy(this[c], this)
        }, this)
      ),
      a.each(
        e.Plugins,
        a.proxy(function (a, b) {
          this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this)
        }, this)
      ),
      a.each(
        e.Workers,
        a.proxy(function (b, c) {
          this._pipe.push({ filter: c.filter, run: a.proxy(c.run, this) })
        }, this)
      ),
      this.setup(),
      this.initialize()
  }
  ;(e.Defaults = {
    items: 3,
    loop: !1,
    center: !1,
    rewind: !1,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: b,
    fallbackEasing: 'swing',
    info: !1,
    nestedItemSelector: !1,
    itemElement: 'div',
    stageElement: 'div',
    refreshClass: 'owl-refresh',
    loadedClass: 'owl-loaded',
    loadingClass: 'owl-loading',
    rtlClass: 'owl-rtl',
    responsiveClass: 'owl-responsive',
    dragClass: 'owl-drag',
    itemClass: 'owl-item',
    stageClass: 'owl-stage',
    stageOuterClass: 'owl-stage-outer',
    grabClass: 'owl-grab',
  }),
    (e.Width = { Default: 'default', Inner: 'inner', Outer: 'outer' }),
    (e.Type = { Event: 'event', State: 'state' }),
    (e.Plugins = {}),
    (e.Workers = [
      {
        filter: ['width', 'settings'],
        run() {
          this._width = this.$element.width()
        },
      },
      {
        filter: ['width', 'items', 'settings'],
        run(a) {
          a.current = this._items && this._items[this.relative(this._current)]
        },
      },
      {
        filter: ['items', 'settings'],
        run() {
          this.$stage.children('.cloned').remove()
        },
      },
      {
        filter: ['width', 'items', 'settings'],
        run(a) {
          const b = this.settings.margin || ''
          const c = !this.settings.autoWidth
          const d = this.settings.rtl
          const e = {
            width: 'auto',
            'margin-left': d ? b : '',
            'margin-right': d ? '' : b,
          }
          !c && this.$stage.children().css(e), (a.css = e)
        },
      },
      {
        filter: ['width', 'items', 'settings'],
        run(a) {
          const b =
            (this.width() / this.settings.items).toFixed(3) -
            this.settings.margin
          let c = null
          let d = this._items.length
          const e = !this.settings.autoWidth
          const f = []
          for (a.items = { merge: !1, width: b }; d--; )
            (c = this._mergers[d]),
              (c =
                (this.settings.mergeFit && Math.min(c, this.settings.items)) ||
                c),
              (a.items.merge = c > 1 || a.items.merge),
              (f[d] = e ? b * c : this._items[d].width())
          this._widths = f
        },
      },
      {
        filter: ['items', 'settings'],
        run() {
          const b = []
          const c = this._items
          const d = this.settings
          const e = Math.max(2 * d.items, 4)
          const f = 2 * Math.ceil(c.length / 2)
          let g = d.loop && c.length ? (d.rewind ? e : Math.max(e, f)) : 0
          let h = ''
          let i = ''
          for (g /= 2; g--; )
            b.push(this.normalize(b.length / 2, !0)),
              (h += c[b[b.length - 1]][0].outerHTML),
              b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)),
              (i = c[b[b.length - 1]][0].outerHTML + i)
          ;(this._clones = b),
            a(h).addClass('cloned').appendTo(this.$stage),
            a(i).addClass('cloned').prependTo(this.$stage)
        },
      },
      {
        filter: ['width', 'items', 'settings'],
        run() {
          for (
            var a = this.settings.rtl ? 1 : -1,
              b = this._clones.length + this._items.length,
              c = -1,
              d = 0,
              e = 0,
              f = [];
            ++c < b;

          )
            (d = f[c - 1] || 0),
              (e = this._widths[this.relative(c)] + this.settings.margin),
              f.push(d + e * a)
          this._coordinates = f
        },
      },
      {
        filter: ['width', 'items', 'settings'],
        run() {
          const a = this.settings.stagePadding
          const b = this._coordinates
          const c = {
            width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
            'padding-left': a || '',
            'padding-right': a || '',
          }
          this.$stage.css(c)
        },
      },
      {
        filter: ['width', 'items', 'settings'],
        run(a) {
          let b = this._coordinates.length
          const c = !this.settings.autoWidth
          const d = this.$stage.children()
          if (c && a.items.merge)
            for (; b--; )
              (a.css.width = this._widths[this.relative(b)]), d.eq(b).css(a.css)
          else c && ((a.css.width = a.items.width), d.css(a.css))
        },
      },
      {
        filter: ['items'],
        run() {
          this._coordinates.length < 1 && this.$stage.removeAttr('style')
        },
      },
      {
        filter: ['width', 'items', 'settings'],
        run(a) {
          ;(a.current = a.current
            ? this.$stage.children().index(a.current)
            : 0),
            (a.current = Math.max(
              this.minimum(),
              Math.min(this.maximum(), a.current)
            )),
            this.reset(a.current)
        },
      },
      {
        filter: ['position'],
        run() {
          this.animate(this.coordinates(this._current))
        },
      },
      {
        filter: ['width', 'position', 'items', 'settings'],
        run() {
          let a
          let b
          let c
          let d
          const e = this.settings.rtl ? 1 : -1
          const f = 2 * this.settings.stagePadding
          const g = this.coordinates(this.current()) + f
          const h = g + this.width() * e
          const i = []
          for (c = 0, d = this._coordinates.length; c < d; c++)
            (a = this._coordinates[c - 1] || 0),
              (b = Math.abs(this._coordinates[c]) + f * e),
              ((this.op(a, '<=', g) && this.op(a, '>', h)) ||
                (this.op(b, '<', g) && this.op(b, '>', h))) &&
                i.push(c)
          this.$stage.children('.active').removeClass('active'),
            this.$stage
              .children(':eq(' + i.join('), :eq(') + ')')
              .addClass('active'),
            this.settings.center &&
              (this.$stage.children('.center').removeClass('center'),
              this.$stage.children().eq(this.current()).addClass('center'))
        },
      },
    ]),
    (e.prototype.initialize = function () {
      if (
        (this.enter('initializing'),
        this.trigger('initialize'),
        this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
        this.settings.autoWidth && !this.is('pre-loading'))
      ) {
        let b, c, e
        ;(b = this.$element.find('img')),
          (c = this.settings.nestedItemSelector
            ? '.' + this.settings.nestedItemSelector
            : d),
          (e = this.$element.children(c).width()),
          b.length && e <= 0 && this.preloadAutoWidthImages(b)
      }
      this.$element.addClass(this.options.loadingClass),
        (this.$stage = a(
          '<' +
            this.settings.stageElement +
            ' class="' +
            this.settings.stageClass +
            '"/>'
        ).wrap('<div class="' + this.settings.stageOuterClass + '"/>')),
        this.$element.append(this.$stage.parent()),
        this.replace(this.$element.children().not(this.$stage.parent())),
        this.$element.is(':visible')
          ? this.refresh()
          : this.invalidate('width'),
        this.$element
          .removeClass(this.options.loadingClass)
          .addClass(this.options.loadedClass),
        this.registerEventHandlers(),
        this.leave('initializing'),
        this.trigger('initialized')
    }),
    (e.prototype.setup = function () {
      const b = this.viewport()
      const c = this.options.responsive
      let d = -1
      let e = null
      c
        ? (a.each(c, function (a) {
            a <= b && a > d && (d = Number(a))
          }),
          (e = a.extend({}, this.options, c[d])),
          typeof e.stagePadding === 'function' &&
            (e.stagePadding = e.stagePadding()),
          delete e.responsive,
          e.responsiveClass &&
            this.$element.attr(
              'class',
              this.$element
                .attr('class')
                .replace(
                  new RegExp(
                    '(' + this.options.responsiveClass + '-)\\S+\\s',
                    'g'
                  ),
                  '$1' + d
                )
            ))
        : (e = a.extend({}, this.options)),
        this.trigger('change', { property: { name: 'settings', value: e } }),
        (this._breakpoint = d),
        (this.settings = e),
        this.invalidate('settings'),
        this.trigger('changed', {
          property: { name: 'settings', value: this.settings },
        })
    }),
    (e.prototype.optionsLogic = function () {
      this.settings.autoWidth &&
        ((this.settings.stagePadding = !1), (this.settings.merge = !1))
    }),
    (e.prototype.prepare = function (b) {
      const c = this.trigger('prepare', { content: b })
      return (
        c.data ||
          (c.data = a('<' + this.settings.itemElement + '/>')
            .addClass(this.options.itemClass)
            .append(b)),
        this.trigger('prepared', { content: c.data }),
        c.data
      )
    }),
    (e.prototype.update = function () {
      for (
        let b = 0,
          c = this._pipe.length,
          d = a.proxy(function (a) {
            return this[a]
          }, this._invalidated),
          e = {};
        b < c;

      )
        (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) &&
          this._pipe[b].run(e),
          b++
      ;(this._invalidated = {}), !this.is('valid') && this.enter('valid')
    }),
    (e.prototype.width = function (a) {
      switch ((a = a || e.Width.Default)) {
        case e.Width.Inner:
        case e.Width.Outer:
          return this._width
        default:
          return (
            this._width - 2 * this.settings.stagePadding + this.settings.margin
          )
      }
    }),
    (e.prototype.refresh = function () {
      this.enter('refreshing'),
        this.trigger('refresh'),
        this.setup(),
        this.optionsLogic(),
        this.$element.addClass(this.options.refreshClass),
        this.update(),
        this.$element.removeClass(this.options.refreshClass),
        this.leave('refreshing'),
        this.trigger('refreshed')
    }),
    (e.prototype.onThrottledResize = function () {
      b.clearTimeout(this.resizeTimer),
        (this.resizeTimer = b.setTimeout(
          this._handlers.onResize,
          this.settings.responsiveRefreshRate
        ))
    }),
    (e.prototype.onResize = function () {
      return (
        !!this._items.length &&
        this._width !== this.$element.width() &&
        !!this.$element.is(':visible') &&
        (this.enter('resizing'),
        this.trigger('resize').isDefaultPrevented()
          ? (this.leave('resizing'), !1)
          : (this.invalidate('width'),
            this.refresh(),
            this.leave('resizing'),
            void this.trigger('resized')))
      )
    }),
    (e.prototype.registerEventHandlers = function () {
      a.support.transition &&
        this.$stage.on(
          a.support.transition.end + '.owl.core',
          a.proxy(this.onTransitionEnd, this)
        ),
        this.settings.responsive !== !1 &&
          this.on(b, 'resize', this._handlers.onThrottledResize),
        this.settings.mouseDrag &&
          (this.$element.addClass(this.options.dragClass),
          this.$stage.on('mousedown.owl.core', a.proxy(this.onDragStart, this)),
          this.$stage.on(
            'dragstart.owl.core selectstart.owl.core',
            function () {
              return !1
            }
          )),
        this.settings.touchDrag &&
          (this.$stage.on(
            'touchstart.owl.core',
            a.proxy(this.onDragStart, this)
          ),
          this.$stage.on('touchcancel.owl.core', a.proxy(this.onDragEnd, this)))
    }),
    (e.prototype.onDragStart = function (b) {
      let d = null
      b.which !== 3 &&
        (a.support.transform
          ? ((d = this.$stage
              .css('transform')
              .replace(/.*\(|\)| /g, '')
              .split(',')),
            (d = {
              x: d[d.length === 16 ? 12 : 4],
              y: d[d.length === 16 ? 13 : 5],
            }))
          : ((d = this.$stage.position()),
            (d = {
              x: this.settings.rtl
                ? d.left +
                  this.$stage.width() -
                  this.width() +
                  this.settings.margin
                : d.left,
              y: d.top,
            })),
        this.is('animating') &&
          (a.support.transform ? this.animate(d.x) : this.$stage.stop(),
          this.invalidate('position')),
        this.$element.toggleClass(
          this.options.grabClass,
          b.type === 'mousedown'
        ),
        this.speed(0),
        (this._drag.time = new Date().getTime()),
        (this._drag.target = a(b.target)),
        (this._drag.stage.start = d),
        (this._drag.stage.current = d),
        (this._drag.pointer = this.pointer(b)),
        a(c).on(
          'mouseup.owl.core touchend.owl.core',
          a.proxy(this.onDragEnd, this)
        ),
        a(c).one(
          'mousemove.owl.core touchmove.owl.core',
          a.proxy(function (b) {
            const d = this.difference(this._drag.pointer, this.pointer(b))
            a(c).on(
              'mousemove.owl.core touchmove.owl.core',
              a.proxy(this.onDragMove, this)
            ),
              (Math.abs(d.x) < Math.abs(d.y) && this.is('valid')) ||
                (b.preventDefault(),
                this.enter('dragging'),
                this.trigger('drag'))
          }, this)
        ))
    }),
    (e.prototype.onDragMove = function (a) {
      let b = null
      let c = null
      let d = null
      const e = this.difference(this._drag.pointer, this.pointer(a))
      const f = this.difference(this._drag.stage.start, e)
      this.is('dragging') &&
        (a.preventDefault(),
        this.settings.loop
          ? ((b = this.coordinates(this.minimum())),
            (c = this.coordinates(this.maximum() + 1) - b),
            (f.x = ((((f.x - b) % c) + c) % c) + b))
          : ((b = this.settings.rtl
              ? this.coordinates(this.maximum())
              : this.coordinates(this.minimum())),
            (c = this.settings.rtl
              ? this.coordinates(this.minimum())
              : this.coordinates(this.maximum())),
            (d = this.settings.pullDrag ? (-1 * e.x) / 5 : 0),
            (f.x = Math.max(Math.min(f.x, b + d), c + d))),
        (this._drag.stage.current = f),
        this.animate(f.x))
    }),
    (e.prototype.onDragEnd = function (b) {
      const d = this.difference(this._drag.pointer, this.pointer(b))
      const e = this._drag.stage.current
      const f = (d.x > 0) ^ this.settings.rtl ? 'left' : 'right'
      a(c).off('.owl.core'),
        this.$element.removeClass(this.options.grabClass),
        ((d.x !== 0 && this.is('dragging')) || !this.is('valid')) &&
          (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
          this.current(this.closest(e.x, d.x !== 0 ? f : this._drag.direction)),
          this.invalidate('position'),
          this.update(),
          (this._drag.direction = f),
          (Math.abs(d.x) > 3 || new Date().getTime() - this._drag.time > 300) &&
            this._drag.target.one('click.owl.core', function () {
              return !1
            })),
        this.is('dragging') && (this.leave('dragging'), this.trigger('dragged'))
    }),
    (e.prototype.closest = function (b, c) {
      let d = -1
      const e = 30
      const f = this.width()
      const g = this.coordinates()
      return (
        this.settings.freeDrag ||
          a.each(
            g,
            a.proxy(function (a, h) {
              return (
                c === 'left' && b > h - e && b < h + e
                  ? (d = a)
                  : c === 'right' && b > h - f - e && b < h - f + e
                  ? (d = a + 1)
                  : this.op(b, '<', h) &&
                    this.op(b, '>', g[a + 1] || h - f) &&
                    (d = c === 'left' ? a + 1 : a),
                d === -1
              )
            }, this)
          ),
        this.settings.loop ||
          (this.op(b, '>', g[this.minimum()])
            ? (d = b = this.minimum())
            : this.op(b, '<', g[this.maximum()]) && (d = b = this.maximum())),
        d
      )
    }),
    (e.prototype.animate = function (b) {
      const c = this.speed() > 0
      this.is('animating') && this.onTransitionEnd(),
        c && (this.enter('animating'), this.trigger('translate')),
        a.support.transform3d && a.support.transition
          ? this.$stage.css({
              transform: 'translate3d(' + b + 'px,0px,0px)',
              transition: this.speed() / 1e3 + 's',
            })
          : c
          ? this.$stage.animate(
              { left: b + 'px' },
              this.speed(),
              this.settings.fallbackEasing,
              a.proxy(this.onTransitionEnd, this)
            )
          : this.$stage.css({ left: b + 'px' })
    }),
    (e.prototype.is = function (a) {
      return this._states.current[a] && this._states.current[a] > 0
    }),
    (e.prototype.current = function (a) {
      if (a === d) return this._current
      if (this._items.length === 0) return d
      if (((a = this.normalize(a)), this._current !== a)) {
        const b = this.trigger('change', {
          property: { name: 'position', value: a },
        })
        b.data !== d && (a = this.normalize(b.data)),
          (this._current = a),
          this.invalidate('position'),
          this.trigger('changed', {
            property: { name: 'position', value: this._current },
          })
      }
      return this._current
    }),
    (e.prototype.invalidate = function (b) {
      return (
        a.type(b) === 'string' &&
          ((this._invalidated[b] = !0),
          this.is('valid') && this.leave('valid')),
        a.map(this._invalidated, function (a, b) {
          return b
        })
      )
    }),
    (e.prototype.reset = function (a) {
      ;(a = this.normalize(a)),
        a !== d &&
          ((this._speed = 0),
          (this._current = a),
          this.suppress(['translate', 'translated']),
          this.animate(this.coordinates(a)),
          this.release(['translate', 'translated']))
    }),
    (e.prototype.normalize = function (a, b) {
      const c = this._items.length
      const e = b ? 0 : this._clones.length
      return (
        !this.isNumeric(a) || c < 1
          ? (a = d)
          : (a < 0 || a >= c + e) &&
            (a = ((((a - e / 2) % c) + c) % c) + e / 2),
        a
      )
    }),
    (e.prototype.relative = function (a) {
      return (a -= this._clones.length / 2), this.normalize(a, !0)
    }),
    (e.prototype.maximum = function (a) {
      let b
      let c
      let d
      const e = this.settings
      let f = this._coordinates.length
      if (e.loop) f = this._clones.length / 2 + this._items.length - 1
      else if (e.autoWidth || e.merge) {
        for (
          b = this._items.length,
            c = this._items[--b].width(),
            d = this.$element.width();
          b-- &&
          ((c += this._items[b].width() + this.settings.margin), !(c > d));

        );
        f = b + 1
      } else
        f = e.center ? this._items.length - 1 : this._items.length - e.items
      return a && (f -= this._clones.length / 2), Math.max(f, 0)
    }),
    (e.prototype.minimum = function (a) {
      return a ? 0 : this._clones.length / 2
    }),
    (e.prototype.items = function (a) {
      return a === d
        ? this._items.slice()
        : ((a = this.normalize(a, !0)), this._items[a])
    }),
    (e.prototype.mergers = function (a) {
      return a === d
        ? this._mergers.slice()
        : ((a = this.normalize(a, !0)), this._mergers[a])
    }),
    (e.prototype.clones = function (b) {
      const c = this._clones.length / 2
      const e = c + this._items.length
      const f = function (a) {
        return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2
      }
      return b === d
        ? a.map(this._clones, function (a, b) {
            return f(b)
          })
        : a.map(this._clones, function (a, c) {
            return a === b ? f(c) : null
          })
    }),
    (e.prototype.speed = function (a) {
      return a !== d && (this._speed = a), this._speed
    }),
    (e.prototype.coordinates = function (b) {
      let c
      let e = 1
      let f = b - 1
      return b === d
        ? a.map(
            this._coordinates,
            a.proxy(function (a, b) {
              return this.coordinates(b)
            }, this)
          )
        : (this.settings.center
            ? (this.settings.rtl && ((e = -1), (f = b + 1)),
              (c = this._coordinates[b]),
              (c += ((this.width() - c + (this._coordinates[f] || 0)) / 2) * e))
            : (c = this._coordinates[f] || 0),
          (c = Math.ceil(c)))
    }),
    (e.prototype.duration = function (a, b, c) {
      return c === 0
        ? 0
        : Math.min(Math.max(Math.abs(b - a), 1), 6) *
            Math.abs(c || this.settings.smartSpeed)
    }),
    (e.prototype.to = function (a, b) {
      let c = this.current()
      let d = null
      let e = a - this.relative(c)
      const f = (e > 0) - (e < 0)
      const g = this._items.length
      const h = this.minimum()
      let i = this.maximum()
      this.settings.loop
        ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += f * -1 * g),
          (a = c + e),
          (d = ((((a - h) % g) + g) % g) + h),
          d !== a &&
            d - e <= i &&
            d - e > 0 &&
            ((c = d - e), (a = d), this.reset(c)))
        : this.settings.rewind
        ? ((i += 1), (a = ((a % i) + i) % i))
        : (a = Math.max(h, Math.min(i, a))),
        this.speed(this.duration(c, a, b)),
        this.current(a),
        this.$element.is(':visible') && this.update()
    }),
    (e.prototype.next = function (a) {
      ;(a = a || !1), this.to(this.relative(this.current()) + 1, a)
    }),
    (e.prototype.prev = function (a) {
      ;(a = a || !1), this.to(this.relative(this.current()) - 1, a)
    }),
    (e.prototype.onTransitionEnd = function (a) {
      if (
        a !== d &&
        (a.stopPropagation(),
        (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))
      )
        return !1
      this.leave('animating'), this.trigger('translated')
    }),
    (e.prototype.viewport = function () {
      let d
      return (
        this.options.responsiveBaseElement !== b
          ? (d = a(this.options.responsiveBaseElement).width())
          : b.innerWidth
          ? (d = b.innerWidth)
          : c.documentElement && c.documentElement.clientWidth
          ? (d = c.documentElement.clientWidth)
          : console.warn('Can not detect viewport width.'),
        d
      )
    }),
    (e.prototype.replace = function (b) {
      this.$stage.empty(),
        (this._items = []),
        b && (b = b instanceof jQuery ? b : a(b)),
        this.settings.nestedItemSelector &&
          (b = b.find('.' + this.settings.nestedItemSelector)),
        b
          .filter(function () {
            return this.nodeType === 1
          })
          .each(
            a.proxy(function (a, b) {
              ;(b = this.prepare(b)),
                this.$stage.append(b),
                this._items.push(b),
                this._mergers.push(
                  1 *
                    b
                      .find('[data-merge]')
                      .addBack('[data-merge]')
                      .attr('data-merge') || 1
                )
            }, this)
          ),
        this.reset(
          this.isNumeric(this.settings.startPosition)
            ? this.settings.startPosition
            : 0
        ),
        this.invalidate('items')
    }),
    (e.prototype.add = function (b, c) {
      const e = this.relative(this._current)
      ;(c = c === d ? this._items.length : this.normalize(c, !0)),
        (b = b instanceof jQuery ? b : a(b)),
        this.trigger('add', { content: b, position: c }),
        (b = this.prepare(b)),
        this._items.length === 0 || c === this._items.length
          ? (this._items.length === 0 && this.$stage.append(b),
            this._items.length !== 0 && this._items[c - 1].after(b),
            this._items.push(b),
            this._mergers.push(
              1 *
                b
                  .find('[data-merge]')
                  .addBack('[data-merge]')
                  .attr('data-merge') || 1
            ))
          : (this._items[c].before(b),
            this._items.splice(c, 0, b),
            this._mergers.splice(
              c,
              0,
              1 *
                b
                  .find('[data-merge]')
                  .addBack('[data-merge]')
                  .attr('data-merge') || 1
            )),
        this._items[e] && this.reset(this._items[e].index()),
        this.invalidate('items'),
        this.trigger('added', { content: b, position: c })
    }),
    (e.prototype.remove = function (a) {
      ;(a = this.normalize(a, !0)),
        a !== d &&
          (this.trigger('remove', { content: this._items[a], position: a }),
          this._items[a].remove(),
          this._items.splice(a, 1),
          this._mergers.splice(a, 1),
          this.invalidate('items'),
          this.trigger('removed', { content: null, position: a }))
    }),
    (e.prototype.preloadAutoWidthImages = function (b) {
      b.each(
        a.proxy(function (b, c) {
          this.enter('pre-loading'),
            (c = a(c)),
            a(new Image())
              .one(
                'load',
                a.proxy(function (a) {
                  c.attr('src', a.target.src),
                    c.css('opacity', 1),
                    this.leave('pre-loading'),
                    !this.is('pre-loading') &&
                      !this.is('initializing') &&
                      this.refresh()
                }, this)
              )
              .attr(
                'src',
                c.attr('src') || c.attr('data-src') || c.attr('data-src-retina')
              )
        }, this)
      )
    }),
    (e.prototype.destroy = function () {
      this.$element.off('.owl.core'),
        this.$stage.off('.owl.core'),
        a(c).off('.owl.core'),
        this.settings.responsive !== !1 &&
          (b.clearTimeout(this.resizeTimer),
          this.off(b, 'resize', this._handlers.onThrottledResize))
      for (const d in this._plugins) this._plugins[d].destroy()
      this.$stage.children('.cloned').remove(),
        this.$stage.unwrap(),
        this.$stage.children().contents().unwrap(),
        this.$stage.children().unwrap(),
        this.$element
          .removeClass(this.options.refreshClass)
          .removeClass(this.options.loadingClass)
          .removeClass(this.options.loadedClass)
          .removeClass(this.options.rtlClass)
          .removeClass(this.options.dragClass)
          .removeClass(this.options.grabClass)
          .attr(
            'class',
            this.$element
              .attr('class')
              .replace(
                new RegExp(this.options.responsiveClass + '-\\S+\\s', 'g'),
                ''
              )
          )
          .removeData('owl.carousel')
    }),
    (e.prototype.op = function (a, b, c) {
      const d = this.settings.rtl
      switch (b) {
        case '<':
          return d ? a > c : a < c
        case '>':
          return d ? a < c : a > c
        case '>=':
          return d ? a <= c : a >= c
        case '<=':
          return d ? a >= c : a <= c
      }
    }),
    (e.prototype.on = function (a, b, c, d) {
      a.addEventListener
        ? a.addEventListener(b, c, d)
        : a.attachEvent && a.attachEvent('on' + b, c)
    }),
    (e.prototype.off = function (a, b, c, d) {
      a.removeEventListener
        ? a.removeEventListener(b, c, d)
        : a.detachEvent && a.detachEvent('on' + b, c)
    }),
    (e.prototype.trigger = function (b, c, d, f, g) {
      const h = { item: { count: this._items.length, index: this.current() } }
      const i = a.camelCase(
        a
          .grep(['on', b, d], function (a) {
            return a
          })
          .join('-')
          .toLowerCase()
      )
      const j = a.Event(
        [b, 'owl', d || 'carousel'].join('.').toLowerCase(),
        a.extend({ relatedTarget: this }, h, c)
      )
      return (
        this._supress[b] ||
          (a.each(this._plugins, function (a, b) {
            b.onTrigger && b.onTrigger(j)
          }),
          this.register({ type: e.Type.Event, name: b }),
          this.$element.trigger(j),
          this.settings &&
            typeof this.settings[i] === 'function' &&
            this.settings[i].call(this, j)),
        j
      )
    }),
    (e.prototype.enter = function (b) {
      a.each(
        [b].concat(this._states.tags[b] || []),
        a.proxy(function (a, b) {
          this._states.current[b] === d && (this._states.current[b] = 0),
            this._states.current[b]++
        }, this)
      )
    }),
    (e.prototype.leave = function (b) {
      a.each(
        [b].concat(this._states.tags[b] || []),
        a.proxy(function (a, b) {
          this._states.current[b]--
        }, this)
      )
    }),
    (e.prototype.register = function (b) {
      if (b.type === e.Type.Event) {
        if (
          (a.event.special[b.name] || (a.event.special[b.name] = {}),
          !a.event.special[b.name].owl)
        ) {
          const c = a.event.special[b.name]._default
          ;(a.event.special[b.name]._default = function (a) {
            return !c ||
              !c.apply ||
              (a.namespace && a.namespace.includes('owl'))
              ? a.namespace && a.namespace.includes('owl')
              : c.apply(this, arguments)
          }),
            (a.event.special[b.name].owl = !0)
        }
      } else
        b.type === e.Type.State &&
          (this._states.tags[b.name]
            ? (this._states.tags[b.name] = this._states.tags[b.name].concat(
                b.tags
              ))
            : (this._states.tags[b.name] = b.tags),
          (this._states.tags[b.name] = a.grep(
            this._states.tags[b.name],
            a.proxy(function (c, d) {
              return a.inArray(c, this._states.tags[b.name]) === d
            }, this)
          )))
    }),
    (e.prototype.suppress = function (b) {
      a.each(
        b,
        a.proxy(function (a, b) {
          this._supress[b] = !0
        }, this)
      )
    }),
    (e.prototype.release = function (b) {
      a.each(
        b,
        a.proxy(function (a, b) {
          delete this._supress[b]
        }, this)
      )
    }),
    (e.prototype.pointer = function (a) {
      const c = { x: null, y: null }
      return (
        (a = a.originalEvent || a || b.event),
        (a =
          a.touches && a.touches.length
            ? a.touches[0]
            : a.changedTouches && a.changedTouches.length
            ? a.changedTouches[0]
            : a),
        a.pageX
          ? ((c.x = a.pageX), (c.y = a.pageY))
          : ((c.x = a.clientX), (c.y = a.clientY)),
        c
      )
    }),
    (e.prototype.isNumeric = function (a) {
      return !isNaN(parseFloat(a))
    }),
    (e.prototype.difference = function (a, b) {
      return { x: a.x - b.x, y: a.y - b.y }
    }),
    (a.fn.owlCarousel = function (b) {
      const c = Array.prototype.slice.call(arguments, 1)
      return this.each(function () {
        const d = a(this)
        let f = d.data('owl.carousel')
        f ||
          ((f = new e(this, typeof b === 'object' && b)),
          d.data('owl.carousel', f),
          a.each(
            [
              'next',
              'prev',
              'to',
              'destroy',
              'refresh',
              'replace',
              'add',
              'remove',
            ],
            function (b, c) {
              f.register({ type: e.Type.Event, name: c }),
                f.$element.on(
                  c + '.owl.carousel.core',
                  a.proxy(function (a) {
                    a.namespace &&
                      a.relatedTarget !== this &&
                      (this.suppress([c]),
                      f[c].apply(this, [].slice.call(arguments, 1)),
                      this.release([c]))
                  }, f)
                )
            }
          )),
          typeof b === 'string' && b.charAt(0) !== '_' && f[b].apply(f, c)
      })
    }),
    (a.fn.owlCarousel.Constructor = e)
})(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      ;(this._core = b),
        (this._interval = null),
        (this._visible = null),
        (this._handlers = {
          'initialized.owl.carousel': a.proxy(function (a) {
            a.namespace && this._core.settings.autoRefresh && this.watch()
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers)
    }
    ;(e.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
      (e.prototype.watch = function () {
        this._interval ||
          ((this._visible = this._core.$element.is(':visible')),
          (this._interval = b.setInterval(
            a.proxy(this.refresh, this),
            this._core.settings.autoRefreshInterval
          )))
      }),
      (e.prototype.refresh = function () {
        this._core.$element.is(':visible') !== this._visible &&
          ((this._visible = !this._visible),
          this._core.$element.toggleClass('owl-hidden', !this._visible),
          this._visible &&
            this._core.invalidate('width') &&
            this._core.refresh())
      }),
      (e.prototype.destroy = function () {
        let a, c
        b.clearInterval(this._interval)
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a])
        for (c in Object.getOwnPropertyNames(this))
          typeof this[c] !== 'function' && (this[c] = null)
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e)
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      ;(this._core = b),
        (this._loaded = []),
        (this._handlers = {
          'initialized.owl.carousel change.owl.carousel resized.owl.carousel':
            a.proxy(function (b) {
              if (
                b.namespace &&
                this._core.settings &&
                this._core.settings.lazyLoad &&
                ((b.property && b.property.name == 'position') ||
                  b.type == 'initialized')
              )
                for (
                  let c = this._core.settings,
                    e = (c.center && Math.ceil(c.items / 2)) || c.items,
                    f = (c.center && e * -1) || 0,
                    g =
                      (b.property && b.property.value !== d
                        ? b.property.value
                        : this._core.current()) + f,
                    h = this._core.clones().length,
                    i = a.proxy(function (a, b) {
                      this.load(b)
                    }, this);
                  f++ < e;

                )
                  this.load(h / 2 + this._core.relative(g)),
                    h && a.each(this._core.clones(this._core.relative(g)), i),
                    g++
            }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers)
    }
    ;(e.Defaults = { lazyLoad: !1 }),
      (e.prototype.load = function (c) {
        const d = this._core.$stage.children().eq(c)
        const e = d && d.find('.owl-lazy')
        !e ||
          a.inArray(d.get(0), this._loaded) > -1 ||
          (e.each(
            a.proxy(function (c, d) {
              let e
              const f = a(d)
              const g =
                (b.devicePixelRatio > 1 && f.attr('data-src-retina')) ||
                f.attr('data-src')
              this._core.trigger('load', { element: f, url: g }, 'lazy'),
                f.is('img')
                  ? f
                      .one(
                        'load.owl.lazy',
                        a.proxy(function () {
                          f.css('opacity', 1),
                            this._core.trigger(
                              'loaded',
                              { element: f, url: g },
                              'lazy'
                            )
                        }, this)
                      )
                      .attr('src', g)
                  : ((e = new Image()),
                    (e.onload = a.proxy(function () {
                      f.css({
                        'background-image': 'url("' + g + '")',
                        opacity: '1',
                      }),
                        this._core.trigger(
                          'loaded',
                          { element: f, url: g },
                          'lazy'
                        )
                    }, this)),
                    (e.src = g))
            }, this)
          ),
          this._loaded.push(d.get(0)))
      }),
      (e.prototype.destroy = function () {
        let a, b
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a])
        for (b in Object.getOwnPropertyNames(this))
          typeof this[b] !== 'function' && (this[b] = null)
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Lazy = e)
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      ;(this._core = b),
        (this._handlers = {
          'initialized.owl.carousel refreshed.owl.carousel': a.proxy(function (
            a
          ) {
            a.namespace && this._core.settings.autoHeight && this.update()
          },
          this),
          'changed.owl.carousel': a.proxy(function (a) {
            a.namespace &&
              this._core.settings.autoHeight &&
              a.property.name == 'position' &&
              this.update()
          }, this),
          'loaded.owl.lazy': a.proxy(function (a) {
            a.namespace &&
              this._core.settings.autoHeight &&
              a.element.closest('.' + this._core.settings.itemClass).index() ===
                this._core.current() &&
              this.update()
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers)
    }
    ;(e.Defaults = { autoHeight: !1, autoHeightClass: 'owl-height' }),
      (e.prototype.update = function () {
        const b = this._core._current
        const c = b + this._core.settings.items
        const d = this._core.$stage.children().toArray().slice(b, c)
        const e = []
        let f = 0
        a.each(d, function (b, c) {
          e.push(a(c).height())
        }),
          (f = Math.max.apply(null, e)),
          this._core.$stage
            .parent()
            .height(f)
            .addClass(this._core.settings.autoHeightClass)
      }),
      (e.prototype.destroy = function () {
        let a, b
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a])
        for (b in Object.getOwnPropertyNames(this))
          typeof this[b] !== 'function' && (this[b] = null)
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e)
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      ;(this._core = b),
        (this._videos = {}),
        (this._playing = null),
        (this._handlers = {
          'initialized.owl.carousel': a.proxy(function (a) {
            a.namespace &&
              this._core.register({
                type: 'state',
                name: 'playing',
                tags: ['interacting'],
              })
          }, this),
          'resize.owl.carousel': a.proxy(function (a) {
            a.namespace &&
              this._core.settings.video &&
              this.isInFullScreen() &&
              a.preventDefault()
          }, this),
          'refreshed.owl.carousel': a.proxy(function (a) {
            a.namespace &&
              this._core.is('resizing') &&
              this._core.$stage.find('.cloned .owl-video-frame').remove()
          }, this),
          'changed.owl.carousel': a.proxy(function (a) {
            a.namespace &&
              a.property.name === 'position' &&
              this._playing &&
              this.stop()
          }, this),
          'prepared.owl.carousel': a.proxy(function (b) {
            if (b.namespace) {
              const c = a(b.content).find('.owl-video')
              c.length &&
                (c.css('display', 'none'), this.fetch(c, a(b.content)))
            }
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        this._core.$element.on(
          'click.owl.video',
          '.owl-video-play-icon',
          a.proxy(function (a) {
            this.play(a)
          }, this)
        )
    }
    ;(e.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
      (e.prototype.fetch = function (a, b) {
        let c = (function () {
          return a.attr('data-vimeo-id')
            ? 'vimeo'
            : a.attr('data-vzaar-id')
            ? 'vzaar'
            : 'youtube'
        })()
        let d =
          a.attr('data-vimeo-id') ||
          a.attr('data-youtube-id') ||
          a.attr('data-vzaar-id')
        const e = a.attr('data-width') || this._core.settings.videoWidth
        const f = a.attr('data-height') || this._core.settings.videoHeight
        const g = a.attr('href')
        if (!g) throw new Error('Missing video URL.')
        if (
          ((d = g.match(
            /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
          )),
          d[3].includes('youtu'))
        )
          c = 'youtube'
        else if (d[3].includes('vimeo')) c = 'vimeo'
        else {
          if (!d[3].includes('vzaar'))
            throw new Error('Video URL not supported.')
          c = 'vzaar'
        }
        ;(d = d[6]),
          (this._videos[g] = { type: c, id: d, width: e, height: f }),
          b.attr('data-video', g),
          this.thumbnail(a, this._videos[g])
      }),
      (e.prototype.thumbnail = function (b, c) {
        let d
        let e
        let f
        const g =
          c.width && c.height
            ? 'style="width:' + c.width + 'px;height:' + c.height + 'px;"'
            : ''
        const h = b.find('img')
        let i = 'src'
        let j = ''
        const k = this._core.settings
        const l = function (a) {
          ;(e = '<div class="owl-video-play-icon"></div>'),
            (d = k.lazyLoad
              ? '<div class="owl-video-tn ' +
                j +
                '" ' +
                i +
                '="' +
                a +
                '"></div>'
              : '<div class="owl-video-tn" style="opacity:1;background-image:url(' +
                a +
                ')"></div>'),
            b.after(d),
            b.after(e)
        }
        if (
          (b.wrap('<div class="owl-video-wrapper"' + g + '></div>'),
          this._core.settings.lazyLoad && ((i = 'data-src'), (j = 'owl-lazy')),
          h.length)
        )
          return l(h.attr(i)), h.remove(), !1
        c.type === 'youtube'
          ? ((f = '//img.youtube.com/vi/' + c.id + '/hqdefault.jpg'), l(f))
          : c.type === 'vimeo'
          ? a.ajax({
              type: 'GET',
              url: '//vimeo.com/api/v2/video/' + c.id + '.json',
              jsonp: 'callback',
              dataType: 'jsonp',
              success(a) {
                ;(f = a[0].thumbnail_large), l(f)
              },
            })
          : c.type === 'vzaar' &&
            a.ajax({
              type: 'GET',
              url: '//vzaar.com/api/videos/' + c.id + '.json',
              jsonp: 'callback',
              dataType: 'jsonp',
              success(a) {
                ;(f = a.framegrab_url), l(f)
              },
            })
      }),
      (e.prototype.stop = function () {
        this._core.trigger('stop', null, 'video'),
          this._playing.find('.owl-video-frame').remove(),
          this._playing.removeClass('owl-video-playing'),
          (this._playing = null),
          this._core.leave('playing'),
          this._core.trigger('stopped', null, 'video')
      }),
      (e.prototype.play = function (b) {
        let c
        const d = a(b.target)
        let e = d.closest('.' + this._core.settings.itemClass)
        const f = this._videos[e.attr('data-video')]
        const g = f.width || '100%'
        const h = f.height || this._core.$stage.height()
        this._playing ||
          (this._core.enter('playing'),
          this._core.trigger('play', null, 'video'),
          (e = this._core.items(this._core.relative(e.index()))),
          this._core.reset(e.index()),
          f.type === 'youtube'
            ? (c =
                '<iframe width="' +
                g +
                '" height="' +
                h +
                '" src="//www.youtube.com/embed/' +
                f.id +
                '?autoplay=1&rel=0&v=' +
                f.id +
                '" frameborder="0" allowfullscreen></iframe>')
            : f.type === 'vimeo'
            ? (c =
                '<iframe src="//player.vimeo.com/video/' +
                f.id +
                '?autoplay=1" width="' +
                g +
                '" height="' +
                h +
                '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
            : f.type === 'vzaar' &&
              (c =
                '<iframe frameborder="0"height="' +
                h +
                '"width="' +
                g +
                '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' +
                f.id +
                '/player?autoplay=true"></iframe>'),
          a('<div class="owl-video-frame">' + c + '</div>').insertAfter(
            e.find('.owl-video')
          ),
          (this._playing = e.addClass('owl-video-playing')))
      }),
      (e.prototype.isInFullScreen = function () {
        const b =
          c.fullscreenElement ||
          c.mozFullScreenElement ||
          c.webkitFullscreenElement
        return b && a(b).parent().hasClass('owl-video-frame')
      }),
      (e.prototype.destroy = function () {
        let a, b
        this._core.$element.off('click.owl.video')
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a])
        for (b in Object.getOwnPropertyNames(this))
          typeof this[b] !== 'function' && (this[b] = null)
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Video = e)
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      ;(this.core = b),
        (this.core.options = a.extend({}, e.Defaults, this.core.options)),
        (this.swapping = !0),
        (this.previous = d),
        (this.next = d),
        (this.handlers = {
          'change.owl.carousel': a.proxy(function (a) {
            a.namespace &&
              a.property.name == 'position' &&
              ((this.previous = this.core.current()),
              (this.next = a.property.value))
          }, this),
          'drag.owl.carousel dragged.owl.carousel translated.owl.carousel':
            a.proxy(function (a) {
              a.namespace && (this.swapping = a.type == 'translated')
            }, this),
          'translate.owl.carousel': a.proxy(function (a) {
            a.namespace &&
              this.swapping &&
              (this.core.options.animateOut || this.core.options.animateIn) &&
              this.swap()
          }, this),
        }),
        this.core.$element.on(this.handlers)
    }
    ;(e.Defaults = { animateOut: !1, animateIn: !1 }),
      (e.prototype.swap = function () {
        if (
          this.core.settings.items === 1 &&
          a.support.animation &&
          a.support.transition
        ) {
          this.core.speed(0)
          let b
          const c = a.proxy(this.clear, this)
          const d = this.core.$stage.children().eq(this.previous)
          const e = this.core.$stage.children().eq(this.next)
          const f = this.core.settings.animateIn
          const g = this.core.settings.animateOut
          this.core.current() !== this.previous &&
            (g &&
              ((b =
                this.core.coordinates(this.previous) -
                this.core.coordinates(this.next)),
              d
                .one(a.support.animation.end, c)
                .css({ left: b + 'px' })
                .addClass('animated owl-animated-out')
                .addClass(g)),
            f &&
              e
                .one(a.support.animation.end, c)
                .addClass('animated owl-animated-in')
                .addClass(f))
        }
      }),
      (e.prototype.clear = function (b) {
        a(b.target)
          .css({ left: '' })
          .removeClass('animated owl-animated-out owl-animated-in')
          .removeClass(this.core.settings.animateIn)
          .removeClass(this.core.settings.animateOut),
          this.core.onTransitionEnd()
      }),
      (e.prototype.destroy = function () {
        let a, b
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a])
        for (b in Object.getOwnPropertyNames(this))
          typeof this[b] !== 'function' && (this[b] = null)
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Animate = e)
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      ;(this._core = b),
        (this._timeout = null),
        (this._paused = !1),
        (this._handlers = {
          'changed.owl.carousel': a.proxy(function (a) {
            a.namespace && a.property.name === 'settings'
              ? this._core.settings.autoplay
                ? this.play()
                : this.stop()
              : a.namespace &&
                a.property.name === 'position' &&
                this._core.settings.autoplay &&
                this._setAutoPlayInterval()
          }, this),
          'initialized.owl.carousel': a.proxy(function (a) {
            a.namespace && this._core.settings.autoplay && this.play()
          }, this),
          'play.owl.autoplay': a.proxy(function (a, b, c) {
            a.namespace && this.play(b, c)
          }, this),
          'stop.owl.autoplay': a.proxy(function (a) {
            a.namespace && this.stop()
          }, this),
          'mouseover.owl.autoplay': a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is('rotating') &&
              this.pause()
          }, this),
          'mouseleave.owl.autoplay': a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is('rotating') &&
              this.play()
          }, this),
          'touchstart.owl.core': a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is('rotating') &&
              this.pause()
          }, this),
          'touchend.owl.core': a.proxy(function () {
            this._core.settings.autoplayHoverPause && this.play()
          }, this),
        }),
        this._core.$element.on(this._handlers),
        (this._core.options = a.extend({}, e.Defaults, this._core.options))
    }
    ;(e.Defaults = {
      autoplay: !1,
      autoplayTimeout: 5e3,
      autoplayHoverPause: !1,
      autoplaySpeed: !1,
    }),
      (e.prototype.play = function (a, b) {
        ;(this._paused = !1),
          this._core.is('rotating') ||
            (this._core.enter('rotating'), this._setAutoPlayInterval())
      }),
      (e.prototype._getNextTimeout = function (d, e) {
        return (
          this._timeout && b.clearTimeout(this._timeout),
          b.setTimeout(
            a.proxy(function () {
              this._paused ||
                this._core.is('busy') ||
                this._core.is('interacting') ||
                c.hidden ||
                this._core.next(e || this._core.settings.autoplaySpeed)
            }, this),
            d || this._core.settings.autoplayTimeout
          )
        )
      }),
      (e.prototype._setAutoPlayInterval = function () {
        this._timeout = this._getNextTimeout()
      }),
      (e.prototype.stop = function () {
        this._core.is('rotating') &&
          (b.clearTimeout(this._timeout), this._core.leave('rotating'))
      }),
      (e.prototype.pause = function () {
        this._core.is('rotating') && (this._paused = !0)
      }),
      (e.prototype.destroy = function () {
        let a, b
        this.stop()
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a])
        for (b in Object.getOwnPropertyNames(this))
          typeof this[b] !== 'function' && (this[b] = null)
      }),
      (a.fn.owlCarousel.Constructor.Plugins.autoplay = e)
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    'use strict'
    var e = function (b) {
      ;(this._core = b),
        (this._initialized = !1),
        (this._pages = []),
        (this._controls = {}),
        (this._templates = []),
        (this.$element = this._core.$element),
        (this._overrides = {
          next: this._core.next,
          prev: this._core.prev,
          to: this._core.to,
        }),
        (this._handlers = {
          'prepared.owl.carousel': a.proxy(function (b) {
            b.namespace &&
              this._core.settings.dotsData &&
              this._templates.push(
                '<div class="' +
                  this._core.settings.dotClass +
                  '">' +
                  a(b.content)
                    .find('[data-dot]')
                    .addBack('[data-dot]')
                    .attr('data-dot') +
                  '</div>'
              )
          }, this),
          'added.owl.carousel': a.proxy(function (a) {
            a.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(a.position, 0, this._templates.pop())
          }, this),
          'remove.owl.carousel': a.proxy(function (a) {
            a.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(a.position, 1)
          }, this),
          'changed.owl.carousel': a.proxy(function (a) {
            a.namespace && a.property.name == 'position' && this.draw()
          }, this),
          'initialized.owl.carousel': a.proxy(function (a) {
            a.namespace &&
              !this._initialized &&
              (this._core.trigger('initialize', null, 'navigation'),
              this.initialize(),
              this.update(),
              this.draw(),
              (this._initialized = !0),
              this._core.trigger('initialized', null, 'navigation'))
          }, this),
          'refreshed.owl.carousel': a.proxy(function (a) {
            a.namespace &&
              this._initialized &&
              (this._core.trigger('refresh', null, 'navigation'),
              this.update(),
              this.draw(),
              this._core.trigger('refreshed', null, 'navigation'))
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers)
    }
    ;(e.Defaults = {
      nav: !1,
      navText: ['prev', 'next'],
      navSpeed: !1,
      navElement: 'div',
      navContainer: !1,
      navContainerClass: 'owl-nav',
      navClass: ['owl-prev', 'owl-next'],
      slideBy: 1,
      dotClass: 'owl-dot',
      dotsClass: 'owl-dots',
      dots: !0,
      dotsEach: !1,
      dotsData: !1,
      dotsSpeed: !1,
      dotsContainer: !1,
    }),
      (e.prototype.initialize = function () {
        let b
        const c = this._core.settings
        ;(this._controls.$relative = (
          c.navContainer
            ? a(c.navContainer)
            : a('<div>').addClass(c.navContainerClass).appendTo(this.$element)
        ).addClass('disabled')),
          (this._controls.$previous = a('<' + c.navElement + '>')
            .addClass(c.navClass[0])
            .html(c.navText[0])
            .prependTo(this._controls.$relative)
            .on(
              'click',
              a.proxy(function (a) {
                this.prev(c.navSpeed)
              }, this)
            )),
          (this._controls.$next = a('<' + c.navElement + '>')
            .addClass(c.navClass[1])
            .html(c.navText[1])
            .appendTo(this._controls.$relative)
            .on(
              'click',
              a.proxy(function (a) {
                this.next(c.navSpeed)
              }, this)
            )),
          c.dotsData ||
            (this._templates = [
              a('<div>')
                .addClass(c.dotClass)
                .append(a('<span>'))
                .prop('outerHTML'),
            ]),
          (this._controls.$absolute = (
            c.dotsContainer
              ? a(c.dotsContainer)
              : a('<div>').addClass(c.dotsClass).appendTo(this.$element)
          ).addClass('disabled')),
          this._controls.$absolute.on(
            'click',
            'div',
            a.proxy(function (b) {
              const d = a(b.target).parent().is(this._controls.$absolute)
                ? a(b.target).index()
                : a(b.target).parent().index()
              b.preventDefault(), this.to(d, c.dotsSpeed)
            }, this)
          )
        for (b in this._overrides) this._core[b] = a.proxy(this[b], this)
      }),
      (e.prototype.destroy = function () {
        let a, b, c, d
        for (a in this._handlers) this.$element.off(a, this._handlers[a])
        for (b in this._controls) this._controls[b].remove()
        for (d in this.overides) this._core[d] = this._overrides[d]
        for (c in Object.getOwnPropertyNames(this))
          typeof this[c] !== 'function' && (this[c] = null)
      }),
      (e.prototype.update = function () {
        let a
        let b
        let c
        const d = this._core.clones().length / 2
        const e = d + this._core.items().length
        const f = this._core.maximum(!0)
        const g = this._core.settings
        const h =
          g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items
        if (
          (g.slideBy !== 'page' && (g.slideBy = Math.min(g.slideBy, g.items)),
          g.dots || g.slideBy == 'page')
        )
          for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
            if (b >= h || b === 0) {
              if (
                (this._pages.push({
                  start: Math.min(f, a - d),
                  end: a - d + h - 1,
                }),
                Math.min(f, a - d) === f)
              )
                break
              ;(b = 0), ++c
            }
            b += this._core.mergers(this._core.relative(a))
          }
      }),
      (e.prototype.draw = function () {
        let b
        const c = this._core.settings
        const d = this._core.items().length <= c.items
        const e = this._core.relative(this._core.current())
        const f = c.loop || c.rewind
        this._controls.$relative.toggleClass('disabled', !c.nav || d),
          c.nav &&
            (this._controls.$previous.toggleClass(
              'disabled',
              !f && e <= this._core.minimum(!0)
            ),
            this._controls.$next.toggleClass(
              'disabled',
              !f && e >= this._core.maximum(!0)
            )),
          this._controls.$absolute.toggleClass('disabled', !c.dots || d),
          c.dots &&
            ((b =
              this._pages.length - this._controls.$absolute.children().length),
            c.dotsData && b !== 0
              ? this._controls.$absolute.html(this._templates.join(''))
              : b > 0
              ? this._controls.$absolute.append(
                  new Array(b + 1).join(this._templates[0])
                )
              : b < 0 && this._controls.$absolute.children().slice(b).remove(),
            this._controls.$absolute.find('.active').removeClass('active'),
            this._controls.$absolute
              .children()
              .eq(a.inArray(this.current(), this._pages))
              .addClass('active'))
      }),
      (e.prototype.onTrigger = function (b) {
        const c = this._core.settings
        b.page = {
          index: a.inArray(this.current(), this._pages),
          count: this._pages.length,
          size:
            c &&
            (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items),
        }
      }),
      (e.prototype.current = function () {
        const b = this._core.relative(this._core.current())
        return a
          .grep(
            this._pages,
            a.proxy(function (a, c) {
              return a.start <= b && a.end >= b
            }, this)
          )
          .pop()
      }),
      (e.prototype.getPosition = function (b) {
        let c
        let d
        const e = this._core.settings
        return (
          e.slideBy == 'page'
            ? ((c = a.inArray(this.current(), this._pages)),
              (d = this._pages.length),
              b ? ++c : --c,
              (c = this._pages[((c % d) + d) % d].start))
            : ((c = this._core.relative(this._core.current())),
              (d = this._core.items().length),
              b ? (c += e.slideBy) : (c -= e.slideBy)),
          c
        )
      }),
      (e.prototype.next = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
      }),
      (e.prototype.prev = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
      }),
      (e.prototype.to = function (b, c, d) {
        let e
        !d && this._pages.length
          ? ((e = this._pages.length),
            a.proxy(this._overrides.to, this._core)(
              this._pages[((b % e) + e) % e].start,
              c
            ))
          : a.proxy(this._overrides.to, this._core)(b, c)
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Navigation = e)
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    'use strict'
    var e = function (c) {
      ;(this._core = c),
        (this._hashes = {}),
        (this.$element = this._core.$element),
        (this._handlers = {
          'initialized.owl.carousel': a.proxy(function (c) {
            c.namespace &&
              this._core.settings.startPosition === 'URLHash' &&
              a(b).trigger('hashchange.owl.navigation')
          }, this),
          'prepared.owl.carousel': a.proxy(function (b) {
            if (b.namespace) {
              const c = a(b.content)
                .find('[data-hash]')
                .addBack('[data-hash]')
                .attr('data-hash')
              if (!c) return
              this._hashes[c] = b.content
            }
          }, this),
          'changed.owl.carousel': a.proxy(function (c) {
            if (c.namespace && c.property.name === 'position') {
              const d = this._core.items(
                this._core.relative(this._core.current())
              )
              const e = a
                .map(this._hashes, function (a, b) {
                  return a === d ? b : null
                })
                .join()
              if (!e || b.location.hash.slice(1) === e) return
              b.location.hash = e
            }
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers),
        a(b).on(
          'hashchange.owl.navigation',
          a.proxy(function (a) {
            const c = b.location.hash.substring(1)
            const e = this._core.$stage.children()
            const f = this._hashes[c] && e.index(this._hashes[c])
            f !== d &&
              f !== this._core.current() &&
              this._core.to(this._core.relative(f), !1, !0)
          }, this)
        )
    }
    ;(e.Defaults = { URLhashListener: !1 }),
      (e.prototype.destroy = function () {
        let c, d
        a(b).off('hashchange.owl.navigation')
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c])
        for (d in Object.getOwnPropertyNames(this))
          typeof this[d] !== 'function' && (this[d] = null)
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Hash = e)
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    function e(b, c) {
      let e = !1
      const f = b.charAt(0).toUpperCase() + b.slice(1)
      return (
        a.each((b + ' ' + h.join(f + ' ') + f).split(' '), function (a, b) {
          if (g[b] !== d) return (e = !c || b), !1
        }),
        e
      )
    }
    function f(a) {
      return e(a, !0)
    }
    var g = a('<support>').get(0).style
    var h = 'Webkit Moz O ms'.split(' ')
    const i = {
      transition: {
        end: {
          WebkitTransition: 'webkitTransitionEnd',
          MozTransition: 'transitionend',
          OTransition: 'oTransitionEnd',
          transition: 'transitionend',
        },
      },
      animation: {
        end: {
          WebkitAnimation: 'webkitAnimationEnd',
          MozAnimation: 'animationend',
          OAnimation: 'oAnimationEnd',
          animation: 'animationend',
        },
      },
    }
    const j = {
      csstransforms() {
        return !!e('transform')
      },
      csstransforms3d() {
        return !!e('perspective')
      },
      csstransitions() {
        return !!e('transition')
      },
      cssanimations() {
        return !!e('animation')
      },
    }
    j.csstransitions() &&
      ((a.support.transition = new String(f('transition'))),
      (a.support.transition.end = i.transition.end[a.support.transition])),
      j.cssanimations() &&
        ((a.support.animation = new String(f('animation'))),
        (a.support.animation.end = i.animation.end[a.support.animation])),
      j.csstransforms() &&
        ((a.support.transform = new String(f('transform'))),
        (a.support.transform3d = j.csstransforms3d()))
  })(window.Zepto || window.jQuery, window, document)

// One Page Nav js
!(function (i, t, n, s) {
  const e = function (s, e) {
    ;(this.elem = s),
      (this.$elem = i(s)),
      (this.options = e),
      (this.metadata = this.$elem.data('plugin-options')),
      (this.$win = i(t)),
      (this.sections = {}),
      (this.didScroll = !1),
      (this.$doc = i(n)),
      (this.docHeight = this.$doc.height())
  }
  ;(e.prototype = {
    defaults: {
      navItems: 'a',
      currentClass: 'current',
      changeHash: !1,
      easing: 'swing',
      filter: '',
      scrollSpeed: 750,
      scrollThreshold: 0.5,
      begin: !1,
      end: !1,
      scrollChange: !1,
    },
    init() {
      return (
        (this.config = i.extend(
          {},
          this.defaults,
          this.options,
          this.metadata
        )),
        (this.$nav = this.$elem.find(this.config.navItems)),
        this.config.filter !== '' &&
          (this.$nav = this.$nav.filter(this.config.filter)),
        this.$nav.on('click.onePageNav', i.proxy(this.handleClick, this)),
        this.getPositions(),
        this.bindInterval(),
        this.$win.on('resize.onePageNav', i.proxy(this.getPositions, this)),
        this
      )
    },
    adjustNav(i, t) {
      i.$elem
        .find('.' + i.config.currentClass)
        .removeClass(i.config.currentClass),
        t.addClass(i.config.currentClass)
    },
    bindInterval() {
      let t
      const i = this
      i.$win.on('scroll.onePageNav', function () {
        i.didScroll = !0
      }),
        (i.t = setInterval(function () {
          ;(t = i.$doc.height()),
            i.didScroll && ((i.didScroll = !1), i.scrollChange()),
            t !== i.docHeight && ((i.docHeight = t), i.getPositions())
        }, 250))
    },
    getHash(i) {
      return i.attr('href').split('#')[1]
    },
    getPositions() {
      let n
      let s
      let e
      const t = this
      t.$nav.each(function () {
        ;(n = t.getHash(i(this))),
          (e = i('#' + n)),
          e.length && ((s = e.offset().top), (t.sections[n] = Math.round(s)))
      })
    },
    getSection(i) {
      let t = null
      const n = Math.round(this.$win.height() * this.config.scrollThreshold)
      for (const s in this.sections) this.sections[s] - n < i && (t = s)
      return t
    },
    handleClick(n) {
      const s = this
      const e = i(n.currentTarget)
      const o = e.parent()
      const a = '#' + s.getHash(e)
      o.hasClass(s.config.currentClass) ||
        (s.config.begin && s.config.begin(),
        s.adjustNav(s, o),
        s.unbindInterval(),
        s.scrollTo(a, function () {
          s.config.changeHash && (t.location.hash = a),
            s.bindInterval(),
            s.config.end && s.config.end()
        })),
        n.preventDefault()
    },
    scrollChange() {
      let n
      const i = this.$win.scrollTop()
      const t = this.getSection(i)
      t !== null &&
        ((n = this.$elem.find('a[href$="#' + t + '"]').parent()),
        n.hasClass(this.config.currentClass) ||
          (this.adjustNav(this, n),
          this.config.scrollChange && this.config.scrollChange(n)))
    },
    scrollTo(t, n) {
      const s = i(t).offset().top - 120
      i('html, body').animate(
        {
          scrollTop: s,
        },
        this.config.scrollSpeed,
        this.config.easing,
        n
      )
    },
    unbindInterval() {
      clearInterval(this.t), this.$win.unbind('scroll.onePageNav')
    },
  }),
    (e.defaults = e.prototype.defaults),
    (i.fn.onePageNav = function (i) {
      return this.each(function () {
        new e(this, i).init()
      })
    })
})(jQuery, window, document)

/*!
 * scrollup v2.4.1
 * Url: http://markgoodyear.com/labs/scrollup/
 * Copyright (c) Mark Goodyear — @markgdyr — http://markgoodyear.com
 * License: MIT
 */
!(function (l, o, e) {
  'use strict'
  ;(l.fn.scrollUp = function (o) {
    l.data(e.body, 'scrollUp') ||
      (l.data(e.body, 'scrollUp', !0), l.fn.scrollUp.init(o))
  }),
    (l.fn.scrollUp.init = function (r) {
      let s
      let t
      let c
      let i
      let n
      let a
      let d
      const p = (l.fn.scrollUp.settings = l.extend(
        {},
        l.fn.scrollUp.defaults,
        r
      ))
      let f = !1
      switch (
        ((d = p.scrollTrigger
          ? l(p.scrollTrigger)
          : l('<a/>', { id: p.scrollName, href: '#top' })),
        p.scrollTitle && d.attr('title', p.scrollTitle),
        d.appendTo('body'),
        p.scrollImg || p.scrollTrigger || d.html(p.scrollText),
        d.css({ display: 'none', position: 'fixed', zIndex: p.zIndex }),
        p.activeOverlay &&
          l('<div/>', { id: p.scrollName + '-active' })
            .css({
              position: 'absolute',
              top: p.scrollDistance + 'px',
              width: '100%',
              borderTop: '1px dotted' + p.activeOverlay,
              zIndex: p.zIndex,
            })
            .appendTo('body'),
        p.animation)
      ) {
        case 'fade':
          ;(s = 'fadeIn'), (t = 'fadeOut'), (c = p.animationSpeed)
          break
        case 'slide':
          ;(s = 'slideDown'), (t = 'slideUp'), (c = p.animationSpeed)
          break
        default:
          ;(s = 'show'), (t = 'hide'), (c = 0)
      }
      ;(i =
        p.scrollFrom === 'top'
          ? p.scrollDistance
          : l(e).height() - l(o).height() - p.scrollDistance),
        (n = l(o).scroll(function () {
          l(o).scrollTop() > i
            ? f || (d[s](c), (f = !0))
            : f && (d[t](c), (f = !1))
        })),
        p.scrollTarget
          ? typeof p.scrollTarget === 'number'
            ? (a = p.scrollTarget)
            : typeof p.scrollTarget === 'string' &&
              (a = Math.floor(l(p.scrollTarget).offset().top))
          : (a = 0),
        d.click(function (o) {
          o.preventDefault(),
            l('html, body').animate(
              { scrollTop: a },
              p.scrollSpeed,
              p.easingType
            )
        })
    }),
    (l.fn.scrollUp.defaults = {
      scrollName: 'scrollUp',
      scrollDistance: 300,
      scrollFrom: 'top',
      scrollSpeed: 300,
      easingType: 'linear',
      animation: 'fade',
      animationSpeed: 200,
      scrollTrigger: !1,
      scrollTarget: !1,
      scrollText: 'Scroll to top',
      scrollTitle: !1,
      scrollImg: !1,
      activeOverlay: !1,
      zIndex: 2147483647,
    }),
    (l.fn.scrollUp.destroy = function (r) {
      l.removeData(e.body, 'scrollUp'),
        l('#' + l.fn.scrollUp.settings.scrollName).remove(),
        l('#' + l.fn.scrollUp.settings.scrollName + '-active').remove(),
        l.fn.jquery.split('.')[1] >= 7
          ? l(o).off('scroll', r)
          : l(o).unbind('scroll', r)
    }),
    (l.scrollUp = l.fn.scrollUp)
})(jQuery, window, document)

/*
 * jquery-match-height 0.7.2 by @liabru
 * http://brm.io/jquery-match-height/
 * License MIT
 */
!(function (t) {
  'use strict'
  typeof define === 'function' && define.amd
    ? define(['jquery'], t)
    : typeof module !== 'undefined' && module.exports
    ? (module.exports = t(require('jquery')))
    : t(jQuery)
})(function (t) {
  let e = -1
  let o = -1
  const n = function (t) {
    return parseFloat(t) || 0
  }
  const a = function (e) {
    const o = 1
    const a = t(e)
    let i = null
    const r = []
    return (
      a.each(function () {
        const e = t(this)
        const a = e.offset().top - n(e.css('margin-top'))
        const s = r.length > 0 ? r[r.length - 1] : null
        s === null
          ? r.push(e)
          : Math.floor(Math.abs(i - a)) <= o
          ? (r[r.length - 1] = s.add(e))
          : r.push(e),
          (i = a)
      }),
      r
    )
  }
  const i = function (e) {
    const o = {
      byRow: !0,
      property: 'height',
      target: null,
      remove: !1,
    }
    return typeof e === 'object'
      ? t.extend(o, e)
      : (typeof e === 'boolean'
          ? (o.byRow = e)
          : e === 'remove' && (o.remove = !0),
        o)
  }
  var r = (t.fn.matchHeight = function (e) {
    const o = i(e)
    if (o.remove) {
      const n = this
      return (
        this.css(o.property, ''),
        t.each(r._groups, function (t, e) {
          e.elements = e.elements.not(n)
        }),
        this
      )
    }
    return this.length <= 1 && !o.target
      ? this
      : (r._groups.push({ elements: this, options: o }),
        r._apply(this, o),
        this)
  })
  ;(r.version = '0.7.2'),
    (r._groups = []),
    (r._throttle = 80),
    (r._maintainScroll = !1),
    (r._beforeUpdate = null),
    (r._afterUpdate = null),
    (r._rows = a),
    (r._parse = n),
    (r._parseOptions = i),
    (r._apply = function (e, o) {
      const s = i(o)
      const h = t(e)
      let l = [h]
      const c = t(window).scrollTop()
      const p = t('html').outerHeight(!0)
      const u = h.parents().filter(':hidden')
      return (
        u.each(function () {
          const e = t(this)
          e.data('style-cache', e.attr('style'))
        }),
        u.css('display', 'block'),
        s.byRow &&
          !s.target &&
          (h.each(function () {
            const e = t(this)
            let o = e.css('display')
            o !== 'inline-block' &&
              o !== 'flex' &&
              o !== 'inline-flex' &&
              (o = 'block'),
              e.data('style-cache', e.attr('style')),
              e.css({
                display: o,
                'padding-top': '0',
                'padding-bottom': '0',
                'margin-top': '0',
                'margin-bottom': '0',
                'border-top-width': '0',
                'border-bottom-width': '0',
                height: '100px',
                overflow: 'hidden',
              })
          }),
          (l = a(h)),
          h.each(function () {
            const e = t(this)
            e.attr('style', e.data('style-cache') || '')
          })),
        t.each(l, function (e, o) {
          const a = t(o)
          let i = 0
          if (s.target) i = s.target.outerHeight(!1)
          else {
            if (s.byRow && a.length <= 1) return void a.css(s.property, '')
            a.each(function () {
              const e = t(this)
              const o = e.attr('style')
              let n = e.css('display')
              n !== 'inline-block' &&
                n !== 'flex' &&
                n !== 'inline-flex' &&
                (n = 'block')
              const a = {
                display: n,
              }
              ;(a[s.property] = ''),
                e.css(a),
                e.outerHeight(!1) > i && (i = e.outerHeight(!1)),
                o ? e.attr('style', o) : e.css('display', '')
            })
          }
          a.each(function () {
            const e = t(this)
            let o = 0
            ;(s.target && e.is(s.target)) ||
              (e.css('box-sizing') !== 'border-box' &&
                ((o +=
                  n(e.css('border-top-width')) +
                  n(e.css('border-bottom-width'))),
                (o += n(e.css('padding-top')) + n(e.css('padding-bottom')))),
              e.css(s.property, i - o + 'px'))
          })
        }),
        u.each(function () {
          const e = t(this)
          e.attr('style', e.data('style-cache') || null)
        }),
        r._maintainScroll &&
          t(window).scrollTop((c / p) * t('html').outerHeight(!0)),
        this
      )
    }),
    (r._applyDataApi = function () {
      const e = {}
      t('[data-match-height], [data-mh]').each(function () {
        const o = t(this)
        const n = o.attr('data-mh') || o.attr('data-match-height')
        n in e ? (e[n] = e[n].add(o)) : (e[n] = o)
      }),
        t.each(e, function () {
          this.matchHeight(!0)
        })
    })
  const s = function (e) {
    r._beforeUpdate && r._beforeUpdate(e, r._groups),
      t.each(r._groups, function () {
        r._apply(this.elements, this.options)
      }),
      r._afterUpdate && r._afterUpdate(e, r._groups)
  }
  ;(r._update = function (n, a) {
    if (a && a.type === 'resize') {
      const i = t(window).width()
      if (i === e) return
      e = i
    }
    n
      ? o === -1 &&
        (o = setTimeout(function () {
          s(a), (o = -1)
        }, r._throttle))
      : s(a)
  }),
    t(r._applyDataApi)
  const h = t.fn.on ? 'on' : 'bind'
  t(window)[h]('load', function (t) {
    r._update(!1, t)
  }),
    t(window)[h]('resize orientationchange', function (t) {
      r._update(!0, t)
    })
})

/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
;(function () {
  const t =
    [].indexOf ||
    function (t) {
      for (let e = 0, n = this.length; e < n; e++) {
        if (e in this && this[e] === t) return e
      }
      return -1
    }
  const e = [].slice
  ;(function (t, e) {
    if (typeof define === 'function' && define.amd) {
      return define('waypoints', ['jquery'], function (n) {
        return e(n, t)
      })
    } else {
      return e(t.jQuery, t)
    }
  })(this, function (n, r) {
    let i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m
    i = n(r)
    c = t.call(r, 'ontouchstart') >= 0
    s = { horizontal: {}, vertical: {} }
    f = 1
    a = {}
    u = 'waypoints-context-id'
    p = 'resize.waypoints'
    y = 'scroll.waypoints'
    v = 1
    w = 'waypoints-waypoint-ids'
    g = 'waypoint'
    m = 'waypoints'
    o = (function () {
      function t(t) {
        const e = this
        this.$element = t
        this.element = t[0]
        this.didResize = false
        this.didScroll = false
        this.id = 'context' + f++
        this.oldScroll = { x: t.scrollLeft(), y: t.scrollTop() }
        this.waypoints = { horizontal: {}, vertical: {} }
        t.data(u, this.id)
        a[this.id] = this
        t.bind(y, function () {
          let t
          if (!(e.didScroll || c)) {
            e.didScroll = true
            t = function () {
              e.doScroll()
              return (e.didScroll = false)
            }
            return r.setTimeout(t, n[m].settings.scrollThrottle)
          }
        })
        t.bind(p, function () {
          let t
          if (!e.didResize) {
            e.didResize = true
            t = function () {
              n[m]('refresh')
              return (e.didResize = false)
            }
            return r.setTimeout(t, n[m].settings.resizeThrottle)
          }
        })
      }
      t.prototype.doScroll = function () {
        let t
        const e = this
        t = {
          horizontal: {
            newScroll: this.$element.scrollLeft(),
            oldScroll: this.oldScroll.x,
            forward: 'right',
            backward: 'left',
          },
          vertical: {
            newScroll: this.$element.scrollTop(),
            oldScroll: this.oldScroll.y,
            forward: 'down',
            backward: 'up',
          },
        }
        if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
          n[m]('refresh')
        }
        n.each(t, function (t, r) {
          let i, o, l
          l = []
          o = r.newScroll > r.oldScroll
          i = o ? r.forward : r.backward
          n.each(e.waypoints[t], function (t, e) {
            let n, i
            if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
              return l.push(e)
            } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
              return l.push(e)
            }
          })
          l.sort(function (t, e) {
            return t.offset - e.offset
          })
          if (!o) {
            l.reverse()
          }
          return n.each(l, function (t, e) {
            if (e.options.continuous || t === l.length - 1) {
              return e.trigger([i])
            }
          })
        })
        return (this.oldScroll = {
          x: t.horizontal.newScroll,
          y: t.vertical.newScroll,
        })
      }
      t.prototype.refresh = function () {
        let t
        let e
        let r
        const i = this
        r = n.isWindow(this.element)
        e = this.$element.offset()
        this.doScroll()
        t = {
          horizontal: {
            contextOffset: r ? 0 : e.left,
            contextScroll: r ? 0 : this.oldScroll.x,
            contextDimension: this.$element.width(),
            oldScroll: this.oldScroll.x,
            forward: 'right',
            backward: 'left',
            offsetProp: 'left',
          },
          vertical: {
            contextOffset: r ? 0 : e.top,
            contextScroll: r ? 0 : this.oldScroll.y,
            contextDimension: r
              ? n[m]('viewportHeight')
              : this.$element.height(),
            oldScroll: this.oldScroll.y,
            forward: 'down',
            backward: 'up',
            offsetProp: 'top',
          },
        }
        return n.each(t, function (t, e) {
          return n.each(i.waypoints[t], function (t, r) {
            let i, o, l, s, f
            i = r.options.offset
            l = r.offset
            o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp]
            if (n.isFunction(i)) {
              i = i.apply(r.element)
            } else if (typeof i === 'string') {
              i = parseFloat(i)
              if (r.options.offset.includes('%')) {
                i = Math.ceil((e.contextDimension * i) / 100)
              }
            }
            r.offset = o - e.contextOffset + e.contextScroll - i
            if ((r.options.onlyOnScroll && l != null) || !r.enabled) {
              return
            }
            if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
              return r.trigger([e.backward])
            } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
              return r.trigger([e.forward])
            } else if (l === null && e.oldScroll >= r.offset) {
              return r.trigger([e.forward])
            }
          })
        })
      }
      t.prototype.checkEmpty = function () {
        if (
          n.isEmptyObject(this.waypoints.horizontal) &&
          n.isEmptyObject(this.waypoints.vertical)
        ) {
          this.$element.unbind([p, y].join(' '))
          return delete a[this.id]
        }
      }
      return t
    })()
    l = (function () {
      function t(t, e, r) {
        let i, o
        r = n.extend({}, n.fn[g].defaults, r)
        if (r.offset === 'bottom-in-view') {
          r.offset = function () {
            let t
            t = n[m]('viewportHeight')
            if (!n.isWindow(e.element)) {
              t = e.$element.height()
            }
            return t - n(this).outerHeight()
          }
        }
        this.$element = t
        this.element = t[0]
        this.axis = r.horizontal ? 'horizontal' : 'vertical'
        this.callback = r.handler
        this.context = e
        this.enabled = r.enabled
        this.id = 'waypoints' + v++
        this.offset = null
        this.options = r
        e.waypoints[this.axis][this.id] = this
        s[this.axis][this.id] = this
        i = (o = t.data(w)) != null ? o : []
        i.push(this.id)
        t.data(w, i)
      }
      t.prototype.trigger = function (t) {
        if (!this.enabled) {
          return
        }
        if (this.callback != null) {
          this.callback.apply(this.element, t)
        }
        if (this.options.triggerOnce) {
          return this.destroy()
        }
      }
      t.prototype.disable = function () {
        return (this.enabled = false)
      }
      t.prototype.enable = function () {
        this.context.refresh()
        return (this.enabled = true)
      }
      t.prototype.destroy = function () {
        delete s[this.axis][this.id]
        delete this.context.waypoints[this.axis][this.id]
        return this.context.checkEmpty()
      }
      t.getWaypointsByElement = function (t) {
        let e, r
        r = n(t).data(w)
        if (!r) {
          return []
        }
        e = n.extend({}, s.horizontal, s.vertical)
        return n.map(r, function (t) {
          return e[t]
        })
      }
      return t
    })()
    d = {
      init(t, e) {
        let r
        if (e == null) {
          e = {}
        }
        if ((r = e.handler) == null) {
          e.handler = t
        }
        this.each(function () {
          let t, r, i, s
          t = n(this)
          i = (s = e.context) != null ? s : n.fn[g].defaults.context
          if (!n.isWindow(i)) {
            i = t.closest(i)
          }
          i = n(i)
          r = a[i.data(u)]
          if (!r) {
            r = new o(i)
          }
          return new l(t, r, e)
        })
        n[m]('refresh')
        return this
      },
      disable() {
        return d._invoke(this, 'disable')
      },
      enable() {
        return d._invoke(this, 'enable')
      },
      destroy() {
        return d._invoke(this, 'destroy')
      },
      prev(t, e) {
        return d._traverse.call(this, t, e, function (t, e, n) {
          if (e > 0) {
            return t.push(n[e - 1])
          }
        })
      },
      next(t, e) {
        return d._traverse.call(this, t, e, function (t, e, n) {
          if (e < n.length - 1) {
            return t.push(n[e + 1])
          }
        })
      },
      _traverse(t, e, i) {
        let o, l
        if (t == null) {
          t = 'vertical'
        }
        if (e == null) {
          e = r
        }
        l = h.aggregate(e)
        o = []
        this.each(function () {
          let e
          e = n.inArray(this, l[t])
          return i(o, e, l[t])
        })
        return this.pushStack(o)
      },
      _invoke(t, e) {
        t.each(function () {
          let t
          t = l.getWaypointsByElement(this)
          return n.each(t, function (t, n) {
            n[e]()
            return true
          })
        })
        return this
      },
    }
    n.fn[g] = function () {
      let t, r
      ;(r = arguments[0]),
        (t = arguments.length >= 2 ? e.call(arguments, 1) : [])
      if (d[r]) {
        return d[r].apply(this, t)
      } else if (n.isFunction(r)) {
        return d.init.apply(this, arguments)
      } else if (n.isPlainObject(r)) {
        return d.init.apply(this, [null, r])
      } else if (!r) {
        return n.error(
          'jQuery Waypoints needs a callback function or handler option.'
        )
      } else {
        return n.error(
          'The ' + r + ' method does not exist in jQuery Waypoints.'
        )
      }
    }
    n.fn[g].defaults = {
      context: r,
      continuous: true,
      enabled: true,
      horizontal: false,
      offset: 0,
      triggerOnce: false,
    }
    h = {
      refresh() {
        return n.each(a, function (t, e) {
          return e.refresh()
        })
      },
      viewportHeight() {
        let t
        return (t = r.innerHeight) != null ? t : i.height()
      },
      aggregate(t) {
        let e, r, i
        e = s
        if (t) {
          e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0
        }
        if (!e) {
          return []
        }
        r = { horizontal: [], vertical: [] }
        n.each(r, function (t, i) {
          n.each(e[t], function (t, e) {
            return i.push(e)
          })
          i.sort(function (t, e) {
            return t.offset - e.offset
          })
          r[t] = n.map(i, function (t) {
            return t.element
          })
          return (r[t] = n.unique(r[t]))
        })
        return r
      },
      above(t) {
        if (t == null) {
          t = r
        }
        return h._filter(t, 'vertical', function (t, e) {
          return e.offset <= t.oldScroll.y
        })
      },
      below(t) {
        if (t == null) {
          t = r
        }
        return h._filter(t, 'vertical', function (t, e) {
          return e.offset > t.oldScroll.y
        })
      },
      left(t) {
        if (t == null) {
          t = r
        }
        return h._filter(t, 'horizontal', function (t, e) {
          return e.offset <= t.oldScroll.x
        })
      },
      right(t) {
        if (t == null) {
          t = r
        }
        return h._filter(t, 'horizontal', function (t, e) {
          return e.offset > t.oldScroll.x
        })
      },
      enable() {
        return h._invoke('enable')
      },
      disable() {
        return h._invoke('disable')
      },
      destroy() {
        return h._invoke('destroy')
      },
      extendFn(t, e) {
        return (d[t] = e)
      },
      _invoke(t) {
        let e
        e = n.extend({}, s.vertical, s.horizontal)
        return n.each(e, function (e, n) {
          n[t]()
          return true
        })
      },
      _filter(t, e, r) {
        let i, o
        i = a[n(t).data(u)]
        if (!i) {
          return []
        }
        o = []
        n.each(i.waypoints[e], function (t, e) {
          if (r(i, e)) {
            return o.push(e)
          }
        })
        o.sort(function (t, e) {
          return t.offset - e.offset
        })
        return n.map(o, function (t) {
          return t.element
        })
      },
    }
    n[m] = function () {
      let t, n
      ;(n = arguments[0]),
        (t = arguments.length >= 2 ? e.call(arguments, 1) : [])
      if (h[n]) {
        return h[n].apply(null, t)
      } else {
        return h.aggregate.call(null, n)
      }
    }
    n[m].settings = { resizeThrottle: 100, scrollThrottle: 30 }
    return i.load(function () {
      return n[m]('refresh')
    })
  })
}.call(this))

/*! WOW - v1.1.3 - 2016-05-06
 * Copyright (c) 2016 Matthieu Aussaguel; */
;(function () {
  let a
  let b
  let c
  let d
  let e
  const f = function (a, b) {
    return function () {
      return a.apply(b, arguments)
    }
  }
  const g =
    [].indexOf ||
    function (a) {
      for (let b = 0, c = this.length; c > b; b++)
        if (b in this && this[b] === a) return b
      return -1
    }
  ;(b = (function () {
    function a() {}
    return (
      (a.prototype.extend = function (a, b) {
        let c, d
        for (c in b) (d = b[c]), a[c] == null && (a[c] = d)
        return a
      }),
      (a.prototype.isMobile = function (a) {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          a
        )
      }),
      (a.prototype.createEvent = function (a, b, c, d) {
        let e
        return (
          b == null && (b = !1),
          c == null && (c = !1),
          d == null && (d = null),
          document.createEvent != null
            ? ((e = document.createEvent('CustomEvent')),
              e.initCustomEvent(a, b, c, d))
            : document.createEventObject != null
            ? ((e = document.createEventObject()), (e.eventType = a))
            : (e.eventName = a),
          e
        )
      }),
      (a.prototype.emitEvent = function (a, b) {
        return a.dispatchEvent != null
          ? a.dispatchEvent(b)
          : b in (a != null)
          ? a[b]()
          : 'on' + b in (a != null)
          ? a['on' + b]()
          : void 0
      }),
      (a.prototype.addEvent = function (a, b, c) {
        return a.addEventListener != null
          ? a.addEventListener(b, c, !1)
          : a.attachEvent != null
          ? a.attachEvent('on' + b, c)
          : (a[b] = c)
      }),
      (a.prototype.removeEvent = function (a, b, c) {
        return a.removeEventListener != null
          ? a.removeEventListener(b, c, !1)
          : a.detachEvent != null
          ? a.detachEvent('on' + b, c)
          : delete a[b]
      }),
      (a.prototype.innerHeight = function () {
        return 'innerHeight' in window
          ? window.innerHeight
          : document.documentElement.clientHeight
      }),
      a
    )
  })()),
    (c =
      this.WeakMap ||
      this.MozWeakMap ||
      (c = (function () {
        function a() {
          ;(this.keys = []), (this.values = [])
        }
        return (
          (a.prototype.get = function (a) {
            let b, c, d, e, f
            for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
              if (((c = f[b]), c === a)) return this.values[b]
          }),
          (a.prototype.set = function (a, b) {
            let c, d, e, f, g
            for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
              if (((d = g[c]), d === a)) return void (this.values[c] = b)
            return this.keys.push(a), this.values.push(b)
          }),
          a
        )
      })())),
    (a =
      this.MutationObserver ||
      this.WebkitMutationObserver ||
      this.MozMutationObserver ||
      (a = (function () {
        function a() {
          typeof console !== 'undefined' &&
            console !== null &&
            console.warn('MutationObserver is not supported by your browser.'),
            typeof console !== 'undefined' &&
              console !== null &&
              console.warn(
                'WOW.js cannot detect dom mutations, please call .sync() after loading new content.'
              )
        }
        return (a.notSupported = !0), (a.prototype.observe = function () {}), a
      })())),
    (d =
      this.getComputedStyle ||
      function (a, b) {
        return (
          (this.getPropertyValue = function (b) {
            let c
            return (
              b === 'float' && (b = 'styleFloat'),
              e.test(b) &&
                b.replace(e, function (a, b) {
                  return b.toUpperCase()
                }),
              ((c = a.currentStyle) != null ? c[b] : void 0) || null
            )
          }),
          this
        )
      }),
    (e = /(\-([a-z]){1})/g),
    (this.WOW = (function () {
      function e(a) {
        a == null && (a = {}),
          (this.scrollCallback = f(this.scrollCallback, this)),
          (this.scrollHandler = f(this.scrollHandler, this)),
          (this.resetAnimation = f(this.resetAnimation, this)),
          (this.start = f(this.start, this)),
          (this.scrolled = !0),
          (this.config = this.util().extend(a, this.defaults)),
          a.scrollContainer != null &&
            (this.config.scrollContainer = document.querySelector(
              a.scrollContainer
            )),
          (this.animationNameCache = new c()),
          (this.wowEvent = this.util().createEvent(this.config.boxClass))
      }
      return (
        (e.prototype.defaults = {
          boxClass: 'wow',
          animateClass: 'animated',
          offset: 0,
          mobile: !0,
          live: !0,
          callback: null,
          scrollContainer: null,
        }),
        (e.prototype.init = function () {
          let a
          return (
            (this.element = window.document.documentElement),
            (a = document.readyState) === 'interactive' || a === 'complete'
              ? this.start()
              : this.util().addEvent(document, 'DOMContentLoaded', this.start),
            (this.finished = [])
          )
        }),
        (e.prototype.start = function () {
          let b, c, d, e
          if (
            ((this.stopped = !1),
            (this.boxes = function () {
              let a, c, d, e
              for (
                d = this.element.querySelectorAll('.' + this.config.boxClass),
                  e = [],
                  a = 0,
                  c = d.length;
                c > a;
                a++
              )
                (b = d[a]), e.push(b)
              return e
            }.call(this)),
            (this.all = function () {
              let a, c, d, e
              for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++)
                (b = d[a]), e.push(b)
              return e
            }.call(this)),
            this.boxes.length)
          )
            if (this.disabled()) this.resetStyle()
            else
              for (e = this.boxes, c = 0, d = e.length; d > c; c++)
                (b = e[c]), this.applyStyle(b, !0)
          return (
            this.disabled() ||
              (this.util().addEvent(
                this.config.scrollContainer || window,
                'scroll',
                this.scrollHandler
              ),
              this.util().addEvent(window, 'resize', this.scrollHandler),
              (this.interval = setInterval(this.scrollCallback, 50))),
            this.config.live
              ? new a(
                  (function (a) {
                    return function (b) {
                      let c, d, e, f, g
                      for (g = [], c = 0, d = b.length; d > c; c++)
                        (f = b[c]),
                          g.push(
                            function () {
                              let a, b, c, d
                              for (
                                c = f.addedNodes || [],
                                  d = [],
                                  a = 0,
                                  b = c.length;
                                b > a;
                                a++
                              )
                                (e = c[a]), d.push(this.doSync(e))
                              return d
                            }.call(a)
                          )
                      return g
                    }
                  })(this)
                ).observe(document.body, { childList: !0, subtree: !0 })
              : void 0
          )
        }),
        (e.prototype.stop = function () {
          return (
            (this.stopped = !0),
            this.util().removeEvent(
              this.config.scrollContainer || window,
              'scroll',
              this.scrollHandler
            ),
            this.util().removeEvent(window, 'resize', this.scrollHandler),
            this.interval != null ? clearInterval(this.interval) : void 0
          )
        }),
        (e.prototype.sync = function (b) {
          return a.notSupported ? this.doSync(this.element) : void 0
        }),
        (e.prototype.doSync = function (a) {
          let b, c, d, e, f
          if ((a == null && (a = this.element), a.nodeType === 1)) {
            for (
              a = a.parentNode || a,
                e = a.querySelectorAll('.' + this.config.boxClass),
                f = [],
                c = 0,
                d = e.length;
              d > c;
              c++
            )
              (b = e[c]),
                g.call(this.all, b) < 0
                  ? (this.boxes.push(b),
                    this.all.push(b),
                    this.stopped || this.disabled()
                      ? this.resetStyle()
                      : this.applyStyle(b, !0),
                    f.push((this.scrolled = !0)))
                  : f.push(void 0)
            return f
          }
        }),
        (e.prototype.show = function (a) {
          return (
            this.applyStyle(a),
            (a.className = a.className + ' ' + this.config.animateClass),
            this.config.callback != null && this.config.callback(a),
            this.util().emitEvent(a, this.wowEvent),
            this.util().addEvent(a, 'animationend', this.resetAnimation),
            this.util().addEvent(a, 'oanimationend', this.resetAnimation),
            this.util().addEvent(a, 'webkitAnimationEnd', this.resetAnimation),
            this.util().addEvent(a, 'MSAnimationEnd', this.resetAnimation),
            a
          )
        }),
        (e.prototype.applyStyle = function (a, b) {
          let c, d, e
          return (
            (d = a.getAttribute('data-wow-duration')),
            (c = a.getAttribute('data-wow-delay')),
            (e = a.getAttribute('data-wow-iteration')),
            this.animate(
              (function (f) {
                return function () {
                  return f.customStyle(a, b, d, c, e)
                }
              })(this)
            )
          )
        }),
        (e.prototype.animate = (function () {
          return 'requestAnimationFrame' in window
            ? function (a) {
                return window.requestAnimationFrame(a)
              }
            : function (a) {
                return a()
              }
        })()),
        (e.prototype.resetStyle = function () {
          let a, b, c, d, e
          for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
            (a = d[b]), e.push((a.style.visibility = 'visible'))
          return e
        }),
        (e.prototype.resetAnimation = function (a) {
          let b
          return a.type.toLowerCase().includes('animationend')
            ? ((b = a.target || a.srcElement),
              (b.className = b.className
                .replace(this.config.animateClass, '')
                .trim()))
            : void 0
        }),
        (e.prototype.customStyle = function (a, b, c, d, e) {
          return (
            b && this.cacheAnimationName(a),
            (a.style.visibility = b ? 'hidden' : 'visible'),
            c && this.vendorSet(a.style, { animationDuration: c }),
            d && this.vendorSet(a.style, { animationDelay: d }),
            e && this.vendorSet(a.style, { animationIterationCount: e }),
            this.vendorSet(a.style, {
              animationName: b ? 'none' : this.cachedAnimationName(a),
            }),
            a
          )
        }),
        (e.prototype.vendors = ['moz', 'webkit']),
        (e.prototype.vendorSet = function (a, b) {
          let c, d, e, f
          d = []
          for (c in b)
            (e = b[c]),
              (a['' + c] = e),
              d.push(
                function () {
                  let b, d, g, h
                  for (
                    g = this.vendors, h = [], b = 0, d = g.length;
                    d > b;
                    b++
                  )
                    (f = g[b]),
                      h.push(
                        (a['' + f + c.charAt(0).toUpperCase() + c.substr(1)] =
                          e)
                      )
                  return h
                }.call(this)
              )
          return d
        }),
        (e.prototype.vendorCSS = function (a, b) {
          let c, e, f, g, h, i
          for (
            h = d(a),
              g = h.getPropertyCSSValue(b),
              f = this.vendors,
              c = 0,
              e = f.length;
            e > c;
            c++
          )
            (i = f[c]), (g = g || h.getPropertyCSSValue('-' + i + '-' + b))
          return g
        }),
        (e.prototype.animationName = function (a) {
          let b
          try {
            b = this.vendorCSS(a, 'animation-name').cssText
          } catch (c) {
            b = d(a).getPropertyValue('animation-name')
          }
          return b === 'none' ? '' : b
        }),
        (e.prototype.cacheAnimationName = function (a) {
          return this.animationNameCache.set(a, this.animationName(a))
        }),
        (e.prototype.cachedAnimationName = function (a) {
          return this.animationNameCache.get(a)
        }),
        (e.prototype.scrollHandler = function () {
          return (this.scrolled = !0)
        }),
        (e.prototype.scrollCallback = function () {
          let a
          return !this.scrolled ||
            ((this.scrolled = !1),
            (this.boxes = function () {
              let b, c, d, e
              for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
                (a = d[b]), a && (this.isVisible(a) ? this.show(a) : e.push(a))
              return e
            }.call(this)),
            this.boxes.length || this.config.live)
            ? void 0
            : this.stop()
        }),
        (e.prototype.offsetTop = function (a) {
          for (var b; void 0 === a.offsetTop; ) a = a.parentNode
          for (b = a.offsetTop; (a = a.offsetParent); ) b += a.offsetTop
          return b
        }),
        (e.prototype.isVisible = function (a) {
          let b, c, d, e, f
          return (
            (c = a.getAttribute('data-wow-offset') || this.config.offset),
            (f =
              (this.config.scrollContainer &&
                this.config.scrollContainer.scrollTop) ||
              window.pageYOffset),
            (e =
              f +
              Math.min(this.element.clientHeight, this.util().innerHeight()) -
              c),
            (d = this.offsetTop(a)),
            (b = d + a.clientHeight),
            e >= d && b >= f
          )
        }),
        (e.prototype.util = function () {
          return this._util != null ? this._util : (this._util = new b())
        }),
        (e.prototype.disabled = function () {
          return (
            !this.config.mobile && this.util().isMobile(navigator.userAgent)
          )
        }),
        e
      )
    })())
}.call(this))

/*!
 * The Final Countdown for jQuery v2.2.0 (http://hilios.github.io/jQuery.countdown/)
 * Copyright (c) 2016 Edson Hilios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
!(function (a) {
  'use strict'
  typeof define === 'function' && define.amd ? define(['jquery'], a) : a(jQuery)
})(function (a) {
  'use strict'
  function b(a) {
    if (a instanceof Date) return a
    if (String(a).match(g))
      return (
        String(a).match(/^[0-9]*$/) && (a = Number(a)),
        String(a).match(/\-/) && (a = String(a).replace(/\-/g, '/')),
        new Date(a)
      )
    throw new Error("Couldn't cast `" + a + '` to a date object.')
  }
  function c(a) {
    const b = a.toString().replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')
    return new RegExp(b)
  }
  function d(a) {
    return function (b) {
      const d = b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi)
      if (d)
        for (let f = 0, g = d.length; f < g; ++f) {
          let h = d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/)
          const j = c(h[0])
          const k = h[1] || ''
          const l = h[3] || ''
          let m = null
          ;(h = h[2]),
            i.hasOwnProperty(h) && ((m = i[h]), (m = Number(a[m]))),
            m !== null &&
              (k === '!' && (m = e(l, m)),
              k === '' && m < 10 && (m = '0' + m.toString()),
              (b = b.replace(j, m.toString())))
        }
      return (b = b.replace(/%%/, '%'))
    }
  }
  function e(a, b) {
    let c = 's'
    let d = ''
    return (
      a &&
        ((a = a.replace(/(:|;|\s)/gi, '').split(/\,/)),
        a.length === 1 ? (c = a[0]) : ((d = a[0]), (c = a[1]))),
      Math.abs(b) > 1 ? c : d
    )
  }
  const f = []
  var g = []
  const h = { precision: 100, elapse: !1, defer: !1 }
  g.push(/^[0-9]*$/.source),
    g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),
    g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),
    (g = new RegExp(g.join('|')))
  var i = {
    Y: 'years',
    m: 'months',
    n: 'daysToMonth',
    d: 'daysToWeek',
    w: 'weeks',
    W: 'weeksToMonth',
    H: 'hours',
    M: 'minutes',
    S: 'seconds',
    D: 'totalDays',
    I: 'totalHours',
    N: 'totalMinutes',
    T: 'totalSeconds',
  }
  const j = function (b, c, d) {
    ;(this.el = b),
      (this.$el = a(b)),
      (this.interval = null),
      (this.offset = {}),
      (this.options = a.extend({}, h)),
      (this.instanceNumber = f.length),
      f.push(this),
      this.$el.data('countdown-instance', this.instanceNumber),
      d &&
        (typeof d === 'function'
          ? (this.$el.on('update.countdown', d),
            this.$el.on('stoped.countdown', d),
            this.$el.on('finish.countdown', d))
          : (this.options = a.extend({}, h, d))),
      this.setFinalDate(c),
      this.options.defer === !1 && this.start()
  }
  a.extend(j.prototype, {
    start() {
      this.interval !== null && clearInterval(this.interval)
      const a = this
      this.update(),
        (this.interval = setInterval(function () {
          a.update.call(a)
        }, this.options.precision))
    },
    stop() {
      clearInterval(this.interval),
        (this.interval = null),
        this.dispatchEvent('stoped')
    },
    toggle() {
      this.interval ? this.stop() : this.start()
    },
    pause() {
      this.stop()
    },
    resume() {
      this.start()
    },
    remove() {
      this.stop.call(this),
        (f[this.instanceNumber] = null),
        delete this.$el.data().countdownInstance
    },
    setFinalDate(a) {
      this.finalDate = b(a)
    },
    update() {
      if (this.$el.closest('html').length === 0) return void this.remove()
      let b
      const c = void 0 !== a._data(this.el, 'events')
      const d = new Date()
      ;(b = this.finalDate.getTime() - d.getTime()),
        (b = Math.ceil(b / 1e3)),
        (b = !this.options.elapse && b < 0 ? 0 : Math.abs(b)),
        this.totalSecsLeft !== b &&
          c &&
          ((this.totalSecsLeft = b),
          (this.elapsed = d >= this.finalDate),
          (this.offset = {
            seconds: this.totalSecsLeft % 60,
            minutes: Math.floor(this.totalSecsLeft / 60) % 60,
            hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
            days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
            daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
            daysToMonth: Math.floor(
              (this.totalSecsLeft / 60 / 60 / 24) % 30.4368
            ),
            weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
            weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
            months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
            years: Math.abs(this.finalDate.getFullYear() - d.getFullYear()),
            totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
            totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
            totalMinutes: Math.floor(this.totalSecsLeft / 60),
            totalSeconds: this.totalSecsLeft,
          }),
          this.options.elapse || this.totalSecsLeft !== 0
            ? this.dispatchEvent('update')
            : (this.stop(), this.dispatchEvent('finish')))
    },
    dispatchEvent(b) {
      const c = a.Event(b + '.countdown')
      ;(c.finalDate = this.finalDate),
        (c.elapsed = this.elapsed),
        (c.offset = a.extend({}, this.offset)),
        (c.strftime = d(this.offset)),
        this.$el.trigger(c)
    },
  }),
    (a.fn.countdown = function () {
      const b = Array.prototype.slice.call(arguments, 0)
      return this.each(function () {
        const c = a(this).data('countdown-instance')
        if (void 0 !== c) {
          const d = f[c]
          const e = b[0]
          j.prototype.hasOwnProperty(e)
            ? d[e].apply(d, b.slice(1))
            : String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i) === null
            ? (d.setFinalDate.call(d, e), d.start())
            : a.error(
                'Method %s does not exist on jQuery.countdown'.replace(
                  /\%s/gi,
                  e
                )
              )
        } else new j(this, b[0], b[1])
      })
    })
})

/*!
 * imagesLoaded PACKAGED v4.1.1
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!(function (t, e) {
  typeof define === 'function' && define.amd
    ? define('ev-emitter/ev-emitter', e)
    : typeof module === 'object' && module.exports
    ? (module.exports = e())
    : (t.EvEmitter = e())
})(typeof window !== 'undefined' ? window : this, function () {
  function t() {}
  const e = t.prototype
  return (
    (e.on = function (t, e) {
      if (t && e) {
        const i = (this._events = this._events || {})
        const n = (i[t] = i[t] || [])
        return !n.includes(e) && n.push(e), this
      }
    }),
    (e.once = function (t, e) {
      if (t && e) {
        this.on(t, e)
        const i = (this._onceEvents = this._onceEvents || {})
        const n = (i[t] = i[t] || {})
        return (n[e] = !0), this
      }
    }),
    (e.off = function (t, e) {
      const i = this._events && this._events[t]
      if (i && i.length) {
        const n = i.indexOf(e)
        return n != -1 && i.splice(n, 1), this
      }
    }),
    (e.emitEvent = function (t, e) {
      const i = this._events && this._events[t]
      if (i && i.length) {
        let n = 0
        let o = i[n]
        e = e || []
        for (let r = this._onceEvents && this._onceEvents[t]; o; ) {
          const s = r && r[o]
          s && (this.off(t, o), delete r[o]),
            o.apply(this, e),
            (n += s ? 0 : 1),
            (o = i[n])
        }
        return this
      }
    }),
    t
  )
}),
  (function (t, e) {
    'use strict'
    typeof define === 'function' && define.amd
      ? define(['ev-emitter/ev-emitter'], function (i) {
          return e(t, i)
        })
      : typeof module === 'object' && module.exports
      ? (module.exports = e(t, require('ev-emitter')))
      : (t.imagesLoaded = e(t, t.EvEmitter))
  })(window, function (t, e) {
    function i(t, e) {
      for (const i in e) t[i] = e[i]
      return t
    }
    function n(t) {
      let e = []
      if (Array.isArray(t)) e = t
      else if (typeof t.length === 'number')
        for (let i = 0; i < t.length; i++) e.push(t[i])
      else e.push(t)
      return e
    }
    function o(t, e, r) {
      return this instanceof o
        ? (typeof t === 'string' && (t = document.querySelectorAll(t)),
          (this.elements = n(t)),
          (this.options = i({}, this.options)),
          typeof e === 'function' ? (r = e) : i(this.options, e),
          r && this.on('always', r),
          this.getImages(),
          h && (this.jqDeferred = new h.Deferred()),
          void setTimeout(
            function () {
              this.check()
            }.bind(this)
          ))
        : new o(t, e, r)
    }
    function r(t) {
      this.img = t
    }
    function s(t, e) {
      ;(this.url = t), (this.element = e), (this.img = new Image())
    }
    var h = t.jQuery
    const a = t.console
    ;(o.prototype = Object.create(e.prototype)),
      (o.prototype.options = {}),
      (o.prototype.getImages = function () {
        ;(this.images = []), this.elements.forEach(this.addElementImages, this)
      }),
      (o.prototype.addElementImages = function (t) {
        t.nodeName == 'IMG' && this.addImage(t),
          this.options.background === !0 && this.addElementBackgroundImages(t)
        const e = t.nodeType
        if (e && d[e]) {
          for (var i = t.querySelectorAll('img'), n = 0; n < i.length; n++) {
            const o = i[n]
            this.addImage(o)
          }
          if (typeof this.options.background === 'string') {
            const r = t.querySelectorAll(this.options.background)
            for (n = 0; n < r.length; n++) {
              const s = r[n]
              this.addElementBackgroundImages(s)
            }
          }
        }
      })
    var d = { 1: !0, 9: !0, 11: !0 }
    return (
      (o.prototype.addElementBackgroundImages = function (t) {
        const e = getComputedStyle(t)
        if (e)
          for (
            let i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage);
            n !== null;

          ) {
            const o = n && n[2]
            o && this.addBackground(o, t), (n = i.exec(e.backgroundImage))
          }
      }),
      (o.prototype.addImage = function (t) {
        const e = new r(t)
        this.images.push(e)
      }),
      (o.prototype.addBackground = function (t, e) {
        const i = new s(t, e)
        this.images.push(i)
      }),
      (o.prototype.check = function () {
        function t(t, i, n) {
          setTimeout(function () {
            e.progress(t, i, n)
          })
        }
        var e = this
        return (
          (this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length
            ? void this.images.forEach(function (e) {
                e.once('progress', t), e.check()
              })
            : void this.complete()
        )
      }),
      (o.prototype.progress = function (t, e, i) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
          this.emitEvent('progress', [this, t, e]),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, t),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && a && a.log('progress: ' + i, t, e)
      }),
      (o.prototype.complete = function () {
        const t = this.hasAnyBroken ? 'fail' : 'done'
        if (
          ((this.isComplete = !0),
          this.emitEvent(t, [this]),
          this.emitEvent('always', [this]),
          this.jqDeferred)
        ) {
          const e = this.hasAnyBroken ? 'reject' : 'resolve'
          this.jqDeferred[e](this)
        }
      }),
      (r.prototype = Object.create(e.prototype)),
      (r.prototype.check = function () {
        const t = this.getIsImageComplete()
        return t
          ? void this.confirm(this.img.naturalWidth !== 0, 'naturalWidth')
          : ((this.proxyImage = new Image()),
            this.proxyImage.addEventListener('load', this),
            this.proxyImage.addEventListener('error', this),
            this.img.addEventListener('load', this),
            this.img.addEventListener('error', this),
            void (this.proxyImage.src = this.img.src))
      }),
      (r.prototype.getIsImageComplete = function () {
        return this.img.complete && void 0 !== this.img.naturalWidth
      }),
      (r.prototype.confirm = function (t, e) {
        ;(this.isLoaded = t), this.emitEvent('progress', [this, this.img, e])
      }),
      (r.prototype.handleEvent = function (t) {
        const e = 'on' + t.type
        this[e] && this[e](t)
      }),
      (r.prototype.onload = function () {
        this.confirm(!0, 'onload'), this.unbindEvents()
      }),
      (r.prototype.onerror = function () {
        this.confirm(!1, 'onerror'), this.unbindEvents()
      }),
      (r.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener('load', this),
          this.proxyImage.removeEventListener('error', this),
          this.img.removeEventListener('load', this),
          this.img.removeEventListener('error', this)
      }),
      (s.prototype = Object.create(r.prototype)),
      (s.prototype.check = function () {
        this.img.addEventListener('load', this),
          this.img.addEventListener('error', this),
          (this.img.src = this.url)
        const t = this.getIsImageComplete()
        t &&
          (this.confirm(this.img.naturalWidth !== 0, 'naturalWidth'),
          this.unbindEvents())
      }),
      (s.prototype.unbindEvents = function () {
        this.img.removeEventListener('load', this),
          this.img.removeEventListener('error', this)
      }),
      (s.prototype.confirm = function (t, e) {
        ;(this.isLoaded = t),
          this.emitEvent('progress', [this, this.element, e])
      }),
      (o.makeJQueryPlugin = function (e) {
        ;(e = e || t.jQuery),
          e &&
            ((h = e),
            (h.fn.imagesLoaded = function (t, e) {
              const i = new o(this, t, e)
              return i.jqDeferred.promise(h(this))
            }))
      }),
      o.makeJQueryPlugin(),
      o
    )
  })

/*!
 * Isotope PACKAGED v3.0.2
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2016 Metafizzy
 */

!(function (t, e) {
  typeof define === 'function' && define.amd
    ? define('jquery-bridget/jquery-bridget', ['jquery'], function (i) {
        return e(t, i)
      })
    : typeof module === 'object' && module.exports
    ? (module.exports = e(t, require('jquery')))
    : (t.jQueryBridget = e(t, t.jQuery))
})(window, function (t, e) {
  'use strict'
  function i(i, s, a) {
    function u(t, e, n) {
      let o
      const s = '$().' + i + '("' + e + '")'
      return (
        t.each(function (t, u) {
          const h = a.data(u, i)
          if (!h)
            return void r(
              i + ' not initialized. Cannot call methods, i.e. ' + s
            )
          const d = h[e]
          if (!d || e.charAt(0) == '_')
            return void r(s + ' is not a valid method')
          const l = d.apply(h, n)
          o = void 0 === o ? l : o
        }),
        void 0 !== o ? o : t
      )
    }
    function h(t, e) {
      t.each(function (t, n) {
        let o = a.data(n, i)
        o ? (o.option(e), o._init()) : ((o = new s(n, e)), a.data(n, i, o))
      })
    }
    ;(a = a || e || t.jQuery),
      a &&
        (s.prototype.option ||
          (s.prototype.option = function (t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
          }),
        (a.fn[i] = function (t) {
          if (typeof t === 'string') {
            const e = o.call(arguments, 1)
            return u(this, t, e)
          }
          return h(this, t), this
        }),
        n(a))
  }
  function n(t) {
    !t || (t && t.bridget) || (t.bridget = i)
  }
  var o = Array.prototype.slice
  const s = t.console
  var r =
    typeof s === 'undefined'
      ? function () {}
      : function (t) {
          s.error(t)
        }
  return n(e || t.jQuery), i
}),
  (function (t, e) {
    typeof define === 'function' && define.amd
      ? define('ev-emitter/ev-emitter', e)
      : typeof module === 'object' && module.exports
      ? (module.exports = e())
      : (t.EvEmitter = e())
  })(typeof window !== 'undefined' ? window : this, function () {
    function t() {}
    const e = t.prototype
    return (
      (e.on = function (t, e) {
        if (t && e) {
          const i = (this._events = this._events || {})
          const n = (i[t] = i[t] || [])
          return !n.includes(e) && n.push(e), this
        }
      }),
      (e.once = function (t, e) {
        if (t && e) {
          this.on(t, e)
          const i = (this._onceEvents = this._onceEvents || {})
          const n = (i[t] = i[t] || {})
          return (n[e] = !0), this
        }
      }),
      (e.off = function (t, e) {
        const i = this._events && this._events[t]
        if (i && i.length) {
          const n = i.indexOf(e)
          return n != -1 && i.splice(n, 1), this
        }
      }),
      (e.emitEvent = function (t, e) {
        const i = this._events && this._events[t]
        if (i && i.length) {
          let n = 0
          let o = i[n]
          e = e || []
          for (let s = this._onceEvents && this._onceEvents[t]; o; ) {
            const r = s && s[o]
            r && (this.off(t, o), delete s[o]),
              o.apply(this, e),
              (n += r ? 0 : 1),
              (o = i[n])
          }
          return this
        }
      }),
      t
    )
  }),
  (function (t, e) {
    'use strict'
    typeof define === 'function' && define.amd
      ? define('get-size/get-size', [], function () {
          return e()
        })
      : typeof module === 'object' && module.exports
      ? (module.exports = e())
      : (t.getSize = e())
  })(window, function () {
    'use strict'
    function t(t) {
      const e = parseFloat(t)
      const i = !t.includes('%') && !isNaN(e)
      return i && e
    }
    function e() {}
    function i() {
      for (
        var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          e = 0;
        e < h;
        e++
      ) {
        const i = u[e]
        t[i] = 0
      }
      return t
    }
    function n(t) {
      const e = getComputedStyle(t)
      return (
        e ||
          a(
            'Style returned ' +
              e +
              '. Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1'
          ),
        e
      )
    }
    function o() {
      if (!d) {
        d = !0
        const e = document.createElement('div')
        ;(e.style.width = '200px'),
          (e.style.padding = '1px 2px 3px 4px'),
          (e.style.borderStyle = 'solid'),
          (e.style.borderWidth = '1px 2px 3px 4px'),
          (e.style.boxSizing = 'border-box')
        const i = document.body || document.documentElement
        i.appendChild(e)
        const o = n(e)
        ;(s.isBoxSizeOuter = r = t(o.width) == 200), i.removeChild(e)
      }
    }
    function s(e) {
      if (
        (o(),
        typeof e === 'string' && (e = document.querySelector(e)),
        e && typeof e === 'object' && e.nodeType)
      ) {
        const s = n(e)
        if (s.display == 'none') return i()
        const a = {}
        ;(a.width = e.offsetWidth), (a.height = e.offsetHeight)
        for (
          var d = (a.isBorderBox = s.boxSizing == 'border-box'), l = 0;
          l < h;
          l++
        ) {
          const f = u[l]
          const c = s[f]
          const m = parseFloat(c)
          a[f] = isNaN(m) ? 0 : m
        }
        const p = a.paddingLeft + a.paddingRight
        const y = a.paddingTop + a.paddingBottom
        const g = a.marginLeft + a.marginRight
        const v = a.marginTop + a.marginBottom
        const _ = a.borderLeftWidth + a.borderRightWidth
        const I = a.borderTopWidth + a.borderBottomWidth
        const z = d && r
        const x = t(s.width)
        x !== !1 && (a.width = x + (z ? 0 : p + _))
        const S = t(s.height)
        return (
          S !== !1 && (a.height = S + (z ? 0 : y + I)),
          (a.innerWidth = a.width - (p + _)),
          (a.innerHeight = a.height - (y + I)),
          (a.outerWidth = a.width + g),
          (a.outerHeight = a.height + v),
          a
        )
      }
    }
    let r
    var a =
      typeof console === 'undefined'
        ? e
        : function (t) {
            console.error(t)
          }
    var u = [
      'paddingLeft',
      'paddingRight',
      'paddingTop',
      'paddingBottom',
      'marginLeft',
      'marginRight',
      'marginTop',
      'marginBottom',
      'borderLeftWidth',
      'borderRightWidth',
      'borderTopWidth',
      'borderBottomWidth',
    ]
    var h = u.length
    var d = !1
    return s
  }),
  (function (t, e) {
    'use strict'
    typeof define === 'function' && define.amd
      ? define('desandro-matches-selector/matches-selector', e)
      : typeof module === 'object' && module.exports
      ? (module.exports = e())
      : (t.matchesSelector = e())
  })(window, function () {
    'use strict'
    const t = (function () {
      const t = Element.prototype
      if (t.matches) return 'matches'
      if (t.matchesSelector) return 'matchesSelector'
      for (let e = ['webkit', 'moz', 'ms', 'o'], i = 0; i < e.length; i++) {
        const n = e[i]
        const o = n + 'MatchesSelector'
        if (t[o]) return o
      }
    })()
    return function (e, i) {
      return e[t](i)
    }
  }),
  (function (t, e) {
    typeof define === 'function' && define.amd
      ? define(
          'fizzy-ui-utils/utils',
          ['desandro-matches-selector/matches-selector'],
          function (i) {
            return e(t, i)
          }
        )
      : typeof module === 'object' && module.exports
      ? (module.exports = e(t, require('desandro-matches-selector')))
      : (t.fizzyUIUtils = e(t, t.matchesSelector))
  })(window, function (t, e) {
    const i = {}
    ;(i.extend = function (t, e) {
      for (const i in e) t[i] = e[i]
      return t
    }),
      (i.modulo = function (t, e) {
        return ((t % e) + e) % e
      }),
      (i.makeArray = function (t) {
        let e = []
        if (Array.isArray(t)) e = t
        else if (t && typeof t.length === 'number')
          for (let i = 0; i < t.length; i++) e.push(t[i])
        else e.push(t)
        return e
      }),
      (i.removeFrom = function (t, e) {
        const i = t.indexOf(e)
        i != -1 && t.splice(i, 1)
      }),
      (i.getParent = function (t, i) {
        for (; t != document.body; ) if (((t = t.parentNode), e(t, i))) return t
      }),
      (i.getQueryElement = function (t) {
        return typeof t === 'string' ? document.querySelector(t) : t
      }),
      (i.handleEvent = function (t) {
        const e = 'on' + t.type
        this[e] && this[e](t)
      }),
      (i.filterFindElements = function (t, n) {
        t = i.makeArray(t)
        const o = []
        return (
          t.forEach(function (t) {
            if (t instanceof HTMLElement) {
              if (!n) return void o.push(t)
              e(t, n) && o.push(t)
              for (let i = t.querySelectorAll(n), s = 0; s < i.length; s++)
                o.push(i[s])
            }
          }),
          o
        )
      }),
      (i.debounceMethod = function (t, e, i) {
        const n = t.prototype[e]
        const o = e + 'Timeout'
        t.prototype[e] = function () {
          const t = this[o]
          t && clearTimeout(t)
          const e = arguments
          const s = this
          this[o] = setTimeout(function () {
            n.apply(s, e), delete s[o]
          }, i || 100)
        }
      }),
      (i.docReady = function (t) {
        const e = document.readyState
        e == 'complete' || e == 'interactive'
          ? setTimeout(t)
          : document.addEventListener('DOMContentLoaded', t)
      }),
      (i.toDashed = function (t) {
        return t
          .replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + '-' + i
          })
          .toLowerCase()
      })
    const n = t.console
    return (
      (i.htmlInit = function (e, o) {
        i.docReady(function () {
          const s = i.toDashed(o)
          const r = 'data-' + s
          const a = document.querySelectorAll('[' + r + ']')
          const u = document.querySelectorAll('.js-' + s)
          const h = i.makeArray(a).concat(i.makeArray(u))
          const d = r + '-options'
          const l = t.jQuery
          h.forEach(function (t) {
            let i
            const s = t.getAttribute(r) || t.getAttribute(d)
            try {
              i = s && JSON.parse(s)
            } catch (a) {
              return void (
                n &&
                n.error('Error parsing ' + r + ' on ' + t.className + ': ' + a)
              )
            }
            const u = new e(t, i)
            l && l.data(t, o, u)
          })
        })
      }),
      i
    )
  }),
  (function (t, e) {
    typeof define === 'function' && define.amd
      ? define(
          'outlayer/item',
          ['ev-emitter/ev-emitter', 'get-size/get-size'],
          e
        )
      : typeof module === 'object' && module.exports
      ? (module.exports = e(require('ev-emitter'), require('get-size')))
      : ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)))
  })(window, function (t, e) {
    'use strict'
    function i(t) {
      for (var e in t) return !1
      return (e = null), !0
    }
    function n(t, e) {
      t &&
        ((this.element = t),
        (this.layout = e),
        (this.position = { x: 0, y: 0 }),
        this._create())
    }
    function o(t) {
      return t.replace(/([A-Z])/g, function (t) {
        return '-' + t.toLowerCase()
      })
    }
    const s = document.documentElement.style
    const r =
      typeof s.transition === 'string' ? 'transition' : 'WebkitTransition'
    const a = typeof s.transform === 'string' ? 'transform' : 'WebkitTransform'
    const u = {
      WebkitTransition: 'webkitTransitionEnd',
      transition: 'transitionend',
    }[r]
    const h = {
      transform: a,
      transition: r,
      transitionDuration: r + 'Duration',
      transitionProperty: r + 'Property',
      transitionDelay: r + 'Delay',
    }
    const d = (n.prototype = Object.create(t.prototype))
    ;(d.constructor = n),
      (d._create = function () {
        ;(this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: 'absolute' })
      }),
      (d.handleEvent = function (t) {
        const e = 'on' + t.type
        this[e] && this[e](t)
      }),
      (d.getSize = function () {
        this.size = e(this.element)
      }),
      (d.css = function (t) {
        const e = this.element.style
        for (const i in t) {
          const n = h[i] || i
          e[n] = t[i]
        }
      }),
      (d.getPosition = function () {
        const t = getComputedStyle(this.element)
        const e = this.layout._getOption('originLeft')
        const i = this.layout._getOption('originTop')
        const n = t[e ? 'left' : 'right']
        const o = t[i ? 'top' : 'bottom']
        const s = this.layout.size
        let r = n.includes('%')
          ? (parseFloat(n) / 100) * s.width
          : parseInt(n, 10)
        let a = o.includes('%')
          ? (parseFloat(o) / 100) * s.height
          : parseInt(o, 10)
        ;(r = isNaN(r) ? 0 : r),
          (a = isNaN(a) ? 0 : a),
          (r -= e ? s.paddingLeft : s.paddingRight),
          (a -= i ? s.paddingTop : s.paddingBottom),
          (this.position.x = r),
          (this.position.y = a)
      }),
      (d.layoutPosition = function () {
        const t = this.layout.size
        const e = {}
        const i = this.layout._getOption('originLeft')
        const n = this.layout._getOption('originTop')
        const o = i ? 'paddingLeft' : 'paddingRight'
        const s = i ? 'left' : 'right'
        const r = i ? 'right' : 'left'
        const a = this.position.x + t[o]
        ;(e[s] = this.getXValue(a)), (e[r] = '')
        const u = n ? 'paddingTop' : 'paddingBottom'
        const h = n ? 'top' : 'bottom'
        const d = n ? 'bottom' : 'top'
        const l = this.position.y + t[u]
        ;(e[h] = this.getYValue(l)),
          (e[d] = ''),
          this.css(e),
          this.emitEvent('layout', [this])
      }),
      (d.getXValue = function (t) {
        const e = this.layout._getOption('horizontal')
        return this.layout.options.percentPosition && !e
          ? (t / this.layout.size.width) * 100 + '%'
          : t + 'px'
      }),
      (d.getYValue = function (t) {
        const e = this.layout._getOption('horizontal')
        return this.layout.options.percentPosition && e
          ? (t / this.layout.size.height) * 100 + '%'
          : t + 'px'
      }),
      (d._transitionTo = function (t, e) {
        this.getPosition()
        const i = this.position.x
        const n = this.position.y
        const o = parseInt(t, 10)
        const s = parseInt(e, 10)
        const r = o === this.position.x && s === this.position.y
        if ((this.setPosition(t, e), r && !this.isTransitioning))
          return void this.layoutPosition()
        const a = t - i
        const u = e - n
        const h = {}
        ;(h.transform = this.getTranslate(a, u)),
          this.transition({
            to: h,
            onTransitionEnd: { transform: this.layoutPosition },
            isCleaning: !0,
          })
      }),
      (d.getTranslate = function (t, e) {
        const i = this.layout._getOption('originLeft')
        const n = this.layout._getOption('originTop')
        return (
          (t = i ? t : -t),
          (e = n ? e : -e),
          'translate3d(' + t + 'px, ' + e + 'px, 0)'
        )
      }),
      (d.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition()
      }),
      (d.moveTo = d._transitionTo),
      (d.setPosition = function (t, e) {
        ;(this.position.x = parseInt(t, 10)),
          (this.position.y = parseInt(e, 10))
      }),
      (d._nonTransition = function (t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to)
        for (const e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
      }),
      (d.transition = function (t) {
        if (!parseFloat(this.layout.options.transitionDuration))
          return void this._nonTransition(t)
        const e = this._transn
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i]
        for (i in t.to)
          (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0)
        if (t.from) {
          this.css(t.from)
          let n = this.element.offsetHeight
          n = null
        }
        this.enableTransition(t.to), this.css(t.to), (this.isTransitioning = !0)
      })
    const l = 'opacity,' + o(a)
    ;(d.enableTransition = function () {
      if (!this.isTransitioning) {
        let t = this.layout.options.transitionDuration
        ;(t = typeof t === 'number' ? t + 'ms' : t),
          this.css({
            transitionProperty: l,
            transitionDuration: t,
            transitionDelay: this.staggerDelay || 0,
          }),
          this.element.addEventListener(u, this, !1)
      }
    }),
      (d.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t)
      }),
      (d.onotransitionend = function (t) {
        this.ontransitionend(t)
      })
    const f = { '-webkit-transform': 'transform' }
    ;(d.ontransitionend = function (t) {
      if (t.target === this.element) {
        const e = this._transn
        const n = f[t.propertyName] || t.propertyName
        if (
          (delete e.ingProperties[n],
          i(e.ingProperties) && this.disableTransition(),
          n in e.clean &&
            ((this.element.style[t.propertyName] = ''), delete e.clean[n]),
          n in e.onEnd)
        ) {
          const o = e.onEnd[n]
          o.call(this), delete e.onEnd[n]
        }
        this.emitEvent('transitionEnd', [this])
      }
    }),
      (d.disableTransition = function () {
        this.removeTransitionStyles(),
          this.element.removeEventListener(u, this, !1),
          (this.isTransitioning = !1)
      }),
      (d._removeStyles = function (t) {
        const e = {}
        for (const i in t) e[i] = ''
        this.css(e)
      })
    const c = {
      transitionProperty: '',
      transitionDuration: '',
      transitionDelay: '',
    }
    return (
      (d.removeTransitionStyles = function () {
        this.css(c)
      }),
      (d.stagger = function (t) {
        ;(t = isNaN(t) ? 0 : t), (this.staggerDelay = t + 'ms')
      }),
      (d.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: '' }),
          this.emitEvent('remove', [this])
      }),
      (d.remove = function () {
        return r && parseFloat(this.layout.options.transitionDuration)
          ? (this.once('transitionEnd', function () {
              this.removeElem()
            }),
            void this.hide())
          : void this.removeElem()
      }),
      (d.reveal = function () {
        delete this.isHidden, this.css({ display: '' })
        const t = this.layout.options
        const e = {}
        const i = this.getHideRevealTransitionEndProperty('visibleStyle')
        ;(e[i] = this.onRevealTransitionEnd),
          this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          })
      }),
      (d.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent('reveal')
      }),
      (d.getHideRevealTransitionEndProperty = function (t) {
        const e = this.layout.options[t]
        if (e.opacity) return 'opacity'
        for (const i in e) return i
      }),
      (d.hide = function () {
        ;(this.isHidden = !0), this.css({ display: '' })
        const t = this.layout.options
        const e = {}
        const i = this.getHideRevealTransitionEndProperty('hiddenStyle')
        ;(e[i] = this.onHideTransitionEnd),
          this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          })
      }),
      (d.onHideTransitionEnd = function () {
        this.isHidden && (this.css({ display: 'none' }), this.emitEvent('hide'))
      }),
      (d.destroy = function () {
        this.css({
          position: '',
          left: '',
          right: '',
          top: '',
          bottom: '',
          transition: '',
          transform: '',
        })
      }),
      n
    )
  }),
  (function (t, e) {
    'use strict'
    typeof define === 'function' && define.amd
      ? define(
          'outlayer/outlayer',
          [
            'ev-emitter/ev-emitter',
            'get-size/get-size',
            'fizzy-ui-utils/utils',
            './item',
          ],
          function (i, n, o, s) {
            return e(t, i, n, o, s)
          }
        )
      : typeof module === 'object' && module.exports
      ? (module.exports = e(
          t,
          require('ev-emitter'),
          require('get-size'),
          require('fizzy-ui-utils'),
          require('./item')
        ))
      : (t.Outlayer = e(
          t,
          t.EvEmitter,
          t.getSize,
          t.fizzyUIUtils,
          t.Outlayer.Item
        ))
  })(window, function (t, e, i, n, o) {
    'use strict'
    function s(t, e) {
      const i = n.getQueryElement(t)
      if (!i)
        return void (
          u &&
          u.error(
            'Bad element for ' + this.constructor.namespace + ': ' + (i || t)
          )
        )
      ;(this.element = i),
        h && (this.$element = h(this.element)),
        (this.options = n.extend({}, this.constructor.defaults)),
        this.option(e)
      const o = ++l
      ;(this.element.outlayerGUID = o), (f[o] = this), this._create()
      const s = this._getOption('initLayout')
      s && this.layout()
    }
    function r(t) {
      function e() {
        t.apply(this, arguments)
      }
      return (
        (e.prototype = Object.create(t.prototype)),
        (e.prototype.constructor = e),
        e
      )
    }
    function a(t) {
      if (typeof t === 'number') return t
      const e = t.match(/(^\d*\.?\d*)(\w*)/)
      let i = e && e[1]
      const n = e && e[2]
      if (!i.length) return 0
      i = parseFloat(i)
      const o = m[n] || 1
      return i * o
    }
    var u = t.console
    var h = t.jQuery
    const d = function () {}
    var l = 0
    var f = {}
    ;(s.namespace = 'outlayer'),
      (s.Item = o),
      (s.defaults = {
        containerStyle: { position: 'relative' },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: '0.4s',
        hiddenStyle: { opacity: 0, transform: 'scale(0.001)' },
        visibleStyle: { opacity: 1, transform: 'scale(1)' },
      })
    const c = s.prototype
    n.extend(c, e.prototype),
      (c.option = function (t) {
        n.extend(this.options, t)
      }),
      (c._getOption = function (t) {
        const e = this.constructor.compatOptions[t]
        return e && void 0 !== this.options[e]
          ? this.options[e]
          : this.options[t]
      }),
      (s.compatOptions = {
        initLayout: 'isInitLayout',
        horizontal: 'isHorizontal',
        layoutInstant: 'isLayoutInstant',
        originLeft: 'isOriginLeft',
        originTop: 'isOriginTop',
        resize: 'isResizeBound',
        resizeContainer: 'isResizingContainer',
      }),
      (c._create = function () {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          n.extend(this.element.style, this.options.containerStyle)
        const t = this._getOption('resize')
        t && this.bindResize()
      }),
      (c.reloadItems = function () {
        this.items = this._itemize(this.element.children)
      }),
      (c._itemize = function (t) {
        for (
          var e = this._filterFindItemElements(t),
            i = this.constructor.Item,
            n = [],
            o = 0;
          o < e.length;
          o++
        ) {
          const s = e[o]
          const r = new i(s, this)
          n.push(r)
        }
        return n
      }),
      (c._filterFindItemElements = function (t) {
        return n.filterFindElements(t, this.options.itemSelector)
      }),
      (c.getItemElements = function () {
        return this.items.map(function (t) {
          return t.element
        })
      }),
      (c.layout = function () {
        this._resetLayout(), this._manageStamps()
        const t = this._getOption('layoutInstant')
        const e = void 0 !== t ? t : !this._isLayoutInited
        this.layoutItems(this.items, e), (this._isLayoutInited = !0)
      }),
      (c._init = c.layout),
      (c._resetLayout = function () {
        this.getSize()
      }),
      (c.getSize = function () {
        this.size = i(this.element)
      }),
      (c._getMeasurement = function (t, e) {
        let n
        const o = this.options[t]
        o
          ? (typeof o === 'string'
              ? (n = this.element.querySelector(o))
              : o instanceof HTMLElement && (n = o),
            (this[t] = n ? i(n)[e] : o))
          : (this[t] = 0)
      }),
      (c.layoutItems = function (t, e) {
        ;(t = this._getItemsForLayout(t)),
          this._layoutItems(t, e),
          this._postLayout()
      }),
      (c._getItemsForLayout = function (t) {
        return t.filter(function (t) {
          return !t.isIgnored
        })
      }),
      (c._layoutItems = function (t, e) {
        if ((this._emitCompleteOnItems('layout', t), t && t.length)) {
          const i = []
          t.forEach(function (t) {
            const n = this._getItemLayoutPosition(t)
            ;(n.item = t), (n.isInstant = e || t.isLayoutInstant), i.push(n)
          }, this),
            this._processLayoutQueue(i)
        }
      }),
      (c._getItemLayoutPosition = function () {
        return { x: 0, y: 0 }
      }),
      (c._processLayoutQueue = function (t) {
        this.updateStagger(),
          t.forEach(function (t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
          }, this)
      }),
      (c.updateStagger = function () {
        const t = this.options.stagger
        return t === null || void 0 === t
          ? void (this.stagger = 0)
          : ((this.stagger = a(t)), this.stagger)
      }),
      (c._positionItem = function (t, e, i, n, o) {
        n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i))
      }),
      (c._postLayout = function () {
        this.resizeContainer()
      }),
      (c.resizeContainer = function () {
        const t = this._getOption('resizeContainer')
        if (t) {
          const e = this._getContainerSize()
          e &&
            (this._setContainerMeasure(e.width, !0),
            this._setContainerMeasure(e.height, !1))
        }
      }),
      (c._getContainerSize = d),
      (c._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
          const i = this.size
          i.isBorderBox &&
            (t += e
              ? i.paddingLeft +
                i.paddingRight +
                i.borderLeftWidth +
                i.borderRightWidth
              : i.paddingBottom +
                i.paddingTop +
                i.borderTopWidth +
                i.borderBottomWidth),
            (t = Math.max(t, 0)),
            (this.element.style[e ? 'width' : 'height'] = t + 'px')
        }
      }),
      (c._emitCompleteOnItems = function (t, e) {
        function i() {
          o.dispatchEvent(t + 'Complete', null, [e])
        }
        function n() {
          r++, r == s && i()
        }
        var o = this
        var s = e.length
        if (!e || !s) return void i()
        var r = 0
        e.forEach(function (e) {
          e.once(t, n)
        })
      }),
      (c.dispatchEvent = function (t, e, i) {
        const n = e ? [e].concat(i) : i
        if ((this.emitEvent(t, n), h))
          if (((this.$element = this.$element || h(this.element)), e)) {
            const o = h.Event(e)
            ;(o.type = t), this.$element.trigger(o, i)
          } else this.$element.trigger(t, i)
      }),
      (c.ignore = function (t) {
        const e = this.getItem(t)
        e && (e.isIgnored = !0)
      }),
      (c.unignore = function (t) {
        const e = this.getItem(t)
        e && delete e.isIgnored
      }),
      (c.stamp = function (t) {
        ;(t = this._find(t)),
          t &&
            ((this.stamps = this.stamps.concat(t)),
            t.forEach(this.ignore, this))
      }),
      (c.unstamp = function (t) {
        ;(t = this._find(t)),
          t &&
            t.forEach(function (t) {
              n.removeFrom(this.stamps, t), this.unignore(t)
            }, this)
      }),
      (c._find = function (t) {
        if (t)
          return (
            typeof t === 'string' && (t = this.element.querySelectorAll(t)),
            (t = n.makeArray(t))
          )
      }),
      (c._manageStamps = function () {
        this.stamps &&
          this.stamps.length &&
          (this._getBoundingRect(),
          this.stamps.forEach(this._manageStamp, this))
      }),
      (c._getBoundingRect = function () {
        const t = this.element.getBoundingClientRect()
        const e = this.size
        this._boundingRect = {
          left: t.left + e.paddingLeft + e.borderLeftWidth,
          top: t.top + e.paddingTop + e.borderTopWidth,
          right: t.right - (e.paddingRight + e.borderRightWidth),
          bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
        }
      }),
      (c._manageStamp = d),
      (c._getElementOffset = function (t) {
        const e = t.getBoundingClientRect()
        const n = this._boundingRect
        const o = i(t)
        const s = {
          left: e.left - n.left - o.marginLeft,
          top: e.top - n.top - o.marginTop,
          right: n.right - e.right - o.marginRight,
          bottom: n.bottom - e.bottom - o.marginBottom,
        }
        return s
      }),
      (c.handleEvent = n.handleEvent),
      (c.bindResize = function () {
        t.addEventListener('resize', this), (this.isResizeBound = !0)
      }),
      (c.unbindResize = function () {
        t.removeEventListener('resize', this), (this.isResizeBound = !1)
      }),
      (c.onresize = function () {
        this.resize()
      }),
      n.debounceMethod(s, 'onresize', 100),
      (c.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
      }),
      (c.needsResizeLayout = function () {
        const t = i(this.element)
        const e = this.size && t
        return e && t.innerWidth !== this.size.innerWidth
      }),
      (c.addItems = function (t) {
        const e = this._itemize(t)
        return e.length && (this.items = this.items.concat(e)), e
      }),
      (c.appended = function (t) {
        const e = this.addItems(t)
        e.length && (this.layoutItems(e, !0), this.reveal(e))
      }),
      (c.prepended = function (t) {
        const e = this._itemize(t)
        if (e.length) {
          const i = this.items.slice(0)
          ;(this.items = e.concat(i)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i)
        }
      }),
      (c.reveal = function (t) {
        if ((this._emitCompleteOnItems('reveal', t), t && t.length)) {
          const e = this.updateStagger()
          t.forEach(function (t, i) {
            t.stagger(i * e), t.reveal()
          })
        }
      }),
      (c.hide = function (t) {
        if ((this._emitCompleteOnItems('hide', t), t && t.length)) {
          const e = this.updateStagger()
          t.forEach(function (t, i) {
            t.stagger(i * e), t.hide()
          })
        }
      }),
      (c.revealItemElements = function (t) {
        const e = this.getItems(t)
        this.reveal(e)
      }),
      (c.hideItemElements = function (t) {
        const e = this.getItems(t)
        this.hide(e)
      }),
      (c.getItem = function (t) {
        for (let e = 0; e < this.items.length; e++) {
          const i = this.items[e]
          if (i.element == t) return i
        }
      }),
      (c.getItems = function (t) {
        t = n.makeArray(t)
        const e = []
        return (
          t.forEach(function (t) {
            const i = this.getItem(t)
            i && e.push(i)
          }, this),
          e
        )
      }),
      (c.remove = function (t) {
        const e = this.getItems(t)
        this._emitCompleteOnItems('remove', e),
          e &&
            e.length &&
            e.forEach(function (t) {
              t.remove(), n.removeFrom(this.items, t)
            }, this)
      }),
      (c.destroy = function () {
        const t = this.element.style
        ;(t.height = ''),
          (t.position = ''),
          (t.width = ''),
          this.items.forEach(function (t) {
            t.destroy()
          }),
          this.unbindResize()
        const e = this.element.outlayerGUID
        delete f[e],
          delete this.element.outlayerGUID,
          h && h.removeData(this.element, this.constructor.namespace)
      }),
      (s.data = function (t) {
        t = n.getQueryElement(t)
        const e = t && t.outlayerGUID
        return e && f[e]
      }),
      (s.create = function (t, e) {
        const i = r(s)
        return (
          (i.defaults = n.extend({}, s.defaults)),
          n.extend(i.defaults, e),
          (i.compatOptions = n.extend({}, s.compatOptions)),
          (i.namespace = t),
          (i.data = s.data),
          (i.Item = r(o)),
          n.htmlInit(i, t),
          h && h.bridget && h.bridget(t, i),
          i
        )
      })
    var m = { ms: 1, s: 1e3 }
    return (s.Item = o), s
  }),
  (function (t, e) {
    typeof define === 'function' && define.amd
      ? define('isotope/js/item', ['outlayer/outlayer'], e)
      : typeof module === 'object' && module.exports
      ? (module.exports = e(require('outlayer')))
      : ((t.Isotope = t.Isotope || {}), (t.Isotope.Item = e(t.Outlayer)))
  })(window, function (t) {
    'use strict'
    function e() {
      t.Item.apply(this, arguments)
    }
    const i = (e.prototype = Object.create(t.Item.prototype))
    const n = i._create
    ;(i._create = function () {
      ;(this.id = this.layout.itemGUID++), n.call(this), (this.sortData = {})
    }),
      (i.updateSortData = function () {
        if (!this.isIgnored) {
          ;(this.sortData.id = this.id),
            (this.sortData['original-order'] = this.id),
            (this.sortData.random = Math.random())
          const t = this.layout.options.getSortData
          const e = this.layout._sorters
          for (const i in t) {
            const n = e[i]
            this.sortData[i] = n(this.element, this)
          }
        }
      })
    const o = i.destroy
    return (
      (i.destroy = function () {
        o.apply(this, arguments), this.css({ display: '' })
      }),
      e
    )
  }),
  (function (t, e) {
    typeof define === 'function' && define.amd
      ? define(
          'isotope/js/layout-mode',
          ['get-size/get-size', 'outlayer/outlayer'],
          e
        )
      : typeof module === 'object' && module.exports
      ? (module.exports = e(require('get-size'), require('outlayer')))
      : ((t.Isotope = t.Isotope || {}),
        (t.Isotope.LayoutMode = e(t.getSize, t.Outlayer)))
  })(window, function (t, e) {
    'use strict'
    function i(t) {
      ;(this.isotope = t),
        t &&
          ((this.options = t.options[this.namespace]),
          (this.element = t.element),
          (this.items = t.filteredItems),
          (this.size = t.size))
    }
    const n = i.prototype
    const o = [
      '_resetLayout',
      '_getItemLayoutPosition',
      '_manageStamp',
      '_getContainerSize',
      '_getElementOffset',
      'needsResizeLayout',
      '_getOption',
    ]
    return (
      o.forEach(function (t) {
        n[t] = function () {
          return e.prototype[t].apply(this.isotope, arguments)
        }
      }),
      (n.needsVerticalResizeLayout = function () {
        const e = t(this.isotope.element)
        const i = this.isotope.size && e
        return i && e.innerHeight != this.isotope.size.innerHeight
      }),
      (n._getMeasurement = function () {
        this.isotope._getMeasurement.apply(this, arguments)
      }),
      (n.getColumnWidth = function () {
        this.getSegmentSize('column', 'Width')
      }),
      (n.getRowHeight = function () {
        this.getSegmentSize('row', 'Height')
      }),
      (n.getSegmentSize = function (t, e) {
        const i = t + e
        const n = 'outer' + e
        if ((this._getMeasurement(i, n), !this[i])) {
          const o = this.getFirstItemSize()
          this[i] = (o && o[n]) || this.isotope.size['inner' + e]
        }
      }),
      (n.getFirstItemSize = function () {
        const e = this.isotope.filteredItems[0]
        return e && e.element && t(e.element)
      }),
      (n.layout = function () {
        this.isotope.layout.apply(this.isotope, arguments)
      }),
      (n.getSize = function () {
        this.isotope.getSize(), (this.size = this.isotope.size)
      }),
      (i.modes = {}),
      (i.create = function (t, e) {
        function o() {
          i.apply(this, arguments)
        }
        return (
          (o.prototype = Object.create(n)),
          (o.prototype.constructor = o),
          e && (o.options = e),
          (o.prototype.namespace = t),
          (i.modes[t] = o),
          o
        )
      }),
      i
    )
  }),
  (function (t, e) {
    typeof define === 'function' && define.amd
      ? define('masonry/masonry', ['outlayer/outlayer', 'get-size/get-size'], e)
      : typeof module === 'object' && module.exports
      ? (module.exports = e(require('outlayer'), require('get-size')))
      : (t.Masonry = e(t.Outlayer, t.getSize))
  })(window, function (t, e) {
    const i = t.create('masonry')
    return (
      (i.compatOptions.fitWidth = 'isFitWidth'),
      (i.prototype._resetLayout = function () {
        this.getSize(),
          this._getMeasurement('columnWidth', 'outerWidth'),
          this._getMeasurement('gutter', 'outerWidth'),
          this.measureColumns(),
          (this.colYs = [])
        for (let t = 0; t < this.cols; t++) this.colYs.push(0)
        this.maxY = 0
      }),
      (i.prototype.measureColumns = function () {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          const t = this.items[0]
          const i = t && t.element
          this.columnWidth = (i && e(i).outerWidth) || this.containerWidth
        }
        const n = (this.columnWidth += this.gutter)
        const o = this.containerWidth + this.gutter
        let s = o / n
        const r = n - (o % n)
        const a = r && r < 1 ? 'round' : 'floor'
        ;(s = Math[a](s)), (this.cols = Math.max(s, 1))
      }),
      (i.prototype.getContainerWidth = function () {
        const t = this._getOption('fitWidth')
        const i = t ? this.element.parentNode : this.element
        const n = e(i)
        this.containerWidth = n && n.innerWidth
      }),
      (i.prototype._getItemLayoutPosition = function (t) {
        t.getSize()
        const e = t.size.outerWidth % this.columnWidth
        const i = e && e < 1 ? 'round' : 'ceil'
        let n = Math[i](t.size.outerWidth / this.columnWidth)
        n = Math.min(n, this.cols)
        for (
          var o = this._getColGroup(n),
            s = Math.min.apply(Math, o),
            r = o.indexOf(s),
            a = { x: this.columnWidth * r, y: s },
            u = s + t.size.outerHeight,
            h = this.cols + 1 - o.length,
            d = 0;
          d < h;
          d++
        )
          this.colYs[r + d] = u
        return a
      }),
      (i.prototype._getColGroup = function (t) {
        if (t < 2) return this.colYs
        for (var e = [], i = this.cols + 1 - t, n = 0; n < i; n++) {
          const o = this.colYs.slice(n, n + t)
          e[n] = Math.max.apply(Math, o)
        }
        return e
      }),
      (i.prototype._manageStamp = function (t) {
        const i = e(t)
        const n = this._getElementOffset(t)
        const o = this._getOption('originLeft')
        const s = o ? n.left : n.right
        const r = s + i.outerWidth
        let a = Math.floor(s / this.columnWidth)
        a = Math.max(0, a)
        let u = Math.floor(r / this.columnWidth)
        ;(u -= r % this.columnWidth ? 0 : 1), (u = Math.min(this.cols - 1, u))
        for (
          let h = this._getOption('originTop'),
            d = (h ? n.top : n.bottom) + i.outerHeight,
            l = a;
          l <= u;
          l++
        )
          this.colYs[l] = Math.max(d, this.colYs[l])
      }),
      (i.prototype._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs)
        const t = { height: this.maxY }
        return (
          this._getOption('fitWidth') &&
            (t.width = this._getContainerFitWidth()),
          t
        )
      }),
      (i.prototype._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && this.colYs[e] === 0; ) t++
        return (this.cols - t) * this.columnWidth - this.gutter
      }),
      (i.prototype.needsResizeLayout = function () {
        const t = this.containerWidth
        return this.getContainerWidth(), t != this.containerWidth
      }),
      i
    )
  }),
  (function (t, e) {
    typeof define === 'function' && define.amd
      ? define(
          'isotope/js/layout-modes/masonry',
          ['../layout-mode', 'masonry/masonry'],
          e
        )
      : typeof module === 'object' && module.exports
      ? (module.exports = e(
          require('../layout-mode'),
          require('masonry-layout')
        ))
      : e(t.Isotope.LayoutMode, t.Masonry)
  })(window, function (t, e) {
    'use strict'
    const i = t.create('masonry')
    const n = i.prototype
    const o = { _getElementOffset: !0, layout: !0, _getMeasurement: !0 }
    for (const s in e.prototype) o[s] || (n[s] = e.prototype[s])
    const r = n.measureColumns
    n.measureColumns = function () {
      ;(this.items = this.isotope.filteredItems), r.call(this)
    }
    const a = n._getOption
    return (
      (n._getOption = function (t) {
        return t == 'fitWidth'
          ? void 0 !== this.options.isFitWidth
            ? this.options.isFitWidth
            : this.options.fitWidth
          : a.apply(this.isotope, arguments)
      }),
      i
    )
  }),
  (function (t, e) {
    typeof define === 'function' && define.amd
      ? define('isotope/js/layout-modes/fit-rows', ['../layout-mode'], e)
      : typeof exports === 'object'
      ? (module.exports = e(require('../layout-mode')))
      : e(t.Isotope.LayoutMode)
  })(window, function (t) {
    'use strict'
    const e = t.create('fitRows')
    const i = e.prototype
    return (
      (i._resetLayout = function () {
        ;(this.x = 0),
          (this.y = 0),
          (this.maxY = 0),
          this._getMeasurement('gutter', 'outerWidth')
      }),
      (i._getItemLayoutPosition = function (t) {
        t.getSize()
        const e = t.size.outerWidth + this.gutter
        const i = this.isotope.size.innerWidth + this.gutter
        this.x !== 0 && e + this.x > i && ((this.x = 0), (this.y = this.maxY))
        const n = { x: this.x, y: this.y }
        return (
          (this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight)),
          (this.x += e),
          n
        )
      }),
      (i._getContainerSize = function () {
        return { height: this.maxY }
      }),
      e
    )
  }),
  (function (t, e) {
    typeof define === 'function' && define.amd
      ? define('isotope/js/layout-modes/vertical', ['../layout-mode'], e)
      : typeof module === 'object' && module.exports
      ? (module.exports = e(require('../layout-mode')))
      : e(t.Isotope.LayoutMode)
  })(window, function (t) {
    'use strict'
    const e = t.create('vertical', { horizontalAlignment: 0 })
    const i = e.prototype
    return (
      (i._resetLayout = function () {
        this.y = 0
      }),
      (i._getItemLayoutPosition = function (t) {
        t.getSize()
        const e =
          (this.isotope.size.innerWidth - t.size.outerWidth) *
          this.options.horizontalAlignment
        const i = this.y
        return (this.y += t.size.outerHeight), { x: e, y: i }
      }),
      (i._getContainerSize = function () {
        return { height: this.y }
      }),
      e
    )
  }),
  (function (t, e) {
    typeof define === 'function' && define.amd
      ? define(
          [
            'outlayer/outlayer',
            'get-size/get-size',
            'desandro-matches-selector/matches-selector',
            'fizzy-ui-utils/utils',
            'isotope/js/item',
            'isotope/js/layout-mode',
            'isotope/js/layout-modes/masonry',
            'isotope/js/layout-modes/fit-rows',
            'isotope/js/layout-modes/vertical',
          ],
          function (i, n, o, s, r, a) {
            return e(t, i, n, o, s, r, a)
          }
        )
      : typeof module === 'object' && module.exports
      ? (module.exports = e(
          t,
          require('outlayer'),
          require('get-size'),
          require('desandro-matches-selector'),
          require('fizzy-ui-utils'),
          require('isotope/js/item'),
          require('isotope/js/layout-mode'),
          require('isotope/js/layout-modes/masonry'),
          require('isotope/js/layout-modes/fit-rows'),
          require('isotope/js/layout-modes/vertical')
        ))
      : (t.Isotope = e(
          t,
          t.Outlayer,
          t.getSize,
          t.matchesSelector,
          t.fizzyUIUtils,
          t.Isotope.Item,
          t.Isotope.LayoutMode
        ))
  })(window, function (t, e, i, n, o, s, r) {
    function a(t, e) {
      return function (i, n) {
        for (let o = 0; o < t.length; o++) {
          const s = t[o]
          const r = i.sortData[s]
          const a = n.sortData[s]
          if (r > a || r < a) {
            const u = void 0 !== e[s] ? e[s] : e
            const h = u ? 1 : -1
            return (r > a ? 1 : -1) * h
          }
        }
        return 0
      }
    }
    const u = t.jQuery
    const h = String.prototype.trim
      ? function (t) {
          return t.trim()
        }
      : function (t) {
          return t.replace(/^\s+|\s+$/g, '')
        }
    const d = e.create('isotope', {
      layoutMode: 'masonry',
      isJQueryFiltering: !0,
      sortAscending: !0,
    })
    ;(d.Item = s), (d.LayoutMode = r)
    const l = d.prototype
    ;(l._create = function () {
      ;(this.itemGUID = 0),
        (this._sorters = {}),
        this._getSorters(),
        e.prototype._create.call(this),
        (this.modes = {}),
        (this.filteredItems = this.items),
        (this.sortHistory = ['original-order'])
      for (const t in r.modes) this._initLayoutMode(t)
    }),
      (l.reloadItems = function () {
        ;(this.itemGUID = 0), e.prototype.reloadItems.call(this)
      }),
      (l._itemize = function () {
        for (
          var t = e.prototype._itemize.apply(this, arguments), i = 0;
          i < t.length;
          i++
        ) {
          const n = t[i]
          n.id = this.itemGUID++
        }
        return this._updateItemsSortData(t), t
      }),
      (l._initLayoutMode = function (t) {
        const e = r.modes[t]
        const i = this.options[t] || {}
        ;(this.options[t] = e.options ? o.extend(e.options, i) : i),
          (this.modes[t] = new e(this))
      }),
      (l.layout = function () {
        return !this._isLayoutInited && this._getOption('initLayout')
          ? void this.arrange()
          : void this._layout()
      }),
      (l._layout = function () {
        const t = this._getIsInstant()
        this._resetLayout(),
          this._manageStamps(),
          this.layoutItems(this.filteredItems, t),
          (this._isLayoutInited = !0)
      }),
      (l.arrange = function (t) {
        this.option(t), this._getIsInstant()
        const e = this._filter(this.items)
        ;(this.filteredItems = e.matches),
          this._bindArrangeComplete(),
          this._isInstant
            ? this._noTransition(this._hideReveal, [e])
            : this._hideReveal(e),
          this._sort(),
          this._layout()
      }),
      (l._init = l.arrange),
      (l._hideReveal = function (t) {
        this.reveal(t.needReveal), this.hide(t.needHide)
      }),
      (l._getIsInstant = function () {
        const t = this._getOption('layoutInstant')
        const e = void 0 !== t ? t : !this._isLayoutInited
        return (this._isInstant = e), e
      }),
      (l._bindArrangeComplete = function () {
        function t() {
          e &&
            i &&
            n &&
            o.dispatchEvent('arrangeComplete', null, [o.filteredItems])
        }
        let e
        let i
        let n
        var o = this
        this.once('layoutComplete', function () {
          ;(e = !0), t()
        }),
          this.once('hideComplete', function () {
            ;(i = !0), t()
          }),
          this.once('revealComplete', function () {
            ;(n = !0), t()
          })
      }),
      (l._filter = function (t) {
        let e = this.options.filter
        e = e || '*'
        for (
          var i = [], n = [], o = [], s = this._getFilterTest(e), r = 0;
          r < t.length;
          r++
        ) {
          const a = t[r]
          if (!a.isIgnored) {
            const u = s(a)
            u && i.push(a),
              u && a.isHidden ? n.push(a) : u || a.isHidden || o.push(a)
          }
        }
        return { matches: i, needReveal: n, needHide: o }
      }),
      (l._getFilterTest = function (t) {
        return u && this.options.isJQueryFiltering
          ? function (e) {
              return u(e.element).is(t)
            }
          : typeof t === 'function'
          ? function (e) {
              return t(e.element)
            }
          : function (e) {
              return n(e.element, t)
            }
      }),
      (l.updateSortData = function (t) {
        let e
        t ? ((t = o.makeArray(t)), (e = this.getItems(t))) : (e = this.items),
          this._getSorters(),
          this._updateItemsSortData(e)
      }),
      (l._getSorters = function () {
        const t = this.options.getSortData
        for (const e in t) {
          const i = t[e]
          this._sorters[e] = f(i)
        }
      }),
      (l._updateItemsSortData = function (t) {
        for (let e = t && t.length, i = 0; e && i < e; i++) {
          const n = t[i]
          n.updateSortData()
        }
      })
    var f = (function () {
      function t(t) {
        if (typeof t !== 'string') return t
        const i = h(t).split(' ')
        const n = i[0]
        const o = n.match(/^\[(.+)\]$/)
        const s = o && o[1]
        const r = e(s, n)
        const a = d.sortDataParsers[i[1]]
        return (t = a
          ? function (t) {
              return t && a(r(t))
            }
          : function (t) {
              return t && r(t)
            })
      }
      function e(t, e) {
        return t
          ? function (e) {
              return e.getAttribute(t)
            }
          : function (t) {
              const i = t.querySelector(e)
              return i && i.textContent
            }
      }
      return t
    })()
    ;(d.sortDataParsers = {
      parseInt(t) {
        return parseInt(t, 10)
      },
      parseFloat(t) {
        return parseFloat(t)
      },
    }),
      (l._sort = function () {
        const t = this.options.sortBy
        if (t) {
          const e = [].concat.apply(t, this.sortHistory)
          const i = a(e, this.options.sortAscending)
          this.filteredItems.sort(i),
            t != this.sortHistory[0] && this.sortHistory.unshift(t)
        }
      }),
      (l._mode = function () {
        const t = this.options.layoutMode
        const e = this.modes[t]
        if (!e) throw new Error('No layout mode: ' + t)
        return (e.options = this.options[t]), e
      }),
      (l._resetLayout = function () {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout()
      }),
      (l._getItemLayoutPosition = function (t) {
        return this._mode()._getItemLayoutPosition(t)
      }),
      (l._manageStamp = function (t) {
        this._mode()._manageStamp(t)
      }),
      (l._getContainerSize = function () {
        return this._mode()._getContainerSize()
      }),
      (l.needsResizeLayout = function () {
        return this._mode().needsResizeLayout()
      }),
      (l.appended = function (t) {
        const e = this.addItems(t)
        if (e.length) {
          const i = this._filterRevealAdded(e)
          this.filteredItems = this.filteredItems.concat(i)
        }
      }),
      (l.prepended = function (t) {
        const e = this._itemize(t)
        if (e.length) {
          this._resetLayout(), this._manageStamps()
          const i = this._filterRevealAdded(e)
          this.layoutItems(this.filteredItems),
            (this.filteredItems = i.concat(this.filteredItems)),
            (this.items = e.concat(this.items))
        }
      }),
      (l._filterRevealAdded = function (t) {
        const e = this._filter(t)
        return (
          this.hide(e.needHide),
          this.reveal(e.matches),
          this.layoutItems(e.matches, !0),
          e.matches
        )
      }),
      (l.insert = function (t) {
        const e = this.addItems(t)
        if (e.length) {
          let i
          let n
          const o = e.length
          for (i = 0; i < o; i++)
            (n = e[i]), this.element.appendChild(n.element)
          const s = this._filter(e).matches
          for (i = 0; i < o; i++) e[i].isLayoutInstant = !0
          for (this.arrange(), i = 0; i < o; i++) delete e[i].isLayoutInstant
          this.reveal(s)
        }
      })
    const c = l.remove
    return (
      (l.remove = function (t) {
        t = o.makeArray(t)
        const e = this.getItems(t)
        c.call(this, t)
        for (let i = e && e.length, n = 0; i && n < i; n++) {
          const s = e[n]
          o.removeFrom(this.filteredItems, s)
        }
      }),
      (l.shuffle = function () {
        for (let t = 0; t < this.items.length; t++) {
          const e = this.items[t]
          e.sortData.random = Math.random()
        }
        ;(this.options.sortBy = 'random'), this._sort(), this._layout()
      }),
      (l._noTransition = function (t, e) {
        const i = this.options.transitionDuration
        this.options.transitionDuration = 0
        const n = t.apply(this, e)
        return (this.options.transitionDuration = i), n
      }),
      (l.getFilteredItemElements = function () {
        return this.filteredItems.map(function (t) {
          return t.element
        })
      }),
      d
    )
  })

// Classy Nav JS
!(function (e) {
  e.fn.classyNav = function (n) {
    const a = e('.classy-nav-container')
    const s = e('.classynav ul')
    const o = e('.classynav > ul > li')
    const l = e('.classy-navbar-toggler')
    const i = e('.classycloseIcon')
    const t = e('.navbarToggler')
    const d = e('.classy-menu')
    const r = e(window)
    const c = e.extend(
      {
        theme: 'light',
        breakpoint: 991,
        openCloseSpeed: 300,
        alwaysHidden: !1,
        openMobileMenu: 'left',
        dropdownRtl: !1,
        stickyNav: !1,
        stickyFooterNav: !1,
      },
      n
    )
    return this.each(function () {
      function n() {
        window.innerWidth <= c.breakpoint
          ? a.removeClass('breakpoint-off').addClass('breakpoint-on')
          : a.removeClass('breakpoint-on').addClass('breakpoint-off')
      }
      ;(c.theme !== 'light' && c.theme !== 'dark') || a.addClass(c.theme),
        (c.openMobileMenu !== 'left' && c.openMobileMenu !== 'right') ||
          a.addClass(c.openMobileMenu),
        !0 === c.dropdownRtl && a.addClass('dropdown-rtl'),
        l.on('click', function () {
          t.toggleClass('active'), d.toggleClass('menu-on')
        }),
        i.on('click', function () {
          d.removeClass('menu-on'), t.removeClass('active')
        }),
        o.has('.dropdown').addClass('cn-dropdown-item'),
        o.has('.megamenu').addClass('megamenu-item'),
        s.find('li a').each(function () {
          e(this).next().length > 0 &&
            (e(this)
              .parent('li')
              .addClass('has-down')
              .append('<span class="dd-trigger"></span>'),
            e(this)
              .parent('li')
              .addClass('has-down')
              .append('<span class="dd-arrow"></span>'))
        }),
        s.find('li .dd-trigger').on('click', function (n) {
          n.preventDefault(),
            e(this)
              .parent('li')
              .children('ul')
              .stop(!0, !0)
              .slideToggle(c.openCloseSpeed),
            e(this).parent('li').toggleClass('active')
        }),
        e('.megamenu-item, .cn-dropdown-item').addClass('pr12'),
        e('.megamenu-item').removeClass('has-down pr12'),
        s.find('li .dd-trigger').on('click', function (n) {
          n.preventDefault(),
            e(this)
              .parent('li')
              .children('.megamenu')
              .slideToggle(c.openCloseSpeed)
        }),
        n(),
        r.on('resize', function () {
          n()
        }),
        !0 === c.alwaysHidden &&
          a.addClass('breakpoint-on').removeClass('breakpoint-off'),
        !0 === c.stickyNav &&
          r.on('scroll', function () {
            r.scrollTop() > 0
              ? a.addClass('classy-sticky')
              : a.removeClass('classy-sticky')
          }),
        !0 === c.stickyFooterNav && a.addClass('classy-sticky-footer')
    })
  }
})(jQuery)

/*
 * Author: Vitor Freitas vfreitas-
 * Author URL: https://codepen.io/vfreitas-
 */
/* Work in Progress */
;+(function ($) {
  $.fn.rippleEffect = function () {
    const colorsMap = {
      black: 'rgba(0,0,0, 0.2)',
      red: 'rgba(244,67,54, 0.75)',
      indigo: 'rgba(63,81,181, 0.75)',
      purple: 'rgba(156,39,176, 0.75)',
      blue: 'rgba(33,150,243, 0.75)',
      cyan: 'rgba(0,188,212, 0.75)',
      teal: 'rgba(0,150,136, 0.75)',
    }
    this.on('mousedown', function (e) {
      clean()
      const el = $(this)
      const offset = el.offset()
      const XCoord = e.pageX - offset.left
      const YCoord = e.pageY - offset.top
      const rippleColor = el.attr('data-ripple')
      const rippleDiv = $("<div class='ripple ripple-active'></div>")
      el.css({
        position: 'relative',
        overflow: 'hidden',
        'z-index': 1,
      })
      el.prepend(
        rippleDiv.css({
          left: XCoord - 4.5,
          top: YCoord - 2,
          background:
            rippleColor in colorsMap ? colorsMap[rippleColor] : rippleColor,
          height: el.height() > 250 ? el.width() * 0.07 : el.width() * 0.05,
          width: el.outerWidth() * 0.05,
        })
      ).on('mouseup', function () {
        el.children('div').removeClass('ripple-active')
      })
    })
    function clean() {
      $('html').find('.ripple:not(.active)').remove()
    }
  }
})(jQuery)

$('.wave').rippleEffect()

/* jquery.nicescroll v3.7.6 InuYaksa - MIT - https://nicescroll.areaaperta.com */
!(function (e) {
  typeof define === 'function' && define.amd
    ? define(['jquery'], e)
    : typeof exports === 'object'
    ? (module.exports = e(require('jquery')))
    : e(jQuery)
})(function (e) {
  'use strict'
  let o = !1
  let t = !1
  let r = 0
  let i = 2e3
  let s = 0
  const n = e
  const l = document
  const a = window
  const c = n(a)
  const d = []
  let u =
    a.requestAnimationFrame ||
    a.webkitRequestAnimationFrame ||
    a.mozRequestAnimationFrame ||
    !1
  let h =
    a.cancelAnimationFrame ||
    a.webkitCancelAnimationFrame ||
    a.mozCancelAnimationFrame ||
    !1
  if (u) a.cancelAnimationFrame || (h = function (e) {})
  else {
    let p = 0
    ;(u = function (e, o) {
      const t = new Date().getTime()
      const r = Math.max(0, 16 - (t - p))
      const i = a.setTimeout(function () {
        e(t + r)
      }, r)
      return (p = t + r), i
    }),
      (h = function (e) {
        a.clearTimeout(e)
      })
  }
  let m = a.MutationObserver || a.WebKitMutationObserver || !1
  const f =
    Date.now ||
    function () {
      return new Date().getTime()
    }
  const g = {
    zindex: 'auto',
    cursoropacitymin: 0,
    cursoropacitymax: 1,
    cursorcolor: '#424242',
    cursorwidth: '6px',
    cursorborder: '1px solid #fff',
    cursorborderradius: '5px',
    scrollspeed: 40,
    mousescrollstep: 27,
    touchbehavior: !1,
    emulatetouch: !1,
    hwacceleration: !0,
    usetransition: !0,
    boxzoom: !1,
    dblclickzoom: !0,
    gesturezoom: !0,
    grabcursorenabled: !0,
    autohidemode: !0,
    background: '',
    iframeautoresize: !0,
    cursorminheight: 32,
    preservenativescrolling: !0,
    railoffset: !1,
    railhoffset: !1,
    bouncescroll: !0,
    spacebarenabled: !0,
    railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
    disableoutline: !0,
    horizrailenabled: !0,
    railalign: 'right',
    railvalign: 'bottom',
    enabletranslate3d: !0,
    enablemousewheel: !0,
    enablekeyboard: !0,
    smoothscroll: !0,
    sensitiverail: !0,
    enablemouselockapi: !0,
    cursorfixedheight: !1,
    directionlockdeadzone: 6,
    hidecursordelay: 400,
    nativeparentscrolling: !0,
    enablescrollonselection: !0,
    overflowx: !0,
    overflowy: !0,
    cursordragspeed: 0.3,
    rtlmode: 'auto',
    cursordragontouch: !1,
    oneaxismousemode: 'auto',
    scriptpath: (function () {
      const e =
        l.currentScript ||
        (function () {
          const e = l.getElementsByTagName('script')
          return !!e.length && e[e.length - 1]
        })()
      const o = e ? e.src.split('?')[0] : ''
      return o.split('/').length > 0
        ? o.split('/').slice(0, -1).join('/') + '/'
        : ''
    })(),
    preventmultitouchscrolling: !0,
    disablemutationobserver: !1,
    enableobserver: !0,
    scrollbarid: !1,
  }
  let v = !1
  const w = function () {
    if (v) return v
    let e = l.createElement('DIV')
    const o = e.style
    const t = navigator.userAgent
    const r = navigator.platform
    const i = {}
    return (
      (i.haspointerlock =
        'pointerLockElement' in l ||
        'webkitPointerLockElement' in l ||
        'mozPointerLockElement' in l),
      (i.isopera = 'opera' in a),
      (i.isopera12 = i.isopera && 'getUserMedia' in navigator),
      (i.isoperamini =
        Object.prototype.toString.call(a.operamini) === '[object OperaMini]'),
      (i.isie = 'all' in l && 'attachEvent' in e && !i.isopera),
      (i.isieold = i.isie && !('msInterpolationMode' in o)),
      (i.isie7 =
        i.isie &&
        !i.isieold &&
        (!('documentMode' in l) || l.documentMode === 7)),
      (i.isie8 = i.isie && 'documentMode' in l && l.documentMode === 8),
      (i.isie9 = i.isie && 'performance' in a && l.documentMode === 9),
      (i.isie10 = i.isie && 'performance' in a && l.documentMode === 10),
      (i.isie11 = 'msRequestFullscreen' in e && l.documentMode >= 11),
      (i.ismsedge = 'msCredentials' in a),
      (i.ismozilla = 'MozAppearance' in o),
      (i.iswebkit = !i.ismsedge && 'WebkitAppearance' in o),
      (i.ischrome = i.iswebkit && 'chrome' in a),
      (i.ischrome38 = i.ischrome && 'touchAction' in o),
      (i.ischrome22 = !i.ischrome38 && i.ischrome && i.haspointerlock),
      (i.ischrome26 = !i.ischrome38 && i.ischrome && 'transition' in o),
      (i.cantouch = 'ontouchstart' in l.documentElement || 'ontouchstart' in a),
      (i.hasw3ctouch =
        (a.PointerEvent || !1) &&
        (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)),
      (i.hasmstouch = !i.hasw3ctouch && (a.MSPointerEvent || !1)),
      (i.ismac = /^mac$/i.test(r)),
      (i.isios = i.cantouch && /iphone|ipad|ipod/i.test(r)),
      (i.isios4 = i.isios && !('seal' in Object)),
      (i.isios7 = i.isios && 'webkitHidden' in l),
      (i.isios8 = i.isios && 'hidden' in l),
      (i.isios10 = i.isios && a.Proxy),
      (i.isandroid = /android/i.test(t)),
      (i.haseventlistener = 'addEventListener' in e),
      (i.trstyle = !1),
      (i.hastransform = !1),
      (i.hastranslate3d = !1),
      (i.transitionstyle = !1),
      (i.hastransition = !1),
      (i.transitionend = !1),
      (i.trstyle = 'transform'),
      (i.hastransform =
        'transform' in o ||
        (function () {
          for (
            let e = [
                'msTransform',
                'webkitTransform',
                'MozTransform',
                'OTransform',
              ],
              t = 0,
              r = e.length;
            t < r;
            t++
          )
            if (void 0 !== o[e[t]]) {
              i.trstyle = e[t]
              break
            }
          i.hastransform = !!i.trstyle
        })()),
      i.hastransform &&
        ((o[i.trstyle] = 'translate3d(1px,2px,3px)'),
        (i.hastranslate3d = /translate3d/.test(o[i.trstyle]))),
      (i.transitionstyle = 'transition'),
      (i.prefixstyle = ''),
      (i.transitionend = 'transitionend'),
      (i.hastransition =
        'transition' in o ||
        (function () {
          i.transitionend = !1
          for (
            var e = [
                'webkitTransition',
                'msTransition',
                'MozTransition',
                'OTransition',
                'OTransition',
                'KhtmlTransition',
              ],
              t = ['-webkit-', '-ms-', '-moz-', '-o-', '-o', '-khtml-'],
              r = [
                'webkitTransitionEnd',
                'msTransitionEnd',
                'transitionend',
                'otransitionend',
                'oTransitionEnd',
                'KhtmlTransitionEnd',
              ],
              s = 0,
              n = e.length;
            s < n;
            s++
          )
            if (e[s] in o) {
              ;(i.transitionstyle = e[s]),
                (i.prefixstyle = t[s]),
                (i.transitionend = r[s])
              break
            }
          i.ischrome26 && (i.prefixstyle = t[1]),
            (i.hastransition = i.transitionstyle)
        })()),
      (i.cursorgrabvalue = (function () {
        let e = ['grab', '-webkit-grab', '-moz-grab']
        ;((i.ischrome && !i.ischrome38) || i.isie) && (e = [])
        for (let t = 0, r = e.length; t < r; t++) {
          const s = e[t]
          if (((o.cursor = s), o.cursor == s)) return s
        }
        return 'url(https://cdnjs.cloudflare.com/ajax/libs/slider-pro/1.3.0/css/images/openhand.cur),n-resize'
      })()),
      (i.hasmousecapture = 'setCapture' in e),
      (i.hasMutationObserver = !1 !== m),
      (e = null),
      (v = i),
      i
    )
  }
  const b = function (e, p) {
    function v() {
      const e = T.doc.css(P.trstyle)
      return (
        !(!e || e.substr(0, 6) != 'matrix') &&
        e
          .replace(/^.*\((.*)\)$/g, '$1')
          .replace(/px/g, '')
          .split(/, +/)
      )
    }
    function b() {
      let e = T.win
      if ('zIndex' in e) return e.zIndex()
      for (; e.length > 0; ) {
        if (e[0].nodeType == 9) return !1
        const o = e.css('zIndex')
        if (!isNaN(o) && o !== 0) return parseInt(o)
        e = e.parent()
      }
      return !1
    }
    function x(e, o, t) {
      const r = e.css(o)
      let i = parseFloat(r)
      if (isNaN(i)) {
        const s =
          (i = I[r] || 0) == 3
            ? t
              ? T.win.outerHeight() - T.win.innerHeight()
              : T.win.outerWidth() - T.win.innerWidth()
            : 1
        return T.isie8 && i && (i += 1), s ? i : 0
      }
      return i
    }
    function S(e, o, t, r) {
      T._bind(
        e,
        o,
        function (r) {
          const i = {
            original: (r = r || a.event),
            target: r.target || r.srcElement,
            type: 'wheel',
            deltaMode: r.type == 'MozMousePixelScroll' ? 0 : 1,
            deltaX: 0,
            deltaZ: 0,
            preventDefault() {
              return (
                r.preventDefault ? r.preventDefault() : (r.returnValue = !1), !1
              )
            },
            stopImmediatePropagation() {
              r.stopImmediatePropagation
                ? r.stopImmediatePropagation()
                : (r.cancelBubble = !0)
            },
          }
          return (
            o == 'mousewheel'
              ? (r.wheelDeltaX && (i.deltaX = -0.025 * r.wheelDeltaX),
                r.wheelDeltaY && (i.deltaY = -0.025 * r.wheelDeltaY),
                !i.deltaY && !i.deltaX && (i.deltaY = -0.025 * r.wheelDelta))
              : (i.deltaY = r.detail),
            t.call(e, i)
          )
        },
        r
      )
    }
    function z(e, o, t, r) {
      T.scrollrunning ||
        ((T.newscrolly = T.getScrollTop()),
        (T.newscrollx = T.getScrollLeft()),
        (D = f()))
      const i = f() - D
      if (
        ((D = f()),
        i > 350 ? (A = 1) : (A += (2 - A) / 10),
        (e = (e * A) | 0),
        (o = (o * A) | 0),
        e)
      ) {
        if (r)
          if (e < 0) {
            if (T.getScrollLeft() >= T.page.maxw) return !0
          } else if (T.getScrollLeft() <= 0) return !0
        const s = e > 0 ? 1 : -1
        X !== s &&
          (T.scrollmom && T.scrollmom.stop(),
          (T.newscrollx = T.getScrollLeft()),
          (X = s)),
          (T.lastdeltax -= e)
      }
      if (o) {
        if (
          (function () {
            const e = T.getScrollTop()
            if (o < 0) {
              if (e >= T.page.maxh) return !0
            } else if (e <= 0) return !0
          })()
        ) {
          if (M.nativeparentscrolling && t && !T.ispage && !T.zoomactive)
            return !0
          const n = T.view.h >> 1
          T.newscrolly < -n
            ? ((T.newscrolly = -n), (o = -1))
            : T.newscrolly > T.page.maxh + n
            ? ((T.newscrolly = T.page.maxh + n), (o = 1))
            : (o = 0)
        }
        const l = o > 0 ? 1 : -1
        B !== l &&
          (T.scrollmom && T.scrollmom.stop(),
          (T.newscrolly = T.getScrollTop()),
          (B = l)),
          (T.lastdeltay -= o)
      }
      ;(o || e) &&
        T.synched('relativexy', function () {
          const e = T.lastdeltay + T.newscrolly
          T.lastdeltay = 0
          const o = T.lastdeltax + T.newscrollx
          ;(T.lastdeltax = 0), T.rail.drag || T.doScrollPos(o, e)
        })
    }
    function k(e, o, t) {
      let r, i
      return (
        !(t || !q) ||
        (e.deltaMode === 0
          ? ((r = (-e.deltaX * (M.mousescrollstep / 54)) | 0),
            (i = (-e.deltaY * (M.mousescrollstep / 54)) | 0))
          : e.deltaMode === 1 &&
            ((r = ((-e.deltaX * M.mousescrollstep * 50) / 80) | 0),
            (i = ((-e.deltaY * M.mousescrollstep * 50) / 80) | 0)),
        o &&
          M.oneaxismousemode &&
          r === 0 &&
          i &&
          ((r = i),
          (i = 0),
          t &&
            (r < 0
              ? T.getScrollLeft() >= T.page.maxw
              : T.getScrollLeft() <= 0) &&
            ((i = r), (r = 0))),
        T.isrtlmode && (r = -r),
        z(r, i, t, !0)
          ? void (t && (q = !0))
          : ((q = !1), e.stopImmediatePropagation(), e.preventDefault()))
      )
    }
    var T = this
    ;(this.version = '3.7.6'), (this.name = 'nicescroll'), (this.me = p)
    const E = n('body')
    var M = (this.opt = { doc: E, win: !1 })
    if ((n.extend(M, g), (M.snapbackspeed = 80), e))
      for (const L in M) void 0 !== e[L] && (M[L] = e[L])
    if (
      (M.disablemutationobserver && (m = !1),
      (this.doc = M.doc),
      (this.iddoc = this.doc && this.doc[0] ? this.doc[0].id || '' : ''),
      (this.ispage = /^BODY|HTML/.test(
        M.win ? M.win[0].nodeName : this.doc[0].nodeName
      )),
      (this.haswrapper = !1 !== M.win),
      (this.win = M.win || (this.ispage ? c : this.doc)),
      (this.docscroll = this.ispage && !this.haswrapper ? c : this.win),
      (this.body = E),
      (this.viewport = !1),
      (this.isfixed = !1),
      (this.iframe = !1),
      (this.isiframe =
        this.doc[0].nodeName == 'IFRAME' && this.win[0].nodeName == 'IFRAME'),
      (this.istextarea = this.win[0].nodeName == 'TEXTAREA'),
      (this.forcescreen = !1),
      (this.canshowonmouseevent = M.autohidemode != 'scroll'),
      (this.onmousedown = !1),
      (this.onmouseup = !1),
      (this.onmousemove = !1),
      (this.onmousewheel = !1),
      (this.onkeypress = !1),
      (this.ongesturezoom = !1),
      (this.onclick = !1),
      (this.onscrollstart = !1),
      (this.onscrollend = !1),
      (this.onscrollcancel = !1),
      (this.onzoomin = !1),
      (this.onzoomout = !1),
      (this.view = !1),
      (this.page = !1),
      (this.scroll = { x: 0, y: 0 }),
      (this.scrollratio = { x: 0, y: 0 }),
      (this.cursorheight = 20),
      (this.scrollvaluemax = 0),
      M.rtlmode == 'auto')
    ) {
      const C = this.win[0] == a ? this.body : this.win
      const N =
        C.css('writing-mode') ||
        C.css('-webkit-writing-mode') ||
        C.css('-ms-writing-mode') ||
        C.css('-moz-writing-mode')
      N == 'horizontal-tb' || N == 'lr-tb' || N === ''
        ? ((this.isrtlmode = C.css('direction') == 'rtl'),
          (this.isvertical = !1))
        : ((this.isrtlmode =
            N == 'vertical-rl' || N == 'tb' || N == 'tb-rl' || N == 'rl-tb'),
          (this.isvertical = N == 'vertical-rl' || N == 'tb' || N == 'tb-rl'))
    } else (this.isrtlmode = !0 === M.rtlmode), (this.isvertical = !1)
    if (
      ((this.scrollrunning = !1),
      (this.scrollmom = !1),
      (this.observer = !1),
      (this.observerremover = !1),
      (this.observerbody = !1),
      !1 !== M.scrollbarid)
    )
      this.id = M.scrollbarid
    else
      do {
        this.id = 'ascrail' + i++
      } while (l.getElementById(this.id))
    ;(this.rail = !1),
      (this.cursor = !1),
      (this.cursorfreezed = !1),
      (this.selectiondrag = !1),
      (this.zoom = !1),
      (this.zoomactive = !1),
      (this.hasfocus = !1),
      (this.hasmousefocus = !1),
      (this.railslocked = !1),
      (this.locked = !1),
      (this.hidden = !1),
      (this.cursoractive = !0),
      (this.wheelprevented = !1),
      (this.overflowx = M.overflowx),
      (this.overflowy = M.overflowy),
      (this.nativescrollingarea = !1),
      (this.checkarea = 0),
      (this.events = []),
      (this.saved = {}),
      (this.delaylist = {}),
      (this.synclist = {}),
      (this.lastdeltax = 0),
      (this.lastdeltay = 0),
      (this.detected = w())
    var P = n.extend({}, this.detected)
    ;(this.canhwscroll = P.hastransform && M.hwacceleration),
      (this.ishwscroll = this.canhwscroll && T.haswrapper),
      this.isrtlmode
        ? this.isvertical
          ? (this.hasreversehr = !(P.iswebkit || P.isie || P.isie11))
          : (this.hasreversehr = !(
              P.iswebkit ||
              (P.isie && !P.isie10 && !P.isie11)
            ))
        : (this.hasreversehr = !1),
      (this.istouchcapable = !1),
      P.cantouch || (!P.hasw3ctouch && !P.hasmstouch)
        ? !P.cantouch ||
          P.isios ||
          P.isandroid ||
          (!P.iswebkit && !P.ismozilla) ||
          (this.istouchcapable = !0)
        : (this.istouchcapable = !0),
      M.enablemouselockapi ||
        ((P.hasmousecapture = !1), (P.haspointerlock = !1)),
      (this.debounced = function (e, o, t) {
        T &&
          (T.delaylist[e] ||
            !1 ||
            ((T.delaylist[e] = {
              h: u(function () {
                T.delaylist[e].fn.call(T), (T.delaylist[e] = !1)
              }, t),
            }),
            o.call(T)),
          (T.delaylist[e].fn = o))
      }),
      (this.synched = function (e, o) {
        T.synclist[e]
          ? (T.synclist[e] = o)
          : ((T.synclist[e] = o),
            u(function () {
              T &&
                (T.synclist[e] && T.synclist[e].call(T), (T.synclist[e] = null))
            }))
      }),
      (this.unsynched = function (e) {
        T.synclist[e] && (T.synclist[e] = !1)
      }),
      (this.css = function (e, o) {
        for (const t in o) T.saved.css.push([e, t, e.css(t)]), e.css(t, o[t])
      }),
      (this.scrollTop = function (e) {
        return void 0 === e ? T.getScrollTop() : T.setScrollTop(e)
      }),
      (this.scrollLeft = function (e) {
        return void 0 === e ? T.getScrollLeft() : T.setScrollLeft(e)
      })
    const R = function (e, o, t, r, i, s, n) {
      ;(this.st = e),
        (this.ed = o),
        (this.spd = t),
        (this.p1 = r || 0),
        (this.p2 = i || 1),
        (this.p3 = s || 0),
        (this.p4 = n || 1),
        (this.ts = f()),
        (this.df = o - e)
    }
    if (
      ((R.prototype = {
        B2(e) {
          return 3 * (1 - e) * (1 - e) * e
        },
        B3(e) {
          return 3 * (1 - e) * e * e
        },
        B4(e) {
          return e * e * e
        },
        getPos() {
          return (f() - this.ts) / this.spd
        },
        getNow() {
          const e = (f() - this.ts) / this.spd
          const o = this.B2(e) + this.B3(e) + this.B4(e)
          return e >= 1 ? this.ed : (this.st + this.df * o) | 0
        },
        update(e, o) {
          return (
            (this.st = this.getNow()),
            (this.ed = e),
            (this.spd = o),
            (this.ts = f()),
            (this.df = this.ed - this.st),
            this
          )
        },
      }),
      this.ishwscroll)
    ) {
      ;(this.doc.translate = { x: 0, y: 0, tx: '0px', ty: '0px' }),
        P.hastranslate3d &&
          P.isios &&
          this.doc.css('-webkit-backface-visibility', 'hidden'),
        (this.getScrollTop = function (e) {
          if (!e) {
            const o = v()
            if (o) return o.length == 16 ? -o[13] : -o[5]
            if (T.timerscroll && T.timerscroll.bz)
              return T.timerscroll.bz.getNow()
          }
          return T.doc.translate.y
        }),
        (this.getScrollLeft = function (e) {
          if (!e) {
            const o = v()
            if (o) return o.length == 16 ? -o[12] : -o[4]
            if (T.timerscroll && T.timerscroll.bh)
              return T.timerscroll.bh.getNow()
          }
          return T.doc.translate.x
        }),
        (this.notifyScrollEvent = function (e) {
          const o = l.createEvent('UIEvents')
          o.initUIEvent('scroll', !1, !1, a, 1),
            (o.niceevent = !0),
            e.dispatchEvent(o)
        })
      const _ = this.isrtlmode ? 1 : -1
      P.hastranslate3d && M.enabletranslate3d
        ? ((this.setScrollTop = function (e, o) {
            ;(T.doc.translate.y = e),
              (T.doc.translate.ty = -1 * e + 'px'),
              T.doc.css(
                P.trstyle,
                'translate3d(' +
                  T.doc.translate.tx +
                  ',' +
                  T.doc.translate.ty +
                  ',0)'
              ),
              o || T.notifyScrollEvent(T.win[0])
          }),
          (this.setScrollLeft = function (e, o) {
            ;(T.doc.translate.x = e),
              (T.doc.translate.tx = e * _ + 'px'),
              T.doc.css(
                P.trstyle,
                'translate3d(' +
                  T.doc.translate.tx +
                  ',' +
                  T.doc.translate.ty +
                  ',0)'
              ),
              o || T.notifyScrollEvent(T.win[0])
          }))
        : ((this.setScrollTop = function (e, o) {
            ;(T.doc.translate.y = e),
              (T.doc.translate.ty = -1 * e + 'px'),
              T.doc.css(
                P.trstyle,
                'translate(' +
                  T.doc.translate.tx +
                  ',' +
                  T.doc.translate.ty +
                  ')'
              ),
              o || T.notifyScrollEvent(T.win[0])
          }),
          (this.setScrollLeft = function (e, o) {
            ;(T.doc.translate.x = e),
              (T.doc.translate.tx = e * _ + 'px'),
              T.doc.css(
                P.trstyle,
                'translate(' +
                  T.doc.translate.tx +
                  ',' +
                  T.doc.translate.ty +
                  ')'
              ),
              o || T.notifyScrollEvent(T.win[0])
          }))
    } else
      (this.getScrollTop = function () {
        return T.docscroll.scrollTop()
      }),
        (this.setScrollTop = function (e) {
          T.docscroll.scrollTop(e)
        }),
        (this.getScrollLeft = function () {
          return T.hasreversehr
            ? T.detected.ismozilla
              ? T.page.maxw - Math.abs(T.docscroll.scrollLeft())
              : T.page.maxw - T.docscroll.scrollLeft()
            : T.docscroll.scrollLeft()
        }),
        (this.setScrollLeft = function (e) {
          return setTimeout(function () {
            if (T)
              return (
                T.hasreversehr &&
                  (e = T.detected.ismozilla
                    ? -(T.page.maxw - e)
                    : T.page.maxw - e),
                T.docscroll.scrollLeft(e)
              )
          }, 1)
        })
    ;(this.getTarget = function (e) {
      return !!e && (e.target ? e.target : !!e.srcElement && e.srcElement)
    }),
      (this.hasParent = function (e, o) {
        if (!e) return !1
        for (var t = e.target || e.srcElement || e || !1; t && t.id != o; )
          t = t.parentNode || !1
        return !1 !== t
      })
    var I = { thin: 1, medium: 3, thick: 5 }
    ;(this.getDocumentScrollOffset = function () {
      return {
        top: a.pageYOffset || l.documentElement.scrollTop,
        left: a.pageXOffset || l.documentElement.scrollLeft,
      }
    }),
      (this.getOffset = function () {
        if (T.isfixed) {
          const e = T.win.offset()
          const o = T.getDocumentScrollOffset()
          return (e.top -= o.top), (e.left -= o.left), e
        }
        const t = T.win.offset()
        if (!T.viewport) return t
        const r = T.viewport.offset()
        return { top: t.top - r.top, left: t.left - r.left }
      }),
      (this.updateScrollBar = function (e) {
        let o, t
        if (T.ishwscroll)
          T.rail.css({
            height:
              T.win.innerHeight() - (M.railpadding.top + M.railpadding.bottom),
          }),
            T.railh &&
              T.railh.css({
                width:
                  T.win.innerWidth() -
                  (M.railpadding.left + M.railpadding.right),
              })
        else {
          const r = T.getOffset()
          if (
            ((o = {
              top: r.top,
              left: r.left - (M.railpadding.left + M.railpadding.right),
            }),
            (o.top += x(T.win, 'border-top-width', !0)),
            (o.left += T.rail.align
              ? T.win.outerWidth() -
                x(T.win, 'border-right-width') -
                T.rail.width
              : x(T.win, 'border-left-width')),
            (t = M.railoffset) &&
              (t.top && (o.top += t.top), t.left && (o.left += t.left)),
            T.railslocked ||
              T.rail.css({
                top: o.top,
                left: o.left,
                height:
                  (e ? e.h : T.win.innerHeight()) -
                  (M.railpadding.top + M.railpadding.bottom),
              }),
            T.zoom &&
              T.zoom.css({
                top: o.top + 1,
                left:
                  T.rail.align == 1 ? o.left - 20 : o.left + T.rail.width + 4,
              }),
            T.railh && !T.railslocked)
          ) {
            ;(o = { top: r.top, left: r.left }),
              (t = M.railhoffset) &&
                (t.top && (o.top += t.top), t.left && (o.left += t.left))
            const i = T.railh.align
              ? o.top +
                x(T.win, 'border-top-width', !0) +
                T.win.innerHeight() -
                T.railh.height
              : o.top + x(T.win, 'border-top-width', !0)
            const s = o.left + x(T.win, 'border-left-width')
            T.railh.css({
              top: i - (M.railpadding.top + M.railpadding.bottom),
              left: s,
              width: T.railh.width,
            })
          }
        }
      }),
      (this.doRailClick = function (e, o, t) {
        let r, i, s, n
        T.railslocked ||
          (T.cancelEvent(e),
          'pageY' in e ||
            ((e.pageX = e.clientX + l.documentElement.scrollLeft),
            (e.pageY = e.clientY + l.documentElement.scrollTop)),
          o
            ? ((r = t ? T.doScrollLeft : T.doScrollTop),
              (s = t
                ? (e.pageX - T.railh.offset().left - T.cursorwidth / 2) *
                  T.scrollratio.x
                : (e.pageY - T.rail.offset().top - T.cursorheight / 2) *
                  T.scrollratio.y),
              T.unsynched('relativexy'),
              r(0 | s))
            : ((r = t ? T.doScrollLeftBy : T.doScrollBy),
              (s = t ? T.scroll.x : T.scroll.y),
              (n = t
                ? e.pageX - T.railh.offset().left
                : e.pageY - T.rail.offset().top),
              (i = t ? T.view.w : T.view.h),
              r(s >= n ? i : -i)))
      }),
      (T.newscrolly = T.newscrollx = 0),
      (T.hasanimationframe = 'requestAnimationFrame' in a),
      (T.hascancelanimationframe = 'cancelAnimationFrame' in a),
      (T.hasborderbox = !1),
      (this.init = function () {
        if (((T.saved.css = []), P.isoperamini)) return !0
        if (P.isandroid && !('hidden' in l)) return !0
        ;(M.emulatetouch = M.emulatetouch || M.touchbehavior),
          (T.hasborderbox =
            a.getComputedStyle &&
            a.getComputedStyle(l.body)['box-sizing'] === 'border-box')
        const e = { 'overflow-y': 'hidden' }
        if (
          ((P.isie11 || P.isie10) && (e['-ms-overflow-style'] = 'none'),
          T.ishwscroll &&
            (this.doc.css(
              P.transitionstyle,
              P.prefixstyle + 'transform 0ms ease-out'
            ),
            P.transitionend &&
              T.bind(T.doc, P.transitionend, T.onScrollTransitionEnd, !1)),
          (T.zindex = 'auto'),
          T.ispage || M.zindex != 'auto'
            ? (T.zindex = M.zindex)
            : (T.zindex = b() || 'auto'),
          !T.ispage && T.zindex != 'auto' && T.zindex > s && (s = T.zindex),
          T.isie && T.zindex === 0 && M.zindex == 'auto' && (T.zindex = 'auto'),
          !T.ispage || !P.isieold)
        ) {
          let i = T.docscroll
          T.ispage && (i = T.haswrapper ? T.win : T.doc),
            T.css(i, e),
            T.ispage && (P.isie11 || P.isie) && T.css(n('html'), e),
            !P.isios ||
              T.ispage ||
              T.haswrapper ||
              T.css(E, { '-webkit-overflow-scrolling': 'touch' })
          let d = n(l.createElement('div'))
          d.css({
            position: 'relative',
            top: 0,
            float: 'right',
            width: M.cursorwidth,
            height: 0,
            'background-color': M.cursorcolor,
            border: M.cursorborder,
            'background-clip': 'padding-box',
            '-webkit-border-radius': M.cursorborderradius,
            '-moz-border-radius': M.cursorborderradius,
            'border-radius': M.cursorborderradius,
          }),
            d.addClass('nicescroll-cursors'),
            (T.cursor = d)
          const u = n(l.createElement('div'))
          u.attr('id', T.id), u.addClass('nicescroll-rails nicescroll-rails-vr')
          let h
          let p
          const f = ['left', 'right', 'top', 'bottom']
          for (const g in f)
            (p = f[g]),
              (h = M.railpadding[p] || 0) && u.css('padding-' + p, h + 'px')
          u.append(d),
            (u.width = Math.max(parseFloat(M.cursorwidth), d.outerWidth())),
            u.css({
              width: u.width + 'px',
              zIndex: T.zindex,
              background: M.background,
              cursor: 'default',
            }),
            (u.visibility = !0),
            (u.scrollable = !0),
            (u.align = M.railalign == 'left' ? 0 : 1),
            (T.rail = u),
            (T.rail.drag = !1)
          let v = !1
          !M.boxzoom ||
            T.ispage ||
            P.isieold ||
            ((v = l.createElement('div')),
            T.bind(v, 'click', T.doZoom),
            T.bind(v, 'mouseenter', function () {
              T.zoom.css('opacity', M.cursoropacitymax)
            }),
            T.bind(v, 'mouseleave', function () {
              T.zoom.css('opacity', M.cursoropacitymin)
            }),
            (T.zoom = n(v)),
            T.zoom.css({
              cursor: 'pointer',
              zIndex: T.zindex,
              backgroundImage: 'url(' + M.scriptpath + 'zoomico.png)',
              height: 18,
              width: 18,
              backgroundPosition: '0 0',
            }),
            M.dblclickzoom && T.bind(T.win, 'dblclick', T.doZoom),
            P.cantouch &&
              M.gesturezoom &&
              ((T.ongesturezoom = function (e) {
                return (
                  e.scale > 1.5 && T.doZoomIn(e),
                  e.scale < 0.8 && T.doZoomOut(e),
                  T.cancelEvent(e)
                )
              }),
              T.bind(T.win, 'gestureend', T.ongesturezoom))),
            (T.railh = !1)
          let w
          if (
            (M.horizrailenabled &&
              (T.css(i, { overflowX: 'hidden' }),
              (d = n(l.createElement('div'))).css({
                position: 'absolute',
                top: 0,
                height: M.cursorwidth,
                width: 0,
                backgroundColor: M.cursorcolor,
                border: M.cursorborder,
                backgroundClip: 'padding-box',
                '-webkit-border-radius': M.cursorborderradius,
                '-moz-border-radius': M.cursorborderradius,
                'border-radius': M.cursorborderradius,
              }),
              P.isieold && d.css('overflow', 'hidden'),
              d.addClass('nicescroll-cursors'),
              (T.cursorh = d),
              (w = n(l.createElement('div'))).attr('id', T.id + '-hr'),
              w.addClass('nicescroll-rails nicescroll-rails-hr'),
              (w.height = Math.max(parseFloat(M.cursorwidth), d.outerHeight())),
              w.css({
                height: w.height + 'px',
                zIndex: T.zindex,
                background: M.background,
              }),
              w.append(d),
              (w.visibility = !0),
              (w.scrollable = !0),
              (w.align = M.railvalign == 'top' ? 0 : 1),
              (T.railh = w),
              (T.railh.drag = !1)),
            T.ispage)
          )
            u.css({ position: 'fixed', top: 0, height: '100%' }),
              u.css(u.align ? { right: 0 } : { left: 0 }),
              T.body.append(u),
              T.railh &&
                (w.css({ position: 'fixed', left: 0, width: '100%' }),
                w.css(w.align ? { bottom: 0 } : { top: 0 }),
                T.body.append(w))
          else {
            if (T.ishwscroll) {
              T.win.css('position') == 'static' &&
                T.css(T.win, { position: 'relative' })
              const x = T.win[0].nodeName == 'HTML' ? T.body : T.win
              n(x).scrollTop(0).scrollLeft(0),
                T.zoom &&
                  (T.zoom.css({
                    position: 'absolute',
                    top: 1,
                    right: 0,
                    'margin-right': u.width + 4,
                  }),
                  x.append(T.zoom)),
                u.css({ position: 'absolute', top: 0 }),
                u.css(u.align ? { right: 0 } : { left: 0 }),
                x.append(u),
                w &&
                  (w.css({ position: 'absolute', left: 0, bottom: 0 }),
                  w.css(w.align ? { bottom: 0 } : { top: 0 }),
                  x.append(w))
            } else {
              T.isfixed = T.win.css('position') == 'fixed'
              const S = T.isfixed ? 'fixed' : 'absolute'
              T.isfixed || (T.viewport = T.getViewport(T.win[0])),
                T.viewport &&
                  ((T.body = T.viewport),
                  /fixed|absolute/.test(T.viewport.css('position')) ||
                    T.css(T.viewport, { position: 'relative' })),
                u.css({ position: S }),
                T.zoom && T.zoom.css({ position: S }),
                T.updateScrollBar(),
                T.body.append(u),
                T.zoom && T.body.append(T.zoom),
                T.railh && (w.css({ position: S }), T.body.append(w))
            }
            P.isios &&
              T.css(T.win, {
                '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
                '-webkit-touch-callout': 'none',
              }),
              M.disableoutline &&
                (P.isie && T.win.attr('hideFocus', 'true'),
                P.iswebkit && T.win.css('outline', 'none'))
          }
          if (
            (!1 === M.autohidemode
              ? ((T.autohidedom = !1),
                T.rail.css({ opacity: M.cursoropacitymax }),
                T.railh && T.railh.css({ opacity: M.cursoropacitymax }))
              : !0 === M.autohidemode || M.autohidemode === 'leave'
              ? ((T.autohidedom = n().add(T.rail)),
                P.isie8 && (T.autohidedom = T.autohidedom.add(T.cursor)),
                T.railh && (T.autohidedom = T.autohidedom.add(T.railh)),
                T.railh &&
                  P.isie8 &&
                  (T.autohidedom = T.autohidedom.add(T.cursorh)))
              : M.autohidemode == 'scroll'
              ? ((T.autohidedom = n().add(T.rail)),
                T.railh && (T.autohidedom = T.autohidedom.add(T.railh)))
              : M.autohidemode == 'cursor'
              ? ((T.autohidedom = n().add(T.cursor)),
                T.railh && (T.autohidedom = T.autohidedom.add(T.cursorh)))
              : M.autohidemode == 'hidden' &&
                ((T.autohidedom = !1), T.hide(), (T.railslocked = !1)),
            P.cantouch || T.istouchcapable || M.emulatetouch || P.hasmstouch)
          ) {
            T.scrollmom = new y(T)
            ;(T.ontouchstart = function (e) {
              if (T.locked) return !1
              if (
                e.pointerType &&
                (e.pointerType === 'mouse' ||
                  e.pointerType === e.MSPOINTER_TYPE_MOUSE)
              )
                return !1
              if (
                ((T.hasmoving = !1),
                T.scrollmom.timer && (T.triggerScrollEnd(), T.scrollmom.stop()),
                !T.railslocked)
              ) {
                const o = T.getTarget(e)
                if (o && /INPUT/i.test(o.nodeName) && /range/i.test(o.type))
                  return T.stopPropagation(e)
                const t = e.type === 'mousedown'
                if (
                  (!('clientX' in e) &&
                    'changedTouches' in e &&
                    ((e.clientX = e.changedTouches[0].clientX),
                    (e.clientY = e.changedTouches[0].clientY)),
                  T.forcescreen)
                ) {
                  const r = e
                  ;((e = { original: e.original ? e.original : e }).clientX =
                    r.screenX),
                    (e.clientY = r.screenY)
                }
                if (
                  ((T.rail.drag = {
                    x: e.clientX,
                    y: e.clientY,
                    sx: T.scroll.x,
                    sy: T.scroll.y,
                    st: T.getScrollTop(),
                    sl: T.getScrollLeft(),
                    pt: 2,
                    dl: !1,
                    tg: o,
                  }),
                  T.ispage || !M.directionlockdeadzone)
                )
                  T.rail.drag.dl = 'f'
                else {
                  const i = { w: c.width(), h: c.height() }
                  const s = T.getContentSize()
                  const l = s.h - i.h
                  const a = s.w - i.w
                  T.rail.scrollable && !T.railh.scrollable
                    ? (T.rail.drag.ck = l > 0 && 'v')
                    : !T.rail.scrollable && T.railh.scrollable
                    ? (T.rail.drag.ck = a > 0 && 'h')
                    : (T.rail.drag.ck = !1)
                }
                if (M.emulatetouch && T.isiframe && P.isie) {
                  const d = T.win.position()
                  ;(T.rail.drag.x += d.left), (T.rail.drag.y += d.top)
                }
                if (
                  ((T.hasmoving = !1),
                  (T.lastmouseup = !1),
                  T.scrollmom.reset(e.clientX, e.clientY),
                  o && t)
                ) {
                  if (!/INPUT|SELECT|BUTTON|TEXTAREA/i.test(o.nodeName))
                    return (
                      P.hasmousecapture && o.setCapture(),
                      M.emulatetouch
                        ? (o.onclick &&
                            !o._onclick &&
                            ((o._onclick = o.onclick),
                            (o.onclick = function (e) {
                              if (T.hasmoving) return !1
                              o._onclick.call(this, e)
                            })),
                          T.cancelEvent(e))
                        : T.stopPropagation(e)
                    )
                  ;/SUBMIT|CANCEL|BUTTON/i.test(n(o).attr('type')) &&
                    (T.preventclick = { tg: o, click: !1 })
                }
              }
            }),
              (T.ontouchend = function (e) {
                if (!T.rail.drag) return !0
                if (T.rail.drag.pt == 2) {
                  if (
                    e.pointerType &&
                    (e.pointerType === 'mouse' ||
                      e.pointerType === e.MSPOINTER_TYPE_MOUSE)
                  )
                    return !1
                  T.rail.drag = !1
                  const o = e.type === 'mouseup'
                  if (
                    T.hasmoving &&
                    (T.scrollmom.doMomentum(),
                    (T.lastmouseup = !0),
                    T.hideCursor(),
                    P.hasmousecapture && l.releaseCapture(),
                    o)
                  )
                    return T.cancelEvent(e)
                } else if (T.rail.drag.pt == 1) return T.onmouseup(e)
              })
            const z = M.emulatetouch && T.isiframe && !P.hasmousecapture
            const k = (0.3 * M.directionlockdeadzone) | 0
            ;(T.ontouchmove = function (e, o) {
              if (!T.rail.drag) return !0
              if (
                e.targetTouches &&
                M.preventmultitouchscrolling &&
                e.targetTouches.length > 1
              )
                return !0
              if (
                e.pointerType &&
                (e.pointerType === 'mouse' ||
                  e.pointerType === e.MSPOINTER_TYPE_MOUSE)
              )
                return !0
              if (T.rail.drag.pt == 2) {
                'changedTouches' in e &&
                  ((e.clientX = e.changedTouches[0].clientX),
                  (e.clientY = e.changedTouches[0].clientY))
                let t, r
                if (((r = t = 0), z && !o)) {
                  const i = T.win.position()
                  ;(r = -i.left), (t = -i.top)
                }
                let s = e.clientY + t
                const n = s - T.rail.drag.y
                let a = e.clientX + r
                const c = a - T.rail.drag.x
                let d = T.rail.drag.st - n
                if (T.ishwscroll && M.bouncescroll)
                  d < 0
                    ? (d = Math.round(d / 2))
                    : d > T.page.maxh &&
                      (d = T.page.maxh + Math.round((d - T.page.maxh) / 2))
                else if (
                  (d < 0
                    ? ((d = 0), (s = 0))
                    : d > T.page.maxh && ((d = T.page.maxh), (s = 0)),
                  s === 0 && !T.hasmoving)
                )
                  return T.ispage || (T.rail.drag = !1), !0
                let u = T.getScrollLeft()
                if (
                  (T.railh &&
                    T.railh.scrollable &&
                    ((u = T.isrtlmode
                      ? c - T.rail.drag.sl
                      : T.rail.drag.sl - c),
                    T.ishwscroll && M.bouncescroll
                      ? u < 0
                        ? (u = Math.round(u / 2))
                        : u > T.page.maxw &&
                          (u = T.page.maxw + Math.round((u - T.page.maxw) / 2))
                      : (u < 0 && ((u = 0), (a = 0)),
                        u > T.page.maxw && ((u = T.page.maxw), (a = 0)))),
                  !T.hasmoving)
                ) {
                  if (
                    T.rail.drag.y === e.clientY &&
                    T.rail.drag.x === e.clientX
                  )
                    return T.cancelEvent(e)
                  const h = Math.abs(n)
                  const p = Math.abs(c)
                  const m = M.directionlockdeadzone
                  if (
                    (T.rail.drag.ck
                      ? T.rail.drag.ck == 'v'
                        ? p > m && h <= k
                          ? (T.rail.drag = !1)
                          : h > m && (T.rail.drag.dl = 'v')
                        : T.rail.drag.ck == 'h' &&
                          (h > m && p <= k
                            ? (T.rail.drag = !1)
                            : p > m && (T.rail.drag.dl = 'h'))
                      : h > m && p > m
                      ? (T.rail.drag.dl = 'f')
                      : h > m
                      ? (T.rail.drag.dl = p > k ? 'f' : 'v')
                      : p > m && (T.rail.drag.dl = h > k ? 'f' : 'h'),
                    !T.rail.drag.dl)
                  )
                    return T.cancelEvent(e)
                  T.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0),
                    (T.hasmoving = !0)
                }
                return (
                  T.preventclick &&
                    !T.preventclick.click &&
                    ((T.preventclick.click = T.preventclick.tg.onclick || !1),
                    (T.preventclick.tg.onclick = T.onpreventclick)),
                  T.rail.drag.dl &&
                    (T.rail.drag.dl == 'v'
                      ? (u = T.rail.drag.sl)
                      : T.rail.drag.dl == 'h' && (d = T.rail.drag.st)),
                  T.synched('touchmove', function () {
                    T.rail.drag &&
                      T.rail.drag.pt == 2 &&
                      (T.prepareTransition && T.resetTransition(),
                      T.rail.scrollable && T.setScrollTop(d),
                      T.scrollmom.update(a, s),
                      T.railh && T.railh.scrollable
                        ? (T.setScrollLeft(u), T.showCursor(d, u))
                        : T.showCursor(d),
                      P.isie10 && l.selection.clear())
                  }),
                  T.cancelEvent(e)
                )
              }
              return T.rail.drag.pt == 1 ? T.onmousemove(e) : void 0
            }),
              (T.ontouchstartCursor = function (e, o) {
                if (!T.rail.drag || T.rail.drag.pt == 3) {
                  if (T.locked) return T.cancelEvent(e)
                  T.cancelScroll(),
                    (T.rail.drag = {
                      x: e.touches[0].clientX,
                      y: e.touches[0].clientY,
                      sx: T.scroll.x,
                      sy: T.scroll.y,
                      pt: 3,
                      hr: !!o,
                    })
                  const t = T.getTarget(e)
                  return (
                    !T.ispage && P.hasmousecapture && t.setCapture(),
                    T.isiframe &&
                      !P.hasmousecapture &&
                      ((T.saved.csspointerevents = T.doc.css('pointer-events')),
                      T.css(T.doc, { 'pointer-events': 'none' })),
                    T.cancelEvent(e)
                  )
                }
              }),
              (T.ontouchendCursor = function (e) {
                if (T.rail.drag) {
                  if (
                    (P.hasmousecapture && l.releaseCapture(),
                    T.isiframe &&
                      !P.hasmousecapture &&
                      T.doc.css('pointer-events', T.saved.csspointerevents),
                    T.rail.drag.pt != 3)
                  )
                    return
                  return (T.rail.drag = !1), T.cancelEvent(e)
                }
              }),
              (T.ontouchmoveCursor = function (e) {
                if (T.rail.drag) {
                  if (T.rail.drag.pt != 3) return
                  if (((T.cursorfreezed = !0), T.rail.drag.hr)) {
                    ;(T.scroll.x =
                      T.rail.drag.sx + (e.touches[0].clientX - T.rail.drag.x)),
                      T.scroll.x < 0 && (T.scroll.x = 0)
                    const o = T.scrollvaluemaxw
                    T.scroll.x > o && (T.scroll.x = o)
                  } else {
                    ;(T.scroll.y =
                      T.rail.drag.sy + (e.touches[0].clientY - T.rail.drag.y)),
                      T.scroll.y < 0 && (T.scroll.y = 0)
                    const t = T.scrollvaluemax
                    T.scroll.y > t && (T.scroll.y = t)
                  }
                  return (
                    T.synched('touchmove', function () {
                      T.rail.drag &&
                        T.rail.drag.pt == 3 &&
                        (T.showCursor(),
                        T.rail.drag.hr
                          ? T.doScrollLeft(
                              Math.round(T.scroll.x * T.scrollratio.x),
                              M.cursordragspeed
                            )
                          : T.doScrollTop(
                              Math.round(T.scroll.y * T.scrollratio.y),
                              M.cursordragspeed
                            ))
                    }),
                    T.cancelEvent(e)
                  )
                }
              })
          }
          if (
            ((T.onmousedown = function (e, o) {
              if (!T.rail.drag || T.rail.drag.pt == 1) {
                if (T.railslocked) return T.cancelEvent(e)
                T.cancelScroll(),
                  (T.rail.drag = {
                    x: e.clientX,
                    y: e.clientY,
                    sx: T.scroll.x,
                    sy: T.scroll.y,
                    pt: 1,
                    hr: o || !1,
                  })
                const t = T.getTarget(e)
                return (
                  P.hasmousecapture && t.setCapture(),
                  T.isiframe &&
                    !P.hasmousecapture &&
                    ((T.saved.csspointerevents = T.doc.css('pointer-events')),
                    T.css(T.doc, { 'pointer-events': 'none' })),
                  (T.hasmoving = !1),
                  T.cancelEvent(e)
                )
              }
            }),
            (T.onmouseup = function (e) {
              if (T.rail.drag)
                return (
                  T.rail.drag.pt != 1 ||
                  (P.hasmousecapture && l.releaseCapture(),
                  T.isiframe &&
                    !P.hasmousecapture &&
                    T.doc.css('pointer-events', T.saved.csspointerevents),
                  (T.rail.drag = !1),
                  (T.cursorfreezed = !1),
                  T.hasmoving && T.triggerScrollEnd(),
                  T.cancelEvent(e))
                )
            }),
            (T.onmousemove = function (e) {
              if (T.rail.drag) {
                if (T.rail.drag.pt !== 1) return
                if (P.ischrome && e.which === 0) return T.onmouseup(e)
                if (
                  ((T.cursorfreezed = !0),
                  T.hasmoving ||
                    T.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0),
                  (T.hasmoving = !0),
                  T.rail.drag.hr)
                ) {
                  ;(T.scroll.x = T.rail.drag.sx + (e.clientX - T.rail.drag.x)),
                    T.scroll.x < 0 && (T.scroll.x = 0)
                  const o = T.scrollvaluemaxw
                  T.scroll.x > o && (T.scroll.x = o)
                } else {
                  ;(T.scroll.y = T.rail.drag.sy + (e.clientY - T.rail.drag.y)),
                    T.scroll.y < 0 && (T.scroll.y = 0)
                  const t = T.scrollvaluemax
                  T.scroll.y > t && (T.scroll.y = t)
                }
                return (
                  T.synched('mousemove', function () {
                    T.cursorfreezed &&
                      (T.showCursor(),
                      T.rail.drag.hr
                        ? T.scrollLeft(Math.round(T.scroll.x * T.scrollratio.x))
                        : T.scrollTop(Math.round(T.scroll.y * T.scrollratio.y)))
                  }),
                  T.cancelEvent(e)
                )
              }
              T.checkarea = 0
            }),
            P.cantouch || M.emulatetouch)
          )
            (T.onpreventclick = function (e) {
              if (T.preventclick)
                return (
                  (T.preventclick.tg.onclick = T.preventclick.click),
                  (T.preventclick = !1),
                  T.cancelEvent(e)
                )
            }),
              (T.onclick =
                !P.isios &&
                function (e) {
                  return (
                    !T.lastmouseup || ((T.lastmouseup = !1), T.cancelEvent(e))
                  )
                }),
              M.grabcursorenabled &&
                P.cursorgrabvalue &&
                (T.css(T.ispage ? T.doc : T.win, { cursor: P.cursorgrabvalue }),
                T.css(T.rail, { cursor: P.cursorgrabvalue }))
          else {
            var L = function (e) {
              if (T.selectiondrag) {
                if (e) {
                  const o = T.win.outerHeight()
                  let t = e.pageY - T.selectiondrag.top
                  t > 0 && t < o && (t = 0),
                    t >= o && (t -= o),
                    (T.selectiondrag.df = t)
                }
                if (T.selectiondrag.df !== 0) {
                  const r = ((-2 * T.selectiondrag.df) / 6) | 0
                  T.doScrollBy(r),
                    T.debounced(
                      'doselectionscroll',
                      function () {
                        L()
                      },
                      50
                    )
                }
              }
            }
            ;(T.hasTextSelected =
              'getSelection' in l
                ? function () {
                    return l.getSelection().rangeCount > 0
                  }
                : 'selection' in l
                ? function () {
                    return l.selection.type != 'None'
                  }
                : function () {
                    return !1
                  }),
              (T.onselectionstart = function (e) {
                T.ispage || (T.selectiondrag = T.win.offset())
              }),
              (T.onselectionend = function (e) {
                T.selectiondrag = !1
              }),
              (T.onselectiondrag = function (e) {
                T.selectiondrag &&
                  T.hasTextSelected() &&
                  T.debounced(
                    'selectionscroll',
                    function () {
                      L(e)
                    },
                    250
                  )
              })
          }
          if (
            (P.hasw3ctouch
              ? (T.css(T.ispage ? n('html') : T.win, {
                  'touch-action': 'none',
                }),
                T.css(T.rail, { 'touch-action': 'none' }),
                T.css(T.cursor, { 'touch-action': 'none' }),
                T.bind(T.win, 'pointerdown', T.ontouchstart),
                T.bind(l, 'pointerup', T.ontouchend),
                T.delegate(l, 'pointermove', T.ontouchmove))
              : P.hasmstouch
              ? (T.css(T.ispage ? n('html') : T.win, {
                  '-ms-touch-action': 'none',
                }),
                T.css(T.rail, { '-ms-touch-action': 'none' }),
                T.css(T.cursor, { '-ms-touch-action': 'none' }),
                T.bind(T.win, 'MSPointerDown', T.ontouchstart),
                T.bind(l, 'MSPointerUp', T.ontouchend),
                T.delegate(l, 'MSPointerMove', T.ontouchmove),
                T.bind(T.cursor, 'MSGestureHold', function (e) {
                  e.preventDefault()
                }),
                T.bind(T.cursor, 'contextmenu', function (e) {
                  e.preventDefault()
                }))
              : P.cantouch &&
                (T.bind(T.win, 'touchstart', T.ontouchstart, !1, !0),
                T.bind(l, 'touchend', T.ontouchend, !1, !0),
                T.bind(l, 'touchcancel', T.ontouchend, !1, !0),
                T.delegate(l, 'touchmove', T.ontouchmove, !1, !0)),
            M.emulatetouch &&
              (T.bind(T.win, 'mousedown', T.ontouchstart, !1, !0),
              T.bind(l, 'mouseup', T.ontouchend, !1, !0),
              T.bind(l, 'mousemove', T.ontouchmove, !1, !0)),
            (M.cursordragontouch || (!P.cantouch && !M.emulatetouch)) &&
              (T.rail.css({ cursor: 'default' }),
              T.railh && T.railh.css({ cursor: 'default' }),
              T.jqbind(T.rail, 'mouseenter', function () {
                if (!T.ispage && !T.win.is(':visible')) return !1
                T.canshowonmouseevent && T.showCursor(), (T.rail.active = !0)
              }),
              T.jqbind(T.rail, 'mouseleave', function () {
                ;(T.rail.active = !1), T.rail.drag || T.hideCursor()
              }),
              M.sensitiverail &&
                (T.bind(T.rail, 'click', function (e) {
                  T.doRailClick(e, !1, !1)
                }),
                T.bind(T.rail, 'dblclick', function (e) {
                  T.doRailClick(e, !0, !1)
                }),
                T.bind(T.cursor, 'click', function (e) {
                  T.cancelEvent(e)
                }),
                T.bind(T.cursor, 'dblclick', function (e) {
                  T.cancelEvent(e)
                })),
              T.railh &&
                (T.jqbind(T.railh, 'mouseenter', function () {
                  if (!T.ispage && !T.win.is(':visible')) return !1
                  T.canshowonmouseevent && T.showCursor(), (T.rail.active = !0)
                }),
                T.jqbind(T.railh, 'mouseleave', function () {
                  ;(T.rail.active = !1), T.rail.drag || T.hideCursor()
                }),
                M.sensitiverail &&
                  (T.bind(T.railh, 'click', function (e) {
                    T.doRailClick(e, !1, !0)
                  }),
                  T.bind(T.railh, 'dblclick', function (e) {
                    T.doRailClick(e, !0, !0)
                  }),
                  T.bind(T.cursorh, 'click', function (e) {
                    T.cancelEvent(e)
                  }),
                  T.bind(T.cursorh, 'dblclick', function (e) {
                    T.cancelEvent(e)
                  })))),
            M.cursordragontouch &&
              (this.istouchcapable || P.cantouch) &&
              (T.bind(T.cursor, 'touchstart', T.ontouchstartCursor),
              T.bind(T.cursor, 'touchmove', T.ontouchmoveCursor),
              T.bind(T.cursor, 'touchend', T.ontouchendCursor),
              T.cursorh &&
                T.bind(T.cursorh, 'touchstart', function (e) {
                  T.ontouchstartCursor(e, !0)
                }),
              T.cursorh && T.bind(T.cursorh, 'touchmove', T.ontouchmoveCursor),
              T.cursorh && T.bind(T.cursorh, 'touchend', T.ontouchendCursor)),
            M.emulatetouch || P.isandroid || P.isios
              ? (T.bind(P.hasmousecapture ? T.win : l, 'mouseup', T.ontouchend),
                T.onclick && T.bind(l, 'click', T.onclick),
                M.cursordragontouch
                  ? (T.bind(T.cursor, 'mousedown', T.onmousedown),
                    T.bind(T.cursor, 'mouseup', T.onmouseup),
                    T.cursorh &&
                      T.bind(T.cursorh, 'mousedown', function (e) {
                        T.onmousedown(e, !0)
                      }),
                    T.cursorh && T.bind(T.cursorh, 'mouseup', T.onmouseup))
                  : (T.bind(T.rail, 'mousedown', function (e) {
                      e.preventDefault()
                    }),
                    T.railh &&
                      T.bind(T.railh, 'mousedown', function (e) {
                        e.preventDefault()
                      })))
              : (T.bind(P.hasmousecapture ? T.win : l, 'mouseup', T.onmouseup),
                T.bind(l, 'mousemove', T.onmousemove),
                T.onclick && T.bind(l, 'click', T.onclick),
                T.bind(T.cursor, 'mousedown', T.onmousedown),
                T.bind(T.cursor, 'mouseup', T.onmouseup),
                T.railh &&
                  (T.bind(T.cursorh, 'mousedown', function (e) {
                    T.onmousedown(e, !0)
                  }),
                  T.bind(T.cursorh, 'mouseup', T.onmouseup)),
                !T.ispage &&
                  M.enablescrollonselection &&
                  (T.bind(T.win[0], 'mousedown', T.onselectionstart),
                  T.bind(l, 'mouseup', T.onselectionend),
                  T.bind(T.cursor, 'mouseup', T.onselectionend),
                  T.cursorh && T.bind(T.cursorh, 'mouseup', T.onselectionend),
                  T.bind(l, 'mousemove', T.onselectiondrag)),
                T.zoom &&
                  (T.jqbind(T.zoom, 'mouseenter', function () {
                    T.canshowonmouseevent && T.showCursor(),
                      (T.rail.active = !0)
                  }),
                  T.jqbind(T.zoom, 'mouseleave', function () {
                    ;(T.rail.active = !1), T.rail.drag || T.hideCursor()
                  }))),
            M.enablemousewheel &&
              (T.isiframe ||
                T.mousewheel(P.isie && T.ispage ? l : T.win, T.onmousewheel),
              T.mousewheel(T.rail, T.onmousewheel),
              T.railh && T.mousewheel(T.railh, T.onmousewheelhr)),
            T.ispage ||
              P.cantouch ||
              /HTML|^BODY/.test(T.win[0].nodeName) ||
              (T.win.attr('tabindex') || T.win.attr({ tabindex: ++r }),
              T.bind(T.win, 'focus', function (e) {
                ;(o = T.getTarget(e).id || T.getTarget(e) || !1),
                  (T.hasfocus = !0),
                  T.canshowonmouseevent && T.noticeCursor()
              }),
              T.bind(T.win, 'blur', function (e) {
                ;(o = !1), (T.hasfocus = !1)
              }),
              T.bind(T.win, 'mouseenter', function (e) {
                ;(t = T.getTarget(e).id || T.getTarget(e) || !1),
                  (T.hasmousefocus = !0),
                  T.canshowonmouseevent && T.noticeCursor()
              }),
              T.bind(T.win, 'mouseleave', function (e) {
                ;(t = !1), (T.hasmousefocus = !1), T.rail.drag || T.hideCursor()
              })),
            (T.onkeypress = function (e) {
              if (T.railslocked && T.page.maxh === 0) return !0
              e = e || a.event
              const r = T.getTarget(e)
              if (
                r &&
                /INPUT|TEXTAREA|SELECT|OPTION/.test(r.nodeName) &&
                (!(r.getAttribute('type') || r.type || !1) ||
                  !/submit|button|cancel/i.tp)
              )
                return !0
              if (n(r).attr('contenteditable')) return !0
              if (
                T.hasfocus ||
                (T.hasmousefocus && !o) ||
                (T.ispage && !o && !t)
              ) {
                const i = e.keyCode
                if (T.railslocked && i != 27) return T.cancelEvent(e)
                const s = e.ctrlKey || !1
                const l = e.shiftKey || !1
                let c = !1
                switch (i) {
                  case 38:
                  case 63233:
                    T.doScrollBy(72), (c = !0)
                    break
                  case 40:
                  case 63235:
                    T.doScrollBy(-72), (c = !0)
                    break
                  case 37:
                  case 63232:
                    T.railh &&
                      (s ? T.doScrollLeft(0) : T.doScrollLeftBy(72), (c = !0))
                    break
                  case 39:
                  case 63234:
                    T.railh &&
                      (s ? T.doScrollLeft(T.page.maxw) : T.doScrollLeftBy(-72),
                      (c = !0))
                    break
                  case 33:
                  case 63276:
                    T.doScrollBy(T.view.h), (c = !0)
                    break
                  case 34:
                  case 63277:
                    T.doScrollBy(-T.view.h), (c = !0)
                    break
                  case 36:
                  case 63273:
                    T.railh && s ? T.doScrollPos(0, 0) : T.doScrollTo(0),
                      (c = !0)
                    break
                  case 35:
                  case 63275:
                    T.railh && s
                      ? T.doScrollPos(T.page.maxw, T.page.maxh)
                      : T.doScrollTo(T.page.maxh),
                      (c = !0)
                    break
                  case 32:
                    M.spacebarenabled &&
                      (l ? T.doScrollBy(T.view.h) : T.doScrollBy(-T.view.h),
                      (c = !0))
                    break
                  case 27:
                    T.zoomactive && (T.doZoom(), (c = !0))
                }
                if (c) return T.cancelEvent(e)
              }
            }),
            M.enablekeyboard &&
              T.bind(
                l,
                P.isopera && !P.isopera12 ? 'keypress' : 'keydown',
                T.onkeypress
              ),
            T.bind(l, 'keydown', function (e) {
              ;(e.ctrlKey || !1) && (T.wheelprevented = !0)
            }),
            T.bind(l, 'keyup', function (e) {
              e.ctrlKey || !1 || (T.wheelprevented = !1)
            }),
            T.bind(a, 'blur', function (e) {
              T.wheelprevented = !1
            }),
            T.bind(a, 'resize', T.onscreenresize),
            T.bind(a, 'orientationchange', T.onscreenresize),
            T.bind(a, 'load', T.lazyResize),
            P.ischrome && !T.ispage && !T.haswrapper)
          ) {
            const C = T.win.attr('style')
            const N = parseFloat(T.win.css('width')) + 1
            T.win.css('width', N),
              T.synched('chromefix', function () {
                T.win.attr('style', C)
              })
          }
          if (
            ((T.onAttributeChange = function (e) {
              T.lazyResize(T.isieold ? 250 : 30)
            }),
            M.enableobserver &&
              (T.isie11 ||
                !1 === m ||
                ((T.observerbody = new m(function (e) {
                  if (
                    (e.forEach(function (e) {
                      if (e.type == 'attributes')
                        return E.hasClass('modal-open') &&
                          E.hasClass('modal-dialog') &&
                          !n.contains(n('.modal-dialog')[0], T.doc[0])
                          ? T.hide()
                          : T.show()
                    }),
                    T.me.clientWidth != T.page.width ||
                      T.me.clientHeight != T.page.height)
                  )
                    return T.lazyResize(30)
                })),
                T.observerbody.observe(l.body, {
                  childList: !0,
                  subtree: !0,
                  characterData: !1,
                  attributes: !0,
                  attributeFilter: ['class'],
                })),
              !T.ispage && !T.haswrapper))
          ) {
            const R = T.win[0]
            !1 !== m
              ? ((T.observer = new m(function (e) {
                  e.forEach(T.onAttributeChange)
                })),
                T.observer.observe(R, {
                  childList: !0,
                  characterData: !1,
                  attributes: !0,
                  subtree: !1,
                }),
                (T.observerremover = new m(function (e) {
                  e.forEach(function (e) {
                    if (e.removedNodes.length > 0)
                      for (const o in e.removedNodes)
                        if (T && e.removedNodes[o] === R) return T.remove()
                  })
                })),
                T.observerremover.observe(R.parentNode, {
                  childList: !0,
                  characterData: !1,
                  attributes: !1,
                  subtree: !1,
                }))
              : (T.bind(
                  R,
                  P.isie && !P.isie9 ? 'propertychange' : 'DOMAttrModified',
                  T.onAttributeChange
                ),
                P.isie9 &&
                  R.attachEvent('onpropertychange', T.onAttributeChange),
                T.bind(R, 'DOMNodeRemoved', function (e) {
                  e.target === R && T.remove()
                }))
          }
          !T.ispage && M.boxzoom && T.bind(a, 'resize', T.resizeZoom),
            T.istextarea &&
              (T.bind(T.win, 'keydown', T.lazyResize),
              T.bind(T.win, 'mouseup', T.lazyResize)),
            T.lazyResize(30)
        }
        if (this.doc[0].nodeName == 'IFRAME') {
          const _ = function () {
            T.iframexd = !1
            let o
            try {
              ;(o =
                'contentDocument' in this
                  ? this.contentDocument
                  : this.contentWindow._doc).domain
            } catch (e) {
              ;(T.iframexd = !0), (o = !1)
            }
            if (T.iframexd)
              return (
                'console' in a &&
                  console.log('NiceScroll error: policy restriced iframe'),
                !0
              )
            if (
              ((T.forcescreen = !0),
              T.isiframe &&
                ((T.iframe = {
                  doc: n(o),
                  html: T.doc.contents().find('html')[0],
                  body: T.doc.contents().find('body')[0],
                }),
                (T.getContentSize = function () {
                  return {
                    w: Math.max(
                      T.iframe.html.scrollWidth,
                      T.iframe.body.scrollWidth
                    ),
                    h: Math.max(
                      T.iframe.html.scrollHeight,
                      T.iframe.body.scrollHeight
                    ),
                  }
                }),
                (T.docscroll = n(T.iframe.body))),
              !P.isios && M.iframeautoresize && !T.isiframe)
            ) {
              T.win.scrollTop(0), T.doc.height('')
              const t = Math.max(
                o.getElementsByTagName('html')[0].scrollHeight,
                o.body.scrollHeight
              )
              T.doc.height(t)
            }
            T.lazyResize(30),
              T.css(n(T.iframe.body), e),
              P.isios &&
                T.haswrapper &&
                T.css(n(o.body), { '-webkit-transform': 'translate3d(0,0,0)' }),
              'contentWindow' in this
                ? T.bind(this.contentWindow, 'scroll', T.onscroll)
                : T.bind(o, 'scroll', T.onscroll),
              M.enablemousewheel && T.mousewheel(o, T.onmousewheel),
              M.enablekeyboard &&
                T.bind(o, P.isopera ? 'keypress' : 'keydown', T.onkeypress),
              P.cantouch
                ? (T.bind(o, 'touchstart', T.ontouchstart),
                  T.bind(o, 'touchmove', T.ontouchmove))
                : M.emulatetouch &&
                  (T.bind(o, 'mousedown', T.ontouchstart),
                  T.bind(o, 'mousemove', function (e) {
                    return T.ontouchmove(e, !0)
                  }),
                  M.grabcursorenabled &&
                    P.cursorgrabvalue &&
                    T.css(n(o.body), { cursor: P.cursorgrabvalue })),
              T.bind(o, 'mouseup', T.ontouchend),
              T.zoom &&
                (M.dblclickzoom && T.bind(o, 'dblclick', T.doZoom),
                T.ongesturezoom && T.bind(o, 'gestureend', T.ongesturezoom))
          }
          this.doc[0].readyState &&
            this.doc[0].readyState === 'complete' &&
            setTimeout(function () {
              _.call(T.doc[0], !1)
            }, 500),
            T.bind(this.doc, 'load', _)
        }
      }),
      (this.showCursor = function (e, o) {
        if (
          (T.cursortimeout &&
            (clearTimeout(T.cursortimeout), (T.cursortimeout = 0)),
          T.rail)
        ) {
          if (
            (T.autohidedom &&
              (T.autohidedom.stop().css({ opacity: M.cursoropacitymax }),
              (T.cursoractive = !0)),
            (T.rail.drag && T.rail.drag.pt == 1) ||
              (void 0 !== e &&
                !1 !== e &&
                (T.scroll.y = (e / T.scrollratio.y) | 0),
              void 0 !== o && (T.scroll.x = (o / T.scrollratio.x) | 0)),
            T.cursor.css({ height: T.cursorheight, top: T.scroll.y }),
            T.cursorh)
          ) {
            const t = T.hasreversehr
              ? T.scrollvaluemaxw - T.scroll.x
              : T.scroll.x
            T.cursorh.css({
              width: T.cursorwidth,
              left: !T.rail.align && T.rail.visibility ? t + T.rail.width : t,
            }),
              (T.cursoractive = !0)
          }
          T.zoom && T.zoom.stop().css({ opacity: M.cursoropacitymax })
        }
      }),
      (this.hideCursor = function (e) {
        T.cursortimeout ||
          (T.rail &&
            T.autohidedom &&
            ((T.hasmousefocus && M.autohidemode === 'leave') ||
              (T.cursortimeout = setTimeout(function () {
                ;(T.rail.active && T.showonmouseevent) ||
                  (T.autohidedom
                    .stop()
                    .animate({ opacity: M.cursoropacitymin }),
                  T.zoom &&
                    T.zoom.stop().animate({ opacity: M.cursoropacitymin }),
                  (T.cursoractive = !1)),
                  (T.cursortimeout = 0)
              }, e || M.hidecursordelay))))
      }),
      (this.noticeCursor = function (e, o, t) {
        T.showCursor(o, t), T.rail.active || T.hideCursor(e)
      }),
      (this.getContentSize = T.ispage
        ? function () {
            return {
              w: Math.max(l.body.scrollWidth, l.documentElement.scrollWidth),
              h: Math.max(l.body.scrollHeight, l.documentElement.scrollHeight),
            }
          }
        : T.haswrapper
        ? function () {
            return { w: T.doc[0].offsetWidth, h: T.doc[0].offsetHeight }
          }
        : function () {
            return {
              w: T.docscroll[0].scrollWidth,
              h: T.docscroll[0].scrollHeight,
            }
          }),
      (this.onResize = function (e, o) {
        if (!T || !T.win) return !1
        const t = T.page.maxh
        const r = T.page.maxw
        const i = T.view.h
        const s = T.view.w
        if (
          ((T.view = {
            w: T.ispage ? T.win.width() : T.win[0].clientWidth,
            h: T.ispage ? T.win.height() : T.win[0].clientHeight,
          }),
          (T.page = o || T.getContentSize()),
          (T.page.maxh = Math.max(0, T.page.h - T.view.h)),
          (T.page.maxw = Math.max(0, T.page.w - T.view.w)),
          T.page.maxh == t &&
            T.page.maxw == r &&
            T.view.w == s &&
            T.view.h == i)
        ) {
          if (T.ispage) return T
          const n = T.win.offset()
          if (T.lastposition) {
            const l = T.lastposition
            if (l.top == n.top && l.left == n.left) return T
          }
          T.lastposition = n
        }
        return (
          T.page.maxh === 0
            ? (T.hideRail(),
              (T.scrollvaluemax = 0),
              (T.scroll.y = 0),
              (T.scrollratio.y = 0),
              (T.cursorheight = 0),
              T.setScrollTop(0),
              T.rail && (T.rail.scrollable = !1))
            : ((T.page.maxh -= M.railpadding.top + M.railpadding.bottom),
              (T.rail.scrollable = !0)),
          T.page.maxw === 0
            ? (T.hideRailHr(),
              (T.scrollvaluemaxw = 0),
              (T.scroll.x = 0),
              (T.scrollratio.x = 0),
              (T.cursorwidth = 0),
              T.setScrollLeft(0),
              T.railh && (T.railh.scrollable = !1))
            : ((T.page.maxw -= M.railpadding.left + M.railpadding.right),
              T.railh && (T.railh.scrollable = M.horizrailenabled)),
          (T.railslocked =
            T.locked || (T.page.maxh === 0 && T.page.maxw === 0)),
          T.railslocked
            ? (T.ispage || T.updateScrollBar(T.view), !1)
            : (T.hidden ||
                (T.rail.visibility || T.showRail(),
                T.railh && !T.railh.visibility && T.showRailHr()),
              T.istextarea &&
                T.win.css('resize') &&
                T.win.css('resize') != 'none' &&
                (T.view.h -= 20),
              (T.cursorheight = Math.min(
                T.view.h,
                Math.round(T.view.h * (T.view.h / T.page.h))
              )),
              (T.cursorheight = M.cursorfixedheight
                ? M.cursorfixedheight
                : Math.max(M.cursorminheight, T.cursorheight)),
              (T.cursorwidth = Math.min(
                T.view.w,
                Math.round(T.view.w * (T.view.w / T.page.w))
              )),
              (T.cursorwidth = M.cursorfixedheight
                ? M.cursorfixedheight
                : Math.max(M.cursorminheight, T.cursorwidth)),
              (T.scrollvaluemax =
                T.view.h -
                T.cursorheight -
                (M.railpadding.top + M.railpadding.bottom)),
              T.hasborderbox ||
                (T.scrollvaluemax -=
                  T.cursor[0].offsetHeight - T.cursor[0].clientHeight),
              T.railh &&
                ((T.railh.width =
                  T.page.maxh > 0 ? T.view.w - T.rail.width : T.view.w),
                (T.scrollvaluemaxw =
                  T.railh.width -
                  T.cursorwidth -
                  (M.railpadding.left + M.railpadding.right))),
              T.ispage || T.updateScrollBar(T.view),
              (T.scrollratio = {
                x: T.page.maxw / T.scrollvaluemaxw,
                y: T.page.maxh / T.scrollvaluemax,
              }),
              T.getScrollTop() > T.page.maxh
                ? T.doScrollTop(T.page.maxh)
                : ((T.scroll.y = (T.getScrollTop() / T.scrollratio.y) | 0),
                  (T.scroll.x = (T.getScrollLeft() / T.scrollratio.x) | 0),
                  T.cursoractive && T.noticeCursor()),
              T.scroll.y &&
                T.getScrollTop() === 0 &&
                T.doScrollTo((T.scroll.y * T.scrollratio.y) | 0),
              T)
        )
      }),
      (this.resize = T.onResize)
    let O = 0
    ;(this.onscreenresize = function (e) {
      clearTimeout(O)
      const o = !T.ispage && !T.haswrapper
      o && T.hideRails(),
        (O = setTimeout(function () {
          T && (o && T.showRails(), T.resize()), (O = 0)
        }, 120))
    }),
      (this.lazyResize = function (e) {
        return (
          clearTimeout(O),
          (e = isNaN(e) ? 240 : e),
          (O = setTimeout(function () {
            T && T.resize(), (O = 0)
          }, e)),
          T
        )
      }),
      (this.jqbind = function (e, o, t) {
        T.events.push({ e, n: o, f: t, q: !0 }), n(e).on(o, t)
      }),
      (this.mousewheel = function (e, o, t) {
        const r = 'jquery' in e ? e[0] : e
        if ('onwheel' in l.createElement('div')) T._bind(r, 'wheel', o, t || !1)
        else {
          const i = void 0 !== l.onmousewheel ? 'mousewheel' : 'DOMMouseScroll'
          S(r, i, o, t || !1),
            i == 'DOMMouseScroll' && S(r, 'MozMousePixelScroll', o, t || !1)
        }
      })
    let Y = !1
    if (P.haseventlistener) {
      try {
        const H = Object.defineProperty({}, 'passive', {
          get() {
            Y = !0
          },
        })
        a.addEventListener('test', null, H)
      } catch (e) {}
      ;(this.stopPropagation = function (e) {
        return !!e && ((e = e.original ? e.original : e).stopPropagation(), !1)
      }),
        (this.cancelEvent = function (e) {
          return (
            e.cancelable && e.preventDefault(),
            e.stopImmediatePropagation(),
            e.preventManipulation && e.preventManipulation(),
            !1
          )
        })
    } else
      (Event.prototype.preventDefault = function () {
        this.returnValue = !1
      }),
        (Event.prototype.stopPropagation = function () {
          this.cancelBubble = !0
        }),
        (a.constructor.prototype.addEventListener =
          l.constructor.prototype.addEventListener =
          Element.prototype.addEventListener =
            function (e, o, t) {
              this.attachEvent('on' + e, o)
            }),
        (a.constructor.prototype.removeEventListener =
          l.constructor.prototype.removeEventListener =
          Element.prototype.removeEventListener =
            function (e, o, t) {
              this.detachEvent('on' + e, o)
            }),
        (this.cancelEvent = function (e) {
          return (
            (e = e || a.event) &&
              ((e.cancelBubble = !0), (e.cancel = !0), (e.returnValue = !1)),
            !1
          )
        }),
        (this.stopPropagation = function (e) {
          return (e = e || a.event) && (e.cancelBubble = !0), !1
        })
    ;(this.delegate = function (e, o, t, r, i) {
      let s = d[o] || !1
      s ||
        ((s = {
          a: [],
          l: [],
          f(e) {
            for (var o = s.l, t = !1, r = o.length - 1; r >= 0; r--)
              if (!1 === (t = o[r].call(e.target, e))) return !1
            return t
          },
        }),
        T.bind(e, o, s.f, r, i),
        (d[o] = s)),
        T.ispage
          ? ((s.a = [T.id].concat(s.a)), (s.l = [t].concat(s.l)))
          : (s.a.push(T.id), s.l.push(t))
    }),
      (this.undelegate = function (e, o, t, r, i) {
        const s = d[o] || !1
        if (s && s.l)
          for (let n = 0, l = s.l.length; n < l; n++)
            s.a[n] === T.id &&
              (s.a.splice(n),
              s.l.splice(n),
              s.a.length === 0 && (T._unbind(e, o, s.l.f), (d[o] = null)))
      }),
      (this.bind = function (e, o, t, r, i) {
        const s = 'jquery' in e ? e[0] : e
        T._bind(s, o, t, r || !1, i || !1)
      }),
      (this._bind = function (e, o, t, r, i) {
        T.events.push({ e, n: o, f: t, b: r, q: !1 }),
          Y && i
            ? e.addEventListener(o, t, { passive: !1, capture: r })
            : e.addEventListener(o, t, r || !1)
      }),
      (this._unbind = function (e, o, t, r) {
        d[o] ? T.undelegate(e, o, t, r) : e.removeEventListener(o, t, r)
      }),
      (this.unbindAll = function () {
        for (let e = 0; e < T.events.length; e++) {
          const o = T.events[e]
          o.q ? o.e.unbind(o.n, o.f) : T._unbind(o.e, o.n, o.f, o.b)
        }
      }),
      (this.showRails = function () {
        return T.showRail().showRailHr()
      }),
      (this.showRail = function () {
        return (
          T.page.maxh === 0 ||
            (!T.ispage && T.win.css('display') == 'none') ||
            ((T.rail.visibility = !0), T.rail.css('display', 'block')),
          T
        )
      }),
      (this.showRailHr = function () {
        return (
          T.railh &&
            (T.page.maxw === 0 ||
              (!T.ispage && T.win.css('display') == 'none') ||
              ((T.railh.visibility = !0), T.railh.css('display', 'block'))),
          T
        )
      }),
      (this.hideRails = function () {
        return T.hideRail().hideRailHr()
      }),
      (this.hideRail = function () {
        return (T.rail.visibility = !1), T.rail.css('display', 'none'), T
      }),
      (this.hideRailHr = function () {
        return (
          T.railh &&
            ((T.railh.visibility = !1), T.railh.css('display', 'none')),
          T
        )
      }),
      (this.show = function () {
        return (T.hidden = !1), (T.railslocked = !1), T.showRails()
      }),
      (this.hide = function () {
        return (T.hidden = !0), (T.railslocked = !0), T.hideRails()
      }),
      (this.toggle = function () {
        return T.hidden ? T.show() : T.hide()
      }),
      (this.remove = function () {
        T.stop(), T.cursortimeout && clearTimeout(T.cursortimeout)
        for (const e in T.delaylist) T.delaylist[e] && h(T.delaylist[e].h)
        T.doZoomOut(),
          T.unbindAll(),
          P.isie9 &&
            T.win[0].detachEvent('onpropertychange', T.onAttributeChange),
          !1 !== T.observer && T.observer.disconnect(),
          !1 !== T.observerremover && T.observerremover.disconnect(),
          !1 !== T.observerbody && T.observerbody.disconnect(),
          (T.events = null),
          T.cursor && T.cursor.remove(),
          T.cursorh && T.cursorh.remove(),
          T.rail && T.rail.remove(),
          T.railh && T.railh.remove(),
          T.zoom && T.zoom.remove()
        for (let o = 0; o < T.saved.css.length; o++) {
          const t = T.saved.css[o]
          t[0].css(t[1], void 0 === t[2] ? '' : t[2])
        }
        ;(T.saved = !1), T.me.data('__nicescroll', '')
        const r = n.nicescroll
        r.each(function (e) {
          if (this && this.id === T.id) {
            delete r[e]
            for (let o = ++e; o < r.length; o++, e++) r[e] = r[o]
            --r.length && delete r[r.length]
          }
        })
        for (const i in T) (T[i] = null), delete T[i]
        T = null
      }),
      (this.scrollstart = function (e) {
        return (this.onscrollstart = e), T
      }),
      (this.scrollend = function (e) {
        return (this.onscrollend = e), T
      }),
      (this.scrollcancel = function (e) {
        return (this.onscrollcancel = e), T
      }),
      (this.zoomin = function (e) {
        return (this.onzoomin = e), T
      }),
      (this.zoomout = function (e) {
        return (this.onzoomout = e), T
      }),
      (this.isScrollable = function (e) {
        let o = e.target ? e.target : e
        if (o.nodeName == 'OPTION') return !0
        for (
          ;
          o &&
          o.nodeType == 1 &&
          o !== this.me[0] &&
          !/^BODY|HTML/.test(o.nodeName);

        ) {
          const t = n(o)
          const r =
            t.css('overflowY') || t.css('overflowX') || t.css('overflow') || ''
          if (/scroll|auto/.test(r)) return o.clientHeight != o.scrollHeight
          o = !!o.parentNode && o.parentNode
        }
        return !1
      }),
      (this.getViewport = function (e) {
        for (
          let o = !(!e || !e.parentNode) && e.parentNode;
          o && o.nodeType == 1 && !/^BODY|HTML/.test(o.nodeName);

        ) {
          const t = n(o)
          if (/fixed|absolute/.test(t.css('position'))) return t
          const r =
            t.css('overflowY') || t.css('overflowX') || t.css('overflow') || ''
          if (/scroll|auto/.test(r) && o.clientHeight != o.scrollHeight)
            return t
          if (t.getNiceScroll().length > 0) return t
          o = !!o.parentNode && o.parentNode
        }
        return !1
      }),
      (this.triggerScrollStart = function (e, o, t, r, i) {
        if (T.onscrollstart) {
          const s = {
            type: 'scrollstart',
            current: { x: e, y: o },
            request: { x: t, y: r },
            end: { x: T.newscrollx, y: T.newscrolly },
            speed: i,
          }
          T.onscrollstart.call(T, s)
        }
      }),
      (this.triggerScrollEnd = function () {
        if (T.onscrollend) {
          const e = T.getScrollLeft()
          const o = T.getScrollTop()
          const t = {
            type: 'scrollend',
            current: { x: e, y: o },
            end: { x: e, y: o },
          }
          T.onscrollend.call(T, t)
        }
      })
    var B = 0
    var X = 0
    var D = 0
    var A = 1
    var q = !1
    if (
      ((this.onmousewheel = function (e) {
        if (T.wheelprevented || T.locked) return !1
        if (T.railslocked) return T.debounced('checkunlock', T.resize, 250), !1
        if (T.rail.drag) return T.cancelEvent(e)
        if (
          (M.oneaxismousemode === 'auto' &&
            e.deltaX !== 0 &&
            (M.oneaxismousemode = !1),
          M.oneaxismousemode && e.deltaX === 0 && !T.rail.scrollable)
        )
          return !T.railh || !T.railh.scrollable || T.onmousewheelhr(e)
        const o = f()
        let t = !1
        if (
          (M.preservenativescrolling &&
            T.checkarea + 600 < o &&
            ((T.nativescrollingarea = T.isScrollable(e)), (t = !0)),
          (T.checkarea = o),
          T.nativescrollingarea)
        )
          return !0
        const r = k(e, !1, t)
        return r && (T.checkarea = 0), r
      }),
      (this.onmousewheelhr = function (e) {
        if (!T.wheelprevented) {
          if (T.railslocked || !T.railh.scrollable) return !0
          if (T.rail.drag) return T.cancelEvent(e)
          const o = f()
          let t = !1
          return (
            M.preservenativescrolling &&
              T.checkarea + 600 < o &&
              ((T.nativescrollingarea = T.isScrollable(e)), (t = !0)),
            (T.checkarea = o),
            !!T.nativescrollingarea ||
              (T.railslocked ? T.cancelEvent(e) : k(e, !0, t))
          )
        }
      }),
      (this.stop = function () {
        return (
          T.cancelScroll(),
          T.scrollmon && T.scrollmon.stop(),
          (T.cursorfreezed = !1),
          (T.scroll.y = Math.round(T.getScrollTop() * (1 / T.scrollratio.y))),
          T.noticeCursor(),
          T
        )
      }),
      (this.getTransitionSpeed = function (e) {
        return (80 + (e / 72) * M.scrollspeed) | 0
      }),
      M.smoothscroll)
    )
      if (
        T.ishwscroll &&
        P.hastransition &&
        M.usetransition &&
        M.smoothscroll
      ) {
        let j = ''
        ;(this.resetTransition = function () {
          ;(j = ''), T.doc.css(P.prefixstyle + 'transition-duration', '0ms')
        }),
          (this.prepareTransition = function (e, o) {
            const t = o ? e : T.getTransitionSpeed(e)
            const r = t + 'ms'
            return (
              j !== r &&
                ((j = r), T.doc.css(P.prefixstyle + 'transition-duration', r)),
              t
            )
          }),
          (this.doScrollLeft = function (e, o) {
            const t = T.scrollrunning ? T.newscrolly : T.getScrollTop()
            T.doScrollPos(e, t, o)
          }),
          (this.doScrollTop = function (e, o) {
            const t = T.scrollrunning ? T.newscrollx : T.getScrollLeft()
            T.doScrollPos(t, e, o)
          }),
          (this.cursorupdate = {
            running: !1,
            start() {
              const e = this
              if (!e.running) {
                e.running = !0
                var o = function () {
                  e.running && u(o),
                    T.showCursor(T.getScrollTop(), T.getScrollLeft()),
                    T.notifyScrollEvent(T.win[0])
                }
                u(o)
              }
            },
            stop() {
              this.running = !1
            },
          }),
          (this.doScrollPos = function (e, o, t) {
            const r = T.getScrollTop()
            const i = T.getScrollLeft()
            if (
              (((T.newscrolly - r) * (o - r) < 0 ||
                (T.newscrollx - i) * (e - i) < 0) &&
                T.cancelScroll(),
              M.bouncescroll
                ? (o < 0
                    ? (o = (o / 2) | 0)
                    : o > T.page.maxh &&
                      (o = (T.page.maxh + (o - T.page.maxh) / 2) | 0),
                  e < 0
                    ? (e = (e / 2) | 0)
                    : e > T.page.maxw &&
                      (e = (T.page.maxw + (e - T.page.maxw) / 2) | 0))
                : (o < 0 ? (o = 0) : o > T.page.maxh && (o = T.page.maxh),
                  e < 0 ? (e = 0) : e > T.page.maxw && (e = T.page.maxw)),
              T.scrollrunning && e == T.newscrollx && o == T.newscrolly)
            )
              return !1
            ;(T.newscrolly = o), (T.newscrollx = e)
            const s = T.getScrollTop()
            const n = T.getScrollLeft()
            const l = {}
            ;(l.x = e - n), (l.y = o - s)
            const a = 0 | Math.sqrt(l.x * l.x + l.y * l.y)
            const c = T.prepareTransition(a)
            T.scrollrunning ||
              ((T.scrollrunning = !0),
              T.triggerScrollStart(n, s, e, o, c),
              T.cursorupdate.start()),
              (T.scrollendtrapped = !0),
              P.transitionend ||
                (T.scrollendtrapped && clearTimeout(T.scrollendtrapped),
                (T.scrollendtrapped = setTimeout(T.onScrollTransitionEnd, c))),
              T.setScrollTop(T.newscrolly),
              T.setScrollLeft(T.newscrollx)
          }),
          (this.cancelScroll = function () {
            if (!T.scrollendtrapped) return !0
            const e = T.getScrollTop()
            const o = T.getScrollLeft()
            return (
              (T.scrollrunning = !1),
              P.transitionend || clearTimeout(P.transitionend),
              (T.scrollendtrapped = !1),
              T.resetTransition(),
              T.setScrollTop(e),
              T.railh && T.setScrollLeft(o),
              T.timerscroll &&
                T.timerscroll.tm &&
                clearInterval(T.timerscroll.tm),
              (T.timerscroll = !1),
              (T.cursorfreezed = !1),
              T.cursorupdate.stop(),
              T.showCursor(e, o),
              T
            )
          }),
          (this.onScrollTransitionEnd = function () {
            if (T.scrollendtrapped) {
              let e = T.getScrollTop()
              let o = T.getScrollLeft()
              if (
                (e < 0 ? (e = 0) : e > T.page.maxh && (e = T.page.maxh),
                o < 0 ? (o = 0) : o > T.page.maxw && (o = T.page.maxw),
                e != T.newscrolly || o != T.newscrollx)
              )
                return T.doScrollPos(o, e, M.snapbackspeed)
              T.scrollrunning && T.triggerScrollEnd(),
                (T.scrollrunning = !1),
                (T.scrollendtrapped = !1),
                T.resetTransition(),
                (T.timerscroll = !1),
                T.setScrollTop(e),
                T.railh && T.setScrollLeft(o),
                T.cursorupdate.stop(),
                T.noticeCursor(!1, e, o),
                (T.cursorfreezed = !1)
            }
          })
      } else
        (this.doScrollLeft = function (e, o) {
          const t = T.scrollrunning ? T.newscrolly : T.getScrollTop()
          T.doScrollPos(e, t, o)
        }),
          (this.doScrollTop = function (e, o) {
            const t = T.scrollrunning ? T.newscrollx : T.getScrollLeft()
            T.doScrollPos(t, e, o)
          }),
          (this.doScrollPos = function (e, o, t) {
            const r = T.getScrollTop()
            const i = T.getScrollLeft()
            ;((T.newscrolly - r) * (o - r) < 0 ||
              (T.newscrollx - i) * (e - i) < 0) &&
              T.cancelScroll()
            let s = !1
            if (
              ((T.bouncescroll && T.rail.visibility) ||
                (o < 0
                  ? ((o = 0), (s = !0))
                  : o > T.page.maxh && ((o = T.page.maxh), (s = !0))),
              (T.bouncescroll && T.railh.visibility) ||
                (e < 0
                  ? ((e = 0), (s = !0))
                  : e > T.page.maxw && ((e = T.page.maxw), (s = !0))),
              T.scrollrunning && T.newscrolly === o && T.newscrollx === e)
            )
              return !0
            ;(T.newscrolly = o),
              (T.newscrollx = e),
              (T.dst = {}),
              (T.dst.x = e - i),
              (T.dst.y = o - r),
              (T.dst.px = i),
              (T.dst.py = r)
            const n = 0 | Math.sqrt(T.dst.x * T.dst.x + T.dst.y * T.dst.y)
            const l = T.getTransitionSpeed(n)
            T.bzscroll = {}
            const a = s ? 1 : 0.58
            ;(T.bzscroll.x = new R(i, T.newscrollx, l, 0, 0, a, 1)),
              (T.bzscroll.y = new R(r, T.newscrolly, l, 0, 0, a, 1))
            f()
            var c = function () {
              if (T.scrollrunning) {
                const e = T.bzscroll.y.getPos()
                T.setScrollLeft(T.bzscroll.x.getNow()),
                  T.setScrollTop(T.bzscroll.y.getNow()),
                  e <= 1
                    ? (T.timer = u(c))
                    : ((T.scrollrunning = !1),
                      (T.timer = 0),
                      T.triggerScrollEnd())
              }
            }
            T.scrollrunning ||
              (T.triggerScrollStart(i, r, e, o, l),
              (T.scrollrunning = !0),
              (T.timer = u(c)))
          }),
          (this.cancelScroll = function () {
            return (
              T.timer && h(T.timer),
              (T.timer = 0),
              (T.bzscroll = !1),
              (T.scrollrunning = !1),
              T
            )
          })
    else
      (this.doScrollLeft = function (e, o) {
        const t = T.getScrollTop()
        T.doScrollPos(e, t, o)
      }),
        (this.doScrollTop = function (e, o) {
          const t = T.getScrollLeft()
          T.doScrollPos(t, e, o)
        }),
        (this.doScrollPos = function (e, o, t) {
          let r = e > T.page.maxw ? T.page.maxw : e
          r < 0 && (r = 0)
          let i = o > T.page.maxh ? T.page.maxh : o
          i < 0 && (i = 0),
            T.synched('scroll', function () {
              T.setScrollTop(i), T.setScrollLeft(r)
            })
        }),
        (this.cancelScroll = function () {})
    ;(this.doScrollBy = function (e, o) {
      z(0, e)
    }),
      (this.doScrollLeftBy = function (e, o) {
        z(e, 0)
      }),
      (this.doScrollTo = function (e, o) {
        let t = o ? Math.round(e * T.scrollratio.y) : e
        t < 0 ? (t = 0) : t > T.page.maxh && (t = T.page.maxh),
          (T.cursorfreezed = !1),
          T.doScrollTop(e)
      }),
      (this.checkContentSize = function () {
        const e = T.getContentSize()
        ;(e.h == T.page.h && e.w == T.page.w) || T.resize(!1, e)
      }),
      (T.onscroll = function (e) {
        T.rail.drag ||
          T.cursorfreezed ||
          T.synched('scroll', function () {
            ;(T.scroll.y = Math.round(T.getScrollTop() / T.scrollratio.y)),
              T.railh &&
                (T.scroll.x = Math.round(T.getScrollLeft() / T.scrollratio.x)),
              T.noticeCursor()
          })
      }),
      T.bind(T.docscroll, 'scroll', T.onscroll),
      (this.doZoomIn = function (e) {
        if (!T.zoomactive) {
          ;(T.zoomactive = !0), (T.zoomrestore = { style: {} })
          const o = [
            'position',
            'top',
            'left',
            'zIndex',
            'backgroundColor',
            'marginTop',
            'marginBottom',
            'marginLeft',
            'marginRight',
          ]
          const t = T.win[0].style
          for (const r in o) {
            const i = o[r]
            T.zoomrestore.style[i] = void 0 !== t[i] ? t[i] : ''
          }
          ;(T.zoomrestore.style.width = T.win.css('width')),
            (T.zoomrestore.style.height = T.win.css('height')),
            (T.zoomrestore.padding = {
              w: T.win.outerWidth() - T.win.width(),
              h: T.win.outerHeight() - T.win.height(),
            }),
            P.isios4 &&
              ((T.zoomrestore.scrollTop = c.scrollTop()), c.scrollTop(0)),
            T.win.css({
              position: P.isios4 ? 'absolute' : 'fixed',
              top: 0,
              left: 0,
              zIndex: s + 100,
              margin: 0,
            })
          const n = T.win.css('backgroundColor')
          return (
            (n === '' ||
              /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(n)) &&
              T.win.css('backgroundColor', '#fff'),
            T.rail.css({ zIndex: s + 101 }),
            T.zoom.css({ zIndex: s + 102 }),
            T.zoom.css('backgroundPosition', '0 -18px'),
            T.resizeZoom(),
            T.onzoomin && T.onzoomin.call(T),
            T.cancelEvent(e)
          )
        }
      }),
      (this.doZoomOut = function (e) {
        if (T.zoomactive)
          return (
            (T.zoomactive = !1),
            T.win.css('margin', ''),
            T.win.css(T.zoomrestore.style),
            P.isios4 && c.scrollTop(T.zoomrestore.scrollTop),
            T.rail.css({ 'z-index': T.zindex }),
            T.zoom.css({ 'z-index': T.zindex }),
            (T.zoomrestore = !1),
            T.zoom.css('backgroundPosition', '0 0'),
            T.onResize(),
            T.onzoomout && T.onzoomout.call(T),
            T.cancelEvent(e)
          )
      }),
      (this.doZoom = function (e) {
        return T.zoomactive ? T.doZoomOut(e) : T.doZoomIn(e)
      }),
      (this.resizeZoom = function () {
        if (T.zoomactive) {
          const e = T.getScrollTop()
          T.win.css({
            width: c.width() - T.zoomrestore.padding.w + 'px',
            height: c.height() - T.zoomrestore.padding.h + 'px',
          }),
            T.onResize(),
            T.setScrollTop(Math.min(T.page.maxh, e))
        }
      }),
      this.init(),
      n.nicescroll.push(this)
  }
  var y = function (e) {
    const o = this
    ;(this.nc = e),
      (this.lastx = 0),
      (this.lasty = 0),
      (this.speedx = 0),
      (this.speedy = 0),
      (this.lasttime = 0),
      (this.steptime = 0),
      (this.snapx = !1),
      (this.snapy = !1),
      (this.demulx = 0),
      (this.demuly = 0),
      (this.lastscrollx = -1),
      (this.lastscrolly = -1),
      (this.chkx = 0),
      (this.chky = 0),
      (this.timer = 0),
      (this.reset = function (e, t) {
        o.stop(),
          (o.steptime = 0),
          (o.lasttime = f()),
          (o.speedx = 0),
          (o.speedy = 0),
          (o.lastx = e),
          (o.lasty = t),
          (o.lastscrollx = -1),
          (o.lastscrolly = -1)
      }),
      (this.update = function (e, t) {
        const r = f()
        ;(o.steptime = r - o.lasttime), (o.lasttime = r)
        const i = t - o.lasty
        const s = e - o.lastx
        const n = o.nc.getScrollTop() + i
        const l = o.nc.getScrollLeft() + s
        ;(o.snapx = l < 0 || l > o.nc.page.maxw),
          (o.snapy = n < 0 || n > o.nc.page.maxh),
          (o.speedx = s),
          (o.speedy = i),
          (o.lastx = e),
          (o.lasty = t)
      }),
      (this.stop = function () {
        o.nc.unsynched('domomentum2d'),
          o.timer && clearTimeout(o.timer),
          (o.timer = 0),
          (o.lastscrollx = -1),
          (o.lastscrolly = -1)
      }),
      (this.doSnapy = function (e, t) {
        let r = !1
        t < 0
          ? ((t = 0), (r = !0))
          : t > o.nc.page.maxh && ((t = o.nc.page.maxh), (r = !0)),
          e < 0
            ? ((e = 0), (r = !0))
            : e > o.nc.page.maxw && ((e = o.nc.page.maxw), (r = !0)),
          r
            ? o.nc.doScrollPos(e, t, o.nc.opt.snapbackspeed)
            : o.nc.triggerScrollEnd()
      }),
      (this.doMomentum = function (e) {
        const t = f()
        const r = e ? t + e : o.lasttime
        const i = o.nc.getScrollLeft()
        const s = o.nc.getScrollTop()
        const n = o.nc.page.maxh
        const l = o.nc.page.maxw
        ;(o.speedx = l > 0 ? Math.min(60, o.speedx) : 0),
          (o.speedy = n > 0 ? Math.min(60, o.speedy) : 0)
        let a = r && t - r <= 60
        ;(s < 0 || s > n || i < 0 || i > l) && (a = !1)
        const c = !(!o.speedy || !a) && o.speedy
        const d = !(!o.speedx || !a) && o.speedx
        if (c || d) {
          let u = Math.max(16, o.steptime)
          if (u > 50) {
            const h = u / 50
            ;(o.speedx *= h), (o.speedy *= h), (u = 50)
          }
          ;(o.demulxy = 0),
            (o.lastscrollx = o.nc.getScrollLeft()),
            (o.chkx = o.lastscrollx),
            (o.lastscrolly = o.nc.getScrollTop()),
            (o.chky = o.lastscrolly)
          let p = o.lastscrollx
          let m = o.lastscrolly
          var g = function () {
            let e = f() - t > 600 ? 0.04 : 0.02
            o.speedx &&
              ((p = Math.floor(o.lastscrollx - o.speedx * (1 - o.demulxy))),
              (o.lastscrollx = p),
              (p < 0 || p > l) && (e = 0.1)),
              o.speedy &&
                ((m = Math.floor(o.lastscrolly - o.speedy * (1 - o.demulxy))),
                (o.lastscrolly = m),
                (m < 0 || m > n) && (e = 0.1)),
              (o.demulxy = Math.min(1, o.demulxy + e)),
              o.nc.synched('domomentum2d', function () {
                if (o.speedx) {
                  o.nc.getScrollLeft()
                  ;(o.chkx = p), o.nc.setScrollLeft(p)
                }
                if (o.speedy) {
                  o.nc.getScrollTop()
                  ;(o.chky = m), o.nc.setScrollTop(m)
                }
                o.timer || (o.nc.hideCursor(), o.doSnapy(p, m))
              }),
              o.demulxy < 1
                ? (o.timer = setTimeout(g, u))
                : (o.stop(), o.nc.hideCursor(), o.doSnapy(p, m))
          }
          g()
        } else o.doSnapy(o.nc.getScrollLeft(), o.nc.getScrollTop())
      })
  }
  const x = e.fn.scrollTop
  ;(e.cssHooks.pageYOffset = {
    get(e, o, t) {
      const r = n.data(e, '__nicescroll') || !1
      return r && r.ishwscroll ? r.getScrollTop() : x.call(e)
    },
    set(e, o) {
      const t = n.data(e, '__nicescroll') || !1
      return (
        t && t.ishwscroll ? t.setScrollTop(parseInt(o)) : x.call(e, o), this
      )
    },
  }),
    (e.fn.scrollTop = function (e) {
      if (void 0 === e) {
        const o = !!this[0] && (n.data(this[0], '__nicescroll') || !1)
        return o && o.ishwscroll ? o.getScrollTop() : x.call(this)
      }
      return this.each(function () {
        const o = n.data(this, '__nicescroll') || !1
        o && o.ishwscroll ? o.setScrollTop(parseInt(e)) : x.call(n(this), e)
      })
    })
  const S = e.fn.scrollLeft
  ;(n.cssHooks.pageXOffset = {
    get(e, o, t) {
      const r = n.data(e, '__nicescroll') || !1
      return r && r.ishwscroll ? r.getScrollLeft() : S.call(e)
    },
    set(e, o) {
      const t = n.data(e, '__nicescroll') || !1
      return (
        t && t.ishwscroll ? t.setScrollLeft(parseInt(o)) : S.call(e, o), this
      )
    },
  }),
    (e.fn.scrollLeft = function (e) {
      if (void 0 === e) {
        const o = !!this[0] && (n.data(this[0], '__nicescroll') || !1)
        return o && o.ishwscroll ? o.getScrollLeft() : S.call(this)
      }
      return this.each(function () {
        const o = n.data(this, '__nicescroll') || !1
        o && o.ishwscroll ? o.setScrollLeft(parseInt(e)) : S.call(n(this), e)
      })
    })
  const z = function (e) {
    const o = this
    if (
      ((this.length = 0),
      (this.name = 'nicescrollarray'),
      (this.each = function (e) {
        return n.each(o, e), o
      }),
      (this.push = function (e) {
        ;(o[o.length] = e), o.length++
      }),
      (this.eq = function (e) {
        return o[e]
      }),
      e)
    )
      for (let t = 0; t < e.length; t++) {
        const r = n.data(e[t], '__nicescroll') || !1
        r && ((this[this.length] = r), this.length++)
      }
    return this
  }
  !(function (e, o, t) {
    for (let r = 0, i = o.length; r < i; r++) t(e, o[r])
  })(
    z.prototype,
    [
      'show',
      'hide',
      'toggle',
      'onResize',
      'resize',
      'remove',
      'stop',
      'doScrollPos',
    ],
    function (e, o) {
      e[o] = function () {
        const e = arguments
        return this.each(function () {
          this[o].apply(this, e)
        })
      }
    }
  ),
    (e.fn.getNiceScroll = function (e) {
      return void 0 === e
        ? new z(this)
        : (this[e] && n.data(this[e], '__nicescroll')) || !1
    }),
    ((e.expr.pseudos || e.expr[':']).nicescroll = function (e) {
      return void 0 !== n.data(e, '__nicescroll')
    }),
    (n.fn.niceScroll = function (e, o) {
      void 0 !== o ||
        typeof e !== 'object' ||
        'jquery' in e ||
        ((o = e), (e = !1))
      const t = new z()
      return (
        this.each(function () {
          const r = n(this)
          const i = n.extend({}, o)
          if (e) {
            const s = n(e)
            ;(i.doc = s.length > 1 ? n(e, r) : s), (i.win = r)
          }
          !('doc' in i) || 'win' in i || (i.win = r)
          let l = r.data('__nicescroll') || !1
          l ||
            ((i.doc = i.doc || r),
            (l = new b(i, r)),
            r.data('__nicescroll', l)),
            t.push(l)
        }),
        t.length === 1 ? t[0] : t
      )
    }),
    (a.NiceScroll = {
      getjQuery() {
        return e
      },
    }),
    n.nicescroll || ((n.nicescroll = new z()), (n.nicescroll.options = g))
})
