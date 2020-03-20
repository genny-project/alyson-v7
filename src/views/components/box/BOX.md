# Box

## Description

The main display component. Renders a div html element with flexbox.

## Props

```
  opacity: number,
  backgroundColor: string,
  boxSizing: oneOf(
    ['content-box', 'border-box']
  ),

  /* flexbox */

  alignItems: oneOf(
    ['flex-start', 'flex-end', 'center', 'space-between', 'space-around']
  ),
  justifyContent: oneOf(
    ['flex-start', 'flex-end', 'center', 'space-between', 'space-around']
  ),
  alignSelf: oneOf(
    ['normal', 'auto', 'center', 'flex-start', 'flex-end']
  ),
  flexDirection: oneOf(
    ['row', 'row-reverse', 'column', 'column-reverse']
  ),
  flexWrap: oneOf(
    ['nowrap', 'wrap', 'wrap-reverse']
  ),
  flex: number,
  flexGrow: number,
  flexShrink: number,
  flexBasis: oneOfType(
    [string, number]
  ),

  /* width and height */

  height: oneOfType(
    [string, number]
  ),
  minHeight: oneOfType(
    [string, number]
  ),
  maxHeight: oneOfType(
    [string, number]
  ),
  width: oneOfType(
    [string, number]
  ),
  minWidth: oneOfType(
    [string, number]
  ),
  maxWidth: oneOfType(
    [string, number]
  ),
  fullHeightOnWeb: bool,

  /* padding */

  padding: number,
  paddingTop: number,
  paddingRight: number,
  paddingLeft: number,
  paddingBottom: number,
  paddingX: number,
  paddingY: number,

  /* margin */

  margin: oneOfType(
    [number, string]
  ),
  marginX: oneOfType(
    [number, string]
  ),
  marginY: oneOfType(
    [number, string]
  ),
  marginTop: oneOfType(
    [number, string]
  ),
  marginRight: oneOfType(
    [number, string]
  ),
  marginBottom: oneOfType(
    [number, string]
  ),
  marginLeft: oneOfType(
    [number, string]
  ),

  /* shadow */

  shadowColor: string,
  shadowOpacity: oneOfType(
    [string, number]
  ),
  shadowRadius: oneOfType(
    [string, number]
  ),
  shadowOffset: shape({
    width: oneOfType(
      [string, number]
    ),
    height: oneOfType(
      [string, number]
    ),
  }),

  /* border */

  borderTopWidth: number,
  borderRightWidth: number,
  borderBottomWidth: number,
  borderLeftWidth: number,
  borderWidth: number,
  borderColor: string,
  borderStyle: string,
  borderRadius: oneOfType(
    [number, string]
  ),
  borderTopLeftRadius: oneOfType(
    [number, string]
  ),
  borderTopRightRadius: oneOfType(
    [number, string]
  ),
  borderBottomRightRadius: oneOfType(
    [number, string]
  ),
  borderBottomLeftRadius: oneOfType(
    [number, string]
  ),

  /* overflow */

  overflow: string,
  overflowX: string,
  overflowY: string,
  overscrollBehavior: oneOf(
    ['auto', 'contain', 'none']
  ),
  overscrollBehaviorX: oneOf(
    ['auto', 'contain', 'none']
  ),
  overscrollBehaviorY: oneOf(
    ['auto', 'contain', 'none']
  ),

  /* position */

  position: oneOf(
    ['fixed', 'absolute', 'relative', 'static', 'sticky']
  ),
  top: oneOfType(
    [number, string]
  ),
  right: oneOfType(
    [number, string]
  ),
  bottom: number,
  left: oneOfType(
    [number, string]
  ),
  zIndex: number,

  /* transform */

  transform: array,
  transitionDuration: string,
  transitionProperty: string,
  transitionTimingFunction: string,
  transitionDelay: string,
  ```

  ## Non-theme Props

  ```
  children: any,
  __dangerouslySetStyle: object,

  /* accessibility */

  accessible: bool,
  accessibilityRole: string,
  accessibilityLabel: string,

  /* html elemental id props */

  componentID: string,
  componentCode: string,

  /* functions */

  onLayout: func,
  onPress: func,
  onBlur: func,
  onRef: func,
  ```
