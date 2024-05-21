import React from "react";
import TicketComponent from "../components/TicketComponent";

const Page = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-8">
        <h1 className="text-center text-3xl font-bold">Tickets</h1>
      </div>
      <div className="flex justify-center">
        <TicketComponent
          ticketType="Regular"
          camping="Standard camping"
          bath="Standard baths"
          toilets="Box toilets"
          price="799,-"
        />
      </div>
      <div className="flex justify-center">
        <TicketComponent
          ticketType="VIP"
          camping="Luxus camping"
          bath="Great baths"
          toilets="Golden toilets"
          price="1299,-"
        />
      </div>
    </div>
  );
};

export default Page;
