# Register-Component Changelog

<!--
  -- Place entries for future releases in a new '## Unreleased' section at the top of this file.
  -- See https://wiki.intuit.com/display/QBOCore/Changelogs+in+Synergy+libraries for formatting recommendations.
  -->
## 1.1.8 - _2015-10-06_
### Fixed
 * Removing console.log statement.


## 1.1.7 - _2015-10-02_
### Fixed
 * Removing fix for IE10 as 'document-register-element' library was updated to fix this.


## 1.1.6 - _2015-10-01_
### Fixed
 * Adding fix for IE10 as 'document-register-element' library was causing issues.

## 1.1.5 - _2015-09-29_
### Fixed
 * Removing console.log statement.
 
## 1.1.4 - _2015-09-17_
### Fixed
 * Avoid calling render method more than once.
  
## 1.1.3 - _2015-08-07_
### Fixed
 * Attribute change handlers now fire even when the attribute is changed outside the normal `setAttribute()`, `removeAttribute()`, and property assignment methods.
 * Fixed incorrect handling of boolean attributes introduced in v1.1.1.

## 1.1.2 - _2015-07-31_
### Fixed
 * Hot fix for reserved word "default" and not using it directly as a property.

## 1.1.1 - _2015-07-28_
### Fixed
 * Fixed v2/UIComponent when setting properties is calling change observers async on browsers that don't support native custom elements.
 * When component is used declaratively, attribute values are getting passed as null even if they have a value in the change observer new value argument.
 * Regardless of the provided default value, accessing a property with type Boolean would return false. This makes it return true if any truthy value is provided as the default.

## 1.1.0 - _2015-07-20_
### Changed
 * `change` handlers in attribute-property bindings now receive the property's previous value as their third argument.

### Fixed
 * Fixed broken unit tests on IE

## 1.0.0 - _2015-07-06_
### Added: New UIComponent API
There's a new v2 API for developing web components, in `src/v2/register` and `src/v2/UIComponent`.
This new API adds the following major features:

 * Attribute-property bindings, which update DOM attributes whenever bound properties are modified and vice versa.
 * Declared property types, which convert between a JavaScript property value and its stringified DOM attribute.
   Several base types are available in `v2/attributeTypes`, and custom type converters are easy to create.
 * Change handlers in bound properties, allowing realtime DOM updates without re-rendering. These are also called
   when a web component is initialized and its initial DOM has been rendered. There now should never be a reason for
   a developer or consumer of a web component to manually call its `render()` method.
 * Defined using the object management utilities at [js-object-utils](https://github.intuit.com/rconnamacher/js-object-utils)
 * ECMAScript 5’s `"use strict"` strict mode support

### Deprecated
 * The legacy DCL-based register API in src/Component.js and src/register.js has been deprecated in favor of the
   above v2 API.

## 0.4.1 - _2015-06-16_

## 0.4.0 - _2015-05-20_

## 0.3.0 - _2015-05-04_

## 0.2.0 - _2015-04-30_

## 0.1.1 - _2015-03-08_

Initial Release
