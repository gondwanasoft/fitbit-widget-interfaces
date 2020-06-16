import document from 'document'
import { HeartRateSensor } from 'heart-rate'
import { memory } from 'system'
import barExtendsElementWidget from '../resources/bar-extends-element-widget'
import barContainsElementWidget from '../resources/bar-contains-element-widget'
import barContainsElementWidgetNaked from '../resources/bar-contains-element-widget-naked'
import { barContainsElementWidgetNew } from '../resources/bar-contains-element-widget-new'
import { barContainsElementWidgetClass } from '../resources/bar-contains-element-widget-class'

const heartSensor = new HeartRateSensor({ frequency: 1 })
heartSensor.addEventListener('reading', onHeartReading)
heartSensor.start()

// A barExtendsElementWidget.
// The widget (myBarExtendsElementwidget) IS an element, so all of the Element interface members can be used on it with no additional code needed,
// and in the same way that they'd be used on a <rect> or any other standard element.
// This makes it easiest to use.
// Disadvantage: if Fitbit changes the Element interface (eg, by introducing a new member that's overridden by barExtendsElementWidget,
// things could break. (I think this is unlikely in practice, and could be easily fixed.)
let memAfter
const myBarExtendsElementwidgetEl = document.getElementById('myBarExtendsElementwidget')
let memBefore = memory.js.used
const myBarExtendsElementwidget = barExtendsElementWidget(myBarExtendsElementwidgetEl)
memAfter = memory.js.used; console.log(`mem used instantiating myBarExtendsElementwidget = ${memAfter-memBefore}`); memBefore = memAfter
myBarExtendsElementwidget.x = 50                    // not overridden in barExtendsElementWidget, so inherits the member from <use>
myBarExtendsElementwidget.width = 200               // overridden in barExtendsElementWidget
myBarExtendsElementwidget.height = 40             // not overridden in barExtendsElementWidget, so inherits the member from <use>
myBarExtendsElementwidget.style.fill = 'blue'   // overridden in barExtendsElementWidget
console.log(`${myBarExtendsElementwidget.bigFunction(6)}`)
console.log(`myBarExtendsElementwidget.id=${myBarExtendsElementwidget.id}`)   // not overridden in barExtendsElementWidget, so inherits the member from <use>

// A barContainsElementWidget.
// Some Element members (eg, .x) are provided by code in barContainsElementWidget.
// Element members not made available in barContainsElementWidget (eg, .id) can't be accessed via barContainsElementWidget,
// but could be accessed via the element that it contains.
// Therefore, some members are accessed via barContainsElementWidget and some via barContainsElementWidgetEl.
// This seems inconsistent and potentially confusing.
// Providing 'wrapper' functions for .x, etc, also requires memory, whereas barExtendsElementWidget gets those members for free.
const myBarContainsElementwidgetEl = document.getElementById('myBarContainsElementwidget')
memBefore = memory.js.used
const myBarContainsElementwidget = barContainsElementWidget(myBarContainsElementwidgetEl)
memAfter = memory.js.used; console.log(`mem used instantiating myBarContainsElementwidget = ${memAfter-memBefore}`); memBefore = memAfter
myBarContainsElementwidget.x = 50
myBarContainsElementwidget.y = 50
myBarContainsElementwidget.width = 200
myBarContainsElementwidget.height = 40
myBarContainsElementwidget.style.fill = 'green'
console.log(`${myBarContainsElementwidget.bigFunction(7)}`)
console.log(`myBarContainsElementwidget.id=${myBarContainsElementwidget.id}`)      // .id is not provided by barContainsElementWidget, so doesn't work
console.log(`myBarContainsElementwidgetEl.id=${myBarContainsElementwidgetEl.id}`)  // this works, but requires using a different object (element rather than widget)

// A barContainsElementWidgetNaked:
const myBarContainsElementwidgetNakedEl = document.getElementById('myBarContainsElementwidgetNaked')
memBefore = memory.js.used
const myBarContainsElementwidgetNaked = barContainsElementWidgetNaked(myBarContainsElementwidgetNakedEl)
memAfter = memory.js.used; console.log(`mem used instantiating myBarContainsElementwidgetNaked = ${memAfter-memBefore}`); memBefore = memAfter
myBarContainsElementwidgetNakedEl.x = 50                // can't set x on the widget; have to set it on the Element
myBarContainsElementwidgetNakedEl.y = 100               // can't set y on the widget; have to set it on the Element
myBarContainsElementwidgetNakedEl.width = 200           // can't set width on the widget; have to set it on the Element
// Problem: setting .width won't prompt the widget to redraw. Changing .value will do so. Other solutions are possible.
myBarContainsElementwidgetNakedEl.height = 40           // can't set height on the widget; have to set it on the Element
myBarContainsElementwidgetNakedEl.style.fill = 'red'    // can't set style on the widget; have to set it on the Element
console.log(`${myBarContainsElementwidgetNaked.bigFunction(7)}`)
console.log(`myBarContainsElementwidgetNaked.id=${myBarContainsElementwidgetNaked.id}`)  // .id is not provided by barContainsElementWidgetNaked, so doesn't work
console.log(`myBarContainsElementwidgetNakedEl.id=${myBarContainsElementwidgetNakedEl.id}`)  // this works, but requires using a different object (element rather than widget)

// A barContainsElementWidgetNaked, but using its .element to access Element members.
// This avoids having to manipulate the widget via two objects (one for the widget and one for the object),
// but it requires a non-standard usage; eg, widget.element.x
const myBarContainsElementwidgetNakedEl2 = document.getElementById('myBarContainsElementwidgetNaked2')
memBefore = memory.js.used
const myBarContainsElementwidgetNaked2 = barContainsElementWidgetNaked(myBarContainsElementwidgetNakedEl2)
memAfter = memory.js.used; console.log(`mem used instantiating myBarContainsElementwidgetNaked2 = ${memAfter-memBefore}`); memBefore = memAfter
myBarContainsElementwidgetNaked2.element.x = 50                // can't set x on the widget; have to set it on the Element
myBarContainsElementwidgetNaked2.element.y = 150               // can't set y on the widget; have to set it on the Element
myBarContainsElementwidgetNaked2.element.width = 200           // can't set width on the widget; have to set it on the Element
// Problem: setting .width won't prompt the widget to redraw. Changing .value will do so. Other solutions are possible.
myBarContainsElementwidgetNaked2.element.height = 40           // can't set height on the widget; have to set it on the Element
myBarContainsElementwidgetNaked2.element.style.fill = 'white'    // can't set style on the widget; have to set it on the Element
console.log(`${myBarContainsElementwidgetNaked2.bigFunction(7)}`)
console.log(`myBarContainsElementwidgetNaked2.id=${myBarContainsElementwidgetNaked2.id}`)  // .id is not provided by barContainsElementWidgetNaked, so doesn't work
console.log(`myBarContainsElementwidgetNakedEl2.id=${myBarContainsElementwidgetNakedEl2.id}`)  // this works, but requires using a different object (element rather than widget)
console.log(`myBarContainsElementwidgetNaked2.element.id=${myBarContainsElementwidgetNaked2.element.id}`)  // this works, but is non-standard

// A barContainsElementWidgetNew.
const mybarContainsElementWidgetNewEl = document.getElementById('mybarContainsElementWidgetNew')
let memBefore = memory.js.used
const mybarContainsElementWidgetNew = new barContainsElementWidgetNew(mybarContainsElementWidgetNewEl)
memAfter = memory.js.used; console.log(`mem used instantiating mybarContainsElementWidgetNew = ${memAfter-memBefore}`); memBefore = memAfter
mybarContainsElementWidgetNew.x = 50
mybarContainsElementWidgetNew.y = 200
mybarContainsElementWidgetNew.width = 200
mybarContainsElementWidgetNew.height = 40
mybarContainsElementWidgetNew.style.fill = 'yellow'
console.log(`${mybarContainsElementWidgetNew.bigFunction(6)}`)
console.log(`mybarContainsElementWidgetNew.id=${mybarContainsElementWidgetNew.id}`)                 // won't work because widget isn't an Element and it doesn't implement .id
console.log(`mybarContainsElementWidgetNewEl.id=${mybarContainsElementWidgetNewEl.id}`)             // works, but requires use of a different object (the Element rather than the widget)
console.log(`mybarContainsElementWidgetNew.element.id=${mybarContainsElementWidgetNew.element.id}`) // works, but requires non-standard syntax (.element), and .element to be implemented in widget

// A barContainsElementWidgetClass.
const mybarContainsElementWidgetClassEl = document.getElementById('mybarContainsElementWidgetClass')
let memBefore = memory.js.used
const mybarContainsElementWidgetClass = new barContainsElementWidgetClass(mybarContainsElementWidgetClassEl)
memAfter = memory.js.used; console.log(`mem used instantiating mybarContainsElementWidgetClass = ${memAfter-memBefore}`); memBefore = memAfter
mybarContainsElementWidgetClass.x = 50
mybarContainsElementWidgetClass.y = 250
mybarContainsElementWidgetClass.width = 200
mybarContainsElementWidgetClass.height = 40
mybarContainsElementWidgetClass.style.fill = 'cyan'
console.log(`${mybarContainsElementWidgetClass.bigFunction(8)}`)
console.log(`mybarContainsElementWidgetClass.id=${mybarContainsElementWidgetClass.id}`)                 // won't work because widget isn't an Element and it doesn't implement .id
console.log(`mybarContainsElementWidgetClassEl.id=${mybarContainsElementWidgetClassEl.id}`)             // works, but requires use of a different object (the Element rather than the widget)
console.log(`mybarContainsElementWidgetClass.element.id=${mybarContainsElementWidgetClass.element.id}`) // works, but requires non-standard syntax (.element), and .element to be implemented in widget

// I was going to include two additional widgets that were accessed via global functions rather than OOP-like members,
// like fitbit-widget's 7-segment (first version).
// However, subsequent discussion (and changes to 7-segment) seem to indicate that OOP is generally preferred.

function onHeartReading() {
  const value = (heartSensor.heartRate - 20) / 200    // range when used in simulator: 0 to 1
  myBarExtendsElementwidget.value = value
  myBarContainsElementwidget.value = value
  myBarContainsElementwidgetNaked.value = value
  myBarContainsElementwidgetNaked2.value = value
  mybarContainsElementWidgetNew.value = value
  mybarContainsElementWidgetClass.value = value

  const display = value? 'inline' : 'none'
  myBarExtendsElementwidget.style.display = display
  myBarContainsElementwidget.style.display = display
  myBarContainsElementwidgetNakedEl.style.display = display
  myBarContainsElementwidgetNaked2.element.style.display = display
  mybarContainsElementWidgetNew.style.display = display
  mybarContainsElementWidgetClass.style.display = display
}

// TODO 3.9 try to reduce mem (use more const functions?). See if tree-shaking can remove unused interface members. Look for fingerprint in snapshot.