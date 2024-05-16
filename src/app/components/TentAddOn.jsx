import React from 'react'

const TentAddOn = (props) => {
  return (
    <>
    <h3 className='p-2'><strong>{props.title}</strong></h3>
    <div className='flex justify-between p-3'>
        <div>
          <p>{props.description}</p>
          <p><strong>{props.description2}</strong></p>
          <p><strong>{props.description3}</strong></p>
        </div>
        <form action="" className='flex flex-col align-center mr-6 mt-4'>
          <div className='flex align-center mb-3 mt-1'>
              <label htmlFor="tent2person">{props.buy2person}</label>
              <input type="checkbox" id="tent2person" className='w-6 h-6 ml-1'/>
          </div>
          <div className='flex align-center'>
              <label htmlFor="tent3person">{props.buy3person}</label>
              <input type="checkbox" id="tent3person" className='w-6 h-6 ml-1'/>
          </div>
        </form>
    </div>
    </>
  )
}

export default TentAddOn
