export interface User {
  userName: string;
  email: string;
  password: string;
}

export interface Festival {
  id: string;
  email: string;
  festival_Name: string;
  duration: string;
  expected_audience: string;
  start_Date: string;
  // Optional (for later expansion)
  artists?: Artist[];
  stages?: Stage[];
  vendors?: Vendor[];
  staff?: Staff[];
}

export interface Artist {
  id: string;
  fest_id: string;
  name: string;
  fee: string;
}

export interface Stage {
  id: string;
  fest_id: string;
  name: string;
  capacity: number;
  size: "main" | "secondary" | "small";
}
export interface Vendor {
  id: string;
  fest_id: string;
  name: string;
  type: "food" | "drink" | "merch";
  costPerDay: number;
  revenuePerPerson: number;
}
type StaffRole =
  | "security"
  | "medical"
  | "cleaning"
  | "logistics"
  | "stage_manager";
export interface Staff {
  id: string;
  fest_id: string;
  role: StaffRole;
  count: number;
  costPerDay: number;
}

// For Simulation
export type WeatherType = "sunny" | "cloudy" | "rain";

export interface SimulationResult {
  attendance: number;

  ticketRevenue?: number;
  vendorRevenue?: number;
  totalRevenue?: number;

  totalCost?: number;
  profit?: number;

  weather?: WeatherType;
}
