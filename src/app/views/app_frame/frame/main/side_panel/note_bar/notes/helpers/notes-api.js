import { map, path } from 'ramda'

import axios from 'axios'

const getAll = async ({ setNotes, accessToken, setApiLoading }) => {

    console.error('get', setApiLoading)

  setApiLoading( true )

  try {
    const response = await axios.get(
      'https://internmatch-cyrus.gada.io/v7/notes',
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    )

    // console.log( 'response from GET', response )
    setNotes( path( ['data', 'items'], response ) || [] )
    response.status === 200 ? setApiLoading( false ) : null
  } catch ( error ) {
    console.error( error )
  }
}

const postNote = async ({ noteContent, setNotes, accessToken, setApiLoading }) => {

    console.error('post', setApiLoading)

  setApiLoading( true )

  const response = await axios.post( 'https://internmatch-cyrus.gada.io/v7/notes',  {
    sourceCode: 'PER_USER1',
    content: noteContent,
    tags: [],
    id: 0,
    created: new Date(),
    targetCode: 'PER_USER1',
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  }
  )

  getAll({ setNotes, accessToken, setApiLoading })

  response.status === 201 ? setApiLoading( false ) : null

  // console.error( 'response from POST', response )
}

const deleteNote = async ({ id, accessToken, setNotes, setApiLoading }) => {

  console.error('delete', setApiLoading)

  const response = await axios.delete( `https://internmatch-cyrus.gada.io/v7/notes/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  )

  // console.error( 'response from DELETE', response )

  getAll({ setNotes, accessToken, setApiLoading })

  response.status === 200 ? setApiLoading( false ) : null
}

const editNote = async ({ id, newContent, accessToken, setNotes, setApiLoading }) => {

    console.error('edit', setApiLoading)


  const response = await axios.put( `https://internmatch-cyrus.gada.io/v7/notes/${id}`,
    {
      content: newContent
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  getAll({ setNotes, accessToken, setApiLoading })

  response.status === 200 ? setApiLoading( false ) : null

  // console.error( 'response from PUT', response )
}

export { getAll, postNote, deleteNote, editNote }
