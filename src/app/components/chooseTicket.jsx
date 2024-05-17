import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import TicketComponent2 from "./TicketComponent2";
import TicketSelector from "./TicketSelector";
import FetchCampingSpots from "./FetchCampingSpots";
import GreenCamping from "./GreenCamping";
import TentAddOn from "./TentAddOn";
import BlueButton from "./BlueButton";

const Chooseticket = () => {
  const searchParams = useSearchParams();
  const ticketType = searchParams.get("type");

  const regularPrice = 799;
  const vipPrice = 1299;
  const bookingFee = 99;
  const greenCampingPrice = 249;
  const tent2PersonPrice = 299;
  const tent3PersonPrice = 399;

  const [ticketAmount, SetTicketAmount] = useState(1);
  const [isGreenCamping, setIsGreenCamping] = useState(false);
  const [isTent2Person, setIsTent2Person] = useState(false);
  const [isTent3Person, setIsTent3Person] = useState(false);
  
  const calculateTotalPrice = () => {
    let totalPrice = 0;

    if (ticketType === "Regular") {
      totalPrice = ticketAmount * regularPrice + bookingFee;
    } else {
      totalPrice = ticketAmount * vipPrice + bookingFee;
    }
    
    if (isGreenCamping) totalPrice += greenCampingPrice;
    if (isTent2Person) totalPrice += tent2PersonPrice;
    if (isTent3Person) totalPrice += tent3PersonPrice;

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

  const handleCheckboxChange = (type, isChecked) => {
    switch (type) {
      case "greenCamping":
        setIsGreenCamping(isChecked);
        break;
        case "tent2Person":
          setIsTent2Person(isChecked);
        break;
        case "tent3Person":
          setIsTent3Person(isChecked);
          default:
            break;
    }
  }

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
        checked={isGreenCamping}
        onCheckboxChange={(isChecked) => handleCheckboxChange("greenCamping", isChecked)}
      />

      <TentAddOn
        title="Tent set up"
        description="Have a tent already set up for you"
        description2="2 person tent: 299,-"
        description3="3 person tent: 399,-"
        buy2person="Buy tent for 2"
        buy3person="Buy tent for 3"
        onCheckboxChange2Person={(isChecked) => handleCheckboxChange("tent2Person", isChecked)}
        onCheckboxChange3Person={(isChecked) => handleCheckboxChange("tent3Person", isChecked)}
      />

      <div className="flex justify-center p-3">
        <BlueButton text="Reserve" />
      </div>
    </article>
  );
};

export default Chooseticket;
