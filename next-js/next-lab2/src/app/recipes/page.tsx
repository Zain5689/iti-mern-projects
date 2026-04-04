"use client";

import { useEffect, useState } from "react";
import { Recipe } from "@/types/recipe";
import RecipeLoading from "./loading";
import RecipeError from "./error";
import Image from "next/image";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/recipes");
      if (!res.ok) throw new Error("Could not fetch recipes via proxy.");

      const data = await res.json();
      setRecipes(data.recipes);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (loading) return <RecipeLoading />;
  if (error) return <RecipeError message={error} retry={fetchRecipes} />;

  return (
    <main className="max-w-7xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-black italic uppercase mb-10 tracking-tighter text-amber-600">
        Recipes <span className="text-black italic">.</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {recipes.map((r) => (
          <div key={r.id} className="group cursor-pointer">
            <div className="relative w-full h-64 overflow-hidden rounded-[2.5rem] mb-4 shadow-sm bg-gray-100">
              <Image
                src={r.image}
                alt={r.name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black shadow-sm">
                ★ {r.rating}
              </div>
            </div>

            <h2 className="text-xl font-black tracking-tight group-hover:text-amber-600 transition-colors">
              {r.name}
            </h2>
            <p className="text-gray-400 text-[10px] font-bold uppercase mt-1 tracking-widest italic">
              Review: {r.reviewCount} users
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
