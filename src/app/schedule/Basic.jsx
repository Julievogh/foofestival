import React, { useState, useEffect } from "react";
import * as dayjsLocale from "dayjs/locale/pt-br";
import * as antdLocale from "antd/locale/pt_BR";
import {
  Scheduler,
  SchedulerData,
  ViewType,
  wrapperFun,
} from "react-big-schedule";

import { fetchBandsAndSchedule } from "../../lib/api/bands";

const SchedulerPage = () => {
  const [schedulerData, setSchedulerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let initialSchedulerData; // Define initialSchedulerData here
      try {
        const { bandsData, scheduleData } = await fetchBandsAndSchedule();
        console.log("Fetched bandsData:", bandsData);
        console.log("Fetched scheduleData:", scheduleData);

        const formattedData = formatScheduleData(scheduleData);
        console.log("Formatted data:", formattedData);

        initialSchedulerData = createInitialSchedulerData(formattedData);
        console.log("Initial scheduler data:", initialSchedulerData);

        setSchedulerData(initialSchedulerData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatScheduleData = (scheduleData) => {
    const formattedData = [];

    for (const stage in scheduleData) {
      for (const day in scheduleData[stage]) {
        scheduleData[stage][day].forEach((band) => {
          if (band.act) {
            const id = `${band.act.replace(/\s+/g, "-")}-${day}-${stage}`;
            const startTime = `${day} ${band.start}`;
            const endTime = `${day} ${band.end}`;

            formattedData.push({
              id: id,
              start: new Date(startTime),
              end: new Date(endTime),
              title: band.act,
              resourceId: stage,
              bgColor: "#ff6666",
            });
          } else {
            console.error("Event property missing:", band);
          }
        });
      }
    }

    return formattedData;
  };

  const createInitialSchedulerData = (formattedData) => {
    const schedulerData = new SchedulerData(
      new Date(),
      ViewType.Day,
      false,
      false,
      {
        besidesWidth: window.innerWidth <= 1600 ? 100 : 350,
        dayMaxEvents: 99,
        weekMaxEvents: 9669,
        monthMaxEvents: 9669,
        quarterMaxEvents: 6599,
        yearMaxEvents: 9956,
        customMaxEvents: 9965,
        eventItemPopoverTrigger: "click",
        schedulerContentHeight: "100%",
      }
    );

    schedulerData.setSchedulerLocale(dayjsLocale);
    schedulerData.setCalendarPopoverLocale(antdLocale);
    schedulerData.setResources([]);
    schedulerData.setEvents(formattedData);

    return schedulerData;
  };

  const prevClick = (schedulerData) => {
    schedulerData.prev();
    setSchedulerData(schedulerData);
  };

  const nextClick = (schedulerData) => {
    schedulerData.next();
    setSchedulerData(schedulerData);
  };

  const onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    setSchedulerData(schedulerData);
  };

  const onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    setSchedulerData(schedulerData);
  };

  const eventClicked = (schedulerData, event) => {
    alert(
      `You just clicked an event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="scheduler-container">
      <h1>Scheduler</h1>
      <Scheduler
        schedulerData={schedulerData}
        prevClick={prevClick}
        nextClick={nextClick}
        onViewChange={onViewChange}
        onSelectDate={onSelectDate}
        eventClicked={eventClicked}
      />
    </div>
  );
};

export default wrapperFun(SchedulerPage);
