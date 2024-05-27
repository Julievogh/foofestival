import React from "react";

const GreenCamping = ({
  title,
  description,
  description2,
  buy,
  checked,
  onCheckboxChange,
}) => {
  return (
    <>
      <h3 className="p-2">
        <strong>{title}</strong>
      </h3>
      <div className="flex justify-between p-3">
        <div>
          <p>{description}</p>
          <p>
            <strong>{description2}</strong>
          </p>
        </div>
        <div className="flex align-center mr-6 mt-4">
          <label htmlFor="greenCamping" className="mr-2">
            {buy}
          </label>
          <input
            type="checkbox"
            id="greenCamping"
            name="greenCamping"
            className="w-6 h-6"
            checked={checked}
            onChange={(e) => onCheckboxChange(e.target.checked)}
          />
        </div>
      </div>
    </>
  );
};

export default GreenCamping;
