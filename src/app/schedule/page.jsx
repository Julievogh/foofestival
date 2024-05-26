// app/schedule.jsx

"use client";
import { Component } from "react";
import Basic from "./Basic"; // Import the Basic component

class SchedulePage extends Component {
  render() {
    return (
      <div>
        <h1>Schedule Page</h1>
        <Basic /> {/* Render the Basic component */}
      </div>
    );
  }
}

export default SchedulePage;
