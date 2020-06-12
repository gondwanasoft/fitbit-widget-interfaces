import barWidget from '../resources/bar-widget'

const myBarWidget1 = barWidget('myBarWidget1')
myBarWidget1.x = 0                    // not overridden in barWidget, so inherits the member from <use>
myBarWidget1.width = 50               // overridden in barWidget
myBarWidget1.height = 150             // not overridden in barWidget, so inherits the member from <use>
myBarWidget1.style.fill = '#0000ff'   // overridden in barWidget
myBarWidget1.value = 1                // overridden in barWidget
myBarWidget1.style.display = 'inline' // not overridden in barWidget, so inherits the member from <use>

// The below is equivalent to the above, but demonstrates that the elements can be manipulated independently (ie, object properties aren't shared).
const myBarWidget2 = barWidget('myBarWidget2')
myBarWidget2.x = 100
myBarWidget2.y = 200
myBarWidget2.width = 150
myBarWidget2.height = 25
myBarWidget2.style.fill = '#ff0000'
myBarWidget2.value = 0.1