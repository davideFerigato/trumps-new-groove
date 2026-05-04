"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/lib/trpc/react";
import { motion, AnimatePresence } from "framer-motion";
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

  const { data: count, isLoading: countLoading } = trpc.newsletter.count.useQuery();

  const onSubmit = (data: EmailForm) => {
    subscribe.mutate(data);
  };

  return (
    <section className="w-full max-w-4xl mx-auto mt-16 p-8 bg-surface-dark aztec-border rounded-xl">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-cinzel-decorative gold-shimmer uppercase">
            Receive the Emperor&apos;s Dispatches
          </h2>
          <p className="text-gold-600 mt-2">
            Join {countLoading ? "..." : count ?? 0} true believers
          </p>
        </div>

        <div className="flex-1 w-full max-w-md">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center p-4 rounded-lg bg-jungle-green/20 border border-jungle-green/30"
              >
                <span className="text-gold-400 font-cinzel-decorative">
                  The Emperor has received your oath
                </span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="flex gap-2"
              >
                <input
                  type="email"
                  placeholder="your.email@empire.com"
                  {...register("email")}
                  className="flex-1 px-4 py-2 bg-obsidian border border-gold-600 rounded-lg text-bone-white font-cinzel placeholder:text-gold-600/50 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  disabled={subscribe.isPending}
                  className="px-6 py-2 bg-gradient-to-r from-gold-600 to-gold-400 text-obsidian font-cinzel-decorative uppercase text-sm rounded-lg hover:golden-glow transition-all disabled:opacity-50"
                >
                  {subscribe.isPending ? "..." : "Pledge Loyalty"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          {errors.email && (
            <p className="text-aztec-red text-sm mt-2">{errors.email.message}</p>
          )}
          {subscribe.isError && (
            <p className="text-aztec-red text-sm mt-2">{subscribe.error?.message}</p>
          )}
        </div>
      </div>
    </section>
  );
}