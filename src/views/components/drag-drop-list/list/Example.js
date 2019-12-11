import React, { useState, useCallback } from 'react';
import update from 'immutability-helper';
import Card from './Card';
import { Fragment } from '../../../components';
import { shuffleArray } from '../../../../utils';

const style = {
  width: 400,
};

const Container = ({ items }) => {
  {
    const [cards, setCards] = useState( shuffleArray( items ));

    console.warn({ items, cards });

    const moveCard = useCallback(
      ( dragIndex, hoverIndex ) => {
        const dragCard = cards[dragIndex];

        const newObj = update( cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        });

        setCards(
          newObj,
        );
      },
      [cards],
    );

    const renderCard = ( card, index ) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
        />
      );
    };

    return (
      <Fragment>
        <div style={style}>
          {cards.map(( card, i ) => renderCard( card, i ))}
        </div>
      </Fragment>
    );
  }
};

export default Container;
