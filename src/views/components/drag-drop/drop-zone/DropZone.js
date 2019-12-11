import React from 'react';
import { useDrop } from 'react-dnd';
import { string, node, func } from 'prop-types';
import { isInteger } from '../../../../utils';
import { Box } from '../../../components';

const squareStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 60,
};

const nameStyle = {
  borderStyle: 'solid',
  borderColor: 'gray',
  borderWidth: 1,
  padding: '0px',
  cursor: 'move',
  minWidth: 100,
  minHeight: 35,
};

const squareWithChildrenStyle = {
  padding: 0,
};

export const DropZone = ({ x = null, children, name, code, setItemPos, ...restProps }) => {
  const [{ isOver }, drop] = useDrop({
    // accept: ItemTypes.KNIGHT,
    accept: code,
    drop: ( e ) => {
      setItemPos( x, e.label, code );
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      // canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
      }}
    >
      <Box
        {...squareStyle}
        backgroundColor={isInteger( x ) ? 'white' : null}
        flexWrap={children != null && !name ? 'wrap' : null}
        {...( name ? nameStyle : {})}
        {...( children != null ? squareWithChildrenStyle : {})}
        {...restProps}
      >
        {children}
      </Box>
      {isOver && (
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
};
