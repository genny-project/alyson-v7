import { map, path } from 'ramda'

import axios from 'axios'

      // { headers: {"Authorization" : `Bearer ${accessToken}`} }

const getAll = async ({ setNotes, accessToken }) => {
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

    console.error( 'response', response )
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

  setApiLoading( false )

  console.error( 'response', response )
}

const deleteNote = async ({ id, accessToken }) => {
  console.error( id )

  const response = await axios.delete( `https://internmatch-cyrus.gada.io/v7/notes/${id}` )
}

const editNote = async ({ id, newContent, accessToken }) => {
  const response = await axios.put( `https://internmatch-cyrus.gada.io/v7/notes/${id}`, {
    content: newContent,
  })

  console.log( response )
}

export { getAll, postNote, deleteNote, editNote }
