import React from 'react'
import { SyncLoader } from 'react-spinners';

function Loading() {
  return (
    <div className='loading-bg'>
    
      <SyncLoader 
      size="10"
      />
      <p>로딩화면 테스트</p>
    </div>
  )
}

export default Loading;

