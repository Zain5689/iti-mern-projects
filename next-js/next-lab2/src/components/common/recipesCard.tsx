import Image from "next/image";
import { Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative w-full h-64 overflow-hidden rounded-[2.5rem] mb-4 shadow-sm bg-gray-100">
        <Image
          src={recipe.image}
          alt={recipe.name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black shadow-sm">
          ★ {recipe.rating}
        </div>
      </div>

      <h2 className="text-xl font-black tracking-tight group-hover:text-amber-600 transition-colors uppercase italic">
        {recipe.name}
      </h2>
      <p className="text-gray-400 text-[10px] font-bold uppercase mt-1 tracking-widest italic">
        Review: {recipe.reviewCount} users
      </p>
    </div>
  );
};

export default RecipeCard;
