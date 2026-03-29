import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";
import { useForm, FormProvider } from "react-hook-form";
import { CustomInput } from "../ui/forms/CustomInput";
import type { RegisterDto } from "../types/register";
import { registerSchema } from "../schema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useRegister } from "../../hooks/mutaion/register";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Register = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useRegister();
  const form = useForm<RegisterDto>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const handleSubmit = (payload: RegisterDto) => {
    try {
      mutateAsync(payload);
      toast.success("User Created Successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      navigate("/");
    }
  };
  return (
    <>
      <div className="h-screen p-2 lg:p-0 flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-200">
        <Card className="w-full lg:max-w-xl">
          <CardHeader>
            <CardTitle>Register your account</CardTitle>
            <CardDescription>Get access to all features</CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...form}>
              <form
                className="space-y-3"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <div className="grid lg:grid-cols-2 gap-4 items-start">
                  <CustomInput
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your name"
                  />
                  <CustomInput
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter last name"
                  />
                </div>
                <div>
                  <CustomInput
                    name="email"
                    label=" Email"
                    placeholder="example@gmail.com"
                  />
                </div>
                <div>
                  <CustomInput
                    name="password"
                    label="Password"
                    placeholder="*******"
                    type="password"
                  />
                </div>
                <Button className="w-full cursor-pointer" type="submit">
                  {isPending ? "Registering..." : "Register"}
                </Button>
                <p className="text-sm text-center mt-2">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
