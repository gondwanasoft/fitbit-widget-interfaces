// Same as barClass6ContainsElementWidget, but returns Element with overridden members.
// TODO 3.9 If I add members to el, will they be duplicated in all instances of widget? If so, see if using el._this=this help

export class barClass6ExtendsElementWidget {

  constructor(el) {
    el._width = 100
    el._fillRectEl = el.getElementById('fillRect')
    el._value = 0   // range: 0 to 1

    el._redraw = () => {
      // Call this function whenever there's a change to any of the variables on which it depends.
      el._fillRectEl.width = el._width * el._value
    }

    Object.defineProperty(el, 'width', {
      // Override Element property.
      // value: 0 to 1; proportion of width to be filled.
      // Must use defineProperty because el is an extant object, so we can't use set within it.
        set(newWidth) {
          el.getElementById('background').width = el._width = newWidth
          el._redraw()
        }
      })

      Object.defineProperty(el, 'value', {
    // Add new property.
    // value: 0 to 1; proportion of width to be filled.
    // Must use defineProperty because el is an extant object, so we can't use set within it.
      set(newValue) {
        el._value = newValue
        el._redraw()
      }
    })

    el.bigFunction = x => {     // This function is just to waste memory, to verify that code isn't copied into each instance of el.
      x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7; x = x + 7;
      return x
    }

    return el
  }
}