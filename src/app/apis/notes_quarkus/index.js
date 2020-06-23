import React, { useEffect } from 'react'

const NotesApi = ( url ) => {
  const [data, setData] = React.useState( null )
  const [loading, setLoading] = React.useState( true )

  useEffect( async () => {
    const response = await fetch( url )
    const items = await response.json()
    const data = await items.data

    setData( data )
    setLoading( false )
  }, [] )

  return { data, loading }
}

export default NotesApi
