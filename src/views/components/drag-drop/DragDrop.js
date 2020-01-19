import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { string, array, bool, func, object } from 'prop-types';
import dlv from 'dlv';
import { DropZone } from './drop-zone/DropZone';
import { DragDropItem } from './drag-drop-item/DragDropItem';
import { isString, isArray, isObject, shuffleArray } from '../../../utils';
import { Box, Text } from '../../components';

const setupItems = ( items, shuffleItems ) => {
  if ( !isArray( items )) return [];

  shuffleItems ? shuffleArray( items ) : items;

  return items.map( i => ({ ...i, position: null }));
};

const DragDrop = ({
  content,
  groups = [],
  items = [],
  itemStringKey = 'label',
  itemValueKey = 'value',
  code,
  bumpItems,
  onChangeValue,
  componentProps = {},
  shuffleItems,
  canReorderItems,
  value = [],
  ...restProps
}) => {
  const selectedDropZones = {};

  if ( isArray( groups )) {
    groups.forEach(( group, index ) => {
      selectedDropZones[index] = group[itemValueKey];
    });
  }

  const [itemPos, setItemPos] = useState( setupItems( items, shuffleItems )); // set up initial item array

  if ( items.length !== itemPos.length ) {
    setItemPos( setupItems( items, shuffleItems ));
  }

  // console.error({ items, setupitems: setupItems( items, shuffleItems ), itemPos  });

  useEffect(() => {
    // console.log( 'useEffect', selectedDropZones, itemPos );

    const selectedItems = itemPos.filter( item => item.position != null );
    const selectedItemForSend = selectedItems.map( item => ({ [item[itemValueKey]]: dlv( selectedDropZones, `${item.position}` ) }));

    // console.log( 'onChange', selectedItemForSend, value );

    const shouldSendValue = ( newValue, currentValue ) => {
      if ( !isArray( newValue )) return false;
      if ( !isArray( currentValue )) return false;
      if ( selectedItemForSend.length !== value.length ) return true;

      let selectedItemKeys = {};
      let valueItemKeys = {};

      selectedItemForSend.forEach( item => {
        selectedItemKeys = {
          ...selectedItemKeys,
          ...item,
        };
      });

      value.forEach( item => {
        valueItemKeys = {
          ...valueItemKeys,
          ...item,
        };
      });

      // check if the objects have the same key value pairs

      const isMatch = Object.keys( selectedItemKeys ).every( key => {
        return selectedItemKeys[key] === value[key];
      });

      // console.warn({ valueItemKeys, selectedItemKeys, isMatch });

      // return !isMatch // figure out how to use isMatch
      return false;
    };

    if ( shouldSendValue( selectedItemForSend, value )) {
      if ( onChangeValue ) {
        onChangeValue( selectedItemForSend );
      };
    }
  });

  const moveItem = ( toX, name ) => {
    const itemPosNew = [];

    itemPos.forEach( item => {
      if ( item[itemStringKey] === name ) {
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
            key={item[itemStringKey]}
            label={item[itemStringKey]}
            code={code}
            id={item[itemValueKey]}
            canReorderItems={canReorderItems}
            moveCard={moveCard}
            selected={x != null}
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
    split = content.split( '{{' );

    split.forEach(( string, index ) => {
      const endOfOption = string.indexOf( '}}' );

      const optionLabel = endOfOption > 0
        ? string.slice( 0, endOfOption )
        : null;

      const contentString = endOfOption > 0
        ? string.slice( endOfOption + 2, string.length )
        : string;

      if ( optionLabel ) {
        squares.push(
          renderDropZone( index, null )
        );

        selectedDropZones[index] = {
          [itemStringKey]: optionLabel,
          [itemValueKey]: optionLabel,
        };
      }

      if ( contentString ) {
        contentString.split( ' ' ).forEach( string => {
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
      }
    });
  }
  else if  ( isArray( groups )) {
    groups.forEach(( group, index ) => {
      squares.push( renderDropZone( index, group[itemStringKey], componentProps['input-selected-dropzone'] ));
    });
  }
  else {
    // Add placeholder sub component

    // squares.push(
    //   <Box>
    //     <Text
    //       text="No Content Found"
    //     />
    //   </Box>
    // );
  }

  space.push( renderDropZone( null, null, componentProps['input-item-dropzone'] ));

  //

  return (
    <Box
      width={600}
      borderColor="gray"
      borderStyle="solid"
      borderWidth={1}
      flexDirection="column"
      {...componentProps['input-wrapper']}
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
          >
            {/* INPUT_SELECTED */}
            {/* INPUT_PLACEHOLDER */}
            {squares}
          </Box>
        ) : null
      }
      <Box
        // INPUT_ITEM_WRAPPER
        {...componentProps['input-item-wrapper']}
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
  itemStringKey: string,
  itemValueKey: string,
  groups: array, // list of objects to be rendered as dropzones
  content: string, // string which will be rendered with optional dropzones
  code: string, // unique id for the drag and drop components
  bumpItems: bool, // clears group of previous item when a new item is dropped
  shuffleItems: bool, // randomises the order of items when component loads
  onChangeValue: func,
  componentProps: object, // object containing theme data
  canReorderItems: bool, // turns objects into dropzones so the list can be reordered by dropping
};
