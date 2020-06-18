import React, { useState } from 'react';

import { pickAll } from 'ramda';
import { HtmlEditor, MenuBar } from '@aeaton/react-prosemirror';
import { options, menu } from '@aeaton/react-prosemirror-config-default';
import { Typography } from '@material-ui/core';

import makeHandleUpdate from '../../helpers/make-handle-update';

import useStyles from './styles';

const limitMenu = {
  marks: {
    ...pickAll( ['em', 'strong', 'underline'], menu.marks ),
  },
  blocks: {
    ...pickAll( ['plain', 'bullet_list', 'ordered_list'], menu.blocks ),
  },
  history: {
    ...menu.history,
  },
};

const RichTextEditor = ({
  errors,
  setErrors,
  onUpdate,
  fieldData,
  label,
  initialValue,
  pristine,
  setPristine,
  fieldType,
  inputType,
  ...rest
}) => {
  const [value, setValue] = useState( '' );
  const {
    question: { code: questionCode },
    mandatory,
  } = fieldData;

  const handleUpdate = makeHandleUpdate( onUpdate )( fieldData, setErrors );

  const handleChange = value => {
    setValue( value );
    handleUpdate( value );
  };

  const classes = useStyles();

  return (
    <div className={classes.richTextContainer}>
      <HtmlEditor
        options={options}
        value={value}
        onChange={handleChange}
        render={({ editor, view }) => (
          <div>
            <MenuBar
              menu={limitMenu}
              view={view}
            />
            <Typography
              color="textSecondary"
              className={classes.labelText}
            >
              {label}
            </Typography>
            {editor}
          </div>
        )}
      />
    </div>
  );
};

export default RichTextEditor;
