import React from 'react'

const TicketComponent2 = ({ title, price }) => {
  return (
    <div className="flex justify-start">
    <p className="text-xl self-center">&bull;</p>
    <div className="p-2">
      <p><strong>{title}</strong></p>
      <p>{price}</p>
    </div>
  </div>
  )
}

export default TicketComponent2
