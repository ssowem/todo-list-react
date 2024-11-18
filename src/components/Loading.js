import React from 'react'
import { SyncLoader } from 'react-spinners';

function Loading() {
  return (
    <div className='loading-bg'>
    
      <SyncLoader 
      size="10"
      />
      <p>Loading...</p>
    </div>
  )
}

export default Loading;

