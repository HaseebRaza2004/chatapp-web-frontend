// src/pages/auth/PhoneNumber.jsx
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";

const schema = z.object({
    phone: z
        .string()
        .min(10, "Phone is required")
        .refine((val) => /^\+\d{10,15}$/.test(val), "Use E.164 format e.g. +923001234567"),
});

export default function PhoneNumber() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState("");
    const recaptchaDivRef = useRef(null);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { phone: "" },
    });

    // Optional: auto-prefix "+" if user types only digits
    function onPhoneInput(e) {
        const v = e.target.value.trim();
        if (/^\d+$/.test(v)) setValue("phone", `+${v}`, { shouldValidate: true });
    }

    // Ensure a single invisible reCAPTCHA instance
    useEffect(() => {
        // Clean old verifier on hot reloads/navigations
        return () => {
            if (window.recaptchaVerifier) {
                try { window.recaptchaVerifier.clear(); } catch { }
                window.recaptchaVerifier = null;
            }
        };
    }, []);

    async function onSubmit({ phone }) {
        setGeneralError("");
        setLoading(true);
        try {
            // validate with libphonenumber-js for safety
            const parsed = parsePhoneNumberFromString(phone);
            if (!parsed || !parsed.isValid()) {
                throw new Error("Invalid phone number format.");
            }
            const e164 = parsed.number; // already like +92300...

            // Create (or reuse) invisible reCAPTCHA
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaDivRef.current, {
                    size: "invisible",
                    callback: () => { },
                    "expired-callback": () => { },
                });
            } else {
                // if existing instance tied to another container, reattach silently
                try { window.recaptchaVerifier.render(); } catch { }
            }

            const confirmationResult = await signInWithPhoneNumber(auth, e164, window.recaptchaVerifier);
            // Store globally for next screen (simplest for now)
            window.confirmationResult = confirmationResult;

            // Navigate to OTP screen with phone in query (optional display)
            navigate(`/verify?phone=${encodeURIComponent(e164)}`);
        } catch (err) {
            console.error(err);
            setGeneralError(err?.message || "Failed to send OTP. Please try again.");
            // reset verifier so user can retry
            try {
                if (window.recaptchaVerifier) {
                    window.recaptchaVerifier.clear();
                    window.recaptchaVerifier = null;
                }
            } catch { }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
                <h1 className="text-2xl font-bold text-slate-900 text-center">Sign in with phone</h1>
                <p className="text-sm text-slate-600 text-center mt-1">Enter your number in E.164 format e.g. <span className="font-mono">+923001234567</span></p>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Phone number</label>
                        <input
                            type="tel"
                            placeholder="+923001234567"
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("phone")}
                            onInput={onPhoneInput}
                            inputMode="tel"
                            autoComplete="tel"
                        />
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                        )}
                    </div>

                    {generalError && (
                        <div className="rounded-md bg-red-50 border border-red-200 p-2 text-sm text-red-700">
                            {generalError}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 text-white py-2.5 font-medium hover:bg-blue-700 disabled:opacity-60"
                    >
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </button>

                    {/* Helper text */}
                    <p className="text-xs text-slate-500 text-center">
                        We’ll send a verification code to your phone number.
                    </p>
                </form>

                {/* Invisible reCAPTCHA anchor */}
                <div ref={recaptchaDivRef} id="recaptcha-container" />
            </div>
        </div>
    );
};