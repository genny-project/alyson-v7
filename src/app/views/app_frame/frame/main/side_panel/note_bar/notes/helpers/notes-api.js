import { map, path } from 'ramda'

import axios from 'axios'

      // { headers: {"Authorization" : `Bearer ${accessToken}`} }

const getAll = async ({ setNotes, accessToken, setApiLoading }) => {
//   const config = {
//     headers: { Authorization: `Bearer ${accessToken}` }
// };
  // console.error('accessToken', accessToken)
  try {
    const response = await axios.get(
      'https://internmatch-cyrus.gada.io/v7/notes/PER_USER1?pageIndex=0&pageSize=50&tags=',
      {
        headers: {
          authorization: 'Bearer',
        },
      }
    )

    console.error( 'response from GET', response )
    setNotes( path( ['data', 'items'], response ) || [] )
  } catch ( error ) {
    console.error( error )
  }
}

const postNote = async ({ noteContent, noteHeader, setNotes, accessToken, setApiLoading }) => {
  console.log( noteContent, noteHeader )

  setApiLoading( true )

  const response = await axios.post( 'https://internmatch-cyrus.gada.io/v7/notes', {
    sourceCode: 'PER_USER1',
    content: noteContent,
    tags: [],
    id: 0,
    created: new Date(),
    targetCode: 'PER_USER1',
  })

  getAll({ setNotes })

  response.status === 201 ? setApiLoading( false ) : null

  console.error( 'response from POST', response )
}

const deleteNote = async ({ id, accessToken, setNotes, setApiLoading }) => {
  setApiLoading( true )

  const response = await axios.delete( `https://internmatch-cyrus.gada.io/v7/notes/${id}` )

  console.error( 'response from DELETE', response )

  getAll({ setNotes })

  response.status === 200 ? setApiLoading( false ) : null
}

const editNote = async ({ id, newContent, accessToken, setNotes }) => {
  const response = await axios.put( `https://internmatch-cyrus.gada.io/v7/notes/${id}`, {
    content: newContent,
  })

  getAll({ setNotes })

  console.error( 'response from PUT', response )
}

export { getAll, postNote, deleteNote, editNote }
