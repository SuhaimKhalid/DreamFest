import { Row } from "react-bootstrap";
import type { Festival } from "../../Utilities/Type";
import { useEffect, useState } from "react";

type Props = {
  fest: Festival;
};

export const Festival_info = ({ fest }: Props) => {
  const [live, setLive] = useState(false);
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

    if (diff <= 0) {
      setLive(true);
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

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

              <p className="e_Info">Duration : {fest?.duration} (Days)</p>
              <p className="e_Info">
                Number of Expected Audience: {fest?.expected_audience}
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="fest_info_pt2">
              <div className="date">
                <p className="p_day">
                  {day} <br />
                  <span> {month}</span>
                </p>
              </div>
              <p className="timer">
                {live ? (
                  "Event is Live!"
                ) : (
                  <>
                    <span className="timer_span">{timeLeft.days}d</span>
                    <span className="timer_span">{timeLeft.hours}h</span>
                    <span className="timer_span">{timeLeft.minutes}m</span>
                    <span className="timer_span">{timeLeft.seconds}s</span>
                  </>
                )}
              </p>
            </div>
          </div>
        </Row>
      </article>
    </>
  );
};
