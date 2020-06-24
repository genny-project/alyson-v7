import { map, path } from 'ramda'

import axios from 'axios'

const generateId = () => {
  return `_${Math.random()
    .toString(30)
    .substr(1, 7)}`
}

const getAll = async ({ setNotes }) => {
  try {
    const response = await axios.get(
      'https://internmatch-cyrus.gada.io/v7/notes/datatable?length=20',
    )
    console.log(response)
    setNotes(path(['data'], response) || [])
  } catch (error) {
    console.error(error)
  }
}

const postNote = async ({ noteContent, noteHeader, setNotes }) => {
  console.log(noteContent, noteHeader)

  const response = await axios.post(
    'https://internmatch-cyrus.gada.io/v7/notes',
    {
      sourceCode: 'PER_USER1',
      content: noteContent,
      tags: [],
      id: 0,
      created: new Date(),
      targetCode: 'PER_USER1',
    },
  )

  console.log(response)
}

export { getAll, postNote }
