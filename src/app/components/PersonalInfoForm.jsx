import React from "react";

const PersonalInfo = () => {
  return (
    <section className="w-full bg-gray-500">
      <form action="" className="w-1/2 pl-5 pt-5">
        <section className="flex flex-col">
          <h3>Name</h3>
          <label htmlFor="first-name">First Name:</label>
          <input type="text" name="first-name" id="first-name" required />
          <label htmlFor="middle-name">Middle Name:</label>
          <input type="text" name="middle-name" id="middle-name" />
          <label htmlFor="last-name">Last Name:</label>
          <input type="text" name="last-name" id="last-name" required />
        </section>

        <section className="flex flex-col">
          <h3>Date of Birth</h3>
          <label htmlFor="day">Day:</label>
          <input type="number" name="day" id="day" min="1" max="31" required />
          <label htmlFor="month">Month:</label>
          <input type="number" name="month" id="month" min="1" max="12" />
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            name="year"
            id="year"
            min="1900"
            max={new Date().getFullYear()}
          />
        </section>

        <section className="flex flex-col">
          <h3>Address</h3>
          <label htmlFor="address1">Address 1:</label>
          <input type="text" name="adress1" id="adress1" required />
          <label htmlFor="address2">Address 2:</label>
          <input type="text" name="address2" id="address2" required />
          <label htmlFor="address2">City:</label>
          <input type="text" name="city" id="city" required />

          <label htmlFor="province">Province:</label>
          <select id="province">
            <option value="ontario">Ontario</option>
            <option value="quebec">Quebec</option>
            <option value="british_columbia">British Columbia</option>
          </select>

          <label htmlFor="zip">Zip/Postal code</label>
          <input type="text" id="zip" name="zip" />

          <label htmlFor="country">Country:</label>
          <select id="country" name="country">
            <option value="Denmark">Denmark</option>
            <option value="Sweden">Sweden</option>
            <option value="Germany">Germany</option>
          </select>
          </section>

          <section className="flex flex-col">
            <h3>Contact</h3>
            <label htmlFor="telephone">Telephone:</label>
            <input type="text" id="telephone" name="telephone" />
            <label htmlFor="fax">Fax:</label>
            <input type="text" id="fax" name="fax" />
          </section>
      </form>
    </section>
  );
};

export default PersonalInfo;
