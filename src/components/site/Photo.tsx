import type { Photo as P } from "@/config/site";
import { cn } from "@/lib/utils";

/** Toont een foto, of een neutrale placeholder als src nog ontbreekt. */
export function Photo({ photo, className, eager }: { photo: P; className?: string; eager?: boolean }) {
  if (!photo.src) {
    return (
      <div
        role="img"
        aria-label={`${photo.alt} (foto volgt)`}
        className={cn("flex items-center justify-center bg-secondary text-center text-secondary-foreground", className)}
      >
        <span className="px-6 text-sm font-medium opacity-70">Foto volgt binnenkort</span>
      </div>
    );
  }
  return (
    <img
      src={photo.src}
      alt={photo.alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={cn("object-cover", className)}
    />
  );
}
