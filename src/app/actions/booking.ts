import {
  BookingPayload,
  BookingResponse,
  TimeSlot,
  DayAvailability,
} from "@/lib/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/v1";

export async function getAvailability(
  slug: string,
  date: string,
): Promise<{ timeSlots: TimeSlot[] }> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/bookings/availability?slug=${slug}&date=${date}`,
      { cache: "no-store" }, // Ensure fresh data
    );

    if (!res.ok) {
      console.error("Failed to fetch availability:", await res.text());
      // Return empty slots on error to avoid crashing UI
      return { timeSlots: [] };
    }

    const data = await res.json();
    return data; // Backend returns { timeSlots: [...] }
  } catch (error) {
    console.error("Error fetching availability:", error);
    return { timeSlots: [] };
  }
}

export async function getMonthAvailability(
  slug: string,
  year: number,
  month: number, // 1-12
): Promise<DayAvailability[]> {
  // Stub: Backend endpoint for monthly view not yet implemented
  // Returning empty array or mock data if needed, but for now empty to avoid errors
  console.warn("getMonthAvailability is not yet implemented on the backend.");
  return [];
}

export async function createBooking(
  bookingData: BookingPayload,
): Promise<BookingResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    const json = await res.json();

    if (!res.ok) {
      // Return a structured error response even if backend sends valid JSON
      return {
        bookingId: "",
        status: "failed",
        message: json.error?.message || json.message || "Booking failed",
      };
    }

    return json.data; // Backend wraps response in 'data'
  } catch (error) {
    console.error("Error creating booking:", error);
    return {
      bookingId: "",
      status: "failed",
      message: "Network error occurred. Please try again.",
    };
  }
}
