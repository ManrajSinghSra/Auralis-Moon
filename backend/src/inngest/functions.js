const { inngest } = require("./Inngest");

const meetingProcessing = inngest.createFunction(
  { id: "meeting/processing" },
  { event: "meeting/processing" },
  async ({ event, step }) => {
    console.log("Worker triggered");
    console.log("Full event:", event);
    console.log("Event data:", event.data);

    const { meetingId, transcriptUrl } = event.data || {};

    console.log("meetingId:", meetingId);
    console.log("transcriptUrl:", transcriptUrl);
  }
);

module.exports = { meetingProcessing };