import React from 'react'

const GreenCamping = (props) => {
  return (
    <>
    <h3 className='p-2'><strong>{props.title}</strong></h3>
    <div className='flex justify-between p-3'>
        <div>
          <p>{props.description}</p>
          <p><strong>{props.description2}</strong></p>
        </div>
        <form action="" className='flex align-center mr-6 mt-4'>
          <label htmlFor="greenCamping">{props.buy}</label>
          <input type="checkbox" id="greenCamping" className='w-6 h-6 ml-1'/>
        </form>
    </div>
    </>
  )
}

export default GreenCamping
