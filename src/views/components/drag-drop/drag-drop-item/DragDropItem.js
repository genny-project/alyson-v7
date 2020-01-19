import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { string, func, bool, number } from 'prop-types';
import { Fragment, Text, Box } from '../../../components';

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

export const DragDropItem = ({
  id,
  label = 'Item',
  code,
  moveCard,
  index,
  canReorderItems,
  selected,
}) => {
  let ref = useRef( null );
  const [, drop] = useDrop({
    accept: code,
    hover( item, monitor ) {
      if ( !ref.current ) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if ( dragIndex === hoverIndex ) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        ( hoverBoundingRect.bottom - hoverBoundingRect.top ) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if ( dragIndex < hoverIndex && hoverClientY < hoverMiddleY ) {
        return;
      }
      // Dragging upwards
      if ( dragIndex > hoverIndex && hoverClientY > hoverMiddleY ) {
        return;
      }
      // Time to actually perform the action
      moveCard( dragIndex, hoverIndex );
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: code,
      id,
      label,
      index,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  if ( canReorderItems ) {
    drag( drop( ref ));
  } else {
    ref = drag;
  }

  return (
    <Fragment>
      <div
        // ref={drag}
        ref={ref}
        style={{
          opacity: !canReorderItems && isDragging ? 0.5 : 1,
          position: 'relative',
          minWidth: canReorderItems ? '100%' : null,
          cursor: 'move',
          width: selected ? '50%' : null, // ***
        }}
      >
        <Box
          opacity={canReorderItems && isDragging ? 0 : 1}
          {...style}
          {...knightStyle}
        >
          <Text
            bold
            text={label}
          />
        </Box>
        { canReorderItems && isDragging && (
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
    </Fragment>
  );
};

DragDropItem.propTypes = {
  label: string,
  code: string,
  moveCard: func,
  canReorderItems: bool,
  id: number,
  index: number,
  selected: bool,
};
