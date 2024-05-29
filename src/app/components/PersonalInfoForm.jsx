import React, { useEffect, useState } from "react";
import Countries from "./Countries";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useSearchParams } from "next/navigation";
import Timer from "./Timer";

const PersonalInfo = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const ticketAmount = parseInt(searchParams.get("ticketAmount"));
  const totalPrice = parseInt(searchParams.get("totalPrice"));
  const isGreenCamping = searchParams.get("isGreenCamping") === "true";
  const isTent2Person = searchParams.get("isTent2Person") === "true";
  const isTent3Person = searchParams.get("isTent3Person") === "true";
  const reservationId = searchParams.get("reservationId");

  const [guestInputs, setGuestInputs] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300000);
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const updateTimeLeft = (newTimeLeft) => {
    setTimeLeft(newTimeLeft);
  };

  useEffect(() => {
    const ticketAmount = parseInt(searchParams.get("ticketAmount"));
    if (ticketAmount > 1) {
      const inputs = [];
      inputs.push(
        <div key="guestInfo" className="flex flex-col">
          <h3>Guest Info</h3>
        </div>
      );
      for (let i = 0; i < ticketAmount - 1; i++) {
        inputs.push(
          <div key={i} className="flex flex-col">
            <label htmlFor={`guestName${i + 1}`}>
              Guest {i + 1} First Name:
            </label>
            <input
              type="text"
              id={`guestName${i + 1}`}
              {...register(`guestName${i + 1}`, {
                required: {
                  value: true,
                  message: `Guest ${i + 1} First Name is required`,
                },
              })}
              className="border border-gray-300 rounded-md"
            />
            <p className="text-red-500 m-2">
              {errors[`guestName${i + 1}`]?.message}
            </p>
          </div>
        );
      }
      setGuestInputs(inputs);
    }
  }, [errors, register, searchParams]);

  const normalizePhoneNumber = (value) => value.replace(/[\s-]/g, "");

  const onSubmit = (data) => {
    const queryParams = new URLSearchParams({
      type,
      ticketAmount: ticketAmount.toString(),
      totalPrice: totalPrice.toString(),
      isGreenCamping: isGreenCamping.toString(),
      isTent2Person: isTent2Person.toString(),
      isTent3Person: isTent3Person.toString(),
      reservationId,
      timeLeft: timeLeft.toString(),
    ...data,
  }).toString();

    window.location.href = `/payment?${queryParams}`;
  };

  return (
    <>
      <Timer duration={timeLeft} onTimeUpdate={updateTimeLeft} />
      <section className="w-full bg-gray-50 p-4 md:p-8">
        <form
          action="/payment"
          method="GET"
          noValidate
          className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6"
        >
          <h2 className="class=" text-2xl font-bold mb-5>
            Personal Info
          </h2>
          <input type="hidden" name="type" value={type} />
          <input type="hidden" name="ticketAmount" value={ticketAmount} />
          <input type="hidden" name="totalPrice" value={totalPrice} />
          <input type="hidden" name="isGreenCamping" value={isGreenCamping} />
          <input type="hidden" name="isTent2Person" value={isTent2Person} />
          <input type="hidden" name="isTent3Person" value={isTent3Person} />
          <input type="hidden" name="reservationId" value={reservationId} />
          <input type="hidden" name="timeLeft" value={timeLeft} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold mb-3">Name</h3>
              <label htmlFor="firstname" className="mb-2">
                First Name:
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                {...register("firstname", {
                  required: "First Name is required",
                })}
                className="border border-gray-300 rounded-md mb-3 p-2"
              />
              <p className="text-red-500 m-2">{errors.firstname?.message}</p>

              <label htmlFor="lastname" className="mb-2">
                Last Name:
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                {...register("lastname", { required: "Last Name is required" })}
                className="border border-gray-300 rounded-md mb-3 p-2"
              />
              <p className="text-red-500 m-2">{errors.lastname?.message}</p>
            </div>

            <div className="flex flex-col">
              <h3 className="text-lg font-semibold mb-3">Date of Birth</h3>
              <label htmlFor="day" className="mb-2">
                Day:
              </label>
              <input
                type="number"
                id="day"
                name="day"
                {...register("day", {
                  required: "Day is required",
                  min: { value: 1, message: "Day must be at least 1" },
                  max: { value: 31, message: "Day cannot be more than 31" },
                })}
                className="border border-gray-300 rounded-md mb-3 p-2"
              />
              <p className="text-red-500 m-2">{errors.day?.message}</p>

              <label htmlFor="month" className="mb-2">
                Month:
              </label>
              <select
                id="month"
                name="month"
                {...register("month", { required: "Month is required" })}
                className="border border-gray-300 rounded-md mb-3 p-2"
              >
                <option value="">Select a month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <p className="text-red-500 m-2">{errors.month?.message}</p>

              <label htmlFor="year" className="mb-2">
                Year:
              </label>
              <input
                type="text"
                id="year"
                name="year"
                {...register("year", {
                  required: "Year is required",
                  min: { value: 1900, message: "Year must be at least 1900" },
                  max: {
                    value: new Date().getFullYear(),
                    message: `Year cannot be more than ${new Date().getFullYear()}`,
                  },
                })}
                className="border border-gray-300 rounded-md mb-3 p-2"
              />
              <p className="text-red-500 m-2">{errors.year?.message}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold mb-3">Address</h3>
              <label htmlFor="address" className="mb-2">
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                {...register("address", { required: "Address is required" })}
                className="border border-gray-300 rounded-md mb-3 p-2"
              />
              <p className="text-red-500 m-2">{errors.address?.message}</p>

              <label htmlFor="city" className="mb-2">
                City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                {...register("city", { required: "City is required" })}
                className="border border-gray-300 rounded-md mb-3 p-2"
              />
              <p className="text-red-500 m-2">{errors.city?.message}</p>

              <label htmlFor="zip" className="mb-2">
                Zip:
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                {...register("zip", {
                  required: "Zip/Postal code is required",
                  pattern: {
                    value: /^(\d{4}|\d{4}\s?\w{2})$/,
                    message: "Invalid postal code format",
                  },
                })}
                className="border border-gray-300 rounded-md mb-3 p-2"
              />
              <p className="text-red-500 m-2">{errors.zip?.message}</p>

              <label htmlFor="country" className="mb-2">
                Country:
              </label>
              <select
                id="country"
                name="country"
                {...register("country", { required: "Country is required" })}
                className="border border-gray-300 rounded-md mb-3 p-2"
              >
                <option value="">Select a country</option>
                {Countries.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              <p className="text-red-500 m-2">{errors.country?.message}</p>
            </div>

            <div className="flex flex-col">
              <h3 className="text-lg font-semibold mb-3">Contact</h3>
              <label htmlFor="telephone" className="mb-2">
                Telephone:
              </label>
              <input
                type="text"
                id="telephone"
                name="telephone"
                {...register("telephone", {
                  required: "Telephone number is required",
                  pattern: {
                    value: /^(\d{2}\s?){3}\d{2}$/,
                    message: "Invalid phone number format",
                  },
                  setValueAs: normalizePhoneNumber,
                })}
                className="border border-gray-300 rounded-md mb-3 p-2"
              />
              <p className="text-red-500 m-2">{errors.telephone?.message}</p>

              <label htmlFor="email" className="mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                  validate: {
                    notAdmin: (fieldValue) =>
                      fieldValue !== "admin@example.com" ||
                      "Enter a different email address",
                    notBlackListed: (fieldValue) =>
                      !fieldValue.endsWith("baddomain.com") ||
                      "This domain is not supported",
                  },
                })}
                className="border border-gray-300 rounded-md mb-3 p-2"
              />
              <p className="text-red-500 m-2">{errors.email?.message}</p>
            </div>
          </div>

          {guestInputs.map((input, index) => (
            <React.Fragment key={index}>{input}</React.Fragment>
          ))}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
        <DevTool control={control} />
      </section>
    </>
  );
};

export default PersonalInfo;
