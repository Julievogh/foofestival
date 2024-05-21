"use client";

import React, { Suspense } from "react";
import Chooseticket from "../components/chooseTicket";
import TicketHeader from "@/app/components/TicketHeader";
import { useSearchParams } from "next/navigation";

const ChooseTicketPageWrapper = () => {
  const searchParams = useSearchParams();
  const ticketType = searchParams.get("type");

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

const ChooseTicketPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ChooseTicketPageWrapper />
  </Suspense>
);

export default ChooseTicketPage;
