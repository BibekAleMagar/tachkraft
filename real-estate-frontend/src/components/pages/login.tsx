import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";
import { useForm, FormProvider } from "react-hook-form";
import { CustomInput } from "../ui/forms/CustomInput";
import type { LoginDto } from "../types/login";
import { loginSchema } from "../schema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogin } from "../../hooks/mutaion/login";

export const Login = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useLogin();

  const form = useForm<LoginDto>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const handleSubmit = async (payload: LoginDto) => {
    try {
      const res = await mutateAsync(payload);

      localStorage.setItem("token", res.access_token);
      localStorage.setItem("user", JSON.stringify(res.user));

      toast.success("Login successful");

      navigate("/property");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen p-2 lg:p-0 flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-200">
      <Card className="w-full lg:max-w-xl">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Welcome back 👋</CardDescription>
        </CardHeader>

        <CardContent>
          <FormProvider {...form}>
            <form
              className="space-y-3"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <div>
                <CustomInput
                  name="email"
                  label="Email"
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
                {isPending ? "Logging in..." : "Login"}
              </Button>
              <p className="text-sm text-center mt-2">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-indigo-600 hover:underline font-medium"
                >
                  Register
                </Link>
              </p>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};
