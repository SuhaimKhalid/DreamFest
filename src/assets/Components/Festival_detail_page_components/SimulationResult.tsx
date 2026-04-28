import { useMemo } from "react";
import { Table } from "react-bootstrap";
import type { Festival } from "../../Utilities/Type";

type Props = {
  fest: Festival;
};

export const SimulationResult = ({ fest }: Props) => {
  const duration = Number(fest.duration);
  const expectedAudience = Number(fest.expected_audience);

  // Weather setup
  const weatherValues = {
    sunny: 1.2,
    cloudy: 1.0,
    rainy: 0.7,
  };

  const weatherKeys = Object.keys(
    weatherValues,
  ) as (keyof typeof weatherValues)[];

  // Weather simulation
  const weatherPerDay = useMemo(() => {
    return Array.from({ length: duration }).map(() => {
      const key = weatherKeys[Math.floor(Math.random() * weatherKeys.length)];

      return {
        type: key,
        multiplier: weatherValues[key],
      };
    });
  }, [duration]);

  // Audience simulation
  const attendancePerDay = useMemo(() => {
    const startFactor = 1 / duration;
    const step = (1 - startFactor) / (duration - 1);

    return Array.from({ length: duration }).map((_, i) => {
      const factor = startFactor + i * step;

      const weather = weatherPerDay[i];

      return Math.floor(expectedAudience * factor * weather.multiplier);
    });
  }, [duration, expectedAudience, weatherPerDay]);

  // Revenue simulation
  const ticketPrice = fest.ticket || 20;
  const revenuePerDay = attendancePerDay.map(
    (audience) => audience * ticketPrice,
  );

  // Artist Simulation
  const artists_fee =
    fest.artists?.reduce((sum, i) => sum + Number(i.fee), 0) || 0;

  // Stage Simulation
  const stage_size_cost = {
    main: 200,
    secondary: 100,
    small: 50,
  };

  const stages = fest.stages?.map((s) => s.size) || [];
  const stages_cost =
    stages.reduce((sum, i) => sum + stage_size_cost[i], 0) || 0;

  // Vendor Simulation
  const vendorSum =
    fest.vendors?.reduce((sum, v) => {
      return sum + Number(v.costPerDay);
    }, 0) || 0;
  const vendorIncome = vendorSum * Number(fest.duration);

  // Staff Simulation
  const staffCost =
    fest.staff?.reduce((sum, i) => {
      return sum + i.count * i.costPerPerson;
    }, 0) || 0;

  //Total Cost
  const totalCost = artists_fee + stages_cost + staffCost * duration;
  console.log(
    "artists_fee + stages_cost + staffCost",
    artists_fee,
    stages_cost,
    staffCost,
  );
  // Profit Simulation
  const totalRevenue =
    revenuePerDay.reduce((sum, r) => sum + r, 0) + vendorIncome;
  // Final Profit
  const profit = totalRevenue - totalCost;

  return (
    <div className="col-lg-6">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            {Array.from({ length: duration }).map((_, i) => (
              <th key={i}>Day {i + 1}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            {attendancePerDay.map((value, i) => (
              <td key={i}>
                Audience: {value}
                <br />
                Weather: {weatherPerDay[i].type}
                <br />
                Revenue: £{revenuePerDay[i]}
              </td>
            ))}
            <td>
              Revenue: £{totalRevenue}
              <br />
              Cost: £{totalCost}
              <br />
              Profit: £{profit}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
