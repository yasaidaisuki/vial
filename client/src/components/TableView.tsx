import React from 'react'

export default function TableView() {
  return (
    <div className="flex flex-col w-full">
      <div className='flex w-full flex-row justify-between p-5'>
        <div className='flex flex-col'>
          <label>Fields</label>
        </div>

        <div className='flex flex-col'>CRA</div>

        <div className='flex flex-col'>DM</div>

        <div className='flex flex-col'>Queries</div>
      </div>
    </div>
  )
}
