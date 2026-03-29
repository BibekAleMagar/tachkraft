import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "../label";
import { Input } from "../input";

interface CustomInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

export const CustomInput = ({
  name,
  label,
  placeholder,
  type = "text",
}: CustomInputProps) => {
  // Automatically finds the form context from FormProvider
  const { control } = useFormContext();

  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Logic to determine if we should show the toggle and what the input type is
  const isPasswordInput = type === "password";
  const actualType = isPasswordInput && showPassword ? "text" : type;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-2 w-full">
          <Label className="text-sm font-medium text-slate-700">{label}</Label>

          <div className="relative">
            <Input
              {...field}
              type={actualType}
              placeholder={placeholder}
              className={`pr-10 transition-all ${
                error
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-slate-200"
              }`}
            />

            {/* Render Eye toggle only if type is password */}
            {isPasswordInput && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}
          </div>

          {error && (
            <span className="text-xs font-medium text-red-500">
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};
