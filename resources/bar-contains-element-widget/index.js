export default (el) => {
  const fillRectEl = el.getElementById('fillRect')
  let width
  let value = 0   // range: 0 to 1

  let style = el.style

  Object.defineProperty(style, 'fill', {
    // Override default property. Default property won't work because it doesn't know to manipulate fillRectEl.
    // Must use defineProperty because style is an extant object, so we can't use set within it.
    set(newFill) {
      fillRectEl.style.fill = newFill
    }
  })

  Object.defineProperty(el, 'width', {
    // Override default property. Default property won't work because new width also depends on value.
    // Must use defineProperty because el is an extant object, so we can't use set within it.
    // getBBox() results will be misleading because they'll be based on the initial size of the element and
    // won't take this width into account. This could possibly be addressed by overriding getBBox() but the
    // cost of doing so probably isn't justified. A compromise may be to override getBBox() but return undefined.
    // $ in SVG probably won't work as expected either.
    set(newWidth) {
      width = newWidth
      redraw()
      // Tip: don't try el.width=newWidth; it will recurse.
    }
  })

  Object.defineProperty(el, 'value', {
    // Add new property.
    // value: 0 to 1; proportion of width to be filled.
    // Must use defineProperty because el is an extant object, so we can't use set within it.
    set(newValue) {
      value = newValue
      redraw()
    }
  })

  Object.defineProperty(el, 'style', {
    // Replace element style with our version that contains an override.
    get() {return style}
  })

  function redraw() {
    // This is a private function because it's not defined on the return object (el).
    // Call this function whenever there's a change to any of the variables on which it depends.
    fillRectEl.width = width * value
  }

  el.bigFunction = x => {     // This function is just to waste memory, to verify that code isn't copied into each instance of el.
    x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7;
    return x
  }

  return el   // This is the standard DOM element (<use>? <symbol>?), souped up with new and overridden members.
}

// Should define getters if calling code might be expected to use them.