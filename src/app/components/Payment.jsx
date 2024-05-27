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
    console.log(data);

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

        <input type="hidden" {...form.register("type")} defaultValue={type} />
        <input type="hidden" {...form.register("ticketAmount")} defaultValue={ticketAmount} />
        <input type="hidden" {...form.register("totalPrice")} defaultValue={totalPrice} />
        <input type="hidden" {...form.register("isGreenCamping")} defaultValue={isGreenCamping} />
        <input type="hidden" {...form.register("isTent2Person")} defaultValue={isTent2Person} />
        <input type="hidden" {...form.register("isTent3Person")} defaultValue={isTent3Person} />
        <input type="hidden" {...form.register("firstname")} defaultValue={firstname} />
        <input type="hidden" {...form.register("lastname")} defaultValue={lastname} />
        <input type="hidden" {...form.register("day")} defaultValue={day} />
        <input type="hidden" {...form.register("month")} defaultValue={month} />
        <input type="hidden" {...form.register("year")} defaultValue={year} />
        <input type="hidden" {...form.register("address")} defaultValue={address} />
        <input type="hidden" {...form.register("city")} defaultValue={city} />
        <input type="hidden" {...form.register("zip")} defaultValue={zip} />
        <input type="hidden" {...form.register("country")} defaultValue={country} />
        <input type="hidden" {...form.register("telephone")} defaultValue={telephone} />
        <input type="hidden" {...form.register("email")} defaultValue={email} />

        {guestNames.map((guestName, index) => (
          <input
            key={index}
            type="hidden"
            {...form.register(`guestName${index + 1}`)}
            defaultValue={guestName}
          />
        ))}

        <section className="flex flex-col">
          <h3>Credit Card Information</h3>

          <label htmlFor="cardName">Name on Card:</label>
          <input
            type="text"
            id="cardName"
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
            {...form.register("expMonth", {
              required: {
                value: true,
                message: "Expiration month is required",
              },
            })}
            className="border border-gray-300 rounded-md"
          >
            <option value="">Select a month</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={String(i + 1).padStart(2, '0')}>
                {String(i + 1).padStart(2, '0')} - {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>

          <label htmlFor="expYear">Expiration Year:</label>
          <input
            type="text"
            id="expYear"
            {...form.register("expYear", {
              required: {
                value: true,
                message: "Expiration Year is required",
              },
              min: {
                value: new Date().getFullYear(),
                message: `Year must be at least ${new Date().getFullYear()}`,
              },
              max: {
                value: 2035,
                message: "Year cannot be more than 2035",
              },
            })}
            className="border border-gray-300 rounded-md"
          />

          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
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
