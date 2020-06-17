// ES5-style 'new' function. ES6-style barClass6ContainsElementWidget is preferable.

export function barClass5ContainsElementWidget(el) {

  this._fillRectEl = el.getElementById('fillRect')
  this._width = 100
  this._value = 0   // range: 0 to 1

  Object.defineProperty(barClass5ContainsElementWidget.prototype, 'element', {
    // Don't have to use xxx.prototype; can just use this.
    get() {
      return el
    }
  })

  Object.defineProperty(barClass5ContainsElementWidget.prototype, 'x', {
    set(newX) {
      el.x = newX
    }
  })

  Object.defineProperty(barClass5ContainsElementWidget.prototype, 'y', {
    set(newY) {
      el.y = newY
    }
  })

  Object.defineProperty(barClass5ContainsElementWidget.prototype, 'width', {
    set(newWidth) {
      el.getElementById('background').width = this._width = newWidth
      this._redraw()
    }
  })

  Object.defineProperty(barClass5ContainsElementWidget.prototype, 'height', {
    set(newHeight) {
      el.height = newHeight
    }
  })

  Object.defineProperty(barClass5ContainsElementWidget.prototype, 'style', {
    get() {
      return el.style
    }
  })

  Object.defineProperty(barClass5ContainsElementWidget.prototype, 'value', {
    // Add new property.
    // value: 0 to 1; proportion of width to be filled.
    // Must use defineProperty because el is an extant object, so we can't use set within it.
    set(newValue) {
      this._value = newValue
      this._redraw()
    }
  })

  this._redraw = () => {
    // This is a private function because it's not defined on the return object (el).
    // Call this function whenever there's a change to any of the variables on which it depends.
    this._fillRectEl.width = this._width * this._value
  }

}

barClass5ContainsElementWidget.prototype.bigFunction = x => {     // This function is just to waste memory, to verify that code isn't copied into each instance of el.
x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7;
return x
}

// Should define getters if calling code might be expected to use them.