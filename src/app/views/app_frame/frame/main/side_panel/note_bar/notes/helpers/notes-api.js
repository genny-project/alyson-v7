import { map, path } from 'ramda'

import axios from 'axios'

const getAll = async ({ accessToken, setApiLoading, handleResponse, onError }) => {
  setApiLoading(true)

  try {
    const response = await axios.get('https://internmatch-cyrus.gada.io/v7/notes', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    response.status === 200 ? handleResponse(response, 'getAll') : onError(response)
  } catch (error) {
    onError(error)
  }
}

const postNote = async ({ noteContent, accessToken, handleResponse, onError, setApiLoading }) => {
  setApiLoading(true)

  try {
    const response = await axios.post(
      'https://internmatch-cyrus.gada.io/v7/notes',
      {
        sourceCode: 'PER_USER1',
        content: noteContent,
        tags: [],
        created: new Date(),
        targetCode: 'PER_USER1',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    response.status === 201 ? handleResponse(response, 'post') : onError(error)
  } catch (error) {
    onError(error)
  }
}

const deleteNote = async ({
  id,
  accessToken,
  setNotes,
  setApiLoading,
  onError,
  handleResponse,
}) => {
  setApiLoading(true)

  try {
    const response = await axios.delete(`https://internmatch-cyrus.gada.io/v7/notes/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    response.status === 200 ? handleResponse(response, 'delete') : onError(error)
  } catch (error) {
    onError(error)
  }
}

const editNote = async ({
  id,
  newContent,
  accessToken,
  setNotes,
  setApiLoading,
  onError,
  handleResponse,
}) => {
  setApiLoading(true)

  try {
    const response = await axios.put(
      `https://internmatch-cyrus.gada.io/v7/notes/${id}`,
      {
        content: newContent,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    response.status === 200 ? handleResponse(response, 'edit') : onError(error)
  } catch (error) {
    onError(error)
  }
}

export { getAll, postNote, deleteNote, editNote }
