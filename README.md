# fitbit-widget-interfaces
This repo began life as an experiment in providing different _interfaces_ for Fitbit widgets (components). This raised questions about which interfaces could be provided by the different forms of JS module structure (class vs. closure).

The repo displays several versions of a simple progress bar widget. Each widget is a JS object. The members of the object provide the widget's public interface; _ie_, properties (variables) and methods (functions) that calling code can use to manipulate the widget.

Each widget is constructed from an Element that refers to a Fitbit SVG \<use> statement. Such elements implement a variety of [interfaces](https://dev.fitbit.com/build/reference/device-api/document) which specify commonly-used members, such as .x and .width. For simplicity and consistency, it's useful if those members can be used on the widget itself. Therefore, the relationship between the widget and its element is important.

All widget instances are instantiated and used in app/index.js. The instances are:

* **myBarClosureContainsElementWidget**

  Type: barClosureContainsElementWidget.

  Module structure: closure.

  Interface relationship with SVG Element: the widget doesn't change the element. It implements element members that apply to it (.x, etc). This simply involves passing them through to the element unless widget-specific behaviour requires special treatment (eg, .width). Calling code may not need to keep track of the element because most common things can be done on the widget; however, element members that aren't explicitly implemented in the widget (_eg_, .id) won't work.

* **myBarClosureContainsElementWidgetNaked**

  Type: barClosureContainsElementWidgetNaked

  Module structure: closure.

  Interface relationship with SVG Element: the widget doesn't change the element. Unlike barClosureContainsElementWidget, this widget does not include code for element members that don't require special treatment (eg, .x). This means that such members can't be called on the widget, but must be called on the element from which the widget was constructed. Calling code may therefore need to maintain and use two variables: one for the widget and one for the element.

* **myBarClosureContainsElementWidgetNaked2**

  Type: barClosureContainsElementWidgetNaked (_ie_, same as myBarClosureContainsElementWidgetNaked).

  Module structure: closure.

  Interface relationship with SVG Element: same as myBarClosureContainsElementWidgetNaked (because the widget type is the same). However, myBarClosureContainsElementWidgetNaked2 makes use of the widget's .element member to enable access to element members that aren't provided by the widget. This means that calling code doesn't have to keep track of the element, but it does require non-standard syntax; _eg_, myWidget.element.x

* **myBarClosureExtendsElementWidget**

  Type: barClosureExtendsElementWidget.

  Module structure: closure.

  Interface relationship with SVG Element: the interface is a modified instance of the element, with new and overridden members applied to it to provide the widget's new behaviour. Because of this, the widget does not need to include code for element members that will work normally (_eg_, .x, .style, .id).

* **mybarClass5ContainsElementWidget**

  Type: barClass5ContainsElementWidget

  Module structure: class (ES5 syntax). Note: Since ES6 syntax is usable (see mybarClass6ContainsElementWidget), there is probably no benefit to using ES5 syntax.

  Interface relationship with SVG Element: same as barClosureContainsElementWidget.

* **mybarClass6ContainsElementWidget**

  Type: barClass6ContainsElementWidget

  Module structure: class (ES6 syntax).

  Interface relationship with SVG Element: same as barClosureContainsElementWidget.

* **mybarClass6ExtendsElementWidget**

  Type: barClass6ExtendsElementWidget

  Module structure: class (ES6 syntax).

  Interface relationship with SVG Element: same as barClosureExtendsElementWidget.