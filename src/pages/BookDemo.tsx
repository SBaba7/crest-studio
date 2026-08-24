import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Calendar as CalendarIcon,
  Clock,
  ArrowRight,
  ArrowLeft,
  Building,
  Mail,
  User,
  Globe,
  ChevronRight,
} from "lucide-react";

// Available upcoming demo dates (next 6 business days)
const getUpcomingDates = () => {
  const dates = [];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const today = new Date();
  const current = new Date(today);
  current.setDate(current.getDate() + 1);

  while (dates.length < 6) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      dates.push({
        id: current.toISOString().split("T")[0],
        dayName: days[dayOfWeek],
        month: months[current.getMonth()],
        dayNum: current.getDate(),
        fullLabel: `${days[dayOfWeek]}, ${months[current.getMonth()]} ${current.getDate()}`,
      });
    }
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

const TIME_SLOTS = [
  { id: "09:00", time: "9:00 AM", period: "Morning" },
  { id: "10:30", time: "10:30 AM", period: "Morning" },
  { id: "11:45", time: "11:45 AM", period: "Morning" },
  { id: "13:30", time: "1:30 PM", period: "Afternoon" },
  { id: "15:00", time: "3:00 PM", period: "Afternoon" },
  { id: "16:15", time: "4:15 PM", period: "Afternoon" },
];

const COMPANY_SIZES = [
  "1 - 50 employees",
  "51 - 250 employees",
  "251 - 1,000 employees",
  "1,001 - 5,000 employees",
  "5,000+ employees",
];

const TIMEZONES = [
  "America/Los_Angeles (PST / UTC-8)",
  "America/New_York (EST / UTC-5)",
  "America/Chicago (CST / UTC-6)",
  "Europe/London (GMT / UTC+0)",
  "Europe/Berlin (CET / UTC+1)",
  "Asia/Singapore (SGT / UTC+8)",
];

export function BookDemo() {
  const availableDates = getUpcomingDates();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    company: "",
    companySize: COMPANY_SIZES[2],
    selectedDate: availableDates[0]?.id || "",
    selectedDateLabel: availableDates[0]?.fullLabel || "",
    selectedTime: TIME_SLOTS[1].time,
    timezone: TIMEZONES[0],
    meetingType: "30-min Product Walkthrough",
    notes: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep1 = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.firstName.trim()) errs.firstName = "First name is required";
    if (!formData.lastName.trim()) errs.lastName = "Last name is required";
    if (!formData.email.trim()) {
      errs.email = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid work email";
    }
    if (!formData.company.trim()) errs.company = "Company name is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-purple-900/30 flex flex-col justify-center py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl mx-auto">
        {/* Main Clean Booking Card */}
        <div className="rounded-[2.5rem] bg-card border border-border/80 p-7 sm:p-12 shadow-xl relative overflow-hidden">
          
          {/* Top Step Breadcrumb Indicator */}
          <div className="flex items-center justify-between border-b border-border/70 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                  step >= 1
                    ? "bg-[#581c87] text-white"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                1
              </div>
              <span
                className={`text-xs sm:text-sm font-medium ${
                  step >= 1 ? "text-foreground font-semibold" : "text-muted-foreground"
                }`}
              >
                Your Details
              </span>
            </div>

            <div className="h-0.5 w-10 sm:w-20 bg-border/80" />

            <div className="flex items-center gap-3">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                  step >= 2
                    ? "bg-[#581c87] text-white"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                2
              </div>
              <span
                className={`text-xs sm:text-sm font-medium ${
                  step >= 2 ? "text-foreground font-semibold" : "text-muted-foreground"
                }`}
              >
                Pick Time
              </span>
            </div>

            <div className="h-0.5 w-10 sm:w-20 bg-border/80" />

            <div className="flex items-center gap-3">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                  step === 3
                    ? "bg-[#581c87] text-white"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                3
              </div>
              <span
                className={`text-xs sm:text-sm font-medium ${
                  step === 3 ? "text-foreground font-semibold" : "text-muted-foreground"
                }`}
              >
                Confirmed
              </span>
            </div>
          </div>

          {/* STEP 1: Details */}
          {step === 1 && (
            <motion.form
              key="step1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              onSubmit={handleNextToStep2}
              className="space-y-6"
            >
              <div>
                <h1 className="text-2xl sm:text-3xl font-display font-semibold text-foreground tracking-tight">
                  Tell us about your organization
                </h1>
                <p className="text-sm text-muted-foreground font-light mt-1.5 leading-relaxed">
                  We will tailor the demonstration environment to your specific tech stack.
                </p>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    placeholder="Sarah"
                    className={`w-full bg-background border ${
                      errors.firstName ? "border-red-500" : "border-input"
                    } rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-purple-600 transition-colors`}
                  />
                  {errors.firstName && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    placeholder="Chen"
                    className={`w-full bg-background border ${
                      errors.lastName ? "border-red-500" : "border-input"
                    } rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-purple-600 transition-colors`}
                  />
                  {errors.lastName && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Work Email & Job Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                    Work Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="sarah.chen@enterprise.com"
                    className={`w-full bg-background border ${
                      errors.email ? "border-red-500" : "border-input"
                    } rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-purple-600 transition-colors`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-muted-foreground" />
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, jobTitle: e.target.value })
                    }
                    placeholder="VP of Security / SOC Lead"
                    className="w-full bg-background border border-input rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-purple-600 transition-colors"
                  />
                </div>
              </div>

              {/* Company Name & Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="Acme Financial Corp"
                    className={`w-full bg-background border ${
                      errors.company ? "border-red-500" : "border-input"
                    } rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-purple-600 transition-colors`}
                  />
                  {errors.company && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.company}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Company Size
                  </label>
                  <select
                    value={formData.companySize}
                    onChange={(e) =>
                      setFormData({ ...formData, companySize: e.target.value })
                    }
                    className="w-full bg-background border border-input rounded-2xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-purple-600 transition-colors cursor-pointer"
                  >
                    {COMPANY_SIZES.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-xs text-muted-foreground font-light">
                  No software installation required. 100% confidential.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-[#581c87] hover:bg-[#6b21a8] text-white px-8 py-3.5 rounded-full text-sm font-semibold transition-all shadow-sm cursor-pointer shrink-0"
                >
                  <span>Choose time slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 2: Pick Time */}
          {step === 2 && (
            <motion.form
              key="step2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              onSubmit={handleFinalSubmit}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-display font-semibold text-foreground tracking-tight">
                    Select a date and time
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground font-light mt-1">
                    Choose an available slot for your tailored demonstration.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors p-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              </div>

              {/* Date Grid */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-2.5 flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Available Dates</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                  {availableDates.map((date) => {
                    const isSelected = formData.selectedDate === date.id;
                    return (
                      <button
                        type="button"
                        key={date.id}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            selectedDate: date.id,
                            selectedDateLabel: date.fullLabel,
                          })
                        }
                        className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                          isSelected
                            ? "bg-[#581c87] text-white border-purple-400/40 shadow-sm"
                            : "bg-secondary/40 text-foreground border-border/70 hover:bg-secondary"
                        }`}
                      >
                        <span className="text-[11px] font-medium opacity-80 uppercase tracking-wider">
                          {date.dayName}
                        </span>
                        <span className="text-lg font-bold">{date.dayNum}</span>
                        <span className="text-[10px] opacity-70">{date.month}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Grid */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-2.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span>Available Slots ({formData.selectedDateLabel})</span>
                  </span>
                  <span className="text-[11px] text-purple-600 dark:text-purple-400 font-normal">
                    6 slots available
                  </span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = formData.selectedTime === slot.time;
                    return (
                      <button
                        type="button"
                        key={slot.id}
                        onClick={() =>
                          setFormData({ ...formData, selectedTime: slot.time })
                        }
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-[#581c87] text-white border-purple-400/40 shadow-sm"
                            : "bg-secondary/40 text-foreground border-border/70 hover:bg-secondary"
                        }`}
                      >
                        <div>
                          <span className="block text-xs font-semibold">{slot.time}</span>
                          <span className="block text-[10px] opacity-70 font-light">
                            {slot.period}
                          </span>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timezone Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                    Timezone
                  </label>
                  <select
                    value={formData.timezone}
                    onChange={(e) =>
                      setFormData({ ...formData, timezone: e.target.value })
                    }
                    className="w-full bg-background border border-input rounded-2xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-purple-600 transition-colors"
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Meeting Format
                  </label>
                  <select
                    value={formData.meetingType}
                    onChange={(e) =>
                      setFormData({ ...formData, meetingType: e.target.value })
                    }
                    className="w-full bg-background border border-input rounded-2xl px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-purple-600 transition-colors"
                  >
                    <option value="30-min Product Walkthrough">
                      30-min Product Walkthrough
                    </option>
                    <option value="45-min Architecture & Integration Review">
                      45-min Architecture & Integration Review
                    </option>
                  </select>
                </div>
              </div>

              {/* Summary Bar & Final Confirmation Submit */}
              <div className="bg-secondary/40 border border-border/70 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-xs">
                  <span className="font-semibold text-foreground block">
                    {formData.selectedDateLabel} at {formData.selectedTime}
                  </span>
                  <span className="text-muted-foreground font-light">
                    Confirmation will be sent to {formData.email || "your email"}
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 bg-[#581c87] hover:bg-[#6b21a8] text-white px-7 py-3 rounded-full text-sm font-semibold transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Booking...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm Booking</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 3: Confirmed */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4 text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 mx-auto flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
                  Demo Confirmed
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground">
                  You're all set, {formData.firstName || "there"}!
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground font-light mt-1.5 max-w-md mx-auto">
                  A calendar invitation and video link have been sent to{" "}
                  <span className="font-semibold text-foreground">
                    {formData.email}
                  </span>
                  .
                </p>
              </div>

              {/* Confirmed Details Badge */}
              <div className="max-w-md mx-auto bg-secondary/50 border border-border/80 rounded-2xl p-5 text-left space-y-3">
                <div className="flex items-center justify-between border-b border-border/60 pb-3 text-xs">
                  <span className="text-muted-foreground font-light">Session</span>
                  <span className="font-semibold text-foreground">
                    {formData.meetingType}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-border/60 pb-3 text-xs">
                  <span className="text-muted-foreground font-light">Date & Time</span>
                  <span className="font-semibold text-foreground">
                    {formData.selectedDateLabel} @ {formData.selectedTime}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-light">Organization</span>
                  <span className="font-semibold text-foreground">
                    {formData.company}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-border/60 flex items-center justify-center gap-4">
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#581c87] dark:text-purple-300 hover:underline"
                >
                  <span>Return to homepage</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}

export default BookDemo;
