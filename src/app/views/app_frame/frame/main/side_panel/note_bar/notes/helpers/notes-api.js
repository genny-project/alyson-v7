import axios from 'axios'

const notesUrl = process.env.API_URL_NOTES

const getUserTags = async ({ setUserTags }) => {
  setUserTags([
    { name: 'One One', value: 1 },
    { name: 'Two One', value: 1 },
    { name: 'Three One', value: 1 },
    { name: 'sdfsdf One One', value: 1 },
    { name: 'gdfgdfgdfgdfg One One', value: 1 },
    { name: 'Four One One', value: 1 },
    { name: 'FiveOne One One', value: 1 },
  ])
}

const getAll = async ({ accessToken, setApiLoading, handleResponse, onError, setUserTags }) => {
  setApiLoading(true)

  try {
    const response = await axios.get(notesUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    await getUserTags({ setUserTags })

    response.status === 200 ? handleResponse(response, 'getAll') : onError(response)
  } catch (error) {
    onError(error)
  }
}

const postNote = async ({
  noteContent,
  accessToken,
  handleResponse,
  onError,
  setApiLoading,
  tag,
}) => {
  setApiLoading(true)
  try {
    const response = await axios.post(
      notesUrl,
      {
        sourceCode: 'PER_USER1',
        content: noteContent,
        tags: [tag],
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

const deleteNote = async ({ id, accessToken, setApiLoading, onError, handleResponse }) => {
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

export { getAll, postNote, deleteNote, editNote, getUserTags }
