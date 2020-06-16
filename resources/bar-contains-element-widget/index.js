export default (el) => {
  const fillRectEl = el.getElementById('fillRect')
  let value = 0   // range: 0 to 1

  function redraw() {
    // This is a private function because it's not defined on the return object (el).
    // Call this function whenever there's a change to any of the variables on which it depends.
    fillRectEl.width = el.width * value
  }

  const bigFunction = x => {     // This function is just to waste memory, to verify that code isn't copied into each instance of el.
    x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7;
    return x
  }

  return {
    // We have to define all commonly-used Element members because the returned object isn't an Element.
    set x(newX) {
      el.x = newX
    },
    set y(newY) {
      el.y = newY
    },
    set width(newWidth) {
      el.getElementById('background').width = el.width = newWidth
      redraw()
    },
    set height(newHeight) {
      el.height = newHeight
    },
    set value(newValue) {
      value = newValue
      redraw()
    },
    get style() {
      return el.style
    },
    bigFunction
  }
}

// Should define getters if calling code might be expected to use them.