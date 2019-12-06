import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Example from './Example';

const List = ({ items }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Example items={items} />
    </DndProvider>
  );
};

export default List;
