import React from 'react';
import TicketFrontpage from '../../components/TicketFrontpage';

const Page = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-8">
        <h1 className="text-center text-3xl font-bold">Tickets</h1>
      </div>
      <div className="flex justify-center">
        <TicketFrontpage
          ticketType="Regular Ticket"
          camping="Standard camping"
          bath="Standard baths"
          toilets="Box toilets"
          price="799,-"
        />
      </div>
      <div className="flex justify-center">
        <TicketFrontpage
          ticketType="VIP Ticket"
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
