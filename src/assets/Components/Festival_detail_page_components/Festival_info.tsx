import { Row } from "react-bootstrap";
import type { Festival } from "../../Utilities/Type";
import { useEffect, useState } from "react";

type Props = {
  fest: Festival;
};

export const Festival_info = ({ fest }: Props) => {
  // ----------------------
  const targetDate = new Date(fest?.start_Date);
  const month = targetDate.toLocaleDateString("en-GB", {
    month: "short",
  });
  const day = targetDate.toLocaleDateString("en-GB", {
    day: "numeric",
  });
  // CountDown Timer for Start Festival
  const getTimeLeft = () => {
    const now = new Date().getTime();
    const target = targetDate.getTime();

    const diff = target - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  };
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <article className="Fest_info_section">
        <Row>
          <div
            className="col-lg-8 col-md-12"
            style={{ alignContent: "center" }}
          >
            <div className="fest_info_pt1">
              <h1>{fest.festival_Name}</h1>

              <p className="e_Info">Duration:{fest?.duration}</p>
              <p className="e_Info">
                Number of Expected Audience: {fest?.expected_audience}
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="fest_info_pt2">
              <div className="date">
                <p className="p_day">{day}</p>
              </div>
              <p className="timer">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
                {timeLeft.seconds}s
              </p>
            </div>
          </div>
        </Row>
      </article>
    </>
  );
};
