# Layouts Utils

## Overview

Various util functions related to the formatting and filtering of data from the layouts reducer


## checkForNewLayoutLinks

Compares the current array of links and the new array of links, and returns true if there are any to be added, removed, or that have a different panel value.

### Usage

`const style = checkForNewLayoutLinks( currentArray, newArray, layoutData, { options } );`

```
| Name | Type | Description |
| :-------- | :-------: | :---------- |
| currentArray | array of strings | Array of base entity codes |
| newArray | array of strings | Array of base entity codes |
| layoutData | object | the object from the store containing all layout data |
```

### Options

```
| Name | Type | Description |
| :-------- | :-------: | :---------- |
| ignoreAdd | bool | Ignore any links to be added |
| ignoreRemove | bool | Ignore any links to be removed |
| ignoreNewPanel | bool | Ignore any links to be changed |
```


## checkForNewInheritedThemes

Returns true if the new themes are different, or if the current object is invalid, otherwise returns false.

### Usage

`const style = checkForNewInheritedThemes( currentObject, newObject );`

```
| Name | Type | Description |
| :-------- | :-------: | :---------- |
| currentObject | object | object containing the current inherited styling |
| newObject | object |object from nextProps containing the new inherited styling |
```


## filterThemes

Returns an object containing the styling information of all themes from the links provided.

### Usage

`const style = filterThemes( themeCodes, allThemes, { options } );`

```
| Name | Type | Description |
| :-------- | :-------: | :---------- |
| themeCodes | array of strings | Array of base entity codes |
| allThemes | object | the object from the store containing all theme data |
```

### Options

```
| Name | Type | Description |
| :-------- | :-------: | :---------- |
| panel | string |  One of the following panels: `NORTH`, `SOUTH`, `EAST`, `WEST`, or `CENTRE`  |
| onlyInheritableThemes | bool | Will include themes which have the attribute `PRI_IS_INHERITABLE` with value `true` |
```


## getLayoutLinksOfType

Returns an array of links of the specified type.

### Usage

`const links = getLayoutLinksOfType( baseEntityCodes, layoutData, linkType );`

```
| Name | Type | Description |
| :-------- | :-------: | :---------- |
| baseEntityCodes | array of strings | Array of base entity codes |
| layoutData | object | the layout object from the store  |
| linkType | string | One of the link types: `ask`, `theme`, `frame`, or `sublayout` |
```