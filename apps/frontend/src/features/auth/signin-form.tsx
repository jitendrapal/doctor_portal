"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type SignInInput = z.infer<typeof schema>;

export function SignInForm() {
  const form = useForm<SignInInput>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <Card className="max-w-md">
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit((values) => console.log(values))}
      >
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            className="w-full rounded-xl border border-border bg-white/70 p-3 outline-none focus:ring-2 focus:ring-sky-300"
            {...form.register("email")}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full rounded-xl border border-border bg-white/70 p-3 outline-none focus:ring-2 focus:ring-sky-300"
            {...form.register("password")}
          />
        </div>
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </motion.div>
      </form>
    </Card>
  );
}
