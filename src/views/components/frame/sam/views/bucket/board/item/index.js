import React, { useState } from 'react';

import {
  Card,
  IconButton,
  CardHeader,
  Avatar,
  Menu,
  MenuItem,
  Collapse,
  CardContent,
  Typography,
  ClickAwayListener,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import useStyles from './styles';

const Item = ({
  setViewing,
  item: { email, name, profilePicture, mobile, studentId, statusColor, targetCode },
}) => {
  const [menu, setMenu] = useState(null);
  const [expand, setExpand] = useState(false);

  const classes = useStyles({ statusColor });
  const handleView = () =>
    setViewing({
      code: 'QUE_VIEW_PROFILE',
      parentCode: 'QUE_CARD_RIGHT_GRP',
      rootCode: 'QUE_BUCKET_CONTENT_AVAILABLE_INTERNS_GRP',
      targetCode,
    });

  return (
    <ClickAwayListener onClickAway={() => setExpand(false)}>
      <div onClick={() => setExpand(!expand)}>
        <Card className={classes.itemRoot}>
          <CardHeader
            avatar={<Avatar alt={name} src={profilePicture} />}
            title={name}
            subheader={email}
            action={
              <IconButton
                aria-label="settings"
                onClick={event => {
                  setMenu(event.currentTarget);
                  event.preventDefault();
                }}
              >
                <MoreVertIcon />
              </IconButton>
            }
            classes={{
              content: classes.cardContent,
            }}
          />
          <Collapse in={expand}>
            <CardContent>
              <Typography variant="body2">{`Student Id: ${studentId}`}</Typography>
              <Typography variant="body2">{`Mobile: ${mobile}`}</Typography>
            </CardContent>
          </Collapse>
        </Card>
        <Menu open={!!menu} anchorEl={menu} onClose={() => setMenu(null)}>
          <MenuItem onClick={handleView}>{`View Profile`}</MenuItem>
        </Menu>
      </div>
    </ClickAwayListener>
  );
};

export default Item;
