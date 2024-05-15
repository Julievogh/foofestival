import React from "react";
import { useSearchParams } from "next/navigation";

const TicketHeader = () => {
  const searchParams = useSearchParams();
  const ticketType = searchParams.get("type");

  return (
    <>
      {/* Brødkrummesti placeholder */}
      <div className="bg-[hsla(178,46%,32%,0.9)] p-4 text-white">
        <div className="flex flex-row justify-start">
          <p className="cursor-pointer">Forside</p>
          <p>&nbsp;/&nbsp;</p>
          <p className="cursor-pointer">Vælg billet</p>
        </div>

        <h4>
          <strong>FooFestival 2024</strong> - {ticketType} Ticket
        </h4>
      </div>
      <div className="w-full bg-[hsla(232,6%,0%,1)] text-white">
        <p className="text-sm">Bemærk alle køb tillægges gebyr på 100,-</p>
      </div>
    </>
  );
};

export default TicketHeader;
