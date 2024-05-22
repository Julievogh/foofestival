import React from "react";
import BlueButton from "./BlueButton";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const PersonalInfo = () => {
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("form submitted", data);
  };

  const normalizePhoneNumber = (value) => {
    // Remove spaces and hyphens
    return value.replace(/[\s-]/g, "");
  };

  return (
    <section className="w-full bg-white">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-5">
        <section className="flex flex-col">
          <h3>Name</h3>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            {...register("firstName", {
              required: {
                value: true,
                message: "First Name is required",
              },
            })}
            className="border border-gray-300 rounded-md"
          />
          <p className="text-red-500 m-2">{errors.firstName?.message}</p>

          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            {...register("lastName", {
              required: {
                value: true,
                message: "Last Name is required",
              },
            })}
            className="border border-gray-300 rounded-md"
          />
          <p className="text-red-500 m-2">{errors.lastName?.message}</p>
        </section>

        <section className="flex flex-col">
          <h3>Date of Birth</h3>
          <label htmlFor="day">Day:</label>
          <input
            type="number"
            id="day"
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
            type="number"
            id="year"
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
            {...register("country", {
              required: {
                value: true,
                message: "Country is required",
              },
            })}
            className="border border-gray-300 rounded-md"
          >
            <option value="Denmark">Denmark</option>
            <option value="Sweden">Sweden</option>
            <option value="Germany">Germany</option>
          </select>
          <p className="text-red-500 m-2">{errors.country?.message}</p>
        </section>

        <section className="flex flex-col">
          <h3>Contact</h3>
          <label htmlFor="telephone">Telephone:</label>
          <input
            type="tel"
            id="telephone"
            {...register("telephone", {
              required: {
                value: true,
                message: "Telephone number is required",
              },
              pattern: {
                value: /^(\d{2}\s?){3}\d{2}$/,
                message: "Invalid phone number format",
              },
              setValueAs: (value) => normalizePhoneNumber(value),
            })}
            className="border border-gray-300 rounded-md"
          />
          <p className="text-red-500 m-2">{errors.telephone?.message}</p>

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
              // custom validation
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

        <div className="flex justify-center mt-2">
          <BlueButton text="Submit" />
        </div>
      </form>
      <DevTool control={control} />
    </section>
  );
};

export default PersonalInfo;
