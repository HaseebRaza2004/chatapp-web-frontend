import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessagesSquare, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  phone: z
    .string()
    .min(10, "Invalid phone number")
    .regex(/^\+\d{10,15}$/, "e.g. +923001234567"),
});

export default function PhoneNumber() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { phone: "+92" },
  });

  const handleInput = (e) => {
    const val = e.target.value.trim();
    if (!val.startsWith("+")) setValue("phone", `+${val}`);
  };

  const onSubmit = ({ phone }) => {
    navigate(`/verify?phone=${encodeURIComponent(phone)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50 animate-fadeIn px-5">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-7">
        {/* Logo */}
        <div className="flex justify-center mb-6 animate-scaleUp">
          <div className="p-3 bg-amber-100 rounded-full shadow">
            <MessagesSquare className="w-10 h-10 text-amber-600" />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-center text-gray-800">
          Verify your phone number
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          {/* Phone input */}

          <label className="text-sm text-gray-600 mb-1 block">
            e.g., +923001234567
          </label>

          <div
            className={`flex items-center gap-3 w-full rounded-lg border ${
              errors.phone
                ? "border-red-500 focus-within:ring-red-500"
                : "border-stone-300 focus-within:border-amber-500 focus-within:ring-amber-500"
            } px-3 py-3 bg-white shadow-sm focus-within:ring-2`}
          >
            <Phone className="w-5 h-5 text-gray-500" />
            <input
              type="tel"
              className="w-full outline-none text-gray-700"
              placeholder="+923001234567"
              {...register("phone")}
              onInput={handleInput}
            />
          </div>

          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone.message}</p>
          )}

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white 
            font-semibold py-3 rounded-full shadow-md transition active:scale-95"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
