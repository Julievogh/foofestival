"use client"
import React from 'react'
import Chooseticket from '../../components/chooseTicket'
import TicketHeader from '@/app/components/TicketHeader'

const ChooseTicketPage = ({ ticketType }) => {
  return (
    <>
    <TicketHeader ticketType={ticketType}/>
<div className="flex flex-col w-3/4 items-center justify-center mx-auto">
    <h1>Booking</h1>
    <Chooseticket ticketType={ticketType} />    
    </div>
    </>
    )
}

export default ChooseTicketPage
