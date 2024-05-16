import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import TicketComponent2 from "./TicketComponent2"
import TicketSelector from "./TicketSelector"

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
  }
  const handleIncrement = () => {
    SetTicketAmount(prevAmount => prevAmount + 1);
  }
  const handleDecrement = () => {
    if (ticketAmount === 1) {
      return;
    }
    SetTicketAmount(prevAmount => Math.max(prevAmount - 1, 0) );
  }

  const [spots, setSpots] = useState([]);
  const [error, setError] = useState(null);

  const fetchAvailableSpots = async () => {
    try {
      const response = await fetch("http://localhost:8080/available-spots");
      if (!response.ok) {
        throw new Error("Failed to fetch available spots");
      }
      const data = await response.json();
      setSpots(data);
    } catch (error) {
      setError(error.message);
    }
  };
  console.log(ticketType);

  return (
    <article>
      <div className="flex justify-between p-3">
        <div>
            <>
            <TicketComponent2 
            title={ticketType === "Regular" ? "Regular ticket" : "VIP ticket"} 
            price={calculateTotalPrice()}/>
            </>
        </div>
        <TicketSelector 
        value={ticketAmount}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}/>
      </div>

      <div className="border border-blue-500 border-solid border-2">
        <h3>Choose camping area:</h3>
        <button onClick={fetchAvailableSpots}>Fetch Available Spots</button>
        {error && <p>Error: {error}</p>}
        <ul>
          {spots.map((spot, index) => (
            <li key={index}>
              <ul className="flex justify-between">
                {Object.entries(spot).map(([key, value]) => (
                  <li key={key}>
                    {/* if you want to remove the key just delete key underneath */}
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
                <p>&bull;</p>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default Chooseticket;
