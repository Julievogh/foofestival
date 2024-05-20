import React from "react";
import BlueButton from "./BlueButton";

const PersonalInfo = () => {
  return (
    <section className="w-full bg-white">
      <form action="" className="p-5">
        <section className="flex flex-col">
          <h3>Name</h3>
          <label htmlFor="first-name">First Name:</label>
          <input type="text" name="first-name" id="first-name" required className="border border-gray-300 rounded-md" />
          <label htmlFor="middle-name">Middle Name:</label>
          <input type="text" name="middle-name" id="middle-name" className="border border-gray-300 rounded-md" />
          <label htmlFor="last-name">Last Name:</label>
          <input type="text" name="last-name" id="last-name" required className="border border-gray-300 rounded-md" />
        </section>

        <section className="flex flex-col">
          <h3>Date of Birth</h3>
          <label htmlFor="day">Day:</label>
          <input type="number" name="day" id="day" min="1" max="31" required className="border border-gray-300 rounded-md" />
          <label htmlFor="month">Month:</label>
          <input type="number" name="month" id="month" min="1" max="12" className="border border-gray-300 rounded-md" />
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            name="year"
            id="year"
            min="1900"
            max={new Date().getFullYear()}
            className="border border-gray-300 rounded-md"
          />
        </section>

        <section className="flex flex-col">
          <h3>Address</h3>
          <label htmlFor="address1">Address 1:</label>
          <input type="text" name="address1" id="address1" required className="border border-gray-300 rounded-md" />
          <label htmlFor="address2">Address 2:</label>
          <input type="text" name="address2" id="address2" required className="border border-gray-300 rounded-md" />
          <label htmlFor="city">City:</label>
          <input type="text" name="city" id="city" required className="border border-gray-300 rounded-md" />

          <label htmlFor="province">Province:</label>
          <select id="province" className="border border-gray-300 rounded-md">
            <option value="ontario">Ontario</option>
            <option value="quebec">Quebec</option>
            <option value="british_columbia">British Columbia</option>
          </select>

          <label htmlFor="zip">Zip/Postal code</label>
          <input type="text" id="zip" name="zip" className="border border-gray-300 rounded-md" />

          <label htmlFor="country">Country:</label>
          <select id="country" name="country" className="border border-gray-300 rounded-md">
            <option value="Denmark">Denmark</option>
            <option value="Sweden">Sweden</option>
            <option value="Germany">Germany</option>
          </select>
          </section>

          <section className="flex flex-col">
            <h3>Contact</h3>
            <label htmlFor="telephone">Telephone:</label>
            <input type="text" id="telephone" name="telephone" className="border border-gray-300 rounded-md" />
            <label htmlFor="fax">Fax:</label>
            <input type="text" id="fax" name="fax" className="border border-gray-300 rounded-md" />
          </section>

          <div className="flex justify-center mt-2">
            <BlueButton text="Submit"/>
          </div>
      </form>
    </section>
  );
};

export default PersonalInfo;
