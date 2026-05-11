"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/lib/trpc/react";
import Button from "./ui/Button";
import ErrorMessage from "./ui/ErrorMessage";
import { useState } from "react";
import { useT } from "@/hooks/useTranslation";

const betSchema = z.object({
  amount: z.number().min(1, "Must bet at least 1 TrumpBuck"),
  prediction: z.enum(["yes", "no"], { required_error: "Pick YES or NO" }),
});

type BetFormValues = z.infer<typeof betSchema>;

export default function BettingForm() {
  const { t } = useT();
  const utils = trpc.useUtils();
  const { data: prophecy, isLoading: prophecyLoading } = trpc.phrases.prophecyOfWeek.useQuery();
  const { data: profile } = trpc.user.profile.useQuery();
  const placeBet = trpc.bets.placeBet.useMutation({
    onSuccess: () => {
      utils.user.profile.invalidate();
      utils.bets.myBets.invalidate();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BetFormValues>({
    resolver: zodResolver(betSchema),
    defaultValues: { amount: 10, prediction: "yes" },
  });

  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const onSubmit = async (data: BetFormValues) => {
    if (!prophecy) return;
    setSuccessMsg(null);
    try {
      await placeBet.mutateAsync({
        prophecyId: prophecy.id,
        amount: data.amount,
        prediction: data.prediction === "yes",
      });
      setSuccessMsg(t("betting.betSuccess"));
    } catch (_err) {
      // error handled by mutation state
    }
  };

  if (prophecyLoading) return <p>{t("betting.loadingProphecy")}</p>;
  if (!prophecy) return <p>{t("betting.noProphecy")}</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
        <h2 className="font-bold text-lg">{t("betting.prophecyOfWeek")}</h2>
        <p className="italic">“{prophecy.text}”</p>
      </div>

      <div>
        <label className="block mb-1">
          {t("betting.balance", { balance: profile?.trumpbucksBalance ?? 0 })}
        </label>
        <label className="block mb-1">{t("betting.amountWagered")}</label>
        <input
          type="number"
          {...register("amount", { valueAsNumber: true })}
          className="w-full border rounded p-2 dark:bg-gray-800 dark:border-gray-600"
          min={1}
        />
        {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
      </div>

      <div>
        <label className="block mb-1">{t("betting.yourPrediction")}</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-1">
            <input type="radio" value="yes" {...register("prediction")} /> {t("betting.yes")}
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" value="no" {...register("prediction")} /> {t("betting.no")}
          </label>
        </div>
        {errors.prediction && <p className="text-red-500 text-sm">{errors.prediction.message}</p>}
      </div>

      <Button type="submit" disabled={placeBet.isPending}>
        {placeBet.isPending ? t("betting.placingBet") : t("betting.placeBet")}
      </Button>

      {placeBet.isError && <ErrorMessage message={placeBet.error?.message || t("betting.betFailed")} />}
      {successMsg && <p className="text-green-600">{successMsg}</p>}
    </form>
  );
}