import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

function BrideSVG() {
  return (
    <svg viewBox="0 0 80 120" width="80" height="120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Veil trailing behind (to the left) */}
      <path d="M 32 10 Q 12 6 4 24 Q -1 38 7 46" stroke="#8367C7" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M 30 6 Q 8 2 0 20 Q -5 36 4 44" stroke="#C2F8CB" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      {/* Head */}
      <circle cx="40" cy="14" r="12" fill="white" stroke="#5603AD" strokeWidth="2.5"/>
      {/* Veil top cap */}
      <path d="M 28 10 Q 40 2 52 10" stroke="#5603AD" strokeWidth="2" fill="#F0FFF1" strokeLinecap="round"/>
      {/* Eyes */}
      <circle cx="36" cy="13" r="1.5" fill="#5603AD"/>
      <circle cx="44" cy="13" r="1.5" fill="#5603AD"/>
      {/* Smile */}
      <path d="M 36 18 Q 40 21 44 18" stroke="#5603AD" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Neck */}
      <line x1="40" y1="26" x2="40" y2="34" stroke="#5603AD" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Dress body */}
      <path d="M 28 34 L 12 115 L 68 115 L 52 34 Z" fill="#C2F8CB" stroke="#5603AD" strokeWidth="2.5"/>
      {/* Dress ruffle detail */}
      <path d="M 22 70 Q 40 65 58 70" stroke="#8367C7" strokeWidth="1.5" fill="none"/>
      <path d="M 18 90 Q 40 85 62 90" stroke="#8367C7" strokeWidth="1.5" fill="none"/>
      {/* Left arm (forward - walking pose) */}
      <path d="M 32 38 L 18 58" stroke="#5603AD" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Right arm holding bouquet */}
      <path d="M 48 38 L 62 56" stroke="#5603AD" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Bouquet */}
      <circle cx="66" cy="62" r="12" fill="#B3E9C7" stroke="#5603AD" strokeWidth="2"/>
      <circle cx="62" cy="57" r="5" fill="#8367C7"/>
      <circle cx="69" cy="56" r="5" fill="#5603AD"/>
      <circle cx="65" cy="64" r="5" fill="#8367C7"/>
      <circle cx="72" cy="63" r="4" fill="#C2F8CB" stroke="#5603AD" strokeWidth="1"/>
    </svg>
  );
}

function GroomSVG() {
  return (
    <svg viewBox="0 0 70 120" width="70" height="120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="35" cy="14" r="12" fill="white" stroke="#5603AD" strokeWidth="2.5"/>
      {/* Hair */}
      <path d="M 24 10 Q 35 3 46 10" stroke="#5603AD" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Eyes */}
      <circle cx="30" cy="13" r="1.5" fill="#5603AD"/>
      <circle cx="40" cy="13" r="1.5" fill="#5603AD"/>
      {/* Suit jacket */}
      <path d="M 15 26 L 10 90 L 60 90 L 55 26 Z" fill="#5603AD" stroke="#5603AD" strokeWidth="2"/>
      {/* White shirt */}
      <path d="M 30 26 L 28 90 L 42 90 L 40 26 Z" fill="white"/>
      {/* Bow tie */}
      <path d="M 30 30 L 33 34 L 30 38 Z" fill="#8367C7"/>
      <path d="M 40 30 L 37 34 L 40 38 Z" fill="#8367C7"/>
      <circle cx="35" cy="34" r="3" fill="#8367C7"/>
      {/* Left arm */}
      <path d="M 15 40 L 4 65" stroke="#5603AD" strokeWidth="3" strokeLinecap="round"/>
      {/* Right arm */}
      <path d="M 55 40 L 66 65" stroke="#5603AD" strokeWidth="3" strokeLinecap="round"/>
      {/* Legs */}
      <line x1="26" y1="90" x2="22" y2="118" stroke="#5603AD" strokeWidth="4" strokeLinecap="round"/>
      <line x1="44" y1="90" x2="48" y2="118" stroke="#5603AD" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  );
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const duration = 3500; // ms
    const steps = 100;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setDone(true), 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (done) {
      setTimeout(onComplete, 600);
    }
  }, [done, onComplete]);

  const barWidth = 620;
  const brideWidth = 80;
  const groomWidth = 70;
  const maxBrideX = barWidth - groomWidth - brideWidth - 10;
  const brideX = (progress / 100) * maxBrideX;

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center z-50"
          style={{ background: "#F0FFF1" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-10 text-center"
          >
            <p style={{ fontFamily: "Playfair Display, serif", color: "#5603AD", fontSize: "1.3rem", letterSpacing: "0.15em" }}>
              ✦ &nbsp; A Wedding Celebration &nbsp; ✦
            </p>
          </motion.div>

          {/* Loading bar with characters */}
          <div style={{ width: barWidth, position: "relative" }}>
            {/* Characters row */}
            <div style={{ position: "relative", height: 130, marginBottom: 0 }}>
              {/* Bride - walks along progress */}
              <motion.div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: brideX,
                }}
                animate={{ y: [0, -4, 0, -3, 0] }}
                transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
              >
                <BrideSVG />
              </motion.div>

              {/* Groom - stands at far right */}
              <div style={{ position: "absolute", bottom: 0, right: 0 }}>
                <GroomSVG />
              </div>
            </div>

            {/* Progress bar */}
            <div
              style={{
                width: "100%",
                height: 44,
                borderRadius: 4,
                overflow: "hidden",
                background: "#C2F8CB",
                border: "2.5px solid #5603AD",
                boxShadow: "0 4px 16px rgba(86,3,173,0.10)",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "linear-gradient(to right, #5603AD, #8367C7)",
                  borderRadius: 2,
                }}
                transition={{ ease: "linear" }}
              />
            </div>

            {/* Loading label */}
            <div className="flex items-center justify-between mt-4">
              <p
                style={{
                  fontFamily: "Lato, sans-serif",
                  color: "#5603AD",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  letterSpacing: "0.35em",
                }}
              >
                LOADING
              </p>
              <p
                style={{
                  fontFamily: "Lato, sans-serif",
                  color: "#8367C7",
                  fontSize: "1.1rem",
                  fontWeight: 400,
                }}
              >
                {progress}%
              </p>
            </div>
          </div>

          {/* Decorative dots */}
          <div className="flex gap-2 mt-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#8367C7",
                }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
