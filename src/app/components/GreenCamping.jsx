import React from 'react'

const GreenCamping = ({ title, description, description2, buy, checked, onCheckboxChange}) => {
  return (
    <>
    <h3 className='p-2'><strong>{title}</strong></h3>
    <div className='flex justify-between p-3'>
        <div>
          <p>{description}</p>
          <p><strong>{description2}</strong></p>
        </div>
        <form action="" className='flex align-center mr-6 mt-4'>
          <label htmlFor="greenCamping">{buy}</label>
          <input 
          type="checkbox" 
          id="greenCamping" 
          className='w-6 h-6 ml-1'
          checked={checked}
          onChange={(e) => onCheckboxChange(e.target.checked)}/>
        </form>
    </div>
    </>
  )
}

export default GreenCamping
