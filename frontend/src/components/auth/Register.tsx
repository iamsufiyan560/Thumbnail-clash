import React from "react";
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

const Register = () => {
  return (
    <form className="w-full max-w-sm mx-auto">
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
          </div>
          <div className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input placeholder="Type your email" name="email" />
          </div>
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              placeholder="Type your password"
              name="password"
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="cpassword">Confirm Password</Label>
            <Input
              type="password"
              placeholder="Type your password"
              name="confirm_password"
            />
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
