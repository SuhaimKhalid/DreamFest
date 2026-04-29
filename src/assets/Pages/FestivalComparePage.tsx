import { useState } from "react";
import { Table, Container } from "react-bootstrap";
import type { Festival } from "../Utilities/Type";

type SimData = {
  weatherPerDay: any[];
  attendancePerDay: number[];
  totalRevenue: number;
  totalCost: number;
  profit: number;
};

export const FestivalComparePage = () => {
  const festivals: Festival[] = JSON.parse(
    localStorage.getItem("Festivals") || "[]",
  );

  const getSim = (id: string): SimData | null => {
    const data = localStorage.getItem(`festival_sim_${id}`);
    return data ? JSON.parse(data) : null;
  };

  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState<any>(null);

  // SAFE PERCENT FUNCTION (FIXED)
  const safePercent = (a: number, b: number) => {
    if (b === 0) return 0;
    return ((a - b) / Math.abs(b)) * 100;
  };

  const sum = (arr: number[]) => arr.reduce((acc, v) => acc + v, 0);

  const compare = () => {
    if (!a || !b) {
      alert("Please select both festivals");
      return;
    }

    const simA = getSim(a);
    const simB = getSim(b);

    if (!simA || !simB) {
      alert("Run simulation for both festivals first");
      return;
    }

    const revenueA = simA.totalRevenue ?? 0;
    const revenueB = simB.totalRevenue ?? 0;

    const costA = simA.totalCost ?? 0;
    const costB = simB.totalCost ?? 0;

    const profitA = simA.profit ?? revenueA - costA;
    const profitB = simB.profit ?? revenueB - costB;

    const attendanceA = sum(simA.attendancePerDay ?? []);
    const attendanceB = sum(simB.attendancePerDay ?? []);

    setResult({
      profitDiff: profitA - profitB,
      revenueDiff: revenueA - revenueB,
      costDiff: costA - costB,
      attendanceDiff: attendanceA - attendanceB,

      profitPercent: safePercent(profitA, profitB),
      revenuePercent: safePercent(revenueA, revenueB),
      costPercent: safePercent(costA, costB),
      attendancePercent: safePercent(attendanceA, attendanceB),
    });
  };

  return (
    <Container>
      <div
        style={{ marginTop: "60px", color: "white" }}
        className="fest_compare_section"
      >
        <h2>Festival Comparison Dashboard</h2>

        {/* SELECTORS */}
        <div style={{ marginBottom: "20px" }}>
          <select
            className="form-select mb-2"
            onChange={(e) => setA(e.target.value)}
          >
            <option value="">Select Festival A</option>
            {festivals.map((f) => (
              <option key={f.id} value={f.id}>
                {f.festival_Name}
              </option>
            ))}
          </select>

          <select
            className="form-select mb-2"
            onChange={(e) => setB(e.target.value)}
          >
            <option value="">Select Festival B</option>
            {festivals.map((f) => (
              <option key={f.id} value={f.id}>
                {f.festival_Name}
              </option>
            ))}
          </select>

          <button className="run_compare" onClick={compare}>
            Compare Festivals
          </button>
        </div>

        {/* RESULT */}
        {result && (
          <>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Difference (A - B)</th>
                  <th>% Change</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>💰 Profit</td>
                  <td>£{result.profitDiff.toFixed(2)}</td>
                  <td>{result.profitPercent.toFixed(2)}%</td>
                </tr>

                <tr>
                  <td>📈 Revenue</td>
                  <td>£{result.revenueDiff.toFixed(2)}</td>
                  <td>{result.revenuePercent.toFixed(2)}%</td>
                </tr>

                <tr>
                  <td>💸 Cost</td>
                  <td>£{result.costDiff.toFixed(2)}</td>
                  <td>{result.costPercent.toFixed(2)}%</td>
                </tr>

                <tr>
                  <td>👥 Attendance</td>
                  <td>{result.attendanceDiff}</td>
                  <td>{result.attendancePercent.toFixed(2)}%</td>
                </tr>
              </tbody>
            </Table>

            {/* INSIGHT BOX */}
            <div
              style={{
                marginTop: "15px",
                padding: "15px",
                background: "#1f1f1f",
                borderRadius: "8px",
              }}
            >
              <h5>📊 Insight</h5>

              <p>
                {result.profitDiff > 0
                  ? "🏆 Festival A performs better in profit"
                  : "🏆 Festival B performs better in profit"}
              </p>

              <p>
                {result.attendanceDiff > 0
                  ? "👥 Festival A has higher attendance"
                  : "👥 Festival B has higher attendance"}
              </p>

              <p>
                {result.revenueDiff > 0
                  ? "💰 Festival A generates more revenue"
                  : "💰 Festival B generates more revenue"}
              </p>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};
