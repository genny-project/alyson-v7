import axios from 'axios'

const notesUrl = process.env.API_URL_NOTES

const getUserTags = async ({ setUserTags }) => {
  setUserTags([
    { label: 'Bus Dev', name: 'Business Development Activity', value: 1, abbreviation: 'tag_business_development_activity' },
    { label: 'Placement', name: 'Intern Placement Activity', value: 1, abbreviation: 'tag_intern_placement_activity' },
    { label: 'Interview', name: 'Interview Activity and Feedback', value: 1, abbreviation: 'tag_interview_activity_and_feedback' },
    { label: 'Internship', name: 'Internship Progress Activity', value: 1, abbreviation: 'tag_internship_progress_activity' },
    { label: 'Post Internship', name: 'Post Internship Follow up', value: 1, abbreviation: 'tag_post_internship_follow_up' },
  ])
}

const getAll = async ({ accessToken, setApiLoading, handleResponse, onError, setUserTags, sourceCode }) => {
  setApiLoading(true)

  try {
    const response = await axios.get(`${notesUrl}/${sourceCode}`, {
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
  sourceCode,
}) => {
  setApiLoading(true)
  try {
    const response = await axios.post(
      notesUrl,
      {
        sourceCode: sourceCode,
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

const deleteNote = async ({ id, accessToken, setApiLoading, onError, handleResponse, sourceCode }) => {
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
  sourceCode
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
