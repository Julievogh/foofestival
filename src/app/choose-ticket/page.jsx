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
      <article className="w-full bg-white mt-16 sm:mt-20 md:mt-24 lg:mt-28 xl:mt-32 mb-8 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24">
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
