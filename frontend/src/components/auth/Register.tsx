"use client";
import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SubmitButton } from "../common/SubmitBtn";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { registerAction } from "@/app/actions/authActions";
import { toast } from "sonner";

const Register = () => {
  const router = useRouter();
  const initialState = {
    message: "",
    status: 0,
    errors: {},
  };

  const [state, formAction] = useFormState(registerAction, initialState);

  useEffect(() => {
    if (state.status === 404) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
    } else if (state.status === 500) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="w-full max-w-sm mx-auto">
      <Card className="border-t-orange-600 border-b-pink-500 border-r-red-500 border-l-amber-500 border-[3px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center mb-2">
            Register
          </CardTitle>
          <CardDescription>
            Enter your email and password to Register to your account & Start
            Clashing Now
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4">
            <Label htmlFor="name">Name</Label>
            <Input placeholder="Type your name" name="name" />
            <span className="text-red-400">{state.errors?.name}</span>
          </div>
          <div className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input placeholder="Type your email" name="email" />
            <span className="text-red-400">{state.errors?.email}</span>
          </div>
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              placeholder="Type your password"
              name="password"
            />
            <span className="text-red-400">{state.errors?.password}</span>
          </div>
          <div className="mt-4">
            <Label htmlFor="cpassword">Confirm Password</Label>
            <Input
              type="password"
              placeholder="Type your password"
              name="confirm_password"
            />
            <span className="text-red-400">
              {state.errors?.confirm_password}
            </span>
          </div>
          <div className="mt-4">
            <SubmitButton />
            <p className="text-center mt-2">
              Already have an account?{" "}
              <strong>
                <Link href="/login">Login</Link>
              </strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default Register;
