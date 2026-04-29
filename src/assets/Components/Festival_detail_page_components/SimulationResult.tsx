import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCloudSun,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

import type { Festival } from "../../Utilities/Type";

// ✅ IMPORT YOUR CALCULATIONS
import {
  calculateCapex,
  calculateOpex,
  calculateRevenue,
  calculateTotalAttendance,
} from "../../Utilities/calculations";

type Props = {
  fest: Festival;
};

export const SimulationResult = ({ fest }: Props) => {
  const duration = Number(fest.duration);
  const expectedAudience = Number(fest.expected_audience);

  const STORAGE_KEY = `festival_sim_${fest.id || "default"}`;

  const weatherValues = {
    sunny: 1.2,
    cloudy: 1.0,
    rainy: 0.7,
  };

  const weatherKeys = Object.keys(
    weatherValues,
  ) as (keyof typeof weatherValues)[];

  const [weatherPerDay, setWeatherPerDay] = useState<any[]>([]);
  const [attendancePerDay, setAttendancePerDay] = useState<number[]>([]);
  const [hasRun, setHasRun] = useState(false);

  // LOAD SAVED DATA
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);
      setWeatherPerDay(parsed.weatherPerDay);
      setAttendancePerDay(parsed.attendancePerDay);
      setHasRun(true);
    }
  }, []);

  // RUN SIMULATION (ONLY LOGIC HERE)

  const runSimulation = () => {
    const weather = Array.from({ length: duration }).map(() => {
      const key = weatherKeys[Math.floor(Math.random() * weatherKeys.length)];

      return {
        type: key,
        multiplier: weatherValues[key],
      };
    });

    const startFactor = 1 / duration;
    const step = (1 - startFactor) / (duration - 1);

    const attendance = Array.from({ length: duration }).map((_, i) => {
      const factor = startFactor + i * step;
      const w = weather[i];

      return Math.floor(expectedAudience * factor * w.multiplier);
    });

    setWeatherPerDay(weather);
    setAttendancePerDay(attendance);
    setHasRun(true);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        weatherPerDay: weather,
        attendancePerDay: attendance,
      }),
    );
  };

  // CALCULATIONS (FROM FILE)

  const ticketPrice = fest.ticket || 20;

  const totalRevenue = calculateRevenue(
    attendancePerDay,
    ticketPrice,
    fest.vendors ?? [],
    duration,
  );

  const totalCapex = calculateCapex(fest);

  const totalOpex = calculateOpex(fest, duration);

  const totalCost = totalCapex + totalOpex;

  const profit = totalRevenue - totalCost;

  const totalAttendance = calculateTotalAttendance(attendancePerDay);

  // -----------------------------
  // EXPORT JSON
  // -----------------------------
  const exportJSON = () => {
    const data = {
      fest,
      weatherPerDay,
      attendancePerDay,
      totalRevenue,
      totalCapex,
      totalOpex,
      totalCost,
      profit,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fest.festival_Name || "festival"}_forecast.json`;
    a.click();
  };

  // EXPORT CSV
  const exportCSV = () => {
    let csv = "Day,Audience,Weather\n";

    attendancePerDay.forEach((a, i) => {
      csv += `${i + 1},${a},${weatherPerDay[i]?.type}\n`;
    });

    csv += `\nRevenue,${totalRevenue}`;
    csv += `\nCAPEX,${totalCapex}`;
    csv += `\nOPEX,${totalOpex}`;
    csv += `\nCost,${totalCost}`;
    csv += `\nProfit,${profit}`;

    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fest.festival_Name || "festival"}_forecast.csv`;
    a.click();
  };

  // UI

  return (
    <div className="col-lg-12">
      <button onClick={runSimulation} className="run_sim">
        Run Simulation
      </button>

      {!hasRun && (
        <p style={{ color: "white" }}>
          Click Run Simulation to generate results
        </p>
      )}

      {hasRun && (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              {Array.from({ length: duration }).map((_, i) => (
                <th key={i}>Day {i + 1}</th>
              ))}
              <th>Summary</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              {attendancePerDay.map((value, i) => (
                <td key={i}>
                  <FontAwesomeIcon icon={faUsers} /> {value}
                  <br />
                  <FontAwesomeIcon icon={faCloudSun} /> {weatherPerDay[i]?.type}
                </td>
              ))}

              <td>
                <strong>
                  <FontAwesomeIcon icon={faChartLine} /> Summary
                </strong>
                <br />
                ------------------
                <br />
                Revenue: £{totalRevenue}
                <br />
                CAPEX: £{totalCapex}
                <br />
                OPEX: £{totalOpex}
                <br />
                Cost: £{totalCost}
                <br />
                Profit: £{profit}
              </td>
            </tr>
          </tbody>
        </Table>
      )}
      <div className="export_btn_div">
        {hasRun && (
          <>
            <Button className="btn btn-primary me-2" onClick={exportJSON}>
              Export JSON
            </Button>

            <Button className="btn btn-warning" onClick={exportCSV}>
              Export CSV
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
