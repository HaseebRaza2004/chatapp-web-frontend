import { Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/Button";
import Input from "../ui/Input";

const schema = z.object({
  phone: z
    .string()
    .min(10, "Invalid phone number")
    .regex(/^\+\d{10,15}$/, "e.g. +92 300 1234567"),
});

export default function PhoneInputForm({ onSubmit }) {
  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: zodResolver(schema),
  });

  const { errors, isSubmitting } = formState;

  const handleInput = (e) => {
    const val = e.target.value.trim();
    if (!val.startsWith("+")) setValue("phone", `+${val}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
      <Input
        name="phone"
        type="tel"
        placeholder="+92 300 1234567"
        icon={<Phone className="w-5 h-5" />}
        register={register("phone")}
        error={errors?.phone?.message}
        onInput={handleInput}
      />

      {/* Button */}
      <Button type="submit" variant="primary" loading={isSubmitting}>
        Continue
      </Button>
    </form>
  );
}
