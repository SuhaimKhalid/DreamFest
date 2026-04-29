import { useLayoutEffect } from "react";
import gsap from "gsap"; //For Animation

export const WildScreen = () => {
  useLayoutEffect(() => {
    const el = document.querySelector(".ws_txt");

    if (!el) return;

    let ws_txt = el.textContent;
    let sep_txt = ws_txt.split("");

    let spanText = "";
    let spanDivider = sep_txt.length / 2;

    sep_txt.forEach((elem, index) => {
      spanText += `<span class="${index < spanDivider ? "ft" : "bt"}">${elem}</span>`;
    });

    el.innerHTML = spanText;
    const ctx = gsap.context(() => {
      gsap.from(".ws_txt .ft", {
        y: 80,
        opacity: 0,
        duration: 0.6,
        delay: 0.5,
        stagger: 0.15,
      });

      gsap.from(".ws_txt .bt", {
        y: 80,
        opacity: 0,
        duration: 0.6,
        delay: 0.5,
        stagger: -0.15,
      });

      gsap.fromTo(
        ".btn_section",
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 1.2,
        },
      );
    });

    return () => ctx.revert();
  }, []);
  return (
    <>
      <section id="wildScreen">
        <div className="inner">
          <div className="text_section">
            <h1 className="ws_txt">DreamFest</h1>
          </div>
          <div className="btn_section">
            <button
              className="login_btn"
              onClick={(e) => {
                e.preventDefault();
                window.open("/login", "_self");
              }}
            >
              Login
            </button>
            <h5 className="reg_p">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  window.open("/register", "_self");
                }}
              >
                Create an Account ?
              </a>
            </h5>
          </div>
        </div>
      </section>
    </>
  );
};
