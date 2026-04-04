"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Recipe } from "@/types/recipe";
import Image from "next/image";
import Link from "next/link";

export default function RecipeDetailsPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/recipes/${id}`);
        if (!res.ok) throw new Error("Recipe not found");
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        console.error(err);
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-amber-600 rounded-full animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
          Loading Recipe Details...
        </p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-black uppercase italic mb-4">
          Recipe Not Found
        </h2>
        <Link
          href="/recipes"
          className="bg-black text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all"
        >
          Return to Recipes
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto py-2 px-6">
      <Link
        href="/recipes"
        className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-amber-600 transition-colors mb-12 inline-block"
      >
        ← Back to Recipes
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="sticky top-10">
          <div className="relative aspect-4/5 rounded-[3.5rem] overflow-hidden shadow-2xl bg-gray-100 border border-gray-100">
            <Image
              src={recipe.image}
              alt={recipe.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-sm font-black shadow-lg">
              ★ {recipe.rating}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <span className="text-amber-600 font-black text-[11px] uppercase tracking-[0.5em] mb-4 block">
            {recipe.cuisine} Cuisine • {recipe.difficulty}
          </span>

          <h1 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9] mb-8">
            {recipe.name}
          </h1>

          <div className="flex gap-10 mb-12 border-y border-gray-100 py-6">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Prep Time
              </p>
              <p className="font-black italic text-xl">
                {recipe.prepTimeMinutes} MIN
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Calories
              </p>
              <p className="font-black italic text-xl">
                {recipe.caloriesPerServing} KCAL
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Servings
              </p>
              <p className="font-black italic text-xl">
                {recipe.servings} PERS
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6 bg-black text-white inline-block px-4 py-1 transform -skew-x-12">
              Ingredients
            </h3>
            <ul className="space-y-4">
              {recipe.ingredients.map((ing, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 text-gray-600 group"
                >
                  <span className="w-2 h-2 bg-amber-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span className="font-medium tracking-tight">{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6 bg-amber-500 text-white inline-block px-4 py-1 transform -skew-x-12">
              Preparation
            </h3>
            <div className="space-y-8">
              {recipe.instructions.map((step, i) => (
                <div key={i} className="relative pl-12">
                  <span className="absolute left-0 top-0 text-4xl font-black italic text-gray-100 leading-none">
                    {i + 1}
                  </span>
                  <p className="text-gray-600 leading-relaxed font-medium pt-2">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
