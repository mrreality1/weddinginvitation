import { motion } from "motion/react";

interface RejectionPageProps {
  onBack: () => void;
}

export function RejectionPage({ onBack }: RejectionPageProps) {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-6"
      style={{ background: "linear-gradient(135deg, #F0FFF1 0%, #C2F8CB 50%, #F0FFF1 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="max-w-md w-full"
      >
        <div
          className="rounded-2xl overflow-hidden text-center"
          style={{
            background: "rgba(255,255,255,0.9)",
            border: "2px solid #C2F8CB",
            boxShadow: "0 20px 60px rgba(86,3,173,0.10)",
          }}
        >
          <div style={{ background: "linear-gradient(90deg, #5603AD, #8367C7)", height: 8 }}/>

          <div className="p-10">
            {/* Sad heart / rose */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mb-6 flex justify-center"
            >
              <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
                <circle cx="40" cy="40" r="38" fill="#F0FFF1" stroke="#C2F8CB" strokeWidth="2"/>
                <path d="M40 58 C40 58 20 46 20 34 C20 28 24 24 30 24 C33 24 37 26 40 30 C43 26 47 24 50 24 C56 24 60 28 60 34 C60 46 40 58 40 58Z" fill="#8367C7" opacity="0.6"/>
                {/* Sad face */}
                <circle cx="32" cy="38" r="2.5" fill="#5603AD"/>
                <circle cx="48" cy="38" r="2.5" fill="#5603AD"/>
                <path d="M 33 50 Q 40 45 47 50" stroke="#5603AD" strokeWidth="2" fill="none" strokeLinecap="round"/>
                {/* Tear */}
                <path d="M 32 42 Q 31 47 32 49" stroke="#8367C7" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
            </motion.div>

            <h1
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#5603AD",
                fontSize: "2rem",
                marginBottom: "0.5rem",
              }}
            >
              We'll Miss You
            </h1>

            <div style={{ width: 60, height: 2, background: "#C2F8CB", margin: "0.75rem auto 1rem" }}/>

            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                color: "#8367C7",
                fontSize: "1.15rem",
                lineHeight: 1.7,
                marginBottom: "0.75rem",
              }}
            >
              We completely understand and are so grateful you took the time to let us know.
            </p>
            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                color: "#8367C7",
                fontSize: "1.05rem",
                lineHeight: 1.6,
              }}
            >
              You will always be in our hearts on this special day. We hope our paths cross again soon.
            </p>

            <div style={{ width: 60, height: 2, background: "#C2F8CB", margin: "1.25rem auto" }}/>

            <p
              style={{
                fontFamily: "Playfair Display, serif",
                fontStyle: "italic",
                color: "#5603AD",
                fontSize: "1.3rem",
                marginBottom: "2rem",
              }}
            >
              With love, Elena &amp; Marco
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={onBack}
              style={{
                background: "linear-gradient(135deg, #5603AD, #8367C7)",
                color: "white",
                border: "none",
                borderRadius: 10,
                padding: "0.7rem 2rem",
                fontFamily: "Lato, sans-serif",
                fontSize: "0.95rem",
                cursor: "pointer",
                letterSpacing: "0.05em",
              }}
            >
              ← Back to Invitation
            </motion.button>
          </div>

          <div style={{ background: "linear-gradient(90deg, #8367C7, #5603AD)", height: 8 }}/>
        </div>
      </motion.div>
    </div>
  );
}
