import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { string, func, bool, number, oneOfType, object } from 'prop-types';
import { Fragment, Text, Box, Icon } from '../../../components';

export const DragDropItem = ({
  id,
  label = 'Item',
  code,
  moveCard,
  index,
  canReorderItems,
  // selected,
  backgroundColor,
  width,
  overlayProps,
  ...restProps
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

  const calculateMargin = () => {
    let marginLeftValue = 0;
    let marginRightValue = 0;

    if ( restProps.margin ) {
      marginLeftValue = restProps.margin;
      marginRightValue = restProps.margin;
    }
    if ( restProps.marginX ) {
      marginLeftValue = restProps.marginX;
      marginRightValue = restProps.marginX;
    }
    if ( restProps.marginLeft ) {
      marginLeftValue = restProps.marginLeft;
    }
    if ( restProps.marginRight ) {
      marginRightValue = restProps.marginRight;
    }

    const marginValue = marginLeftValue + marginRightValue;

    return `calc( 100% - ${marginValue}px)`;
  };

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
          width: width,
        }}
      >
        <Box
          opacity={canReorderItems && isDragging ? 0 : 1}

          // borderStyle="dashed"
          // borderWidth={1}
          // borderColor="gray"
          padding={10}
          // float="left"
          color="black"

          backgroundColor={backgroundColor}
          width={calculateMargin()}
          alignItems="center"
          {...restProps}
        >
          <Icon
            name="drag_indicator"
            color="#ddd"
            size="sm"
            cursor="move"
          />
          <Box
            padding={5}
          />
          <Text
            bold
            text={label}
            size="xs"
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
            {...overlayProps}
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
  backgroundColor: string,
  width: oneOfType(
    [string, number]
  ),
  marginRight: number,
  overlayProps: object,
};
