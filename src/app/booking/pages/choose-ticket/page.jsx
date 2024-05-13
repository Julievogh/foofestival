"use client"
import React from 'react'
import Chooseticket from '../../components/Chooseticket'

const ChooseTicketPage = ({ ticketType }) => {
  return (
  <>
    <h1>booking page</h1>
    <Chooseticket ticketType={ticketType} />    
    </>
    )
}

export default ChooseTicketPage
