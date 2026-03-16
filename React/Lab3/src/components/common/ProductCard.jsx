import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProductCard({ id, title, price, category, thumbnail }) {
  return (
    <Card className="relative mx-auto w-full max-w-sm overflow-hidden border-none shadow-lg hover:shadow-xl transition-all group">
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <div className="absolute inset-0 z-10 bg-black/5 group-hover:bg-black/0 transition-colors" />
        <img
          src={thumbnail}
          alt={title}
          className="relative z-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardHeader className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <Badge
            variant="secondary"
            className="bg-amber-100 text-amber-700 capitalize"
          >
            {category}
          </Badge>
          <span className="font-bold text-amber-600">${price}</span>
        </div>
        <CardTitle className="text-xl truncate">{title}</CardTitle>
        <CardDescription className="line-clamp-2">
          Discover our premium {category} collection featuring the latest{" "}
          {title}.
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex gap-2">
        <Link to={`/product/${id}`} className="flex-1">
          <Button className="w-full bg-black hover:bg-amber-600">
            Details
          </Button>
        </Link>
        <Button
          variant="outline"
          className="flex-1 border-black hover:bg-black hover:text-white transition-all"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
