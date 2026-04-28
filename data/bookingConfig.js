import { bookingConfig } from "@/data/site";

const demoBookedSlots = {
  "2026-04-28": [
    { start: "10:00", end: "11:00" },
    { start: "15:30", end: "16:30" }
  ],
  "2026-04-29": [
    { start: "09:00", end: "10:00" },
    { start: "13:00", end: "15:00" }
  ]
};

export { bookingConfig };

export async function fetchAvailability(date) {
  await wait(180);

  return {
    bookedSlots: demoBookedSlots[date] || [],
    unavailableSlots: []
  };
}

export async function createBooking(payload) {
  await wait(360);
  console.log("Deák Niki booking request", payload);

  return { success: true };
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
