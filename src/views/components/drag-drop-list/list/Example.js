import React, { useState, useCallback } from 'react';
import update from 'immutability-helper';
import Card from './Card';
import { Fragment } from '../../../components';

const style = {
  width: 400,
};

const shuffle = ( array ) => {
  var currentIndex = array.length; var temporaryValue; var randomIndex;

    // While there remain elements to shuffle...
  while ( currentIndex !== 0 ) {
      // Pick a remaining element...
    randomIndex = Math.floor( Math.random() * currentIndex );
    currentIndex -= 1;

      // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const Container = ({ items }) => {
  {
    const [cards, setCards] = useState( shuffle( items ));
    const moveCard = useCallback(
      ( dragIndex, hoverIndex ) => {
        const dragCard = cards[dragIndex];

        setCards(
          update( cards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          }),
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
