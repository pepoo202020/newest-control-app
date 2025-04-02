import React from 'react'

export default function Error({error}: {error: string}) {
  return (
    <div className='flex bg-red-900 text-white flex-col items-center justify-center h-screen'>
        <h1 >Error</h1>
        <p >{error}</p>
    </div>
  )
}
