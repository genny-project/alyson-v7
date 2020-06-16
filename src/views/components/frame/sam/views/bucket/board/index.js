import React from 'react';

import { map, mapObjIndexed, values } from 'ramda';

import { Grid } from '@material-ui/core';

import ColumnHeader from './column_header';
import Item from './item';

import useStyles from './styles';

const Board = ({ data: { lanes, meta }, setViewing }) => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="flex-start"
      alignItems="stretch"
      spacing={2}
      wrap="nowrap"
    >
      {map(
        ({
          metaData: {
            SCH_TITLE: { value: title },
          },
          data: items,
          searchCode: id,
        }) => (
          <Grid item key={'lane' + id}>
            <Grid
              className={classes.lane}
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
              key={'column' + id}
              spacing={1}
              wrap="nowrap"
            >
              <Grid item key={'colItem' + id}>
                <ColumnHeader title={title} key={'colHeader' + id} />
              </Grid>
              {map(item =>
                values(
                  mapObjIndexed((val, key) => (
                    <Grid item key={'gridItem' + key}>
                      <Item
                        item={{ ...val, targetCode: key }}
                        setViewing={setViewing}
                        key={'gridItemItem' + key}
                      />
                    </Grid>
                  ))(item)
                )
              )(items)}
            </Grid>
          </Grid>
        ),
        lanes || []
      )}
    </Grid>
  );
};

export default Board;
