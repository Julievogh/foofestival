"use client";
import React, { useEffect } from "react";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from "@syncfusion/ej2-react-schedule";

const Scheduler = () => {
  useEffect(() => {
    import("@syncfusion/ej2-base/styles/material.css");
    import("@syncfusion/ej2-buttons/styles/material.css");
    import("@syncfusion/ej2-calendars/styles/material.css");
    import("@syncfusion/ej2-dropdowns/styles/material.css");
    import("@syncfusion/ej2-inputs/styles/material.css");
    import("@syncfusion/ej2-navigations/styles/material.css");
    import("@syncfusion/ej2-popups/styles/material.css");
    import("@syncfusion/ej2-splitbuttons/styles/material.css");
    import("@syncfusion/ej2-react-schedule/styles/material.css");
  }, []);

  const eventSettings = {
    dataSource: [
      {
        Id: 1,
        Subject: "Meeting",
        StartTime: new Date(2023, 5, 20, 10, 0),
        EndTime: new Date(2023, 5, 20, 12, 30),
      },
    ],
  };

  return (
    <div>
      {" "}
      <ScheduleComponent currentView="Month" eventSettings={eventSettings}>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
};

export default Scheduler;
