import { motion } from "motion/react";
import type { UserData } from "./CreateAccount";

interface FinalChangesProps {
  userData: UserData | null;
  ceremonySeat: string | null;
  receptionSeat: string | null;
  onConfirm: () => void;
  onBack: () => void;
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
  return `Table ${m[1]} (${TABLE_NAMES[tableId]}), Seat ${m[2]}`;
}

function formatCeremonySeat(seat: string | null) {
  if (!seat) return "—";
  const row = seat[0];
  const col = parseInt(seat.slice(1));
  const side = col <= 5 ? "Bride's Side" : "Groom's Side";
  const area = row <= "D" ? "Front Section" : "Back Section";
  return `Seat ${seat} — ${area}, ${side}`;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "0.75rem 0",
        borderBottom: "1px solid #C2F8CB",
        gap: "1rem",
      }}
    >
      <span style={{ fontFamily: "Lato, sans-serif", color: "#8367C7", fontSize: "0.88rem", minWidth: 140 }}>
        {label}
      </span>
      <span style={{ fontFamily: "Cormorant Garamond, serif", color: "#5603AD", fontSize: "1.05rem", textAlign: "right" }}>
        {value}
      </span>
    </div>
  );
}

export function FinalChanges({ userData, ceremonySeat, receptionSeat, onConfirm, onBack }: FinalChangesProps) {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-6"
      style={{ background: "linear-gradient(135deg, #F0FFF1 0%, #C2F8CB 40%, #F0FFF1 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-lg"
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.92)",
            border: "2px solid #C2F8CB",
            boxShadow: "0 20px 60px rgba(86,3,173,0.10)",
          }}
        >
          <div style={{ background: "linear-gradient(90deg, #5603AD, #8367C7)", height: 8 }}/>

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <svg viewBox="0 0 50 50" width="48" height="48" fill="none">
                  <circle cx="25" cy="25" r="23" fill="#F0FFF1" stroke="#C2F8CB" strokeWidth="2"/>
                  <path d="M 13 24 L 21 32 L 37 16" stroke="#8367C7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 style={{ fontFamily: "Playfair Display, serif", color: "#5603AD", fontSize: "1.8rem", marginBottom: "0.3rem" }}>
                Review Your Details
              </h1>
              <p style={{ fontFamily: "Cormorant Garamond, serif", color: "#8367C7", fontSize: "1rem" }}>
                Please confirm everything looks correct
              </p>
              <div style={{ width: 50, height: 2, background: "#C2F8CB", margin: "0.75rem auto 0" }}/>
            </div>

            {/* Guest info */}
            <div
              style={{
                background: "#F0FFF1",
                borderRadius: 10,
                padding: "0.25rem 1rem",
                marginBottom: "1rem",
                border: "1.5px solid #C2F8CB",
              }}
            >
              <p style={{ fontFamily: "Lato, sans-serif", color: "#5603AD", fontSize: "0.78rem", letterSpacing: "0.12em", marginTop: "0.75rem", marginBottom: "0.25rem", textTransform: "uppercase" }}>
                Guest Information
              </p>
              <DetailRow label="Full Name" value={`${userData?.firstName ?? ""} ${userData?.lastName ?? ""}`} />
              <DetailRow label="Email" value={userData?.email ?? "—"} />
              <DetailRow label="Phone" value={userData?.phone ?? "—"} />
              <DetailRow label="Dietary" value={userData?.dietaryRestrictions || "None"} />
            </div>

            {/* Seat info */}
            <div
              style={{
                background: "#F0FFF1",
                borderRadius: 10,
                padding: "0.25rem 1rem",
                marginBottom: "1.75rem",
                border: "1.5px solid #C2F8CB",
              }}
            >
              <p style={{ fontFamily: "Lato, sans-serif", color: "#5603AD", fontSize: "0.78rem", letterSpacing: "0.12em", marginTop: "0.75rem", marginBottom: "0.25rem", textTransform: "uppercase" }}>
                Seating Reservations
              </p>
              <DetailRow label="Ceremony Seat" value={formatCeremonySeat(ceremonySeat)} />
              <div style={{ paddingBottom: "0.5rem" }}>
                <DetailRow label="Reception Seat" value={formatReceptionSeat(receptionSeat)} />
              </div>
            </div>

            {/* Question */}
            <div className="text-center mb-6">
              <p style={{ fontFamily: "Playfair Display, serif", color: "#5603AD", fontSize: "1.15rem" }}>
                Are these details correct?
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-center">
              {/* No — go back */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={onBack}
                style={{
                  background: "linear-gradient(135deg, #5603AD, #8367C7)",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  padding: "0.75rem 1.75rem",
                  fontFamily: "Playfair Display, serif",
                  fontSize: "1rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(86,3,173,0.2)",
                }}
              >
                ✗ &nbsp; No, Edit Seats
              </motion.button>

              {/* Yes — confirm */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(22,163,74,0.35)" }}
                whileTap={{ scale: 0.97 }}
                onClick={onConfirm}
                style={{
                  background: "linear-gradient(135deg, #16a34a, #22c55e)",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  padding: "0.75rem 1.75rem",
                  fontFamily: "Playfair Display, serif",
                  fontSize: "1rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(22,163,74,0.25)",
                }}
              >
                ✓ &nbsp; Yes, Confirm!
              </motion.button>
            </div>
          </div>

          <div style={{ background: "linear-gradient(90deg, #8367C7, #5603AD)", height: 8 }}/>
        </div>
      </motion.div>
    </div>
  );
}
