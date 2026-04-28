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

  // Stable weather (runs once per duration change)
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
  // ----------------------------
  const attendancePerDay = useMemo(() => {
    const startFactor = 1 / duration;
    const step = (1 - startFactor) / (duration - 1);

    return Array.from({ length: duration }).map((_, i) => {
      const factor = startFactor + i * step;

      const weather = weatherPerDay[i];

      return Math.floor(expectedAudience * factor * weather.multiplier);
    });
  }, [duration, expectedAudience, weatherPerDay]);

  return (
    <div className="col-lg-6">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            {Array.from({ length: duration }).map((_, i) => (
              <th key={i}>Day {i + 1}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            {attendancePerDay.map((value, i) => (
              <td key={i}>
                Audience: {value}
                <br />
                Weather: {weatherPerDay[i].type}
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
