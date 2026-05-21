import { useState } from "react";
import { motion } from "motion/react";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dietaryRestrictions: string;
}

interface CreateAccountProps {
  onNext: (data: UserData) => void;
}

export function CreateAccount({ onNext }: CreateAccountProps) {
  const [form, setForm] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dietaryRestrictions: "",
  });
  const [errors, setErrors] = useState<Partial<UserData>>({});

  function validate() {
    const e: Partial<UserData> = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = "Valid email is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onNext(form);
  }

  function field(key: keyof UserData, label: string, type = "text", placeholder = "") {
    return (
      <div className="mb-4">
        <label
          style={{
            fontFamily: "Lato, sans-serif",
            color: "#5603AD",
            fontSize: "0.9rem",
            display: "block",
            marginBottom: "0.35rem",
            letterSpacing: "0.05em",
          }}
        >
          {label}
        </label>
        <input
          type={type}
          value={form[key]}
          placeholder={placeholder}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, [key]: e.target.value }));
            setErrors((prev) => ({ ...prev, [key]: undefined }));
          }}
          style={{
            width: "100%",
            padding: "0.65rem 1rem",
            border: errors[key] ? "2px solid #d4183d" : "1.5px solid #C2F8CB",
            borderRadius: 8,
            fontFamily: "Lato, sans-serif",
            fontSize: "1rem",
            color: "#5603AD",
            background: "#F0FFF1",
            outline: "none",
            transition: "border-color 0.2s",
            boxSizing: "border-box",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#8367C7")}
          onBlur={(e) => (e.target.style.borderColor = errors[key] ? "#d4183d" : "#C2F8CB")}
        />
        {errors[key] && (
          <p style={{ color: "#d4183d", fontSize: "0.8rem", marginTop: "0.25rem", fontFamily: "Lato, sans-serif" }}>
            {errors[key]}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-6"
      style={{ background: "linear-gradient(135deg, #F0FFF1 0%, #C2F8CB 40%, #F0FFF1 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md"
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
                <svg viewBox="0 0 50 50" width="44" height="44" fill="none">
                  <circle cx="25" cy="25" r="23" fill="#F0FFF1" stroke="#C2F8CB" strokeWidth="2"/>
                  <path d="M25 38 C25 38 12 30 12 22 C12 17 15 14 19 14 C21.5 14 24 15.5 25 17.5 C26 15.5 28.5 14 31 14 C35 14 38 17 38 22 C38 30 25 38 25 38Z" fill="#8367C7" opacity="0.7"/>
                </svg>
              </div>
              <h1
                style={{
                  fontFamily: "Playfair Display, serif",
                  color: "#5603AD",
                  fontSize: "1.6rem",
                  marginBottom: "0.25rem",
                }}
              >
                Create Your Account
              </h1>
              <p
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  color: "#8367C7",
                  fontSize: "1rem",
                }}
              >
                We'll use this to confirm your reservation
              </p>
              <div style={{ width: 50, height: 2, background: "#C2F8CB", margin: "0.75rem auto 0" }}/>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <div style={{ flex: 1 }}>
                  {field("firstName", "First Name *", "text", "Elena")}
                </div>
                <div style={{ flex: 1 }}>
                  {field("lastName", "Last Name *", "text", "Smith")}
                </div>
              </div>
              {field("email", "Email Address *", "email", "elena@example.com")}
              {field("phone", "Phone Number *", "tel", "+1 (555) 000-0000")}

              <div className="mb-6">
                <label
                  style={{
                    fontFamily: "Lato, sans-serif",
                    color: "#5603AD",
                    fontSize: "0.9rem",
                    display: "block",
                    marginBottom: "0.35rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  Dietary Restrictions
                </label>
                <select
                  value={form.dietaryRestrictions}
                  onChange={(e) => setForm((prev) => ({ ...prev, dietaryRestrictions: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "0.65rem 1rem",
                    border: "1.5px solid #C2F8CB",
                    borderRadius: 8,
                    fontFamily: "Lato, sans-serif",
                    fontSize: "1rem",
                    color: "#5603AD",
                    background: "#F0FFF1",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="">None</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="gluten-free">Gluten-Free</option>
                  <option value="halal">Halal</option>
                  <option value="kosher">Kosher</option>
                  <option value="other">Other (we'll contact you)</option>
                </select>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(86,3,173,0.3)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #5603AD, #8367C7)",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  padding: "0.85rem",
                  fontFamily: "Playfair Display, serif",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                }}
              >
                Continue to Seat Selection →
              </motion.button>
            </form>
          </div>

          <div style={{ background: "linear-gradient(90deg, #8367C7, #5603AD)", height: 8 }}/>
        </div>
      </motion.div>
    </div>
  );
}
