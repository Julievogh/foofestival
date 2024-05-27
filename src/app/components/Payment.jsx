import React from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

const Payment = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  
  const ticketAmount = parseInt(searchParams.get("ticketAmount"));
  const totalPrice = parseInt(searchParams.get("totalPrice"));
  const isGreenCamping = searchParams.get("isGreenCamping") === "true";
  const isTent2Person = searchParams.get("isTent2Person") === "true";
  const isTent3Person = searchParams.get("isTent3Person") === "true";
  const firstname = searchParams.get("firstname");
  const lastname = searchParams.get("lastname");
  const day = searchParams.get("day");
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const address = searchParams.get("address");
  const city = searchParams.get("city");
  const zip = searchParams.get("zip");
  const country = searchParams.get("country");
  const telephone = searchParams.get("telephone");
  const email = searchParams.get("email");

  const guestNames = [];
  for (let i = 0; i < ticketAmount - 1; i++) {
    guestNames.push(searchParams.get(`guestName${i + 1}`));
  }

  const form = useForm();

  const onSubmit = async (data) => {
    const endpoint = "https://yehhhdwxrekwnvfpdaxf.supabase.co/rest/v1/foofest2";
    const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllaGhoZHd4cmVrd252ZnBkYXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY1NDY1NTYsImV4cCI6MjAzMjEyMjU1Nn0.LMM7xRAUn2moW9TM8A5jQSuZtpFfc6RXk0k0KHngu-Q";

    const headersList = {
      "Content-Type": "application/json",
      "apikey": apiKey,
      "Authorization": `Bearer ${apiKey}`,
    };

    const bodyContent = JSON.stringify(data);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: headersList,
        body: bodyContent,
      });

      const responseText = await response.text();
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${responseText}`);
      }

      if (responseText) {
        try {
          const result = JSON.parse(responseText);
          console.log("Data submitted successfully", result);
        } catch {
          throw new Error(`Failed to parse JSON response: ${responseText}`);
        }
      } else {
        console.log("Data submitted successfully, but no response body");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <section className="w-full bg-white">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-5"
      >
        <h2>Payment Information</h2>

        <input type="hidden" name="type" value={type} />
        <input type="hidden" name="ticketAmount" value={ticketAmount} />
        <input type="hidden" name="totalPrice" value={totalPrice} />
        <input type="hidden" name="isGreenCamping" value={isGreenCamping} />
        <input type="hidden" name="isTent2Person" value={isTent2Person} />
        <input type="hidden" name="isTent3Person" value={isTent3Person} />
        <input type="hidden" name="firstname" value={firstname} />
        <input type="hidden" name="lastname" value={lastname} />
        <input type="hidden" name="day" value={day} />
        <input type="hidden" name="month" value={month} />
        <input type="hidden" name="year" value={year} />
        <input type="hidden" name="address" value={address} />
        <input type="hidden" name="city" value={city} />
        <input type="hidden" name="zip" value={zip} />
        <input type="hidden" name="country" value={country} />
        <input type="hidden" name="telephone" value={telephone} />
        <input type="hidden" name="email" value={email} />

        {guestNames.map((guestName, index) => (
          <input
            key={index}
            type="hidden"
            name={`guestName${index + 1}`}
            value={guestName}
          />
        ))}

        <section className="flex flex-col">
          <h3>Credit Card Information</h3>

          <label htmlFor="cardName">Name on Card:</label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            {...form.register("cardName", {
              required: {
                value: true,
                message: "Name on card is required",
              },
            })}
            className="border border-gray-300 rounded-md"
          />

          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            {...form.register("cardNumber", {
              required: {
                value: true,
                message: "Card number is required",
              },
              pattern: {
                value: /^\d{16}$/,
                message: "Card number must be 16 digits",
              },
            })}
            className="border border-gray-300 rounded-md"
          />

          <label htmlFor="expMonth">Expiration Month:</label>
          <select
            id="expMonth"
            name="expMonth"
            {...form.register("expMonth", {
              required: {
                value: true,
                message: "Expiration month is required",
              },
            })}
            className="border border-gray-300 rounded-md"
          >
            <option value="">Select a month</option>
            <option value="01">01 - January</option>
            <option value="01">01 - January</option>
            <option value="01">01 - January</option>
            <option value="01">01 - January</option>
            <option value="01">01 - January</option>
            <option value="01">01 - January</option>
            <option value="01">01 - January</option>
            <option value="01">01 - January</option>
            <option value="01">01 - January</option>
            <option value="01">01 - January</option>
            <option value="01">01 - January</option>
            
          </select>

          <label htmlFor="expYear">Expiration Year:</label>
          <input
            type="text"
            id="expYear"
            name="expYear"
            {...form.register("expYear", {
              required: {
                value: true,
                message: "Expiration Year is required",
              },
              min: {
                value: 2015,
                message: "Year must be at least 2015",
              },
              max: {
                value: 2035,
                message: `Year cannot be more than 2035`,
              },
            })}
            className="border border-gray-300 rounded-md"
          />

          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            {...form.register("cvv", {
              required: {
                value: true,
                message: "CVV is required",
              },
              pattern: {
                value: /^\d{3,4}$/,
                message: "CVV must be 3 or 4 digits",
              },
            })}
            className="border border-gray-300 rounded-md"
          />


        </section>

        <div className="flex flex-col justify-center mt-2 mb-5">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Pay Now
          </button>
        </div>
      </form>
    </section>
  );
};

export default Payment;
