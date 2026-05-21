import { motion } from "motion/react";

interface ViewTablesProps {
  onNext: () => void;
}

const TABLES = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  reserved: [
    [0, 2, 4],
    [1, 3],
    [0, 1, 2, 5, 6],
    [3, 4, 7],
    [0, 2],
    [1, 5, 6],
    [0, 3, 4, 7],
    [2, 5],
    [1, 2, 6],
    [0, 4, 7],
    [3, 5],
    [1, 2, 4, 6],
  ][i],
}));

function TableBird({ tableId, reserved }: { tableId: number; reserved: number[] }) {
  const total = 8;
  const reservedCount = reserved.length;
  const available = total - reservedCount;

  const seatAngles = Array.from({ length: total }, (_, i) => (i * 360) / total - 90);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <div style={{ position: "relative", width: 90, height: 90 }}>
        {/* Table circle */}
        <div
          style={{
            position: "absolute",
            inset: "20px",
            borderRadius: "50%",
            background: available > 0 ? "linear-gradient(135deg, #C2F8CB, #B3E9C7)" : "#e9ebef",
            border: "2px solid #8367C7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <span style={{ fontFamily: "Lato, sans-serif", color: "#5603AD", fontSize: "0.8rem", fontWeight: 700 }}>
            {tableId}
          </span>
        </div>

        {/* Seats */}
        {seatAngles.map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const r = 38;
          const cx = 45 + r * Math.cos(rad);
          const cy = 45 + r * Math.sin(rad);
          const isReserved = reserved.includes(i);

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: isReserved ? "#5603AD" : "#F0FFF1",
                border: `2px solid ${isReserved ? "#5603AD" : "#C2F8CB"}`,
                left: cx - 6,
                top: cy - 6,
                zIndex: 2,
              }}
            />
          );
        })}
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "Lato, sans-serif", fontSize: "0.7rem", color: "#8367C7" }}>
          {available} open
        </p>
      </div>
    </motion.div>
  );
}

export function ViewTables({ onNext }: ViewTablesProps) {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start p-6"
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
          <h1
            style={{
              fontFamily: "Playfair Display, serif",
              color: "#5603AD",
              fontSize: "2rem",
              marginBottom: "0.4rem",
            }}
          >
            Venue Overview
          </h1>
          <p style={{ fontFamily: "Cormorant Garamond, serif", color: "#8367C7", fontSize: "1.1rem" }}>
            Current seating availability at The Rosewood Estate
          </p>
          <div style={{ width: 60, height: 2, background: "#C2F8CB", margin: "0.75rem auto 0" }}/>
        </div>

        {/* Legend */}
        <div
          className="flex justify-center gap-6 mb-6"
          style={{ fontFamily: "Lato, sans-serif", fontSize: "0.85rem" }}
        >
          <div className="flex items-center gap-2">
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#5603AD", border: "2px solid #5603AD" }}/>
            <span style={{ color: "#5603AD" }}>Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#F0FFF1", border: "2px solid #C2F8CB" }}/>
            <span style={{ color: "#5603AD" }}>Available</span>
          </div>
        </div>

        {/* Tables overview card */}
        <div
          className="rounded-2xl overflow-hidden mb-6"
          style={{
            background: "rgba(255,255,255,0.90)",
            border: "2px solid #C2F8CB",
            boxShadow: "0 16px 48px rgba(86,3,173,0.08)",
          }}
        >
          <div style={{ background: "linear-gradient(90deg, #5603AD, #8367C7)", height: 6 }}/>
          <div className="p-6">
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#5603AD",
                fontSize: "1.1rem",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              Reception Tables — Grand Ballroom
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1.5rem",
                justifyItems: "center",
              }}
            >
              {TABLES.map((t) => (
                <TableBird key={t.id} tableId={t.id} reserved={t.reserved} />
              ))}
            </div>
          </div>
          <div style={{ background: "linear-gradient(90deg, #8367C7, #5603AD)", height: 6 }}/>
        </div>

        {/* Ceremony overview */}
        <div
          className="rounded-2xl overflow-hidden mb-6"
          style={{
            background: "rgba(255,255,255,0.90)",
            border: "2px solid #C2F8CB",
            boxShadow: "0 16px 48px rgba(86,3,173,0.08)",
          }}
        >
          <div style={{ background: "linear-gradient(90deg, #5603AD, #8367C7)", height: 6 }}/>
          <div className="p-6">
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#5603AD",
                fontSize: "1.1rem",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              Ceremony — Garden Chapel
            </h2>
            <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
              {/* Left side */}
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "Lato, sans-serif", fontSize: "0.85rem", color: "#8367C7", marginBottom: "0.5rem" }}>Bride's Side</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 22px)", gap: 4 }}>
                  {["A","B","C","D","E","F","G","H"].flatMap((row) =>
                    [1,2,3,4,5].map((col) => {
                      const taken = ["A1","A2","B3","C1","D2","E5","F1","G4"].includes(`${row}${col}`);
                      return (
                        <div
                          key={`${row}${col}`}
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 3,
                            background: taken ? "#5603AD" : "#C2F8CB",
                            border: "1px solid #8367C7",
                          }}
                        />
                      );
                    })
                  )}
                </div>
              </div>
              {/* Aisle */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: 30, height: "100%", background: "linear-gradient(to bottom, transparent, #C2F8CB, transparent)", borderLeft: "2px dashed #8367C7", borderRight: "2px dashed #8367C7" }} />
              </div>
              {/* Right side */}
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "Lato, sans-serif", fontSize: "0.85rem", color: "#8367C7", marginBottom: "0.5rem" }}>Groom's Side</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 22px)", gap: 4 }}>
                  {["A","B","C","D","E","F","G","H"].flatMap((row) =>
                    [6,7,8,9,10].map((col) => {
                      const taken = ["A6","B4","B10","C8","D7","E6","F9","H7"].includes(`${row}${col}`);
                      return (
                        <div
                          key={`${row}${col}`}
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 3,
                            background: taken ? "#5603AD" : "#C2F8CB",
                            border: "1px solid #8367C7",
                          }}
                        />
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
          <div style={{ background: "linear-gradient(90deg, #8367C7, #5603AD)", height: 6 }}/>
        </div>

        {/* CTA */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 8px 24px rgba(86,3,173,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onNext}
            style={{
              background: "linear-gradient(135deg, #5603AD, #8367C7)",
              color: "white",
              border: "none",
              borderRadius: 12,
              padding: "0.9rem 2.5rem",
              fontFamily: "Playfair Display, serif",
              fontSize: "1.1rem",
              cursor: "pointer",
              letterSpacing: "0.05em",
              boxShadow: "0 4px 16px rgba(86,3,173,0.2)",
            }}
          >
            Select Your Ceremony Seat →
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
