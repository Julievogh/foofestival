import React from "react";
import TicketComponent from "../components/TicketComponent";

const Page = () => {
  return (
    <div className="flex flex-col items-center pt-16 px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-center text-3xl font-bold sm:text-4xl">Tickets</h1>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
    </div>
  );
};

export default Page;
