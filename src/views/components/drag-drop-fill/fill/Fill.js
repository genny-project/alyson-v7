import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Example from './Example';

const Fill = ({ content, items }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Example
        content={content}
        items={items}
      />
    </DndProvider>
  );
};

export default Fill;
