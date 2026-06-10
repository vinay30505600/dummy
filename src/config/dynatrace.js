const sendToDynatrace = async (title, message, properties = {}) => {
  try {
    await fetch(`${process.env.DT_ENDPOINT}/api/v2/events/ingest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Api-Token ${process.env.DT_INGEST_TOKEN}`,
      },
      body: JSON.stringify({
        eventType: "CUSTOM_INFO",
        title,
        properties: {
          message,
          service: "opsai-backend",
          ...properties,
        },
      }),
    });
  } catch (err) {
    console.error("[DT] Event ingest failed:", err.message);
  }
};

module.exports = sendToDynatrace;
