import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({ rating = 5, className }: { rating?: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn("h-4 w-4", index < rating ? "fill-primary text-primary" : "text-border")}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}