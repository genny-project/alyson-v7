import { map, path } from 'ramda'

import axios from 'axios'

const generateId = () => {
  return `_${Math.random()
    .toString(30)
    .substr(1, 7)}`
}
const fakeNotes = [
  {
    sourceCode: 'PER_USER1',
    content: 'Note 1',
    tags: [],
    id: 0,
    created: new Date(),
    targetCode: 'PER_USER1',
  },
  {
    sourceCode: 'PER_USER1',
    content: 'Note 2',
    tags: [],
    id: 1,
    created: new Date(),
    targetCode: 'PER_USER1',
  },
  {
    sourceCode: 'PER_USER1',
    content: 'Note 3',
    tags: [],
    id: 2,
    created: new Date(),
    targetCode: 'PER_USER1',
  },
]
const getAll = async ({ setNotes }) => {
  try {
    const response = await axios.get(
      'https://internmatch-cyrus.gada.io/v7/notes/datatable?length=20',
    )
    console.log(response)
    setNotes(path(['data', 'data'], response) || [])
  } catch (error) {
    console.error(error)
  }
}

const postNote = async ({ noteContent, noteHeader, setNotes }) => {
  console.log(noteContent, noteHeader)

  const response = await axios.post('https://internmatch-cyrus.gada.io/v7/notes', {
    sourceCode: 'PER_USER1',
    content: noteContent,
    tags: [],
    id: 0,
    created: new Date(),
    targetCode: 'PER_USER1',
  })

  console.log(response)
}

const deleteNote = async ({ id }) => {
  console.error(id)

  const response = await axios.delete(`https://internmatch-cyrus.gada.io/v7/notes/${id}`)
}

export { getAll, postNote, deleteNote }
