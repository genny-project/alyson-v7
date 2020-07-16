import axios from 'axios'

const notesUrl = process.env.API_URL_NOTES

const getAll = async ({ accessToken, setApiLoading, handleResponse, onError }) => {
  setApiLoading(true)

  try {
    const response = await axios.get(notesUrl, {
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

const postNote = async ({ noteHeader, noteContent, accessToken, handleResponse, onError, setApiLoading }) => {
  setApiLoading(true)
  try {
    const response = await axios.post(
      notesUrl,
      {
        sourceCode: 'PER_USER1',
        content: noteContent,
        tags: [...noteHeader],
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
  setApiLoading,
  onError,
  handleResponse,
}) => {
  setApiLoading(true)

  try {
    const response = await axios.delete(`${notesUrl}/${id}`, {
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
  setApiLoading,
  onError,
  handleResponse,
}) => {
  setApiLoading(true)

  try {
    const response = await axios.put(
      `${notesUrl}/${id}`,
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
