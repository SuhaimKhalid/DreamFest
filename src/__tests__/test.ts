import {
  calculateRevenue,
  calculateCapex,
  calculateOpex,
  calculateProfit,
} from "../assets/Utilities/calculations";

describe("Festival Calculations", () => {
  test("calculates revenue correctly", () => {
    const attendance = [100, 200, 300];
    const vendors = [{ costPerDay: 50 }];
    const result = calculateRevenue(attendance, 10, vendors, 3); //last number (3) is duration

    expect(result).toBe(6000 + 150);
  });

  test("calculates CAPEX correctly", () => {
    const fest = {
      stages: [{ size: "main" }, { size: "small" }],
      artists: [{ fee: 1000 }, { fee: 2000 }],
    };

    const result = calculateCapex(fest as any);

    expect(result).toBe(1000 + 2000 + 5000 + 1500);
  });

  test("calculates OPEX correctly", () => {
    const fest = {
      staff: [{ count: 10 }],
    };

    const result = calculateOpex(fest as any, 2);

    expect(result).toBe(10 * 100 * 2);
  });

  test("calculates profit correctly", () => {
    const result = calculateProfit(10000, 5000);

    expect(result).toBe(5000);
  });
});
