"use client"
import React from 'react'
import Chooseticket from '../../components/chooseTicket'

const ChooseTicketPage = ({ ticketType }) => {
  return (
<div className="flex flex-col w-3/4 items-center justify-center border-solid border-2 border-black mx-auto">
    <h1>Booking</h1>
    <Chooseticket ticketType={ticketType} />    
    </div>
    )
}

export default ChooseTicketPage
