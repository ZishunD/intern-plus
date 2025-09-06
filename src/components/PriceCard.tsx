/* eslint-disable @typescript-eslint/no-explicit-any */
// components/PriceCard.tsx
import Package from "@/components/Package";

interface PriceCardProps {
  category?: "month" | "year";
  monthly: any;
  yearly: any;
}

export default function PriceCard({
  category = "month",
  monthly,
  yearly,
}: PriceCardProps) {
  return (
    <div className='price-card p-6 flex rounded space-x-6 justify-center'>
      {category === "month" && <Package priceinfos={monthly} />}
      {category === "year" && <Package priceinfos={yearly} />}
    </div>
  );
}
