"use client";

import BookingWidget from "@/booking/BookingWidget";
import { bookingConfig, createBooking, fetchAvailability } from "@/data/bookingConfig";

export default function BookingDemo() {
  return <BookingWidget config={bookingConfig} fetchAvailability={fetchAvailability} createBooking={createBooking} />;
}
