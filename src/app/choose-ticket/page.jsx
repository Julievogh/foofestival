"use client";
import React from "react";
import Chooseticket from "../components/chooseTicket";
import TicketHeader from "@/app/components/TicketHeader";

const ChooseTicketPage = ({ ticketType }) => {
  return (
    <>
      <article className="w-full bg-white">
        <TicketHeader ticketType={ticketType} />
        <h3 className="pt-2 pl-2">
          <strong>Choose tickets</strong>
        </h3>
        <div className="flex flex-col w-full justify-start mx-auto">
          <Chooseticket ticketType={ticketType} />
        </div>
      </article>
    </>
  );
};

export default ChooseTicketPage;
