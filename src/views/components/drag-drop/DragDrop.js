import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { string, array, bool, func, object, number } from 'prop-types';
import dlv from 'dlv';
import { DropZone } from './drop-zone/DropZone';
import { DragDropItem } from './drag-drop-item/DragDropItem';
import { isString, isArray, isObject, shuffleArray } from '../../../utils';
import { Box, Text } from '../../components';

const setupItems = ( items, shuffleItems ) => {
  if ( !isArray( items )) return [];

  shuffleItems ? shuffleArray( items ) : items;

  return items.map( i => ({ ...i, zone: null, position: null }));
};

const DragDrop = ({
  content,
  groups = [],
  items = [],
  itemStringKey = 'label',
  itemValueKey = 'value',
  bumpItems,
  onChangeValue,
  componentProps = {},
  shuffleItems,
  canReorderItems,
  zoneItemLimit,
  value = [],
  ask,
  ...restProps
}) => {
  const [itemPos, setItemPos] = useState( setupItems( items, shuffleItems )); // set up initial item array

  const selectedDropZones = {};

  if ( items.length !== itemPos.length ) {
    setItemPos( setupItems( items, shuffleItems ));
  }

  // console.error({ items, setupitems: setupItems( items, shuffleItems ), itemPos  });

  useEffect(() => {
    // if ( restProps.log ) console.log( ask.questionCode, 'useEffect', selectedDropZones, itemPos );

    const selectedItems = itemPos.filter( item => item.zone != null );
    // const selectedItems = itemPos.filter( item => item.position != null );
    const selectedItemForSend = selectedItems.map( item => ({ [item[itemValueKey]]: dlv( selectedDropZones, `${item.zone}` ) }));
    // const selectedItemForSend = selectedItems.map( item => ({ [item[itemValueKey]]: dlv( selectedDropZones, `${item.position}` ) }));

    console.log({ itemPos, selectedItems, selectedItemForSend, selectedDropZones });

    const shouldSendValue = ( newValue, currentValue ) => {
      // if ( restProps.log ) console.log( 'shouldSendValue', { newValue, currentValue });
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

      // /*

      const isMatch = Object.keys( selectedItemKeys ).every( key => {
        // if ( restProps.log ) console.warn( 'compare', selectedItemKeys[key], valueItemKeys[key] );

        return selectedItemKeys[key] === valueItemKeys[key];
      });

      // */

      // if ( restProps.log ) console.warn({ isMatch });

      return !isMatch;
      // return false;
    };

    // if no dropzones and canReorderItems

    // then send

    if ( shouldSendValue( selectedItemForSend, value )) {
      if ( onChangeValue ) {
        onChangeValue( selectedItemForSend );
      };
    }
  });

  const moveItem = ( toX, name ) => {
    console.log( 'move Item' );
    const itemPosNew = [];
    const currentZones = {};

    itemPos.forEach( item => {
      if ( item.zone != null ) {
        currentZones[item.zone] = [

        ];
      }
    });

    itemPos.forEach( item => {
      if ( item[itemStringKey] === name ) {
        item['zone'] = toX;
      }
      else if (
        bumpItems &&
        toX !== null &&
        item.zone === toX
      ) {
        item['zone'] = null;
      }

      itemPosNew.push(
        item
      );
    });

    setItemPos( itemPosNew );
  };

  const moveCard = useCallback(
    ( dragIndex, hoverIndex ) => {
      console.log( 'move Card' );
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

  const renderDropZone = ({ zoneId, index, name, dropzoneProps, overlayProps }) => {
    return (
      <DropZone
        x={index}
        key={index}
        zoneId={zoneId}
        name={name}
        questionCode={ask.questionCode}
        setItemPos={moveItem}
        canReorderItems={canReorderItems}
        zoneItemLimit={index == null ? null : zoneItemLimit}
        disabled={!isArray( groups, { ofMinLength: 1 }) && !isString( content )}
        {...dropzoneProps}
        overlayProps={overlayProps}
      >
        {renderItem({ zoneId, zoneIndex: index })}
      </DropZone>
    );
  };

  const renderItem = ({ zoneId, zoneIndex }) => {
    const items = [];

    itemPos.forEach( item => {
      if ( !isObject( item )) return;

      const shouldRenderItem = item['zone'] === zoneId;

      const isSelected = zoneIndex != null;

      if ( shouldRenderItem ) {
        items.push(
          <DragDropItem
            index={items.length}
            key={item[itemStringKey]}
            label={item[itemStringKey]}
            questionCode={ask.questionCode}
            id={item[itemValueKey]}
            canReorderItems={canReorderItems}
            moveCard={moveCard}
            selected={isSelected}
            {...componentProps['input-item']}
            {...( isSelected ? componentProps['input-selected'] : {})}
            overlayProps={componentProps['input-item-overlay']}
          />
        );
      };
    });

    return items.length > 0 ? items : null;
  };

  const squares = [];
  const space = [];
  let split = null;

  // console.warn( ask.questionCode, { groups, selectedDropZones, content });

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
          renderDropZone({
            zoneId: optionLabel,
            index,
            name: null,
            dropzoneProps: componentProps['input-selected-dropzone'],
            overlayProps: componentProps['input-selected-overlay'],
          })
        );

        selectedDropZones[optionLabel] = optionLabel;
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
  else if ( isArray( groups, { ofMinLength: 1 })) {
    groups.forEach(( group, index ) => {
      selectedDropZones[group[itemValueKey]] = group[itemValueKey];

      squares.push( renderDropZone({
        zoneId: group[itemValueKey],
        index,
        name: group[itemStringKey],
        dropzoneProps: componentProps['input-selected-dropzone'],
        overlayProps: componentProps['input-selected-overlay'],
      }));
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

  space.push( renderDropZone({
    zoneId: null,
    index: null,
    name: null,
    dropzoneProps: componentProps['input-item-dropzone'],
    overlayProps: componentProps['input-item-overlay'],
  }));

  return (
    <Box
      width="100%"
      borderColor="gray"
      borderStyle="solid"
      borderWidth={1}
      flexDirection="column"
      {...componentProps['input-wrapper']}
    >
      {
        isArray( squares, { ofMinLength: 1 }) ? (
          <Box
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
  bumpItems: bool, // clears group of previous item when a new item is dropped
  shuffleItems: bool, // randomises the order of items when component loads
  onChangeValue: func,
  componentProps: object, // object containing theme data
  canReorderItems: bool, // turns objects into dropzones so the list can be reordered by dropping
  zoneItemLimit: number,
  value: array,
  ask: object,
};
