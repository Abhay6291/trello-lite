// import { useEffect, useRef, useContext } from "react";
// import { ThemeContext } from "../context/ThemeContext";

// export default function DotGrid() {
//   const canvasRef = useRef(null);
//   const { dark } = useContext(ThemeContext);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     function resize() {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     }

//     resize();
//     window.addEventListener("resize", resize);

//     const spacing = 32; // 🔥 slightly tighter grid
//     let mouse = { x: -1000, y: -1000 };
//     let time = 0;

//     window.addEventListener("mousemove", (e) => {
//       mouse.x = e.clientX;
//       mouse.y = e.clientY;
//     });

//     function draw() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       time += 0.03;

//       for (let x = 0; x < canvas.width; x += spacing) {
//         for (let y = 0; y < canvas.height; y += spacing) {

//           // 🌊 wave
//           const wave =
//             Math.sin(x * 0.01 + time) +
//             Math.cos(y * 0.01 + time);

//           const offsetY = wave * 5;

//           const dx = x - mouse.x;
//           const dy = y - mouse.y;
//           const dist = Math.sqrt(dx * dx + dy * dy);

//           // 💡 glow
//           const glow = Math.max(0, 1 - dist / 180);

//           // 🔥 stronger base visibility
//           const baseOpacity = dark ? 0.35 : 0.25;
//           const intensity = Math.max(baseOpacity, glow);

//           // 🎨 theme color
//           const color = dark
//             ? `rgba(255,255,255,${intensity})`
//             : `rgba(0,0,0,${intensity})`;

//           ctx.fillStyle = color;

//           // ✨ glow effect
//           ctx.shadowBlur = glow * 25;
//           ctx.shadowColor = dark ? "white" : "black";

//           // 🔥 bigger dots
//           ctx.beginPath();
//           ctx.arc(x, y + offsetY, 2.8, 0, Math.PI * 2);
//           ctx.fill();

//           ctx.shadowBlur = 0;
//         }
//       }

//       requestAnimationFrame(draw);
//     }

//     draw();

//     return () => window.removeEventListener("resize", resize);
//   }, [dark]);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed inset-0 z-0"
//     />
//   );
// }

import { useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function DotGrid() {
  const canvasRef = useRef(null);
  const { dark } = useContext(ThemeContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    const spacing = 38;

    let mouse = { x: -1000, y: -1000 };
    let trail = [];
    let ripples = [];

    let lastMoveTime = Date.now();

    // 🎯 MOUSE MOVE
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      trail.push({ x: e.clientX, y: e.clientY });
      if (trail.length > 12) trail.shift();

      lastMoveTime = Date.now();
    });

    // 💧 CLICK RIPPLE
    window.addEventListener("click", (e) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        alpha: 1,
      });
    });

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      const idleTime = now - lastMoveTime;

      // 🔥 UPDATE RIPPLE
      ripples = ripples.filter((r) => r.alpha > 0);

      ripples.forEach((r) => {
        r.radius += 4;     // speed
        r.alpha -= 0.02;   // fade
      });

      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          let influence = 0;

          // 🎯 Cursor Trail
          trail.forEach((point, i) => {
            const dx = x - point.x;
            const dy = y - point.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const strength = (1 - dist / 180) * (i / trail.length);
            influence = Math.max(influence, strength);
          });

          // 💧 Ripple Influence
          ripples.forEach((r) => {
            const dx = x - r.x;
            const dy = y - r.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const rippleEffect = Math.max(
              0,
              1 - Math.abs(dist - r.radius) / 40
            );

            influence = Math.max(influence, rippleEffect * r.alpha);
          });

          // 🧠 Idle breathing
          let idlePulse = 0;
          if (idleTime > 800) {
            idlePulse = Math.sin(now * 0.002) * 0.2;
          }

          const scale = 1 + influence * 1.5 + idlePulse;

          const baseOpacity = dark ? 0.7 : 0.5;
          const opacity = baseOpacity + influence * 0.5 + idlePulse * 0.2;

          const color = dark
            ? `rgba(255,255,255,${opacity})`
            : `rgba(0,0,0,${opacity})`;

          ctx.fillStyle = color;

          ctx.shadowBlur = influence > 0 ? influence * 20 : 0;
          ctx.shadowColor = dark ? "white" : "black";

          ctx.beginPath();
          ctx.arc(x, y, 2.3 * scale, 0, Math.PI * 2);
          ctx.fill();

          ctx.shadowBlur = 0;
        }
      }

      requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
    />
  );
}