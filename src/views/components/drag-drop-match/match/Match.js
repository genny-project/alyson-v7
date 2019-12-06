import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Example from './Example';

const Match = ({ groups, items }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Example
        groups={groups}
        items={items}
      />
    </DndProvider>
  );
};

export default Match;
