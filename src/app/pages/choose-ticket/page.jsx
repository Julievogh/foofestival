"use client"
import React from 'react'
import Chooseticket from '../../components/chooseTicket'

const ChooseTicketPage = ({ ticketType }) => {
  return (
  <>
    <h1>booking page</h1>
    <Chooseticket ticketType={ticketType} />    
    </>
    )
}

export default ChooseTicketPage
