import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { string, array, bool, func, object } from 'prop-types';
import { DropZone } from './drop-zone/DropZone';
import { DragDropItem } from './drag-drop-item/DragDropItem';
import { isString, isArray, isObject, shuffleArray } from '../../../utils';
import { Box, Text } from '../../components';

const setupItems = ( items, shuffleItems ) => {
  shuffleItems ? shuffleArray( items ) : items;

  return items.map( i => ({ ...i, position: null }));
};

const DragDrop = ({
  content,
  groups,
  items,
  code,
  bumpItems,
  onChange,
  componentProps = {},
  shuffleItems,
  canReorderItems,
}) => {
  const [itemPos, setItemPos] = useState( setupItems( items, shuffleItems ));

  useEffect(() => onChange( itemPos ));

  const moveItem = ( toX, name ) => {
    const itemPosNew = [];

    itemPos.forEach( item => {
      if ( item.name === name ) {
        item['position'] = toX;
      }
      else if (
        bumpItems &&
        toX !== null &&
        item.position === toX
      ) {
        item['position'] = null;
      }
      itemPosNew.push(
        item
      );
    });

    setItemPos( itemPosNew );
  };

  const moveCard = useCallback(
    ( dragIndex, hoverIndex ) => {
      const dragCard = itemPos[dragIndex];

      const newObj = update( itemPos, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      });

      setItemPos(
        newObj,
      );
    },
    [itemPos],
  );

  const renderDropZone = ( i, name, props ) => {
    return (
      <DropZone
        x={i}
        key={i}
        name={name}
        code={code}
        setItemPos={moveItem}
        canReorderItems={canReorderItems}
        {...props}
      >
        {renderItem( i )}
      </DropZone>
    );
  };

  const renderItem = ( x ) => {
    const items = [];

    itemPos.forEach(( item, index ) => {
      if ( !isObject( item )) return;

      const shouldRenderItem = item['position'] === x;

      if ( shouldRenderItem ) {
        items.push(
          <DragDropItem
            index={index}
            key={item.name}
            label={item.name}
            code={code}
            id={item.id}
            canReorderItems={canReorderItems}
            moveCard={moveCard}
          />
        );
      };
    });

    return items.length > 0 ? items : null;
  };

  //

  const squares = [];
  const space = [];
  let split = null;

  if ( isString( content )) {
    split = content.split( '{{BOX}}' );

    split.forEach(( text, index, array ) => {
      text.split( ' ' ).forEach( string => {
        squares.push(
          <Box
            marginRight={5}
          >
            <Text
              text={string}
            />
          </Box>
        );
      });

      if ( index + 1 < array.length ) {
        squares.push(
          renderDropZone( index, null )
        );
      }
    });
  }
  else if  ( isArray( groups )) {
    groups.forEach(( group, index ) => {
      squares.push( renderDropZone( index, group.name ));
    });
  }
  else {
    // squares.push(
    //   <Box>
    //     <Text
    //       text="No Content Found"
    //     />
    //   </Box>
    // );
  }

  space.push( renderDropZone( null, null, componentProps['input-item-wrapper'] ));

  //

  return (
    <Box
      width={600}
      borderColor="gray"
      borderStyle="solid"
      borderWidth={1}
      flexDirection="column"
      {...componentProps['input-wrapper']}
      // INPUT_WRAPPER
    >
      {
        isArray( squares, { ofMinLength: 1 }) ? (
          <Box
            backgroundColor="red"
            flexWrap="wrap"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            padding={10}
            {...componentProps['input-selected-wrapper']}
            // INPUT_SELECTED_WRAPPER
          >
            {/* INPUT_SELECTED */}
            {/* INPUT_PLACEHOLDER */}
            {squares}
          </Box>
        ) : null
      }
      <Box
        backgroundColor="green"
        padding={10}
        // INPUT_ITEM_WRAPPER
      >
        {/* INPUT_ITEM */}
        {space}
      </Box>
    </Box>
  );
};

export default props => (
  <DndProvider backend={HTML5Backend}>
    <DragDrop
      {...props}
    />
  </DndProvider>
);

DragDrop.propTypes = {
  items: array, // list of objects to be rendered as draggable items
  groups: array, // list of objects to be rendered as dropzones
  content: string, // string which will be rendered with optional dropzones
  code: string, // unique id for the drag and drop components
  bumpItems: bool, // clears group of previous item when a new item is dropped
  shuffleItems: bool, // randomises the order of items when component loads
  onChange: func,
  componentProps: object, // object containing theme data
  canReorderItems: bool, // turns objects into dropzones so the list can be reordered by dropping
};
