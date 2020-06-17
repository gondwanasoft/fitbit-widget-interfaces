import document from 'document'
import { HeartRateSensor } from 'heart-rate'
import { memory } from 'system'
import barClosureExtendsElementWidget from '../resources/bar-closure-extends-element-widget'
import barClosureContainsElementWidget from '../resources/bar-closure-contains-element-widget'
import barClosureContainsElementWidgetNaked from '../resources/bar-closure-contains-element-widget-naked'
import { barClass5ContainsElementWidget } from '../resources/bar-class5-contains-element-widget'
import { barClass6ContainsElementWidget } from '../resources/bar-class6-contains-element-widget'
import { barClass6ExtendsElementWidget } from '../resources/bar-class6-extends-element-widget'

const heartSensor = new HeartRateSensor({ frequency: 1 })
heartSensor.addEventListener('reading', onHeartReading)
heartSensor.start()

// A barClosureContainsElementWidget.
// Some Element members (eg, .x) are provided by code in barClosureContainsElementWidget.
// Element members not made available in barClosureContainsElementWidget (eg, .id) can't be accessed via barClosureContainsElementWidget.
// Therefore, some members are accessed via barClosureContainsElementWidget and some via barClosureContainsElementWidgetEl.
// This seems inconsistent and potentially confusing.
// Providing 'wrapper' functions for .x, etc, also requires memory, whereas barClosureExtendsElementWidget gets those members for free.
const myBarClosureContainsElementWidgetEl = document.getElementById('myBarClosureContainsElementWidget')
memBefore = memory.js.used
const myBarClosureContainsElementWidget = barClosureContainsElementWidget(myBarClosureContainsElementWidgetEl)
memAfter = memory.js.used; console.log(`mem used instantiating myBarClosureContainsElementWidget = ${memAfter-memBefore}`); memBefore = memAfter
myBarClosureContainsElementWidget.x = 50
myBarClosureContainsElementWidget.y = 10
myBarClosureContainsElementWidget.width = 200
myBarClosureContainsElementWidget.height = 20
myBarClosureContainsElementWidget.style.fill = 'green'
console.log(`${myBarClosureContainsElementWidget.bigFunction(7)}`)
console.log(`myBarClosureContainsElementWidget.id=${myBarClosureContainsElementWidget.id}`)      // doesn't work because .id is not provided by barClosureContainsElementWidget
console.log(`myBarClosureContainsElementWidgetEl.id=${myBarClosureContainsElementWidgetEl.id}`)  // works, but requires using a different object (element rather than widget)

// A barClosureContainsElementWidgetNaked:
const myBarClosureContainsElementWidgetNakedEl = document.getElementById('myBarClosureContainsElementWidgetNaked')
memBefore = memory.js.used
const myBarClosureContainsElementWidgetNaked = barClosureContainsElementWidgetNaked(myBarClosureContainsElementWidgetNakedEl)
memAfter = memory.js.used; console.log(`mem used instantiating myBarClosureContainsElementWidgetNaked = ${memAfter-memBefore}`); memBefore = memAfter
myBarClosureContainsElementWidgetNakedEl.x = 50                // can't set x on the widget; have to set it on the Element
myBarClosureContainsElementWidgetNakedEl.y = 40                // can't set y on the widget; have to set it on the Element
myBarClosureContainsElementWidgetNaked.width = 200             // have to set width on the widget because it provides behaviour necessary for correct display - inconsistency!
myBarClosureContainsElementWidgetNakedEl.height = 20           // can't set height on the widget; have to set it on the Element
myBarClosureContainsElementWidgetNakedEl.style.fill = 'red'    // can't access style via the widget; have to access it via the Element
console.log(`${myBarClosureContainsElementWidgetNaked.bigFunction(7)}`)
console.log(`myBarClosureContainsElementWidgetNaked.id=${myBarClosureContainsElementWidgetNaked.id}`)       // .id is not provided by barClosureContainsElementWidgetNaked, so doesn't work
console.log(`myBarClosureContainsElementWidgetNakedEl.id=${myBarClosureContainsElementWidgetNakedEl.id}`)   // this works, but requires using a different object (element rather than widget)

// A barClosureContainsElementWidgetNaked, but using its .element to access Element members.
// This avoids having to manipulate the widget via two objects (one for the widget and one for the object),
// but it requires a non-standard usage; eg, widget.element.x
const myBarClosureContainsElementWidgetNakedEl2 = document.getElementById('myBarClosureContainsElementWidgetNaked2')
memBefore = memory.js.used
const myBarClosureContainsElementWidgetNaked2 = barClosureContainsElementWidgetNaked(myBarClosureContainsElementWidgetNakedEl2)
memAfter = memory.js.used; console.log(`mem used instantiating myBarClosureContainsElementWidgetNaked2 = ${memAfter-memBefore}`); memBefore = memAfter
myBarClosureContainsElementWidgetNaked2.element.x = 50                // can't set member directly on the widget, but can set it via .element
myBarClosureContainsElementWidgetNaked2.element.y = 70                // "
myBarClosureContainsElementWidgetNaked2.width = 200                   // have to set width directly on the widget because it provides behaviour necessary for correct display - inconsistency!
myBarClosureContainsElementWidgetNaked2.element.height = 20
myBarClosureContainsElementWidgetNaked2.element.style.fill = 'white'
console.log(`${myBarClosureContainsElementWidgetNaked2.bigFunction(7)}`)
console.log(`myBarClosureContainsElementWidgetNaked2.id=${myBarClosureContainsElementWidgetNaked2.id}`)       // .id is not provided by barClosureContainsElementWidgetNaked, so doesn't work
console.log(`myBarClosureContainsElementWidgetNakedEl2.id=${myBarClosureContainsElementWidgetNakedEl2.id}`)   // this works, but requires using a different object (element rather than widget)
console.log(`myBarClosureContainsElementWidgetNaked2.element.id=${myBarClosureContainsElementWidgetNaked2.element.id}`)  // this works, but is non-standard

// A barClosureExtendsElementWidget.
// The widget (myBarClosureExtendsElementWidget) IS an element, so all of the Element interface members can be used on it with no additional code needed,
// and in the same way that they'd be used on a <rect> or any other standard element.
// This makes it easiest to use.
// Disadvantage: if Fitbit changes the Element interface (eg, by introducing a new member that's overridden by barClosureExtendsElementWidget,
// things could break. (I think this is unlikely in practice, and could be easily fixed.)
let memAfter
const myBarClosureExtendsElementWidgetEl = document.getElementById('myBarClosureExtendsElementWidget')
let memBefore = memory.js.used
const myBarClosureExtendsElementWidget = barClosureExtendsElementWidget(myBarClosureExtendsElementWidgetEl)
memAfter = memory.js.used; console.log(`mem used instantiating myBarClosureExtendsElementWidget = ${memAfter-memBefore}`); memBefore = memAfter
myBarClosureExtendsElementWidget.x = 50                            // not overridden in barClosureExtendsElementWidget, so inherits the member from Element
myBarClosureExtendsElementWidget.y = 100                           // not overridden in barClosureExtendsElementWidget, so inherits the member from Element
myBarClosureExtendsElementWidget.width = 200                       // overridden in barClosureExtendsElementWidget
myBarClosureExtendsElementWidget.height = 20                       // not overridden in barClosureExtendsElementWidget, so inherits the member from Element
myBarClosureExtendsElementWidget.style.fill = 'blue'               // overridden in barClosureExtendsElementWidget
console.log(`${myBarClosureExtendsElementWidget.bigFunction(6)}`)  // show that method is accessible; also used to evaluate memory usage
console.log(`myBarClosureExtendsElementWidget.id=${myBarClosureExtendsElementWidget.id}`)   // not overridden in barClosureExtendsElementWidget so uses member from Element

// A barClass5ContainsElementWidget.
const mybarClass5ContainsElementWidgetEl = document.getElementById('mybarClass5ContainsElementWidget')
let memBefore = memory.js.used
const mybarClass5ContainsElementWidget = new barClass5ContainsElementWidget(mybarClass5ContainsElementWidgetEl)
memAfter = memory.js.used; console.log(`mem used instantiating mybarClass5ContainsElementWidget = ${memAfter-memBefore}`); memBefore = memAfter
mybarClass5ContainsElementWidget.x = 50                          // works because member is explicitly provided in widget interface
mybarClass5ContainsElementWidget.y = 130                         // "
mybarClass5ContainsElementWidget.width = 200                     // "
mybarClass5ContainsElementWidget.height = 20                     // "
mybarClass5ContainsElementWidget.style.fill = 'yellow'           // "
console.log(`${mybarClass5ContainsElementWidget.bigFunction(6)}`)
console.log(`mybarClass5ContainsElementWidget.id=${mybarClass5ContainsElementWidget.id}`)                 // won't work because widget isn't an Element and it doesn't implement .id
console.log(`mybarClass5ContainsElementWidgetEl.id=${mybarClass5ContainsElementWidgetEl.id}`)             // works, but requires use of a different object (the Element rather than the widget)
console.log(`mybarClass5ContainsElementWidget.element.id=${mybarClass5ContainsElementWidget.element.id}`) // works, but requires non-standard syntax (.element), and .element to be implemented in widget

// A barClass6ContainsElementWidget.
const mybarClass6ContainsElementWidgetEl = document.getElementById('mybarClass6ContainsElementWidget')
let memBefore = memory.js.used
const mybarClass6ContainsElementWidget = new barClass6ContainsElementWidget(mybarClass6ContainsElementWidgetEl)
memAfter = memory.js.used; console.log(`mem used instantiating mybarClass6ContainsElementWidget = ${memAfter-memBefore}`); memBefore = memAfter
mybarClass6ContainsElementWidget.x = 50                          // works because member is explicitly provided in widget interface
mybarClass6ContainsElementWidget.y = 160                         // "
mybarClass6ContainsElementWidget.width = 200                     // "
mybarClass6ContainsElementWidget.height = 20                     // "
mybarClass6ContainsElementWidget.style.fill = 'cyan'             // "
console.log(`${mybarClass6ContainsElementWidget.bigFunction(8)}`)
console.log(`mybarClass6ContainsElementWidget.id=${mybarClass6ContainsElementWidget.id}`)                 // won't work because widget isn't an Element and it doesn't implement .id
console.log(`mybarClass6ContainsElementWidgetEl.id=${mybarClass6ContainsElementWidgetEl.id}`)             // works, but requires use of a different object (the Element rather than the widget)
console.log(`mybarClass6ContainsElementWidget.element.id=${mybarClass6ContainsElementWidget.element.id}`) // works, but requires non-standard syntax (.element), and .element to be implemented in widget

// A barClass6ExtendsElementWidget.
const mybarClass6ExtendsElementWidgetEl = document.getElementById('mybarClass6ExtendsElementWidget')
let memBefore = memory.js.used
const mybarClass6ExtendsElementWidget = new barClass6ExtendsElementWidget(mybarClass6ExtendsElementWidgetEl)
memAfter = memory.js.used; console.log(`mem used instantiating mybarClass6ExtendsElementWidget = ${memAfter-memBefore}`); memBefore = memAfter
mybarClass6ExtendsElementWidget.x = 50                         // works because widget IS an Element; widget doesn't need to define this member
mybarClass6ExtendsElementWidget.y = 190                        // "
mybarClass6ExtendsElementWidget.width = 200                    // oerridden in widget
mybarClass6ExtendsElementWidget.height = 20
mybarClass6ExtendsElementWidget.style.fill = 'magenta'
console.log(`${mybarClass6ExtendsElementWidget.bigFunction(9)}`)
console.log(`mybarClass6ExtendsElementWidget.id=${mybarClass6ExtendsElementWidget.id}`)                 // works because mybarClass6ExtendsElementWidget IS an Element

// I was going to include two additional widgets that were accessed via global functions rather than OOP-like members,
// like fitbit-widget's 7-segment (first version).
// However, subsequent discussion (and changes to 7-segment) seem to indicate that OOP is generally preferred.

function onHeartReading() {
  // Change bar progress indication based on heart rate:
  const value = (heartSensor.heartRate - 20) / 200    // range when used in simulator: 0 to 1
  myBarClosureExtendsElementWidget.value = value
  myBarClosureContainsElementWidget.value = value
  myBarClosureContainsElementWidgetNaked.value = value
  myBarClosureContainsElementWidgetNaked2.value = value
  mybarClass5ContainsElementWidget.value = value
  mybarClass6ContainsElementWidget.value = value
  mybarClass6ExtendsElementWidget.value = value

  // Hide widgets when heart rate is minimum (just to show that .style.display works):
  const display = value? 'inline' : 'none'
  myBarClosureExtendsElementWidget.style.display = display
  myBarClosureContainsElementWidget.style.display = display
  myBarClosureContainsElementWidgetNakedEl.style.display = display
  myBarClosureContainsElementWidgetNaked2.element.style.display = display
  mybarClass5ContainsElementWidget.style.display = display
  mybarClass6ContainsElementWidget.style.display = display
  mybarClass6ExtendsElementWidget.style.display = display
}

// TODO 3.9 try to reduce mem (use more const functions?). See if tree-shaking can remove unused interface members. Look for fingerprint in snapshot.