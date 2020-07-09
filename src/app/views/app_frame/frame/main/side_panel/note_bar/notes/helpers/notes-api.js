import { map, path } from 'ramda'

import axios from 'axios'

const getAll = async ({ setNotes, accessToken, setApiLoading, handleError, handleErrorMessage }) => {
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
    handleErrorMessage('Error trying to Fetch the note!')
    console.error( error )
  }
}

const postNote = async ({ noteContent, setNotes, accessToken, handleResponse, handleError, handleErrorMessage, setApiLoading }) => {
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

    response.status === 201 ? handleResponse() : handleError()

  } catch ( error ) {
    handleError()
    handleErrorMessage('Error trying to post the note!')
    console.error( error )
  }
}

const deleteNote = async ({ id, accessToken, setNotes, setApiLoading, handleError, handleErrorMessage, handleResponse }) => {
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
    response.status === 200 ? handleResponse() : handleError()

  } catch ( error ) {
    handleError()
    handleErrorMessage('Error trying to delete the note!')
    console.error( error )
  }
}

const editNote = async ({ id, newContent, accessToken, setNotes, setApiLoading, handleError, handleErrorMessage,  handleResponse }) => {
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
    response.status === 200 ? handleResponse() : handleError()

  } catch ( error ) {
    handleError()
    handleErrorMessage('Error trying to edit the note!')
    console.error(error)
  }

}

export { getAll, postNote, deleteNote, editNote }
