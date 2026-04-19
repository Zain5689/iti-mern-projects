import { Info, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MovieNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-destructive/20 blur-3xl rounded-full animate-pulse" />
        <div className="relative bg-background border-2 border-destructive/20 p-6 rounded-full shadow-[0_0_50px_rgba(239,68,68,0.1)]">
          <Info size={64} className="text-destructive animate-bounce" />
        </div>
      </div>

      <div className="space-y-3 max-w-md">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          Oops! Movie Not Found
        </h1>
        <p className="text-muted-foreground text-lg font-light leading-relaxed">
          The movie you're looking for might have been removed, or the link is
          incorrect. Don't worry, there's plenty more to watch!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-secondary text-secondary-foreground font-bold hover:bg-secondary/80 transition-all active:scale-95 border border-white/5"
        >
          <ArrowLeft size={20} />
          Go Back
        </button>

        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:shadow-[0_0_25px_rgba(var(--primary),0.4)] transition-all active:scale-95"
        >
          <Home size={20} />
          Back to Home
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-destructive/20 to-transparent" />
    </div>
  );
}
