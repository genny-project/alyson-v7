import axios from 'axios'

const notesUrl = process.env.API_URL_NOTES

const getUserTags = async ({ setUserTags }) => {
  setUserTags([
    { label: 'Bus Dev', name: 'Business Development Activity', value: 1, icon: 'BD' },
    { label: 'Placement', name: 'Intern Placement Activity', value: 1, icon: 'PLMT' },
    { label: 'Interview', name: 'Interview Activity and Feedback', value: 1, icon: 'INTV' },
    { label: 'Internship', name: 'Internship Progress Activity', value: 1, icon: 'INTS' },
    { label: 'Post Internship', name: 'Post Internship Follow up', value: 1, icon: 'PINT' },
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
