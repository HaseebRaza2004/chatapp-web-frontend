import { Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./ui/Button";

const schema = z.object({
  phone: z
    .string()
    .min(10, "Invalid phone number")
    .regex(/^\+\d{10,15}$/, "e.g. +92 300 1234567"),
});

export default function PhoneInputForm({ onSubmit }) {
  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: zodResolver(schema),
    // defaultValues: { phone: "+92" },
  });

  const { errors, isSubmitting } = formState;

  const handleInput = (e) => {
    const val = e.target.value.trim();
    if (!val.startsWith("+")) setValue("phone", `+${val}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
      {/* Input Field */}
      <div
        className={`flex items-center gap-3 w-full rounded-lg border px-3 py-3 bg-white shadow-sm focus-within:ring-2 transition ${
          errors.phone
            ? "border-red-500 focus-within:ring-red-400"
            : "border-stone-300 focus-within:border-amber-500 focus-within:ring-amber-400"
        }`}
      >
        <Phone className="w-5 h-5 text-gray-500" />
        <input
          type="tel"
          placeholder="+92 300 1234567"
          className="w-full outline-none text-gray-700 placeholder:text-gray-400"
          {...register("phone")}
          onInput={handleInput}
        />
      </div>

      {errors.phone && (
        <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
      )}

      {/* Button */}
      <Button type="submit" variant="primary" loading={isSubmitting}>
        Continue
      </Button>
    </form>
  );
}
