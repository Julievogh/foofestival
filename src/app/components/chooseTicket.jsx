import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import TicketComponent2 from "./TicketComponent2";
import TicketSelector from "./TicketSelector";
import FetchCampingSpots from "./FetchCampingSpots";

const Chooseticket = () => {
  const searchParams = useSearchParams();
  const ticketType = searchParams.get("type");

  const regularPrice = 799;
  const vipPrice = 1299;
  const bookingFee = 100;

  const [ticketAmount, SetTicketAmount] = useState(1);

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    if (ticketType === "Regular") {
      totalPrice = ticketAmount * regularPrice + bookingFee;
    } else {
      totalPrice = ticketAmount * vipPrice + bookingFee;
    }

    return totalPrice;
  };

  const handleIncrement = () => {
    SetTicketAmount((prevAmount) => prevAmount + 1);
  };

  const handleDecrement = () => {
    if (ticketAmount === 1) {
      return;
    }
    SetTicketAmount((prevAmount) => Math.max(prevAmount - 1, 0));
  };

  return (
    <article>
      <div className="flex justify-between p-3">
        <div>
          <TicketComponent2
            title={ticketType === "Regular" ? "Regular ticket" : "VIP ticket"}
            price={calculateTotalPrice()}
          />
        </div>
        <TicketSelector
          value={ticketAmount}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      </div>

      <div className="p-3">
        <h3><strong>Choose camping area</strong></h3>
        <FetchCampingSpots>
          {({ spots, error }) => (
            <>
              {error && <p>Error: {error}</p>}
              <div className="grid grid-cols-3 gap-4">
                <h4><strong>Areas</strong></h4>
                <h4><strong>Spots</strong></h4>
                <h4><strong>Available Spots</strong></h4>
                {spots.map((spot, index) => (
                  <React.Fragment key={index}>
                    {Object.values(spot).map((value, i) => (
                      <span key={i}>
                        {value}
                      </span>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </>
          )}
        </FetchCampingSpots>
      </div>
    </article>
  );
};

export default Chooseticket;
