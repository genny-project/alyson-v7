import React, { useState } from 'react'

import { pickAll } from 'ramda'
import { HtmlEditor, MenuBar } from '@aeaton/react-prosemirror'
import { options, menu } from '@aeaton/react-prosemirror-config-default'
import { Typography } from '@material-ui/core'

import useStyles from './styles'

const limitMenu = {
  marks: {
    ...pickAll(['em', 'strong', 'underline'], menu.marks),
  },
  blocks: {
    ...pickAll(['plain', 'bullet_list', 'ordered_list'], menu.blocks),
  },
  history: {
    ...menu.history,
  },
}

const RichTextEditor = ({ onUpdate, fieldData, label, initialValue }) => {
  const [value, setValue] = useState(initialValue || '')
  const {
    question: { code: questionCode },
  } = fieldData

  const handleChange = value => {
    setValue(value)
    onUpdate({ value })
  }

  const classes = useStyles()

  return (
    <div className={classes.richTextContainer} test-id={questionCode}>
      <HtmlEditor
        options={options}
        value={value}
        onChange={handleChange}
        render={({ editor, view }) => (
          <div>
            <MenuBar menu={limitMenu} view={view} />
            <Typography color="textSecondary" className={classes.labelText}>
              {label}
            </Typography>
            {editor}
          </div>
        )}
      />
    </div>
  )
}

export default RichTextEditor
