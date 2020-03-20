# Alyson v7

Alyson v7 is the updated Frontend for the Genny system.

## Contents
- [Overview](#Overview)
- [Store](#Store)
- [Layout Basics](#Layout-Basics)
- [Frames](#Frames)
- [Themes](#Themes)
- [Question Sets](#Question-Sets)
- [Visual Control](#Visual-Control)
- [Input Subcomponents](#Input-Subcomponents)
- [Links](#Links)
- [Creating a Layout](#Creating-a-Layout)

## Overview
### What Has Changed
The previous version used json files called 'layouts' to describe component structures, which were then converted to React Element trees.

This version aims to removes the dependance on a predefined layout. The Backend sends **Base Entities**, **Question Sets**, and **Links** to the Frontend, then, starting from one root Base Entity, it recursively renders the entire component tree.

### What Does This Affect
Instead of defining each page, and navigating between them to change the display, the Backend only needs to add, remove, or change **Base Entities** or the **Links** between **Base Entities**.

The styling for all Components is defined by the Backend, meaning that the Backend can control the styling and apply changes to as many instances of the system as desired.

## Store
*coming soon*
*explain what the store is and how to view it*
*detail the different fields in the store*

## Layout Basics
A layout is constructed of from the following objects:

- **Frames.** **Base Entities** that positions child elements according to certain criteria.
- **Themes.** **Base Entities** that contain styling or behavioural data for other elements.
- **Question Sets.** **Question Groups** and **Questions** that renders content or input elements.
- **Links.** Describes the nature of the relationship between entities.
- **Legacy Layout.** Renders elements from the previous versions json file.

## Frames
( prefix: FRM_ )
The **Frame** base entity is the basic building block of the layout. Any **Frames**, **Question Sets**, or **Legacy Layouts** that are **linked** to a **Frame** will be positioned based on the value of the **Link** between them.

**Panels** aren't created directly from **Base Entities**, instead they are rendered inside **Frames** based on the Frame's **Links**.

### Panels
The **Frame** base entity is the basic building block of the layout. Each **Frame** has up to five (5) **Panels**. The names of these **Panels** are derived from their corresponding compass directions, with north being at the top of the screen:

![Panel Layout](https://i.imgur.com/t4FxSph.png)

Each **Panel** has predefined default behaviour that allows content within it to be display in a way that is easily predictable and controllable by the backend. This behaviour can be overridden if desired.

- All Panels
  - Will only be rendered if it has content, ie: if there is a **Link** to an existing **Base Entity** in the Redux Store.
- North Panel
  - Will fit its content, *unless* there are no **East**, **West**, or **Centre Panels**, in which case it will expand to fill the space available.
  - Content will be positioned against the **top** of the panel. Override with `alignItems`.
- South Panel
  - Will fit its content, *unless* there are no **East**, **West**, or **Centre Panels**, in which case it will expand to fill the space available.
  - Content will be positioned against the **bottom** of the panel. Override with `alignItems`.
- Centre Panel
  - Will always expand to fill the space available.
  - Content positioned in the **middle** of the panel by default. Override with `alignItems` and `justifyContent`.
- East Panel
  - Will fit its content, *unless* there is no **Centre Panel**, in which case it will expand to fill the space available.
  - Content will be positioned against the **right side** of the panel. Override with `justifyContent`.
- West Panel
  - Will fit its content, *unless* there is no **Centre Panel**, in which case it will expand to fill the space available.
  - Content will be positioned against the **left side** of the panel. Override with `justifyContent`.

## Themes
( prefix: THM_ )

The **Theme** base entity describes styling information and behavioural changes for other rendered elements (**Frames**, **Question Groups**, and **Questions**).

### Styling Attribute
Styling information is determined by the value of the attribute `PRI_CONTENT`. The value is an object that will be passed to the rendered components as props.

Most CSS fields are acceptable as parameters, but given that the information is passed as props to React Components, each component has it's own list of props that it accepts. All others are ignored. All keys must be denoted in camelCase

[Click here to see a list accepted props.](./docs/COMPONENTS.md)

### Behavioural Attributes
Where most styling changes can simply be passed to components as props, some desired behaviour from components requires more complex changes to how the element tree is constructed. They might require a component to keep track of a state and then pass that to child elements, or change the order components are rendered, or use different components to the default ones.

### Heirachy, Inheritance, and Weight
By default, all **Theme** styling information is recursively passed to every child element in the component tree. This behaviour can be disabled by setting the value of `PRI_IS_INHERITABLE` to `false`.

It is possible, probably even, that a given component will end up with multiple instances of the same prop passed to it. This might happen because the same prop is being set from two different linked **Themes**, or because of a **Theme** linked to a parent component. Whenever this happens, the following rules are used to determine which prop is used:
1. Themes linked to children will override Themes linked to parents.
2. Themes linked with a `weight` value that have the highest priority, where `1` is the highest priority, will override Themes with a weight of a lower priority.

### Theme Attributes
| Option | Value Type | Example | Required | Description |
| ------ | ---------- | ------- | -------- | ----------- |
| PRI_CONTENT | Object | { "backgroundColor": "#ddd" } | false | An object composed of key-value pairings defining component props that will be passed to the rendered element in the frontend. These props are always passed to the component. |
| PRI_CONTENT_HOVER | Object | { "color": "green" } | false | An object similar to `PRI_CONTENT`, but the styling will only be applied if the users mouse is hovering over the component. |
| PRI_CONTENT_ACTIVE | Object | { "color": "red" } | false | An object similar to `PRI_CONTENT`, but the styling will only be applied if the component is currently active. |
| PRI_CONTENT_DISABLED | Object | { "color": "grey" } | false | An object similar to `PRI_CONTENT`, but the styling will only be applied if the component is disabled. |
| PRI_CONTENT_CLOSED | Object | { "width": 50 } | false | An object similar to `PRI_CONTENT`, but the styling will only be applied if the component or any of it's parents are closed. |
| PRI_CONTENT_SELECTED | Object | { "color": "blue" } | false | An object similar to `PRI_CONTENT`, but the styling will only be applied if the component is currently selected. |
| PRI_IS_INHERITABLE | Boolean | false | false | An optional prop to define whether a Theme's information should be passed to the children of the Theme. Defaults to true. |
| PRI_IS_EXPANDABLE | Boolean | true | false | Instructs linked component to displayed with its children hidden inside in an expandable component. |
| PRI_IS_SHAREABLE | Boolean | true | false | If attached to a Frame, will allow the Frame and it's children be be downloaded as a PDF. |
| PRI_IS_DROPDOWN | Boolean | true | false | Instructs linked component to displayed with its children hidden inside in a floating dropdown component. |
| PRI_IS_DROPDOWN_ITEM | Boolean | true | false | If linked component has a parent that is a Dropdown, then when the component is pressed it will close the dropdown. |
| PRI_HAS_QUESTION_GRP_INPUT | Boolean | true | false | If the connected entity is **Question Group** and has either of the properties **PRI_IS_DROPDOWN** or **PRI_IS_EXPANDABLE**, then it will render the **Icon** as part of the in addition to the child asks. See *Question Group Inputs* for more detail. Defaults to true.|
| PRI_HAS_QUESTION_GRP_ICON | Boolean | true | false | If the connected entity is **Question Group**, then it will render the **Question** in addition to the child asks. See *Question Group Inputs* for more detail. |
| PRI_HAS_INPUT | Boolean | true | false | If the connected entity is **Question**, the associated **Visual Control** will render an Input. Default is `true` |
| PRI_HAS_LABEL | Boolean | true | false | If the connected entity is **Question**, the associated **Visual Control** will render a Label. |
| PRI_HAS_REQUIRED | Boolean | true | false | If the connected entity is **Question**, the associated **Visual Control** will render a symbol to indicate the field is mandatory. |
| PRI_HAS_HINT | Boolean | true | false | If the connected entity is **Question**, the associated **Visual Control** will render a Hint. |
| PRI_HAS_DESCRIPTION | Boolean | true | false | If the connected entity is **Question**, the associated **Visual Control** will render a Description. |
| PRI_HAS_ICON | Boolean | true | false | If the connected entity is **Question**, the associated **Visual Control** will render an Icon. |
| PRI_IS_ICON_ONLY | Boolean | true | false | If the connected entity is **Question** and has an Icon, then no Input will be rendered. |
| PRI_HAS_QUESTION_GRP_LABEL | Boolean | true | false | If the connected entity is a **Question Group**, then it will render the `name` field of the question as a title.
| PRI_HAS_QUESTION_GRP_ICON | Boolean | true | false | If the connected entity is a **Question Group**, then it will render an Icon as part of the question group.
| PRI_HAS_QUESTION_GRP_INPUT | Boolean | true | false | If the connected entity is a **Question Group**, then it will render a Question as part of the question group.
| PRI_HAS_QUESTION_GRP_DESCRIPTION | Boolean | true | false | If the connected entity is  a**Question Group**, then it will render the `description` field of the question as a subtitle.
| PRI_IS_QUESTION_GRP_LABEL_CLICKABLE | Boolean | true | false | If the Question Group is Expandable or a Dropdown, should the Question Group Label be rendered as part of the clickable area.
| PRI_IS_QUESTION_GRP_INPUT_CLICKABLE | Boolean | true | false | If the Question Group is Expandable or a Dropdown, should the Question Group Input be rendered as part of the clickable area.
| PRI_USE_ATTRIBUTE_NAME_AS_VALUE | Boolean | true | false | If the connected entity is **Question**, the associated **Visual Control** Input Component will use the Attribute name as the value. |
| PRI_USE_QUESTION_NAME_AS_VALUE | Boolean | true | false | If the connected entity is **Question**, the associated **Visual Control** Input Component will use the Question name as the value. |
| PRI_HAS_HINT | Boolean | true | true | If the connected entity is **Question**, the associated **Visual Control** will render a Hint. |
| PRI_IS_UNITY_GROUP | Boolean | true | false | If the connected entity is  a**Question Group**, then it will render a Unity component as part of the Question Group. |

## Question Sets
( prefix: QUE_ )

The **Question Sets** are composed of **Question Groups** and **Questions**. A **Question Sets** is rendered as a Form component with each **Question Group** being rendered as a **FormGroup** Component, and each **Question** as an **Input** component. They cover almost all of the display elements and interactable elements shown on the page.

### Applying Themes.
Unlike Base Entities, **Themes** are connected to Question Sets using the **Context List** instead of Links.

### Questions
A Question is connected to an Ask, which has an Attribute. It is displayed as a **Visual Control** (see below). The data for the Visual Control is used from the `question` field.


### Question Groups
The Question Group is a container form a group of Questions and/or Question Groups. It can be used to pass inheritable Theme data to all of the children, and also can told to render in a different way if there are any Behavioural Attributes attached to the Theme.

A Question Group can also have a `question` field, but by default it is not rendered.

![Question Group Structure](https://i.imgur.com/3x0hsXo.png)

| Name | visualControlType Code | Component | Description |
| ------ | ---------- | ---------- | ----------- |
| - | `GROUP` | - | will apply theme to all elements of the form group |
| Wrapper | `GROUP_WRAPPER` | `Box` | box containing all the other components of the visual control |
| Label | `GROUP_LABEL` | `Text` | text displaying the question name |
| Description | `GROUP_DESCRIPTION` | `Text` |additional text to provide for information or context |
| Input | `GROUP_INPUT` | `Input` | input or display component that will be rendered |
| Header Wrapper | `GROUP_HEADER_WRAPPER` | `Box` | container element for components in the header of a complex group component |
| Clickable Wrapper | `GROUP_CLICKABLE_WRAPPER` | `Box` | interactable component that toggles whether the Content Wrapper is rendered or not |
| Icon | `GROUP_ICON` | `Icon` | icon rendered as part of the header |
| Content Wrapper | `GROUP_CONTENT_WRAPPER` | `Box` | component container that renders any children within it |

### Difference Between a Question Group and a Question?
A Question Group and a Question both have Codes that begin with `QUE_`, and there is actually no check being made in the front end to see if the suffix `_GRP` is present, so what is the actual distinction between the two?

The answer is that if the object has `childAsks`, then it is rendered as a Question Group.  If not, then it is rendered as a Question.

### Complex Rendering and Question Group Inputs

*coming soon*
*explain attributes*
*explain with images why question group inputs are neccessary*
*Collapsible*
*Dropdown*

## Visual Control

A **Visual Control** is the group of components that are render as part of a **Question**.

The basic components of a Visual Control are as follows:

![Visual Control Structure](https://i.imgur.com/8sHNoPu.png)

| Name | visualControlType Code | Component | Description |
| ------ | ---------- | ----------- |----------- |
| - | `VCL` | - | will apply theme to all elements of the visual control |
| Input | `VCL_INPUT` | `Input` | input or display component that will be rendered |
| Wrapper | `VCL_WRAPPER` | `Box` | box containing all the other components of the visual control |
| Label | `VCL_LABEL` | `Text` | text displaying the question name |
| Required | `VCL_REQUIRED` | `Icon` | symbol indicating if a question is mandatory |
| Hint | `VCL_HINT` | `Tooltip` | icon which renders a tooltip if hovered over, typically provides more information about how to interact with the input |
| Description | `VCL_DESCRIPTION` | `Text` | additional text to provide for information or context |
| Icon | `VCL_ICON` | `Icon` | icon rendered as part of the input |
| Error | `VCL_ERROR` | `Text` | text render if answer is invalid or an error occurs |

## Input Subcomponents

An **Input** that is part of a **Visual Control** might be a single element, such as a Text Field. However, in many cases it is more complex, and contains additional subcomponents. The currently supported subcomponents are as follows:

![Input Subcomponent Structure](https://i.imgur.com/ijdxdia.png)

| Name | visualControlType Code | Component | Description |
| ------ | ---------- | ----------- | ----------- |
| Input Field | `INPUT_FIELD` | `Input` | the main input field that is interactable |
| Input Wrapper | `INPUT_WRAPPER` | `Box` | box containing all the other components of the input |
| Icon | `INPUT_ICON` | `Icon` | icon rendered as part of the input field |
| Item Wrapper | `INPUT_ITEM_WRAPPER` | `Box` | box containing all the items that are available as options to select |
| Item | `INPUT_ITEM` | `Box | Touchable | Text` | an element selectable by the user |
| Selected Element Wrapper | `INPUT_SELECTED_WRAPPER` | `Box` | box containing all the elements that have been selected |
| Selected Element | `INPUT_SELECTED` | `Box | Touchable | Text` | a selected element |
| Placeholder Element | `INPUT_PLACEHOLDER` | `Box | Icon | Text` | an element shown if there are no selected elements. **currently only supported for file input**|

### Applying Themes.
Any Themes which are attached to a **Question** via the **Context List** will be passed to all elements of the **Visual Control**. A Theme can be directed to only be applied to a specific component of the **Visual Control** by using the field `visualControlType` (set the value to any of the above types, written in ALL CAPS eg `"visualControlType": "INPUT"`).

Themes which have a visualControlType specified can still be passed through other Question Groups and Questions. If you want to apply a Theme for a Visual Control to every input in a Question Set, you can attach that Theme to the root Question Group of the Question Set, and it will be propagated to all of the child Questions.

## Links
( prefix: LNK_ )

A **Link** is used to define the relationship between two **Entities**. When used for **Layouts**, the **Link** is principally used to tell the front end which entities are being linked, what type of entity the child is, and the location of the child within the **Frame**, if the parent is a **Frame** base entity.

The type of link is defined by the `attributeCode` field. The valid types of links are as follows:
- LNK_FRAME: Indicates that the child is a **Frame** base entity.
- LNK_THEME: Indicates that the child is a **Theme** base entity.
- LNK_ASK: Indicates that the child is an **Question Sets**.

***Important:*** *While Themes are linked to Frames, they aren't actually applied to Frames directy, but instead are applied to a specific Panel based on the value of the Link.*

The **Panel** the child will be linked to is defined by the `linkValue` field. The valid values are **NORTH**, **SOUTH**, **EAST**, **WEST**, **CENTRE**, and **FRAME**.

If **FRAME** is  supplied, the Theme will be applied to the Frame itself, not any of it's **Panels**.

#### Link Structure
```
{
  "created": "2019-02-06T04:24:58",
  "link": {
    "attributeCode": "LNK_FRAME",
    "linkValue": "CENTRE",
    "sourceCode": "FRM_PARENT",
    "targetCode": "FRM_CHILD",
    "weight": 1
  },
  "updated": "2019-02-06T04:25:25",
  "valueString": "CENTRE",
  "weight": 1
}
```
## Context List

The Context List is used to connect **Themes** to **Questions** and **Question Groups**. Context List is used instead of Themes because Links must connect two Base Entities, which Question Sets aren't.

The field `visualControlType` can be used to specify a **Visual Control Component** or **Input Subcomponent** to apply the Theme to.

The field `dataType` can be used to specify a **Question Data Type** to apply the Theme to.

The field `selectorType` can be used to apply **Themes** to the first level of children of the **Question Group** the theme is linked to.

| Name | selectorType Code | Description |
| ------ | ---------- | ----------- |
| First | `FIRST` | theme will be applied only to the first child |
| Last | `LAST` | theme will be applied only to the last child |
| Not First | `NOT_FIRST` | theme will be applied every child except the first child |
| Not Last | `NOT_LAST` | theme will be applied every child except the last child |

`selectorType` can also be an `integer`, in which case it will apply it to every `nth` child, where `n` is the value of `selectorType`.

#### Link Structure
```
"contextList": {
  "contexts": [
    {
      "contextCode": "THM_COLOR_ONE",
      "created": "2019-02-06T04:24:58",
      "name": "THEME",
      "visualControlType": "LABEL",
      "dataType": "text",
      "realm": "genny",
      "weight": 1
    }
  ]
}
```

## Creating a Layout
The default entry point for the Layout structure is `FRM_ROOT`. Any **Themes** that need to be applied through the whole app such as text color or background color should be linked to `FRM_ROOT`.

[Click here to view a step by step walkthrough of creating a layout.](./docs/CREATING_LAYOUT_WALKTHROUGH.md)

## New Changes

* Added new Theme Attribute **PRI_HAS_QUESTION_GRP_ICON**.
* Added new Input Subcomponent **INPUT_PLACEHOLDER**.

----

* Added dataType field to Contexts.

----

* Added visualControlTypes `group` and `vcl` to allow Themes to be applied to the entire Group or Visual Control respectively.

----

* Add image for Input Subcomponents.
* Updated image for Visual Control.

----

* Added PRI_IS_DROPDOWN to accepted attributes.

----

* Updated Panel types to include **FRAME**.
* Added description of the **FRAME** Panel type.
* Updated Visual Control section to include the `visualControlType` needed to assign a Theme to a specific Visual Control Element.
* Added section on Input Subcomponents.
