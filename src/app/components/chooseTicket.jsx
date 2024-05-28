import React, { useState, useEffect } from "react";
import TicketComponent2 from "./TicketComponent2";
import TicketSelector from "./TicketSelector";
import FetchCampingSpots from "./FetchCampingSpots";
import GreenCamping from "./GreenCamping";
import TentAddOn from "./TentAddOn";
import { useSearchParams } from "next/navigation";

const Chooseticket = ({ ticketType }) => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const regularPrice = 799;
  const vipPrice = 1299;
  const bookingFee = 99;
  const greenCampingPrice = 249;
  const tent2PersonPrice = 299;
  const tent3PersonPrice = 399;

  const [ticketAmount, setTicketAmount] = useState(1);
  const [isGreenCamping, setIsGreenCamping] = useState(false);
  const [isTent2Person, setIsTent2Person] = useState(false);
  const [isTent3Person, setIsTent3Person] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [tentWarningMessage, setTentWarningMessage] = useState("");
  const [reserveMessage, setReserveMessage] = useState("");
  const [formData, setFormData] = useState({
    campingArea: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [reservationId, setReservationId] = useState(""); // State for reservation ID
  const [campingAreaSelected, setCampingAreaSelected] = useState(false); // State for camping area selection

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
    if (ticketAmount < 5) {
      setTicketAmount((prevAmount) => {
        const newAmount = prevAmount + 1;
        if (newAmount !== 2) {
          setIsTent2Person(false);
        }
        if (newAmount !== 3) {
          setIsTent3Person(false);
        }
        return newAmount;
      });
    } else {
      setWarningMessage("Max 5 tickets can be bought at once");
    }
  };

  const handleDecrement = () => {
    if (ticketAmount === 1) {
      return;
    }
    setTicketAmount((prevAmount) => {
      const newAmount = Math.max(prevAmount - 1, 0);
      if (newAmount !== 2) {
        setIsTent2Person(false);
      }
      if (newAmount !== 3) {
        setIsTent3Person(false);
      }
      return newAmount;
    });
  };

  const handleCheckboxChange = (type, isChecked) => {
    switch (type) {
      case "greenCamping":
        setIsGreenCamping(isChecked);
        break;
      case "tent2Person":
        if (ticketAmount === 2) {
          setIsTent2Person(isChecked);
        }
        break;
      case "tent3Person":
        if (ticketAmount === 3) {
          setIsTent3Person(isChecked);
        }
        break;
      default:
        break;
    }
  };

  const handleCheckboxClick = (type) => {
    switch (type) {
      case "tent2Person":
        if (ticketAmount !== 2) {
          setTentWarningMessage(
            "You need to purchase 2 tickets to select this option."
          );
        }
        break;
      case "tent3Person":
        if (ticketAmount !== 3) {
          setTentWarningMessage(
            "You need to purchase 3 tickets to select this option."
          );
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Check if camping area is selected
    setCampingAreaSelected(formData.campingArea !== "");
  }, [formData.campingArea]);

  useEffect(() => {
    // Reset warning messages after 6 seconds
    const timer = setTimeout(() => {
      setWarningMessage("");
      setTentWarningMessage("");
    }, 6000);

    return () => clearTimeout(timer);
  }, [warningMessage, tentWarningMessage]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePutRequest = async () => {
    if (!campingAreaSelected) {
      setReserveMessage("Please select a camping area.");
      return;
    }

    const reservationData = {
      area: formData.campingArea,
      amount: ticketAmount,
    };

    try {
      const response = await fetch("http://localhost:8080/reserve-spot", {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        const data = await response.json();
        //Her forsøger jeg at gemme id'et
        setReservationId(data.id);
        setReserveMessage("Reservation successful!");
        console.log("Reservation ID:", data.id);

        return data.id;
      } else {
        setReserveMessage("Reservation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setReserveMessage("Error occurred. Please try again.");
    }
  };

  return (
    <form action="/personal-info" method="GET">
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="ticketAmount" value={ticketAmount} />
      <input type="hidden" name="totalPrice" value={calculateTotalPrice()} />
      <input type="hidden" name="isGreenCamping" value={isGreenCamping} />
      <input type="hidden" name="isTent2Person" value={isTent2Person} />
      <input type="hidden" name="isTent3Person" value={isTent3Person} />
      <input type="hidden" name="reservationId" value={reservationId} />
      <article>
        <div className="flex justify-between p-3">          <div>
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

        {warningMessage && (
          <div className="p-3 text-red-500">{warningMessage}</div>
        )}

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
                          onChange={handleInputChange}
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

        <div onClick={handlePutRequest} className={`bg-green-500 text-white p-5 ${!campingAreaSelected && 'cursor-not-allowed opacity-50'}`}>reserve camping</div>
        {reserveMessage && (
          <div className="p-3 text-red-500">{reserveMessage}</div>
        )}


        <GreenCamping
          title="Green camping"
          description="Help save the planet"
          description2="buy green camping for 249,-"
          buy="Add"
          checked={isGreenCamping}
          onCheckboxChange={(isChecked) =>
            handleCheckboxChange("greenCamping", isChecked)
          }
        />

        <TentAddOn
          title="Tent set up"
          description="Have a tent already set up for you"
          description2="2 person tent: 299,-"
          description3="3 person tent: 399,-"
          buy2person="Buy tent for 2"
          buy3person="Buy tent for 3"
          checked2Person={isTent2Person}
          checked3Person={isTent3Person}
          onCheckboxClick2Person={() => handleCheckboxClick("tent2Person")}
          onCheckboxClick3Person={() => handleCheckboxClick("tent3Person")}
          onCheckboxChange2Person={(isChecked) =>
            handleCheckboxChange("tent2Person", isChecked)
          }
          onCheckboxChange3Person={(isChecked) =>
            handleCheckboxChange("tent3Person", isChecked)
          }
        />

        {tentWarningMessage && (
          <div className="p-3 text-red-500">{tentWarningMessage}</div>
        )}

        <div className="flex flex-col items-center p-3 mb-8">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Reserve
          </button>
        </div>
      </article>
    </form>
  );
};

export default Chooseticket;

         
