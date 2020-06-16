import React from 'react';
import { Drawer, Typography, Container, TextareaAutosize, Fab, Tooltip } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIosRounded';
import useStyles from './styles';

const Notes = ({ open, setOpen }) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="temporary"
      anchor="right"
      className={classes.drawer}
      open={open}
      onClose={() => setOpen( false )}
      ModalProps={{ keepMounted: true }}
    >
      <Container className={classes.header}>
        <Typography
          variant="h6"
          color="primary"
        >
          Notes
        </Typography>

        <TextareaAutosize
          aria-label="minimum height"
          rowsMin={3}
          placeholder="Please enter your notes here"
        />
      </Container>
      <div className={classes.grow} />
      <Container className={classes.footer}>
        <Tooltip
          title="Hide side panel"
          placement="top-start"
        >
          <Fab
            color="primary"
            onClick={() => setOpen( !open )}
            className={classes.fab}
          >
            <ArrowForwardIosIcon color="inherit" />
          </Fab>
        </Tooltip>
      </Container>
    </Drawer>
  );
};

export default Notes;
