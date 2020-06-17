// This is the same as bar-contains-element-widget, but doesn't return properties for 'standard' element manipulation;
// eg, .x, .width, .style
// Client code must do those things my manipulating the element, rather than the widget.

export default (el) => {
  const fillRectEl = el.getElementById('fillRect')
  let value = 0   // range: 0 to 1

  let style = el.style

  const redraw = () => {
    // This is a private function because it's not defined on the return object (el).
    // Call this function whenever there's a change to any of the variables on which it depends.
    // Problem: redraw won't be called automatically if el.width is changed. Setting value will redraw, or could expose redraw in interface.
    fillRectEl.width = el.width * value
  }

  const bigFunction = x => {     // This function is just to waste memory, to verify that code isn't copied into each instance of el.
    x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7;
    return x
  }

  const publicInterface = {
    // This is the object that we will make available to calling code.
    get element() {   // Can be used to manipulate members such as .x. If the client code maniplates the element directly, this member isn't needed.
      return el
    },
    set value(newValue) {
      value = newValue
      redraw()
    },
    bigFunction
  }

  return publicInterface
}

// Should define getters if calling code might be expected to use them.