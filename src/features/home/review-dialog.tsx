"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star, MessageSquarePlus, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { reviewSchema } from "./review.schema";

const POPULAR_TOURS = [
  "Shimla & Manali Tour",
  "Jammu & Kashmir Paradise",
  "Royal Rajasthan Heritage",
  "Uttarakhand Serene Retreat",
  "Kerala Backwaters & Hills",
  "Customized Tour Package",
];

const RATING_LABELS: Record<number, string> = {
  1: "⭐ 1/5 - Disappointing",
  2: "⭐⭐ 2/5 - Below Expectations",
  3: "⭐⭐⭐ 3/5 - Average Experience",
  4: "⭐⭐⭐⭐ 4/5 - Very Good Experience",
  5: "⭐⭐⭐⭐⭐ 5/5 - Exceptional & Unforgettable!",
};

export default function ReviewDialog() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    tour: POPULAR_TOURS[0],
    comment: "",
    hp_website: "", // Honeypot bot protection
  });

  const [reviewTimestamps, setReviewTimestamps] = useState<Record<string, number>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("namoh_review_timestamps");
        if (stored) {
          setReviewTimestamps(JSON.parse(stored));
        }
      } catch {
        // Ignore localStorage error
      }
    }
  }, [open]);

  const cleanEmail = formData.email.trim().toLowerCase();
  const lastSubmittedTime = cleanEmail ? reviewTimestamps[cleanEmail] : 0;
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
  const isCooldownActive =
    Boolean(lastSubmittedTime) && Date.now() - lastSubmittedTime < SEVEN_DAYS_MS;
  const cooldownDaysRemaining = isCooldownActive
    ? Math.max(1, Math.ceil((SEVEN_DAYS_MS - (Date.now() - lastSubmittedTime)) / (24 * 60 * 60 * 1000)))
    : 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Live validation error clearing on typing
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (serverError) setServerError("");
  };

  const handleRatingSelect = (selectedRating: number) => {
    setRating(selectedRating);
    if (errors.rating) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.rating;
        return next;
      });
    }
    if (serverError) setServerError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Client-Side Zod Validation
    const validation = reviewSchema.safeParse({
      ...formData,
      rating,
    });

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Please fill all required review fields correctly.");
      return;
    }

    if (isCooldownActive) {
      const msg = `You have already submitted a review recently. You can submit another review in ${cooldownDaysRemaining} day${cooldownDaysRemaining > 1 ? "s" : ""}.`;
      setServerError(msg);
      toast.error(msg);
      return;
    }

    setErrors({});
    setServerError("");
    setLoading(true);

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        toast.success("Thank you! Review submitted successfully.");

        // Store email with timestamp for 7-day cooldown
        try {
          const updated = {
            ...reviewTimestamps,
            [cleanEmail]: Date.now(),
          };
          localStorage.setItem("namoh_review_timestamps", JSON.stringify(updated));
          setReviewTimestamps(updated);
        } catch {
          // ignore storage error
        }
      } else {
        const message = data.message || "Failed to submit review. Please try again.";
        setServerError(message);
        toast.error(message);
      }
    } catch {
      setServerError("Network error. Please try again later.");
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setErrors({});
      setServerError("");
      setFormData({
        name: "",
        email: "",
        location: "",
        tour: POPULAR_TOURS[0],
        comment: "",
        hp_website: "",
      });
      setRating(0);
      setHoverRating(0);
    }, 300);
  };

  const activeRating = hoverRating || rating;

  return (
    <Dialog open={open} onOpenChange={(val) => (val ? setOpen(true) : handleResetAndClose())}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#002855] hover:bg-[#001b3a] text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer group"
        >
          <MessageSquarePlus size={18} className="text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>Write a Review</span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-lg w-[94vw] max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-2xl">
        <DialogHeader className="text-left mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80 w-fit mb-2">
            <Star size={12} className="text-amber-500 fill-amber-500" />
            <span>Guest Feedback</span>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-[#002855] tracking-tight font-sans">
            {submitted ? "Thank You!" : "Share Your Experience"}
          </DialogTitle>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            {submitted
              ? "We truly appreciate your holiday feedback with Namoh Tourism."
              : "Help other travelers choose their dream holiday with your honest rating & thoughts."}
          </p>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900">
                Thank You for Your Review!
              </h3>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                We truly appreciate you taking the time to share your holiday experience with Namoh Tourism.
              </p>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-8 py-2.5 rounded-full bg-[#002855] text-white text-sm font-semibold hover:bg-[#001d40] transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {/* Honeypot hidden input */}
            <input
              type="text"
              name="hp_website"
              value={formData.hp_website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden opacity-0 pointer-events-none absolute"
              style={{ display: "none" }}
            />

            {/* Interactive Star Rating */}
            <div
              className={`p-4 rounded-xl border text-center transition-all ${
                errors.rating
                  ? "bg-rose-50/40 border-rose-300"
                  : "bg-slate-50/80 border-slate-200/70"
              }`}
            >
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Your Overall Rating <span className="text-rose-500">*</span>
              </label>

              <div className="flex items-center justify-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((starVal) => {
                  const isFilled = activeRating >= starVal;
                  return (
                    <button
                      type="button"
                      key={starVal}
                      onClick={() => handleRatingSelect(starVal)}
                      onMouseEnter={() => setHoverRating(starVal)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-slate-300 hover:scale-125 focus:outline-none focus:scale-125 transition-all cursor-pointer"
                      aria-label={`${starVal} Star`}
                    >
                      <Star
                        size={30}
                        className={
                          isFilled
                            ? "text-amber-400 fill-amber-400 drop-shadow-xs"
                            : "text-slate-300 fill-slate-100"
                        }
                      />
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Rating Label */}
              <div className="min-h-[22px] flex items-center justify-center">
                {activeRating > 0 ? (
                  <span className="text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80 inline-block shadow-2xs">
                    {RATING_LABELS[activeRating]}
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 font-medium">
                    Tap a star to rate
                  </span>
                )}
              </div>

              {errors.rating && (
                <p className="text-rose-500 text-xs mt-1.5 font-medium">
                  {errors.rating}
                </p>
              )}
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#002855] focus:border-transparent transition-all ${
                    errors.name ? "border-rose-400 bg-rose-50/20" : "border-slate-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-rose-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. rahul@example.com"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#002855] focus:border-transparent transition-all ${
                    errors.email || isCooldownActive
                      ? "border-rose-400 bg-rose-50/20"
                      : "border-slate-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-rose-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {isCooldownActive && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                <AlertCircle size={15} className="shrink-0 text-amber-600" />
                <span>
                  You have already shared a review recently. You can submit another review in{" "}
                  <strong>
                    {cooldownDaysRemaining} day{cooldownDaysRemaining > 1 ? "s" : ""}
                  </strong>
                  .
                </span>
              </div>
            )}

            {/* City & Tour */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City / Location <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. New Delhi, Mumbai"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#002855] focus:border-transparent transition-all ${
                    errors.location ? "border-rose-400 bg-rose-50/20" : "border-slate-300"
                  }`}
                />
                {errors.location && (
                  <p className="text-rose-500 text-xs mt-1">{errors.location}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tour Taken <span className="text-rose-500">*</span>
                </label>
                <select
                  name="tour"
                  value={formData.tour}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#002855] focus:border-transparent transition-all ${
                    errors.tour ? "border-rose-400 bg-rose-50/20" : "border-slate-300"
                  }`}
                >
                  {POPULAR_TOURS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.tour && (
                  <p className="text-rose-500 text-xs mt-1">{errors.tour}</p>
                )}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Review & Experience <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows={4}
                placeholder="Share your experience about hotel stay, sightseeing, cab driver, and overall hospitality..."
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#002855] focus:border-transparent transition-all resize-none ${
                  errors.comment ? "border-rose-400 bg-rose-50/20" : "border-slate-300"
                }`}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.comment ? (
                  <p className="text-rose-500 text-xs">{errors.comment}</p>
                ) : (
                  <span />
                )}
                <span className="text-[11px] text-slate-400">
                  {formData.comment.length}/1000 characters
                </span>
              </div>
            </div>

            {/* Server Error Message */}
            {serverError && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                <AlertCircle size={15} className="shrink-0 mt-0.5 text-rose-500" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || isCooldownActive}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#002855] to-[#003875] hover:from-[#001d40] hover:to-[#002855] text-white font-bold text-sm shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-amber-400" />
                    <span>Submitting Review...</span>
                  </>
                ) : (
                  <>
                    <Star size={16} className="text-amber-400 fill-amber-400" />
                    <span>Submit Review</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
