import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import type { UserData } from "./CreateAccount";

interface ReservationPageProps {
  userData: UserData | null;
  ceremonySeat: string | null;
  receptionSeat: string | null;
}

const TABLE_NAMES: Record<number, string> = {
  1: "Rose", 2: "Lavender", 3: "Orchid", 4: "Lily",
  5: "Jasmine", 6: "Peony", 7: "Dahlia", 8: "Tulip",
  9: "Magnolia", 10: "Iris", 11: "Gardenia", 12: "Lotus",
};

function formatReceptionSeat(seat: string | null) {
  if (!seat) return "—";
  const m = seat.match(/T(\d+)-S(\d+)/);
  if (!m) return seat;
  const tableId = parseInt(m[1]);
  return `Table ${m[1]} — ${TABLE_NAMES[tableId]}, Seat ${m[2]}`;
}

function formatCeremonySeat(seat: string | null) {
  if (!seat) return "—";
  const row = seat[0];
  const col = parseInt(seat.slice(1));
  const side = col <= 5 ? "Bride's Side" : "Groom's Side";
  const area = row <= "D" ? "Front" : "Back";
  return `Seat ${seat} — ${area} Section, ${side}`;
}

function generateConfirmationCode(name: string) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const seed = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  let code = "WED-";
  for (let i = 0; i < 8; i++) {
    code += chars[(seed * (i + 7) * 31 + i * 13) % chars.length];
    if (i === 3) code += "-";
  }
  return code;
}

function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#C2F8CB", "#8367C7", "#5603AD", "#B3E9C7", "#22c55e", "#F0FFF1"];
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      color: string; size: number; rotation: number; rotSpeed: number;
    }> = [];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -10 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 2,
        vy: 1.5 + Math.random() * 2.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 8,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 4,
      });
    }

    let animId: number;
    let frame = 0;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        if (p.y > canvas.height + 10) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.85;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      });

      if (frame < 200) {
        animId = requestAnimationFrame(draw);
      }
    }

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  );
}

export function ReservationPage({ userData, ceremonySeat, receptionSeat }: ReservationPageProps) {
  const fullName = `${userData?.firstName ?? ""} ${userData?.lastName ?? ""}`.trim();
  const confirmationCode = generateConfirmationCode(fullName || "Guest");

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative"
      style={{ background: "linear-gradient(135deg, #F0FFF1 0%, #C2F8CB 40%, #F0FFF1 100%)" }}
    >
      <Confetti />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        className="w-full max-w-lg relative z-10"
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.96)",
            border: "2px solid #C2F8CB",
            boxShadow: "0 24px 80px rgba(86,3,173,0.14)",
          }}
        >
          <div style={{ background: "linear-gradient(90deg, #5603AD, #8367C7)", height: 8 }}/>

          <div className="p-8 text-center">
            {/* Celebration icon */}
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex justify-center mb-5"
            >
              <svg viewBox="0 0 80 80" width="76" height="76" fill="none">
                <circle cx="40" cy="40" r="37" fill="#F0FFF1" stroke="#C2F8CB" strokeWidth="2.5"/>
                {/* Champagne glasses */}
                <path d="M26 20 L30 36 L22 36 Z" fill="#8367C7" opacity="0.7"/>
                <rect x="27" y="36" width="2" height="10" fill="#8367C7" opacity="0.7"/>
                <rect x="23" y="46" width="10" height="2" rx="1" fill="#8367C7" opacity="0.7"/>
                <path d="M50 20 L54 36 L46 36 Z" fill="#5603AD" opacity="0.7"/>
                <rect x="51" y="36" width="2" height="10" fill="#5603AD" opacity="0.7"/>
                <rect x="47" y="46" width="10" height="2" rx="1" fill="#5603AD" opacity="0.7"/>
                {/* Bubbles */}
                <circle cx="35" cy="25" r="2" fill="#C2F8CB"/>
                <circle cx="43" cy="22" r="1.5" fill="#B3E9C7"/>
                <circle cx="38" cy="18" r="1" fill="#C2F8CB"/>
                {/* Stars */}
                <text x="38" y="65" textAnchor="middle" fontSize="14" fill="#8367C7">✦</text>
              </svg>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#5603AD",
                fontSize: "2.1rem",
                marginBottom: "0.3rem",
              }}
            >
              Reservation Confirmed!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                fontFamily: "Cormorant Garamond, serif",
                color: "#8367C7",
                fontSize: "1.1rem",
              }}
            >
              We can't wait to celebrate with you
            </motion.p>

            <div style={{ width: 60, height: 2, background: "#C2F8CB", margin: "1rem auto" }}/>

            {/* Confirmation number */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                background: "linear-gradient(135deg, #5603AD, #8367C7)",
                borderRadius: 10,
                padding: "0.75rem 1.5rem",
                display: "inline-block",
                marginBottom: "1.25rem",
              }}
            >
              <p style={{ fontFamily: "Lato, sans-serif", color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", letterSpacing: "0.15em", marginBottom: "0.2rem" }}>
                CONFIRMATION CODE
              </p>
              <p style={{ fontFamily: "Lato, sans-serif", color: "white", fontSize: "1.2rem", letterSpacing: "0.2em", fontWeight: 700 }}>
                {confirmationCode}
              </p>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{
                background: "#F0FFF1",
                borderRadius: 12,
                padding: "1.25rem",
                border: "1.5px solid #C2F8CB",
                textAlign: "left",
                marginBottom: "1.5rem",
              }}
            >
              {[
                { icon: "👤", label: "Guest", value: fullName || "Guest" },
                { icon: "📧", label: "Email", value: userData?.email ?? "—" },
                { icon: "📱", label: "Phone", value: userData?.phone ?? "—" },
                { icon: "⛪", label: "Ceremony Seat", value: formatCeremonySeat(ceremonySeat) },
                { icon: "🍽️", label: "Reception Seat", value: formatReceptionSeat(receptionSeat) },
                { icon: "📅", label: "Wedding Date", value: "Saturday, September 20, 2026" },
                { icon: "📍", label: "Venue", value: "The Rosewood Estate" },
              ].map(({ icon, label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    padding: "0.5rem 0",
                    borderBottom: "1px solid #C2F8CB",
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>{icon}</span>
                  <div>
                    <p style={{ fontFamily: "Lato, sans-serif", color: "#8367C7", fontSize: "0.75rem", letterSpacing: "0.08em" }}>
                      {label.toUpperCase()}
                    </p>
                    <p style={{ fontFamily: "Cormorant Garamond, serif", color: "#5603AD", fontSize: "1rem" }}>
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontStyle: "italic",
                color: "#8367C7",
                fontSize: "1rem",
                lineHeight: 1.6,
                marginBottom: "1.25rem",
              }}
            >
              A confirmation email will be sent to your inbox. Please save your confirmation code and bring it on the day of the wedding.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{
                fontFamily: "Playfair Display, serif",
                fontStyle: "italic",
                color: "#5603AD",
                fontSize: "1.4rem",
              }}
            >
              With love, Angelica &amp; Vadel ♥
            </motion.p>
          </div>

          <div style={{ background: "linear-gradient(90deg, #8367C7, #5603AD)", height: 8 }}/>
        </div>
      </motion.div>
    </div>
  );
}
