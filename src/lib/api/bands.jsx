const BASE_URL = "https://abyssinian-aeolian-gazelle.glitch.me";

export const fetchBandsAndSchedule = async () => {
  try {
    const [bandsRes, scheduleRes] = await Promise.all([
      fetch(`${BASE_URL}/bands`),
      fetch(`${BASE_URL}/schedule`),
    ]);

    if (!bandsRes.ok || !scheduleRes.ok) {
      throw new Error("Failed to fetch data");
    }

    const bandsData = await bandsRes.json();
    const scheduleData = await scheduleRes.json();

    return { bandsData, scheduleData };
  } catch (error) {
    console.error("Error in fetchBandsAndSchedule:", error);
    throw error;
  }
};

export const fetchBands = async () => {
  try {
    const bandsRes = await fetch(`${BASE_URL}/bands`);
    if (!bandsRes.ok) {
      throw new Error("Failed to fetch bands data");
    }
    return await bandsRes.json();
  } catch (error) {
    console.error("Error in fetchBands:", error);
    throw error;
  }
};

export const fetchBandBySlug = async (slug) => {
  try {
    const bandRes = await fetch(`${BASE_URL}/bands/${slug}`);
    if (!bandRes.ok) {
      throw new Error("Failed to fetch band data");
    }
    return await bandRes.json();
  } catch (error) {
    console.error("Error in fetchBandBySlug:", error);
    throw error;
  }
};

export const fetchEvents = async () => {
  try {
    const eventsRes = await fetch(`${BASE_URL}/events`);
    if (!eventsRes.ok) {
      throw new Error("Failed to fetch events data");
    }
    return await eventsRes.json();
  } catch (error) {
    console.error("Error in fetchEvents:", error);
    throw error;
  }
};
