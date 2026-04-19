import { useState, useEffect } from "react";
import {
  getMovieDetails,
  getMovieRecommendations,
} from "../services/movieService";
import tmdbClient from "@/services/tmdbClient";

export function useMovieDetails(id) {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const [movieRes, recsRes] = await Promise.all([
          getMovieDetails(id),
          getMovieRecommendations(id),
        ]);

        setMovie(movieRes.data);

        const videosRes = await tmdbClient.get(`/movie/${id}/videos`);
        const mainTrailer = videosRes.data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube",
        );
        setTrailer(mainTrailer ? mainTrailer.key : null);

        setRecommendations(recsRes.data.results.slice(0, 6));
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  return { movie, trailer, recommendations, loading, error };
}
