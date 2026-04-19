import { useParams, useNavigate } from "react-router-dom";
import { usePageTitle } from "@/hooks";
import MovieDetailsSkeleton from "@/components/common/MovieDetailsSkeleton";
import MovieInfo from "@/components/sections/MovieInfo";
import MovieTrailer from "@/components/sections/MovieTrailer";
import MovieRecommendations from "@/components/sections/MovieRecommendations";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import MovieNotFound from "@/components/sections/MovieNotFound";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, trailer, recommendations, loading, error } =
    useMovieDetails(id);

  usePageTitle(movie ? movie.title : "Loading Movie...");

  if (loading) return <MovieDetailsSkeleton />;
  if (error || !movie) return <MovieNotFound />;

  return (
    <div className="bg-background text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <MovieInfo movie={movie} onlyPoster={true} />

          <div className="md:col-span-2 space-y-10">
            <MovieInfo movie={movie} onlyDetails={true} />
            <MovieTrailer
              trailer={trailer}
              title={movie.title}
              overview={movie.overview}
            />
          </div>
        </div>

        <MovieRecommendations
          recommendations={recommendations}
          onCardClick={(id) => navigate(`/movie/${id}`)}
        />
      </div>
    </div>
  );
}
