import React, { useState } from 'react';

import { pickAll } from 'ramda';
import { HtmlEditor, MenuBar } from '@aeaton/react-prosemirror';
import { options, menu } from '@aeaton/react-prosemirror-config-default';
import { Typography } from '@material-ui/core';

const limitMenu = {
  marks: {
    ...pickAll(['em'], menu.marks),
  },
  blocks: {
    ...pickAll(['plain', 'bullet_list', 'ordered_list'], menu.blocks),
  },
  history: {
    ...menu.history,
  },
};

import useStyles from './styles';

const RichTextEditor = ({ label }) => {
  const [value, setValue] = useState('');

  const classes = useStyles();
  return (
    <div className={classes.richTextContainer}>
      <HtmlEditor
        options={options}
        value={value}
        onChange={value => setValue(value)}
        render={({ editor, view }) => (
          <div>
            <MenuBar menu={limitMenu} view={view} />
            <Typography className={classes.labelText}>{label}</Typography>
            {editor}
          </div>
        )}
      />
    </div>
  );
};

export default RichTextEditor;
