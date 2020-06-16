// Same as barContainsElementWidgetNew, but using ES6 'class' syntax.
// TODO 2 test on phys watch
// TODO 3 rethink all naming: Class is actually also New. New is also Function.

export class barContainsElementWidgetClass {

  constructor(el) {
    this._el = el
    this._fillRectEl = el.getElementById('fillRect')
    this._width = 100
    this._value = 0   // range: 0 to 1

    this._redraw = () => {
      // Call this function whenever there's a change to any of the variables on which it depends.
      this._fillRectEl.width = this._width * this._value
    }
  }

  get element() {
    return this._el
  }

  set x(newX) {
    this._el.x = newX
  }

  set y(newY) {
    this._el.y = newY
  }

  set width(newWidth) {
    this._el.getElementById('background').width = this._width = newWidth
    this._redraw()
  }

  set height(newHeight) {
    this._el.height = newHeight
  }

  get style() {
    return this._el.style
  }

  set value(newValue) {
    // value: 0 to 1; proportion of width to be filled.
    this._value = newValue
    this._redraw()
  }

  bigFunction(x) {     // This function is just to waste memory, to verify that code isn't copied into each instance of el.
    x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7;
    return x
  }
}


// Should define getters if calling code might be expected to use them.