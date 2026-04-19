import { PlayCircle, Info } from "lucide-react";

export default function MovieTrailer({ trailer, title, overview }) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h3 className="text-2xl font-bold flex items-center gap-2 text-foreground">
          <Info size={22} className="text-primary" />
          Overview
        </h3>
        <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl">
          {overview}
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold flex items-center gap-2 text-foreground">
          <PlayCircle size={22} className="text-primary" />
          Watch Trailer
        </h3>
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-border bg-card">
          {trailer ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${trailer}`}
              title={title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-secondary/20 space-y-2">
              <PlayCircle size={48} className="opacity-20" />
              <p>No trailer available for this title</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
