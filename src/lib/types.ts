export type ResidencyStatus = "citizen" | "resident" | "nonResident";

export interface BookingPriceConfig {
  citizen: number;
  resident: number;
  nonResident: number;
}

export interface TimeSlot {
  time: string;
  remaining: number;
  status: "AVAILABLE" | "LOW_STOCK" | "SOLD_OUT";
}

export interface BookingAvailability {
  date: string;
  timeSlots: TimeSlot[];
}

export interface BookingPayload {
  activitySlug: string;
  activityName: string;
  date: string;
  time: string;
  guestCounts: Record<ResidencyStatus, number>;
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export interface DayAvailability {
  date: string; // YYYY-MM-DD
  status: "AVAILABLE" | "SOLD_OUT" | "LIMITED" | "CLOSED";
  price?: number; // Optional dynamic pricing
}

export interface BookingResponse {
  bookingId: string;
  status: "pending" | "confirmed" | "failed" | "pending_payment";
  paymentUrl?: string;
  message?: string;
}
