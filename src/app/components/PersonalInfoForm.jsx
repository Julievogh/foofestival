import React, { useEffect, useState } from "react";
import Countries from "./Countries";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useSearchParams } from "next/navigation";

const PersonalInfo = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const ticketAmount = parseInt(searchParams.get('ticketAmount'));
  const totalPrice = parseInt(searchParams.get('totalPrice'));
  const isGreenCamping = searchParams.get('isGreenCamping') === 'true';
  const isTent2Person = searchParams.get('isTent2Person') === 'true';
  const isTent3Person = searchParams.get('isTent3Person') === 'true';

  const [guestInputs, setGuestInputs] = useState([]);
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    const ticketAmount = parseInt(searchParams.get('ticketAmount'));
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
            <label htmlFor={`guestName${i + 1}`}>Guest {i + 1} First Name:</label>
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
            <p className="text-red-500 m-2">{errors[`guestName${i + 1}`]?.message}</p>
          </div>
        );
      }
      setGuestInputs(inputs);
    }
  }, [errors, register, searchParams]);

  const normalizePhoneNumber = (value) => value.replace(/[\s-]/g, "");

  return (
    <section className="w-full bg-white">
      <form action="/payment" method="GET" noValidate className="p-5">
        <input type="hidden" name="type" value={type} />
        <input type="hidden" name="ticketAmount" value={ticketAmount} />
        <input type="hidden" name="totalPrice" value={totalPrice} />
        <input type="hidden" name="isGreenCamping" value={isGreenCamping} />
        <input type="hidden" name="isTent2Person" value={isTent2Person} />
        <input type="hidden" name="isTent3Person" value={isTent3Person} />

        <section className="flex flex-col">
          <h3>Name</h3>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            {...register("firstname", {
              required: {
                value: true,
                message: "First Name is required",
              },
            })}
            className="border border-gray-300 rounded-md"
          />
          <p className="text-red-500 m-2">{errors.firstname?.message}</p>

          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            {...register("lastname", {
              required: {
                value: true,
                message: "Last Name is required",
              },
            })}
            className="border border-gray-300 rounded-md"
          />
          <p className="text-red-500 m-2">{errors.lastname?.message}</p>
        </section>

        <section className="flex flex-col">
          <h3>Date of Birth</h3>
          <label htmlFor="day">Day:</label>
          <input
            type="number"
            id="day"
            name="day"
            {...register("day", {
              required: {
                value: true,
                message: "Day is required",
              },
              min: {
                value: 1,
                message: "Day must be at least 1",
              },
              max: {
                value: 31,
                message: "Day cannot be more than 31",
              },
            })}
            className="border border-gray-300 rounded-md"
          />
          <p className="text-red-500 m-2">{errors.day?.message}</p>

          <label htmlFor="month">Month:</label>
          <select
            id="month"
            name="month"
            {...register("month", {
              required: {
                value: true,
                message: "Month is required",
              },
            })}
            className="border border-gray-300 rounded-md"
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

          <label htmlFor="year">Year:</label>
          <input
            type="text"
            id="year"
            name="year"
            {...register("year", {
              required: {
                value: true,
                message: "Year is required",
              },
              min: {
                value: 1900,
                message: "Year must be at least 1900",
              },
              max: {
                value: new Date().getFullYear(),
                message: `Year cannot be more than ${new Date().getFullYear()}`,
              },
            })}
            className="border border-gray-300 rounded-md"
          />
          <p className="text-red-500 m-2">{errors.year?.message}</p>
        </section>

        <section className="flex flex-col">
          <h3>Address</h3>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            {...register("address", {
              required: {
                value: true,
                message: "Address is required",
              },
            })}
            className="border border-gray-300 rounded-md"
          />
          <p className="text-red-500 m-2">{errors.address?.message}</p>

          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            {...register("city", {
              required: {
                value: true,
                message: "City is required",
              },
            })}
            className="border border-gray-300 rounded-md"
          />
          <p className="text-red-500 m-2">{errors.city?.message}</p>

          <label htmlFor="zip">Zip:</label>
          <input
            type="text"
            id="zip"
            name="zip"
            {...register("zip", {
              required: {
                value: true,
                message: "Zip/Postal code is required",
              },
              pattern: {
                value: /^(\d{4}|\d{4}\s?\w{2})$/,
                message: "Invalid postal code format",
              },
            })}
            className="border border-gray-300 rounded-md"
          />
          <p className="text-red-500 m-2">{errors.zip?.message}</p>

          <label htmlFor="country">Country:</label>
          <select
            id="country"
            name="country"
            {...register("country", {
              required: {
                value: true,
                message: "Country is required",
              },
            })}
            className="border border-gray-300 rounded-md"
          >
            <option value="">Select a country</option>
            {Countries.map((country, index) => (
              <option key={index} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          <p className="text-red-500 m-2">{errors.country?.message}</p>
        </section>

        <section className="flex flex-col">
          <h3>Contact</h3>
          <label htmlFor="telephone">Telephone:</label>
          <input
            type="text"
            id="telephone"
            name="telephone"
            {...register("telephone", {
              required: {
                value: true,
                message: "Telephone number is required",
              },
              pattern: {
                value: /^(\d{2}\s?){3}\d{2}$/,
                message: "Invalid phone number format",
              },
              setValueAs: normalizePhoneNumber,
            })}
            className="border border-gray-300 rounded-md"
          />
          <p className="text-red-500 m-2">{errors.telephone?.message}</p>

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
              },
            })}
            className="border border-gray-300 rounded-md"
          />
          <p className="text-red-500 m-2">{errors.email?.message}</p>
        </section>

        {guestInputs.map((input, index) => (
          <React.Fragment key={index}>{input}</React.Fragment>
        ))}

        <div className="flex flex-col justify-center mt-2 mb-5">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Reserve
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </section>
  );
};

export default PersonalInfo;
