import React from "react";

const TicketComponent2 = ({ title, price }) => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex-shrink-0 mr-4">
      </div>
      <div>
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-gray-700">Price: {price},-</p>
        <p className="text-sm text-gray-600 mt-1">Price includes one-time booking fee of 99,- which is only paid once, even if multiple tickets are bought.</p>
      </div>
    </div>
  );
};

export default TicketComponent2;
