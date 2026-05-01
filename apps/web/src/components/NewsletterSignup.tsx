"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/lib/trpc/react";
import Button from "./ui/Button";
import { useState } from "react";

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type EmailForm = z.infer<typeof emailSchema>;

export default function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
  });

  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const onSubmit = (data: EmailForm) => {
    subscribe.mutate(data);
  };

  return (
    <section className="w-full max-w-md mx-auto mt-12 p-6 bg-gradient-to-br from-red-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-2">📬 Join the Believers</h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
        Get the weekly prophecy straight to your inbox.
      </p>
      {submitted ? (
        <p className="text-center text-green-600 font-semibold">
          Confirmation email sent! Check your inbox.
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            aria-label="Email address"
          />
          <Button type="submit" disabled={subscribe.isPending}>
            {subscribe.isPending ? "Sending..." : "Subscribe"}
          </Button>
        </form>
      )}
      {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
      {subscribe.isError && (
        <p className="text-red-500 text-sm mt-2">{subscribe.error?.message || "Subscription failed"}</p>
      )}
      <SubscriberCount />
    </section>
  );
}

function SubscriberCount() {
  const { data: count, isLoading } = trpc.newsletter.count.useQuery();
  if (isLoading) return <p className="text-center text-sm mt-2">Loading...</p>;
  return (
    <p className="text-center text-sm mt-2 font-semibold text-yellow-600">
      Join {count ?? 0} believers
    </p>
  );
}