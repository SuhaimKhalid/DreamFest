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
  artists?: string[];
  stages?: string[];
  vendors?: string[];
}
