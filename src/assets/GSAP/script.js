// function breakTheText() {
//   const el = document.querySelector(".ws_txt");

//   if (!el) return;

//   let ws_txt = el.textContent;
//   let sep_txt = ws_txt.split("");

//   let spanText = "";

//   let spanDivider = ws_txt.length / 2;
//   sep_txt.forEach((elem, index) => {
//     if (index < spanDivider) {
//       spanText += `<span class="ft">${elem}</span>`;
//     } else {
//       spanText += `<span class="bt">${elem}</span>`;
//     }
//   });
//   document.querySelector(".ws_txt").innerHTML = spanText;
// }
// breakTheText();

// gsap.from(".ws_txt .ft", {
//   y: 80,
//   opacity: 0,
//   duration: 0.6,
//   delay: 0.5,
//   stagger: 0.15,
// });
// gsap.from(".ws_txt .bt", {
//   y: 80,
//   opacity: 0,
//   duration: 0.6,
//   delay: 0.5,
//   stagger: -0.15,
// });
