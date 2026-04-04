"use client";

import { useEffect, useState } from "react";
import { Recipe } from "@/types/recipe";
import RecipeLoading from "./loading";
import RecipeError from "./error";
import RecipeCard from "@/components/common/recipesCard";
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
      <div className="mb-12">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-amber-600">
          Recipes <span className="text-black italic">.</span>
        </h1>
        <p className="text-gray-400 text-[10px] font-bold tracking-[0.3em] uppercase mt-2">
          Proxy Data Fetching • Client Side
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
}
