import React from 'react';
import { useDrop } from 'react-dnd';
import { string, node, func, bool } from 'prop-types';
import { isInteger } from '../../../../utils';
import { Box, Text } from '../../../components';

const squareStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: 100,
  minHeight: 35,
};

const nameStyle = {
  borderStyle: 'solid',
  borderColor: 'gray',
  borderWidth: 1,
  padding: '0px',
};

const squareWithChildrenStyle = {
  padding: 0,
};

export const DropZone = ({
  x = null,
  children,
  name,
  code,
  setItemPos,
  canReorderItems,
  ...restProps
}) => {
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: code,
    drop: ( e ) => {
      setItemPos( x, e.label, code );
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        display: 'flex',
        flex: 1,
      }}
    >
      <Box
        {...squareStyle}
        width="100%"
        backgroundColor={isInteger( x ) ? 'white' : null}
        flexWrap={children != null && !name ? 'wrap' : null}
        {...( name ? nameStyle : {})}
        {...( children != null ? squareWithChildrenStyle : {})}
        {...restProps}
      >
        {
          name ? (
            <Text
              text={name}
            />
          ) : null
        }
        {children}
      </Box>
      {( canReorderItems ? isOverCurrent : isOver ) && (
        <Box
          position="absolute"
          top={0}
          left={0}
          height="100%"
          width="100%"
          zIndex={1}
          opacity={0.5}
          backgroundColor="yellow"
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
};
