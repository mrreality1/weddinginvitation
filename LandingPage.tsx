import { motion } from "motion/react";

interface LandingPageProps {
  onYes: () => void;
  onNo: () => void;
}

function FloralDecor({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 180 80"
      width="180"
      height="80"
      fill="none"
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
    >
      <path d="M 10 40 Q 50 10 90 40 Q 130 70 170 40" stroke="#B3E9C7" strokeWidth="2" fill="none"/>
      <path d="M 10 40 Q 50 70 90 40 Q 130 10 170 40" stroke="#C2F8CB" strokeWidth="1.5" fill="none"/>
      <circle cx="30" cy="30" r="6" fill="#8367C7" opacity="0.4"/>
      <circle cx="60" cy="20" r="4" fill="#B3E9C7"/>
      <circle cx="90" cy="35" r="7" fill="#5603AD" opacity="0.3"/>
      <circle cx="120" cy="22" r="5" fill="#8367C7" opacity="0.5"/>
      <circle cx="150" cy="32" r="4" fill="#C2F8CB"/>
      <path d="M 30 30 Q 35 18 42 25" stroke="#B3E9C7" strokeWidth="1.5" fill="none"/>
      <path d="M 60 20 Q 68 8 75 16" stroke="#B3E9C7" strokeWidth="1.5" fill="none"/>
      <path d="M 90 35 Q 98 20 106 28" stroke="#C2F8CB" strokeWidth="1.5" fill="none"/>
      <path d="M 120 22 Q 128 10 136 18" stroke="#B3E9C7" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function HeartDivider() {
  return (
    <div className="flex items-center gap-3 my-4">
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #B3E9C7)" }} />
      <svg viewBox="0 0 30 28" width="28" height="24" fill="#8367C7" opacity={0.7}>
        <path d="M15 26 C15 26 2 17 2 9 C2 5 5 2 9 2 C11.5 2 14 3.5 15 5.5 C16 3.5 18.5 2 21 2 C25 2 28 5 28 9 C28 17 15 26 15 26Z"/>
      </svg>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #B3E9C7)" }} />
    </div>
  );
}

export function LandingPage({ onYes, onNo }: LandingPageProps) {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-6"
      style={{ background: "linear-gradient(135deg, #F0FFF1 0%, #C2F8CB 40%, #F0FFF1 100%)" }}
    >
      {/* Background ornament circles */}
      <div style={{ position: "fixed", top: -100, left: -100, width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, #C2F8CB 0%, transparent 70%)", opacity: 0.5, pointerEvents: "none" }}/>
      <div style={{ position: "fixed", bottom: -80, right: -80, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, #8367C7 0%, transparent 70%)", opacity: 0.15, pointerEvents: "none" }}/>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        {/* Invitation card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(12px)",
            border: "2px solid #C2F8CB",
            boxShadow: "0 20px 60px rgba(86,3,173,0.12), 0 4px 20px rgba(86,3,173,0.08)",
          }}
        >
          {/* Top ribbon */}
          <div style={{ background: "linear-gradient(90deg, #5603AD, #8367C7)", height: 8 }}/>

          <div className="p-8 text-center">
            {/* Top floral */}
            <div className="flex justify-center mb-2">
              <FloralDecor />
            </div>

            {/* Tag line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                fontFamily: "Cormorant Garamond, serif",
                color: "#8367C7",
                fontSize: "0.95rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              Together with their families
            </motion.p>

            <HeartDivider />

            {/* Main invite heading */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#5603AD",
                fontSize: "2rem",
                lineHeight: 1.35,
                marginBottom: "0.5rem",
              }}
            >
              You Are Invited To
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              style={{
                fontFamily: "Playfair Display, serif",
                fontStyle: "italic",
                color: "#5603AD",
                fontSize: "2.6rem",
                lineHeight: 1.2,
              }}
            >
              Our Wedding
            </motion.h2>

            <HeartDivider />

            {/* Couple names */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="my-4"
            >
              <p style={{ fontFamily: "Playfair Display, serif", color: "#5603AD", fontSize: "1.7rem", fontWeight: 500 }}>
                Elena &amp; Marco
              </p>
              <p style={{ fontFamily: "Cormorant Garamond, serif", color: "#8367C7", fontSize: "1rem", letterSpacing: "0.12em", marginTop: "0.2rem" }}>
                Saturday, September 20, 2026
              </p>
              <p style={{ fontFamily: "Lato, sans-serif", color: "#8367C7", fontSize: "0.9rem", marginTop: "0.25rem" }}>
                Grand Ballroom · The Rosewood Estate
              </p>
            </motion.div>

            {/* Bottom floral */}
            <div className="flex justify-center mb-4">
              <FloralDecor flip />
            </div>

            {/* RSVP section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="mt-2"
            >
              <div
                style={{
                  background: "#F0FFF1",
                  border: "1.5px solid #C2F8CB",
                  borderRadius: 12,
                  padding: "1.25rem 1.5rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "Playfair Display, serif",
                    color: "#5603AD",
                    fontSize: "1.1rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  Please confirm if you will attend
                </p>

                <div className="flex gap-4 justify-center">
                  {/* YES button */}
                  <motion.button
                    whileHover={{ scale: 1.06, boxShadow: "0 6px 20px rgba(22,163,74,0.35)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onYes}
                    style={{
                      background: "linear-gradient(135deg, #16a34a, #22c55e)",
                      color: "white",
                      border: "none",
                      borderRadius: 10,
                      padding: "0.75rem 2.5rem",
                      fontFamily: "Playfair Display, serif",
                      fontSize: "1.1rem",
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(22,163,74,0.25)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    ✓ &nbsp; Yes, I will attend
                  </motion.button>

                  {/* NO button */}
                  <motion.button
                    whileHover={{ scale: 1.06, boxShadow: "0 6px 20px rgba(86,3,173,0.35)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onNo}
                    style={{
                      background: "linear-gradient(135deg, #5603AD, #8367C7)",
                      color: "white",
                      border: "none",
                      borderRadius: 10,
                      padding: "0.75rem 2.5rem",
                      fontFamily: "Playfair Display, serif",
                      fontSize: "1.1rem",
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(86,3,173,0.25)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    ✗ &nbsp; No, I cannot attend
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom ribbon */}
          <div style={{ background: "linear-gradient(90deg, #8367C7, #5603AD)", height: 8 }}/>
        </div>
      </motion.div>
    </div>
  );
}
