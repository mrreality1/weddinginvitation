import { useState } from "react";
import { motion } from "motion/react";

interface SelectCeremonySeatProps {
  onNext: (seat: string) => void;
  initialSeat?: string | null;
}

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const LEFT_COLS = [1, 2, 3, 4, 5];
const RIGHT_COLS = [6, 7, 8, 9, 10];

const RESERVED_SEATS = new Set([
  "A1", "A2", "B3", "B4", "C1", "D2", "D3", "E5", "F1", "F2", "G4", "H3",
  "A6", "B7", "B10", "C8", "D7", "E6", "F9", "G6", "H7", "H9",
]);

export function SelectCeremonySeat({ onNext, initialSeat }: SelectCeremonySeatProps) {
  const [selected, setSelected] = useState<string | null>(initialSeat ?? null);

  function getSeatId(row: string, col: number) {
    return `${row}${col}`;
  }

  function SeatButton({ row, col }: { row: string; col: number }) {
    const id = getSeatId(row, col);
    const isReserved = RESERVED_SEATS.has(id);
    const isSelected = selected === id;

    return (
      <motion.button
        whileHover={!isReserved ? { scale: 1.15 } : {}}
        whileTap={!isReserved ? { scale: 0.95 } : {}}
        onClick={() => !isReserved && setSelected(id)}
        title={isReserved ? `${id} — Reserved` : `${id} — Click to select`}
        style={{
          width: 34,
          height: 34,
          borderRadius: 6,
          border: isSelected
            ? "2.5px solid #22c55e"
            : isReserved
            ? "1.5px solid #8367C7"
            : "1.5px solid #B3E9C7",
          background: isSelected
            ? "linear-gradient(135deg, #16a34a, #22c55e)"
            : isReserved
            ? "#5603AD"
            : "#F0FFF1",
          cursor: isReserved ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.15s",
          boxShadow: isSelected ? "0 2px 8px rgba(34,197,94,0.4)" : "none",
        }}
      >
        {isReserved ? (
          <svg viewBox="0 0 12 12" width="12" height="12" fill="white" opacity={0.7}>
            <line x1="2" y1="2" x2="10" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <line x1="10" y1="2" x2="2" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : isSelected ? (
          <svg viewBox="0 0 12 12" width="12" height="12" fill="none">
            <path d="M2 6 L5 9 L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <span style={{ fontFamily: "Lato, sans-serif", fontSize: "0.62rem", color: "#8367C7" }}>
            {row}{col}
          </span>
        )}
      </motion.button>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center p-6"
      style={{ background: "linear-gradient(135deg, #F0FFF1 0%, #C2F8CB 40%, #F0FFF1 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-6 mt-4">
          <h1 style={{ fontFamily: "Playfair Display, serif", color: "#5603AD", fontSize: "2rem", marginBottom: "0.3rem" }}>
            Select Your Ceremony Seat
          </h1>
          <p style={{ fontFamily: "Cormorant Garamond, serif", color: "#8367C7", fontSize: "1.05rem" }}>
            Garden Chapel — Saturday, September 20, 2026
          </p>
          <div style={{ width: 60, height: 2, background: "#C2F8CB", margin: "0.75rem auto 0" }}/>
        </div>

        {/* Seat map card */}
        <div
          className="rounded-2xl overflow-hidden mb-5"
          style={{
            background: "rgba(255,255,255,0.92)",
            border: "2px solid #C2F8CB",
            boxShadow: "0 16px 48px rgba(86,3,173,0.08)",
          }}
        >
          <div style={{ background: "linear-gradient(90deg, #5603AD, #8367C7)", height: 6 }}/>
          <div className="p-6">
            {/* Altar */}
            <div className="text-center mb-5">
              <div
                style={{
                  display: "inline-block",
                  padding: "0.5rem 2.5rem",
                  background: "linear-gradient(135deg, #5603AD, #8367C7)",
                  borderRadius: 8,
                  color: "white",
                  fontFamily: "Playfair Display, serif",
                  fontSize: "0.9rem",
                  letterSpacing: "0.1em",
                  boxShadow: "0 4px 12px rgba(86,3,173,0.2)",
                }}
              >
                ✦ ALTAR ✦
              </div>
            </div>

            {/* Seat grid */}
            <div style={{ display: "flex", gap: "2rem", justifyContent: "center", alignItems: "flex-start" }}>
              {/* Row labels + Left section */}
              <div>
                <p style={{ fontFamily: "Lato, sans-serif", fontSize: "0.8rem", color: "#8367C7", textAlign: "center", marginBottom: "0.5rem" }}>
                  Bride's Side
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {ROWS.map((row) => (
                    <div key={row} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontFamily: "Lato, sans-serif", fontSize: "0.75rem", color: "#8367C7", width: 16, textAlign: "right" }}>
                        {row}
                      </span>
                      <div style={{ display: "flex", gap: 5 }}>
                        {LEFT_COLS.map((col) => (
                          <SeatButton key={col} row={row} col={col} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aisle */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 30 }}>
                <div
                  style={{
                    width: 36,
                    height: ROWS.length * 40,
                    background: "linear-gradient(to bottom, #F0FFF1, #C2F8CB, #F0FFF1)",
                    borderLeft: "2px dashed #8367C7",
                    borderRight: "2px dashed #8367C7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Lato, sans-serif",
                      fontSize: "0.65rem",
                      color: "#8367C7",
                      writingMode: "vertical-rl",
                      letterSpacing: "0.1em",
                    }}
                  >
                    AISLE
                  </span>
                </div>
              </div>

              {/* Right section */}
              <div>
                <p style={{ fontFamily: "Lato, sans-serif", fontSize: "0.8rem", color: "#8367C7", textAlign: "center", marginBottom: "0.5rem" }}>
                  Groom's Side
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {ROWS.map((row) => (
                    <div key={row} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ display: "flex", gap: 5 }}>
                        {RIGHT_COLS.map((col) => (
                          <SeatButton key={col} row={row} col={col} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Col numbers */}
            <div className="flex justify-center mt-4 gap-1" style={{ fontFamily: "Lato, sans-serif", fontSize: "0.65rem", color: "#B3E9C7" }}>
              {[...LEFT_COLS, "·", ...RIGHT_COLS].map((c, i) => (
                <span key={i} style={{ width: c === "·" ? 74 : 34, textAlign: "center" }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div style={{ background: "linear-gradient(90deg, #8367C7, #5603AD)", height: 6 }}/>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-5 mb-5" style={{ fontFamily: "Lato, sans-serif", fontSize: "0.82rem" }}>
          <div className="flex items-center gap-2">
            <div style={{ width: 14, height: 14, borderRadius: 3, background: "#F0FFF1", border: "1.5px solid #B3E9C7" }}/>
            <span style={{ color: "#5603AD" }}>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: 14, height: 14, borderRadius: 3, background: "#5603AD" }}/>
            <span style={{ color: "#5603AD" }}>Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: 14, height: 14, borderRadius: 3, background: "linear-gradient(135deg, #16a34a, #22c55e)" }}/>
            <span style={{ color: "#5603AD" }}>Your Selection</span>
          </div>
        </div>

        {/* Selection status */}
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <p style={{ fontFamily: "Cormorant Garamond, serif", color: "#5603AD", fontSize: "1.05rem" }}>
              Selected: <strong>Seat {selected}</strong> ({selected[0] <= "D" ? "Front" : "Back"} — {parseInt(selected.slice(1)) <= 5 ? "Bride's Side" : "Groom's Side"})
            </p>
          </motion.div>
        )}

        {/* CTA */}
        <div className="text-center">
          <motion.button
            whileHover={selected ? { scale: 1.04, boxShadow: "0 8px 24px rgba(86,3,173,0.3)" } : {}}
            whileTap={selected ? { scale: 0.97 } : {}}
            onClick={() => selected && onNext(selected)}
            disabled={!selected}
            style={{
              background: selected ? "linear-gradient(135deg, #5603AD, #8367C7)" : "#e9ebef",
              color: selected ? "white" : "#717182",
              border: "none",
              borderRadius: 12,
              padding: "0.9rem 2.5rem",
              fontFamily: "Playfair Display, serif",
              fontSize: "1.1rem",
              cursor: selected ? "pointer" : "not-allowed",
              letterSpacing: "0.05em",
              boxShadow: selected ? "0 4px 16px rgba(86,3,173,0.2)" : "none",
              transition: "all 0.3s",
            }}
          >
            {selected ? "Select Reception Seat →" : "Please select a seat"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
