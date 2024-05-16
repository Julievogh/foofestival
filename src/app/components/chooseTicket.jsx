import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import TicketComponent2 from "./TicketComponent2";
import TicketSelector from "./TicketSelector";
import FetchCampingSpots from "./FetchCampingSpots";
import GreenCamping from "./GreenCamping";
import TentAddOn from "./TentAddOn";

const Chooseticket = () => {
  const searchParams = useSearchParams();
  const ticketType = searchParams.get("type");

  const regularPrice = 799;
  const vipPrice = 1299;
  const bookingFee = 99;

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
        <h3>
          <strong>Choose camping area</strong>
        </h3>
        <FetchCampingSpots>
          {({ spots, error }) => (
            <>
              {error && <p>Error: {error}</p>}
              <div className="grid grid-cols-4 gap-4">
                <h4>
                  <strong>Select</strong>
                </h4>
                <h4>
                  <strong>Areas</strong>
                </h4>
                <h4>
                  <strong>Spots</strong>
                </h4>
                <h4>
                  <strong>Available Spots</strong>
                </h4>
                {spots.map((spot, index) => (
                  <React.Fragment key={index}>
                    <div>
                      <label htmlFor="campingArea"></label>
                      <input
                        type="radio"
                        name="campingArea"
                        value={spot.area}
                        className="w-6 h-6"
                      />
                    </div>
                    {Object.values(spot).map((value, i) => (
                      <span key={i}>{value}</span>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </>
          )}
        </FetchCampingSpots>
      </div>

      <GreenCamping
        title="Green camping"
        description="Help save the planet"
        description2="buy green camping for 249,-"
        buy="Add"
      />

      <TentAddOn 
              title="Tent set up"
              description="Have a tent already set up for you"
              description2="2 person tent: 299,-"
              description3="3 person tent: 399,-"
              buy2person="Buy tent for 2"
              buy3person="Buy tent for 3"/>
    </article>
  );
};

export default Chooseticket;
