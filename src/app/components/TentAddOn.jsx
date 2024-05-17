import React from 'react'

const TentAddOn = ({
  title,
  description,
  description2,
  description3,
  buy2person,
  buy3person,
  checked2Person,
  checked3Person,
  onCheckboxChange2Person,
  onCheckboxChange3Person
}) => {
  return (
    <>
    <h3 className='p-2'><strong>{title}</strong></h3>
    <div className='flex justify-between p-3'>
        <div>
          <p>{description}</p>
          <p><strong>{description2}</strong></p>
          <p><strong>{description3}</strong></p>
        </div>
        <form action="" className='flex flex-col align-center mr-6 mt-4'>
          <div className='flex align-center mb-3 mt-1'>
              <label htmlFor="tent2person">{buy2person}</label>
              <input 
              type="checkbox" 
              id="tent2person" 
              className='w-6 h-6 ml-1'
              checked={checked2Person}
              onChange={(e) => onCheckboxChange2Person(e.target.checked)}
              />
          </div>
          <div className='flex align-center'>
              <label htmlFor="tent3person">{buy3person}</label>
              <input 
              type="checkbox" 
              id="tent3person" 
              className='w-6 h-6 ml-1'
              checked={checked3Person}
              onChange={(e) => onCheckboxChange3Person(e.target.checked)}
              />
          </div>
        </form>
    </div>
    </>
  )
}

export default TentAddOn
