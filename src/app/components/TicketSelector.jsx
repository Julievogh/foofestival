import React from 'react'

const TicketSelector = ({ value, onIncrement, onDecrement }) => {
  return (
    <div className="flex items-center">
  <button className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center" onClick={onIncrement}>+</button>
  <input type="number" value={value} id="ticketAmount" className="mx-2 pl-2 w-10 text-center" readOnly />
  <button className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-400" onClick={onDecrement}>-</button>
</div>
  )
}

export default TicketSelector
