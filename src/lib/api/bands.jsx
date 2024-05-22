export const fetchBandsAndSchedule = async () => {
  const bandsUrl = "https://abyssinian-aeolian-gazelle.glitch.me/bands";
  const scheduleUrl = "https://abyssinian-aeolian-gazelle.glitch.me/schedule";

  try {
    const [bandsRes, scheduleRes] = await Promise.all([
      fetch(bandsUrl),
      fetch(scheduleUrl),
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
  const bandsUrl = "https://abyssinian-aeolian-gazelle.glitch.me/bands";

  try {
    const bandsRes = await fetch(bandsUrl);

    if (!bandsRes.ok) {
      throw new Error("Failed to fetch bands");
    }

    const bandsData = await bandsRes.json();
    return bandsData;
  } catch (error) {
    console.error("Error in fetchBands:", error);
    throw error;
  }
};
