import type { Festival } from "./Type";

// Revenue calculation
export const calculateRevenue = (
  attendancePerDay: number[],
  ticketPrice: number,
  vendors: any[] = [],
  duration?: number,
) => {
  const ticketRevenue = attendancePerDay.reduce(
    (sum, a) => sum + a * ticketPrice,
    0,
  );

  const vendorRevenue =
    (vendors ?? []).reduce((sum, v) => sum + Number(v.costPerDay || 0), 0) *
    (duration ?? attendancePerDay.length);

  return ticketRevenue + vendorRevenue;
};

// CAPEX (setup cost)
export const calculateCapex = (fest: Festival) => {
  const stageCostMap: Record<string, number> = {
    main: 5000,
    secondary: 3000,
    small: 1500,
  };

  const stageCost = (fest.stages ?? []).reduce(
    (sum, s) => sum + (stageCostMap[s.size] || 0),
    0,
  );

  const artistCost = (fest.artists ?? []).reduce(
    (sum, a) => sum + Number(a.fee || 0),
    0,
  );

  return stageCost + artistCost;
};

// OPEX (running cost)
export const calculateOpex = (fest: Festival, duration: number) => {
  const staffCostPerPerson = 100;

  const staffCost = (fest.staff ?? []).reduce(
    (sum, s) => sum + (s.count || 0) * staffCostPerPerson,
    0,
  );

  return staffCost * duration;
};

// Total cost
export const calculateTotalCost = (capex: number, opex: number) => {
  return capex + opex;
};

// Profit calculation
export const calculateProfit = (revenue: number, cost: number) => {
  return revenue - cost;
};

// Total attendance
export const calculateTotalAttendance = (attendancePerDay: number[]) => {
  return attendancePerDay.reduce((sum, a) => sum + a, 0);
};

// Compare festivals
export const compareFestivals = (a: any, b: any) => {
  return {
    profitDiff: a.profit - b.profit,
    revenueDiff: a.revenue - b.revenue,
    costDiff: a.cost - b.cost,
    attendanceDiff: a.attendance - b.attendance,
  };
};
