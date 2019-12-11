import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { string, array, bool, func } from 'prop-types';
import { DropZone } from './main/DropZone';
import { Item } from './main/Item';
import { isString, isArray } from '../../../utils';
import { Box, Text } from '../../components';

const DragDrop = ({ content, groups, items, code, bumpItems, onChange }) => {
  const initialPositions = {};

  items.forEach( item => {
    initialPositions[item.name] = null;
  });

  const [itemPos, setItemPos] = useState( initialPositions );

  useEffect(() => onChange( itemPos ));

  const moveItem = ( toX, name ) => {
    const itemPosNew = {
      ...itemPos,
    };

    if ( bumpItems ) {
      Object.keys( itemPosNew ).forEach( itemKey => {
        if (
          toX != null &&
          itemPosNew[itemKey] === toX &&
          itemKey !== name
        ) {
          itemPosNew[itemKey] = null;
        }
      });
    }

    itemPosNew[name] = toX;

    setItemPos( itemPosNew );
  };

  const renderDropZone = ( i, name ) => {
    return (
      <DropZone
        x={i}
        key={i}
          // y={y}
        name={name}
        code={code}
        setItemPos={moveItem}
      >
        {renderItem( i )}
      </DropZone>
    );
  };

  const renderItem = ( x ) => {
    const items = [];

    Object.keys( itemPos ).forEach( itemKey => {
      const shouldRenderItem = itemPos[itemKey] === x;

      if ( shouldRenderItem ) {
        items.push(
          <Item
            key={itemKey}
            label={itemKey}
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
    squares.push(
      <Box>
        <Text
          text="No Content Found"
        />
      </Box>
    );
  }

  space.push( renderDropZone( null, null ));

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
};
