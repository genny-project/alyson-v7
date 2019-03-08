import React, { Component } from 'react';
import { number, func, bool } from 'prop-types';
import range from 'lodash.range';
import { Box } from '../../index';
import SwipeDot from './swipe-dot';

const styles = {
  wrapper: {
    display: 'flex',
    width: '100vw',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
  },
  dots: {
    display: 'flex',
    flexDirection: 'row',
  },
};

class SwipePagination extends Component {
  static defaultProps = {
    showArrows: true,
  }

  static propTypes = {
    dots: number.isRequired,
    index: number.isRequired,
    onChangeIndex: func.isRequired,
    showArrows: bool,
  };

  handleClick = ( event, index ) => {
    this.props.onChangeIndex( index );
  };

  handleClickPrev = ( event, index ) => {
    this.handleClick( event, index - 1 );
  };

  handleClickNext = ( event, index ) => {
    this.handleClick( event, index + 1 );
  };

  render() {
    const { index, dots, showArrows } = this.props;

    return (
      <Box
        {...styles.wrapper}
      >
        {
          showArrows
            ? (
              <SwipeDot
                active={index > 0}
                index={index}
                onClick={this.handleClickPrev}
                icon="arrow_back_ios"
              />
            ) : null
        }
        <Box
          {...styles.dots}
        >
          {
            range( dots )
              .map( i => {
                return (
                  <SwipeDot
                    key={i}
                    index={i}
                    active={i !== index}
                    selected={i === index}
                    onClick={this.handleClick}
                    // disabled // add control for enabling/disabling inputs
                  />
                );
              })
              }
        </Box>
        {
          showArrows
            ? (
              <SwipeDot
                active={index < dots - 1}
                index={index}
                onClick={this.handleClickNext}
                icon="arrow_forward_ios"
              />
            ) : null
        }
      </Box>
    );
  }
}

export default SwipePagination;
