import React from "react";
import Link from "next/link";
import BlueButton from "./BlueButton";

const TicketComponent = (props) => {
  return (
    <>
      <div className="border-2 w-60 p-2 mb-3">
        <div className="flex justify-center items-center">
          <h1 className="font-bold mb-2"> {props.ticketType}</h1>
        </div>
        <div className="flex justify-around">
          <div>
            <p>{props.camping}</p>
            <p>{props.bath}</p>
            <p>{props.toilets}</p>
          </div>
          <p>{props.price}</p>
        </div>
        <div className="flex justify-center">
          <Link href={`./choose-ticket?type=${props.ticketType}`}>
            <BlueButton text="Buy ticket" />
          </Link>
        </div>
      </div>
    </>
  );
};
export default TicketComponent;
