"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "../common/SubmitBtn";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { loginAction } from "@/app/actions/authActions";

export default function Login() {
  const initialState = {
    message: "",
    status: 0,
    errors: {},
    data: {},
  };

  const [state, formAction] = useFormState(loginAction, initialState);

  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
      signIn("credentials", {
        email: state.data?.email,
        password: state.data?.password,
        redirect: true,
        callbackUrl: "/dashboard",
      });
    }
  }, [state]);

  return (
    <form action={formAction}>
      <Card
        className="mx-4 mt-16 md:mt-0 max-w-sm  border-t-orange-600 border-b-pink-500 border-r-red-500 border-l-amber-500 
        border-[3px] 
      
      "
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center mb-2">
            Login
          </CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input placeholder="Type your email" name="email" />
              <span className="text-red-400">{state.errors?.email}</span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                placeholder="Type your password"
                name="password"
              />
              <span className="text-red-400">{state.errors?.password}</span>
            </div>
            <div className="text-right font-bold">
              <Link href="/forgot-password">Forgot Password?</Link>
            </div>
            <SubmitButton />
            <p className="text-center mt-2">
              Don't have an account ?{" "}
              <strong>
                <Link href="/register">Register</Link>
              </strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
