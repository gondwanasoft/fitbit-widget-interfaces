import document from 'document'
import { memory } from 'system'
import barWidget from '../resources/bar-extends-element-widget'

let memBefore = memory.js.used
let memAfter
const myBarExtendsElementWidget1 = barWidget(document.getElementById('myBarExtendsElementWidget1'))
memAfter = memory.js.used; console.log(`mem used instantiating object = ${memAfter-memBefore}`); memBefore = memAfter

myBarExtendsElementWidget1.x = 0                    // not overridden in barWidget, so inherits the member from <use>
myBarExtendsElementWidget1.width = 50               // overridden in barWidget
myBarExtendsElementWidget1.height = 150             // not overridden in barWidget, so inherits the member from <use>
myBarExtendsElementWidget1.style.fill = '#0000ff'   // overridden in barWidget
myBarExtendsElementWidget1.value = 1                // overridden in barWidget
myBarExtendsElementWidget1.style.display = 'inline' // not overridden in barWidget, so inherits the member from <use>
console.log(`${myBarExtendsElementWidget1.bigFunction(6)}`)

// The below is equivalent to the above, but demonstrates that the elements can be manipulated independently (ie, object properties aren't shared).
const myBarExtendsElementWidget2 = barWidget(document.getElementById('myBarExtendsElementWidget2'))
memAfter = memory.js.used; console.log(`mem used instantiating object = ${memAfter-memBefore}`); memBefore = memAfter

myBarExtendsElementWidget2.x = 100
myBarExtendsElementWidget2.y = 200
myBarExtendsElementWidget2.width = 150
myBarExtendsElementWidget2.height = 25
myBarExtendsElementWidget2.style.fill = '#ff0000'
myBarExtendsElementWidget2.value = 0.1
console.log(`${myBarExtendsElementWidget2.bigFunction(7)}`)
