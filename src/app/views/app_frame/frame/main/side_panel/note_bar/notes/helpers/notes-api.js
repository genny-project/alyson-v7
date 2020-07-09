import { map, path } from 'ramda'

import axios from 'axios'

const getAll = async ({ setNotes, accessToken, setApiLoading, handleError }) => {
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

    setNotes( path( ['data', 'items'], response ) || [] )
    response.status === 200 ? setApiLoading( false ) : handleError()

  } catch ( error ) {
    handleError()
    console.error( error )
  }
}

const postNote = async ({ noteContent, setNotes, accessToken, setApiLoading, handleError }) => {
  setApiLoading( true )

  try {
    const response = await axios.post( 'https://internmatch-cyrus.gada.io/v7/notes', {
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
    response.status === 201 ? setApiLoading( false ) : handleError()

  } catch ( error ) {
    handleError()
    console.error( error )
  }
}

const deleteNote = async ({ id, accessToken, setNotes, setApiLoading, handleError }) => {
  setApiLoading( true )

  try {
    const response = await axios.delete( `https://internmatch-cyrus.gada.io/v7/notes/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    )

    getAll({ setNotes, accessToken, setApiLoading })
    response.status === 200 ? setApiLoading( false ) : handleError()

  } catch ( error ) {
    handleError()
    console.error( error )
  }
}

const editNote = async ({ id, newContent, accessToken, setNotes, setApiLoading, handleError }) => {
  setApiLoading( true )

  try {
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
    response.status === 200 ? setApiLoading( false ) : handleError()
  } catch ( error ) {
    handleError()
    console.error(error)
  }

}

export { getAll, postNote, deleteNote, editNote }
