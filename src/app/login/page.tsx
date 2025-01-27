"use client";
import { login, signup } from "./actions";
import AnonymousLogin from "@/components/AnonymousLogin";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Loading..." : children}
    </Button>
  );
}

const AuthComponent = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="login"
            value={mode}
            onValueChange={(value) => setMode(value as "login" | "signup")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form action={login}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      name="password"
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <SubmitButton>Log In</SubmitButton>
                </div>
              </form>
              <AnonymousLogin />
            </TabsContent>

            <TabsContent value="signup">
              <form action={signup}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Input type="text" placeholder="Full Name" required />
                  </div>
                  <div className="space-y-2">
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      name="password"
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                  <SubmitButton>Sign Up</SubmitButton>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-gray-600">
          Protected by modern security practices
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthComponent;
