import MovieCard from "@/components/common/MovieCard"

export default function MovieRecommendations({ recommendations, onCardClick }) {
  if (!recommendations?.length) return null

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-[var(--color-text)]">
        Recommendations
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recommendations.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}
