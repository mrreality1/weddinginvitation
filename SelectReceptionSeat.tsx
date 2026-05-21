import { useState } from "react";
import { motion } from "motion/react";

interface SelectReceptionSeatProps {
  onNext: (seat: string) => void;
  initialSeat?: string | null;
}

const RESERVED_BY_TABLE: Record<number, number[]> = {
  1: [0, 2, 4],
  2: [1, 3],
  3: [0, 1, 2, 5, 6],
  4: [3, 4, 7],
  5: [0, 2],
  6: [1, 5, 6],
  7: [0, 3, 4, 7],
  8: [2, 5],
  9: [1, 2, 6],
  10: [0, 4, 7],
  11: [3, 5],
  12: [1, 2, 4, 6],
};

const TABLE_NAMES: Record<number, string> = {
  1: "Rose",
  2: "Lavender",
  3: "Orchid",
  4: "Lily",
  5: "Jasmine",
  6: "Peony",
  7: "Dahlia",
  8: "Tulip",
  9: "Magnolia",
  10: "Iris",
  11: "Gardenia",
  12: "Lotus",
};

function ReceptionTable({
  tableId,
  selected,
  onSelect,
}: {
  tableId: number;
  selected: string | null;
  onSelect: (seat: string) => void;
}) {
  const reserved = RESERVED_BY_TABLE[tableId];
  const total = 8;
  const seatAngles = Array.from({ length: total }, (_, i) => (i * 360) / total - 90);
  const r = 44;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{ position: "relative", width: 110, height: 110 }}>
        {/* Table */}
        <div
          style={{
            position: "absolute",
            inset: "22px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #C2F8CB, #B3E9C7)",
            border: "2.5px solid #8367C7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <span style={{ fontFamily: "Lato, sans-serif", color: "#5603AD", fontSize: "0.72rem", fontWeight: 700, textAlign: "center", lineHeight: 1.2 }}>
            {tableId}
            <br />
            <span style={{ fontSize: "0.58rem", fontWeight: 400 }}>{TABLE_NAMES[tableId]}</span>
          </span>
        </div>

        {/* Seats */}
        {seatAngles.map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 55 + r * Math.cos(rad);
          const cy = 55 + r * Math.sin(rad);
          const seatId = `T${tableId}-S${i + 1}`;
          const isReserved = reserved.includes(i);
          const isSelected = selected === seatId;

          return (
            <motion.button
              key={i}
              whileHover={!isReserved ? { scale: 1.3 } : {}}
              whileTap={!isReserved ? { scale: 0.9 } : {}}
              onClick={() => !isReserved && onSelect(seatId)}
              title={isReserved ? "Reserved" : `Table ${tableId}, Seat ${i + 1}`}
              style={{
                position: "absolute",
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: isSelected
                  ? "linear-gradient(135deg, #16a34a, #22c55e)"
                  : isReserved
                  ? "#5603AD"
                  : "#F0FFF1",
                border: isSelected
                  ? "2px solid #16a34a"
                  : isReserved
                  ? "2px solid #5603AD"
                  : "2px solid #B3E9C7",
                cursor: isReserved ? "not-allowed" : "pointer",
                left: cx - 9,
                top: cy - 9,
                zIndex: 2,
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isSelected ? "0 0 8px rgba(34,197,94,0.5)" : "none",
                transition: "all 0.15s",
              }}
            >
              {isReserved && (
                <svg viewBox="0 0 10 10" width="8" height="8">
                  <line x1="2" y1="2" x2="8" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="8" y1="2" x2="2" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )}
              {isSelected && (
                <svg viewBox="0 0 10 10" width="8" height="8">
                  <path d="M1.5 5 L4 7.5 L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              )}
            </motion.button>
          );
        })}
      </div>
      <p style={{ fontFamily: "Lato, sans-serif", fontSize: "0.68rem", color: "#8367C7" }}>
        {total - reserved.length} seats left
      </p>
    </div>
  );
}

export function SelectReceptionSeat({ onNext, initialSeat }: SelectReceptionSeatProps) {
  const [selected, setSelected] = useState<string | null>(initialSeat ?? null);

  const selectedLabel = selected
    ? (() => {
        const parts = selected.match(/T(\d+)-S(\d+)/);
        if (!parts) return selected;
        return `Table ${parts[1]} (${TABLE_NAMES[parseInt(parts[1])]}), Seat ${parts[2]}`;
      })()
    : null;

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center p-6"
      style={{ background: "linear-gradient(135deg, #F0FFF1 0%, #C2F8CB 40%, #F0FFF1 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-3xl"
      >
        {/* Header */}
        <div className="text-center mb-6 mt-4">
          <h1 style={{ fontFamily: "Playfair Display, serif", color: "#5603AD", fontSize: "2rem", marginBottom: "0.3rem" }}>
            Select Your Reception Seat
          </h1>
          <p style={{ fontFamily: "Cormorant Garamond, serif", color: "#8367C7", fontSize: "1.05rem" }}>
            Grand Ballroom — The Rosewood Estate
          </p>
          <div style={{ width: 60, height: 2, background: "#C2F8CB", margin: "0.75rem auto 0" }}/>
        </div>

        {/* Tables card */}
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
            {/* Stage */}
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
                ✦ SWEETHEART TABLE ✦
              </div>
            </div>

            {/* Table grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1.25rem",
                justifyItems: "center",
              }}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((id) => (
                <ReceptionTable
                  key={id}
                  tableId={id}
                  selected={selected}
                  onSelect={setSelected}
                />
              ))}
            </div>
          </div>
          <div style={{ background: "linear-gradient(90deg, #8367C7, #5603AD)", height: 6 }}/>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-5 mb-4" style={{ fontFamily: "Lato, sans-serif", fontSize: "0.82rem" }}>
          <div className="flex items-center gap-2">
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#F0FFF1", border: "2px solid #B3E9C7" }}/>
            <span style={{ color: "#5603AD" }}>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#5603AD" }}/>
            <span style={{ color: "#5603AD" }}>Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "linear-gradient(135deg, #16a34a, #22c55e)" }}/>
            <span style={{ color: "#5603AD" }}>Your Selection</span>
          </div>
        </div>

        {/* Selection status */}
        {selectedLabel && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <p style={{ fontFamily: "Cormorant Garamond, serif", color: "#5603AD", fontSize: "1.05rem" }}>
              Selected: <strong>{selectedLabel}</strong>
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
              transition: "all 0.3s",
            }}
          >
            {selected ? "Review My Selections →" : "Please select a seat"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
