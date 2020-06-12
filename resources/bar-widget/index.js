import document from "document"

export default (id) => {
  const el = document.getElementById(id)
  const fillRectEl = el.getElementById('fillRect')
  let width
  let value = 0   // range: 0 to 1

  Object.defineProperty(el, 'fill', {
    // Override default property. Default property won't work because it doesn't know to manipulate fillRectEl.
    // Must use defineProperty because el is an extant object, so we can't use set within it.
    set(newFill) {
      fillRectEl.style.fill = newFill
    }
  })

  Object.defineProperty(el, 'width', {
    // Override default property. Default property won't work because new width also depends on value.
    // Must use defineProperty because el is an extant object, so we can't use set within it.
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

  function redraw() {
    // This is a private function because it's not defined on the return object (el).
    // Call this function whenever there's a change to any of the variables on which it depends.
    fillRectEl.width = width * value
  }

  return el   // This is the standard DOM element (<use>? <symbol>?), souped up with new and overridden members.
}

// Should define getters if calling code might be expected to use them.