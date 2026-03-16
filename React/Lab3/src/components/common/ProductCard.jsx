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

export function ProductCard({ id, title, price, category }) {
  return (
    <Card className="relative mx-auto w-full max-w-sm overflow-hidden border-none shadow-lg hover:shadow-xl transition-all">
      <div className="absolute inset-0 z-10 aspect-video bg-black/10" />
      <img
        src={`https://picsum.photos/see/${id}/400/225`}
        alt={title}
        className="relative z-0 aspect-video w-full object-cover"
      />
      <CardHeader className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="bg-amber-100 text-amber-700">
            {category || "New"}
          </Badge>
          <span className="font-bold text-amber-600">${price}</span>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>
          Explore the premium features of our latest {title.toLowerCase()}.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <CardFooter className="flex gap-2">
          <Link to={`/product/${id}`} className="flex-1">
            <Button className="w-full bg-black hover:bg-amber-600">
              View Details
            </Button>
          </Link>
          <Button
            variant="outline"
            className="flex-1 border-black hover:bg-gray-100"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </CardFooter>
    </Card>
  );
}
