import React from "react";

const TicketComponent2 = ({ title, price }) => {
  return (
    <div className="flex justify-start">
      <p className="text-xl self-center">&bull;</p>
      <div className="p-2">
        <p>
          <strong>{title}</strong>
        </p>
        <p>Price: {price},-</p>
        <p className="text-sm">
          Price includes one time booking fee of 99,- which is only paid once,
          even if multiple tickets are bought
        </p>
      </div>
    </div>
  );
};

export default TicketComponent2;
