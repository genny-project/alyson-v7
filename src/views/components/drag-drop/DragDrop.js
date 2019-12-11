import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { string, array, bool, func, object } from 'prop-types';
import { DropZone } from './drop-zone/DropZone';
import { DragDropItem } from './drag-drop-item/DragDropItem';
import { isString, isArray, isObject, shuffleArray } from '../../../utils';
import { Box, Text } from '../../components';

const setupItems = ( items, shuffleItems ) => shuffleItems ? shuffleArray( items ) : items;

const DragDrop = ({
  content,
  groups,
  items,
  code,
  bumpItems,
  onChange,
  componentProps = {},
  shuffleItems,
}) => {
  const [itemPos, setItemPos] = useState( setupItems( items.map( i => ({ ...i, position: null })), shuffleItems ));

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

  const renderDropZone = ( i, name, props ) => {
    return (
      <DropZone
        x={i}
        key={i}
        name={name}
        code={code}
        setItemPos={moveItem}
        {...props}
      >
        {renderItem( i )}
      </DropZone>
    );
  };

  const renderItem = ( x ) => {
    const items = [];

    itemPos.forEach( item => {
      if ( !isObject( item )) return;

      const shouldRenderItem = item['position'] === x;

      if ( shouldRenderItem ) {
        items.push(
          <DragDropItem
            key={item.name}
            label={item.name}
            code={code}
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
          renderDropZone( index, 'box' )
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

  space.push( renderDropZone( null, null,  componentProps['input-item-wrapper'] ));

  //

  return (
    <Box
      width={600}
      borderColor="gray"
      borderStyle="solid"
      borderWidth={1}
      flexDirection="column"
      // INPUT_WRAPPER
    >
      <Box
        backgroundColor="red"
        flexWrap="wrap"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        padding={10}
        // INPUT_SELECTED_WRAPPER
      >
        {/* INPUT_SELECTED */}
        {/* INPUT_PLACEHOLDER */}
        {squares}
      </Box>
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
  content: string,
  items: array,
  groups: array,
  code: string,
  bumpItems: bool,
  onChange: func,
  componentProps: object,
};
