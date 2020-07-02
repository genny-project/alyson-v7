import React, { useState, useEffect } from 'react'

import { map, length } from 'ramda'

import { Button, Menu, MenuItem } from '@material-ui/core'

const Drafts = ({ drafts, setViewing }) => {
  const [menu, setMenu] = useState(null)

  useEffect(
    () => {
      setMenu(null)
    },
    [drafts],
  )

  return length(drafts || []) > 1 ? (
    <div>
      <Button
        test-id='QUE_DRAFTS_GRP'
        color="inherit"
        style={{ marginRight: '1rem' }}
        variant="outlined"
        onClick={event => setMenu(event.currentTarget)}
      >
        {'DRAFTS'}
      </Button>
      <Menu open={!!menu} onClose={() => setMenu(null)} anchorEl={menu}>
        {map(
          ({ targetCode, question: { code, name } }) => (
            <MenuItem
              key={'draft' + code}
              onClick={() =>
                setViewing({ view: 'FORM', code, targetCode, parentCode: 'QUE_DRAFTS_GRP' })
              }
            >
              {name}
            </MenuItem>
          ),
          drafts,
        )}
      </Menu>
    </div>
  ) : null
}

export default Drafts
