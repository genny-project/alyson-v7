import React from 'react';
import { useDrop } from 'react-dnd';
import { string, node, func, bool, number, object } from 'prop-types';
import { Box, Text } from '../../../components';

const squareStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: 100,
  minHeight: 35,
};

const nameStyle = {
  // borderStyle: 'solid', ***
  // borderColor: 'gray', ***
  // borderWidth: 1, ***
  padding: '0px',
};

const squareWithChildrenStyle = {
  padding: 0,
};

const knightStyle = {
  fontWeight: 'bold',
};

const style = {
  borderStyle: 'dashed',
  borderWidth: 1,
  borderColor: 'gray',
  backgroundColor: 'white',
  padding: 10,
  float: 'left',
  color: 'black',
};

export const DropZone = ({
  x = null,
  children,
  name,
  code,
  setItemPos,
  canReorderItems,
  zoneItemLimit,
  fullWidth = true,
  overlayProps,
  disabled = false,
  ...restProps
}) => {
  const canDrop = (
    (
      !zoneItemLimit ||
      !children ||
      ( zoneItemLimit && children && zoneItemLimit > children.length )
    )
  );

  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: code,
    drop: ( e ) => {
      setItemPos( x, e.label, code );
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
    canDrop: () => canDrop && !disabled,
  });

  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        display: 'flex',
        // flex: 1, ***
        ...( fullWidth === true ? { width: '100%' } : {}),
      }}
    >
      <Box
        {...squareStyle}
        width="100%"
        // backgroundColor={isInteger( x ) ? 'white' : null} ***
        flexWrap={children != null && !name ? 'wrap' : null}
        {...( name ? nameStyle : {})}
        {...( children != null ? squareWithChildrenStyle : {})}
        {...restProps}
        justifyContent="flex-start" // ***
      >
        {
          name ? (
            <Box
              {...style} // ***
              {...knightStyle} // ***
              width="50%" // ***
            >
              <Text
                text={name}
              />
            </Box>
          ) : null
        }
        {children}
      </Box>
      {( canReorderItems ? isOverCurrent : ( isOver && canDrop )) && !disabled && (
        <Box
          position="absolute"
          top={0}
          left={0}
          height="100%"
          width="100%"
          zIndex={1}
          opacity={0.5}
          backgroundColor="yellow"
          {...overlayProps}
        />
      )}
    </div>
  );
};

DropZone.propTypes = {
  x: string,
  children: node,
  name: string,
  code: string,
  setItemPos: func,
  canReorderItems: bool,
  zoneItemLimit: number,
  fullWidth: bool,
  overlayProps: object,
  disabled: bool,
};
