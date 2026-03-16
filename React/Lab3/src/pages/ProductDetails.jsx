import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router";

const ProductDetails = () => {
  const { id } = useParams();

  return (
    <>
      {/* <div className="max-w-xl mx-auto mt-20 p-10 bg-white shadow-sm rounded-3xl border border-gray-100 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Product Inspection
        </h2>

        <p className="text-gray-500 text-lg mb-8">
          Fetching detailed data for Product ID:
          <span className="ml-2 font-mono font-black text-amber-600 bg-amber-100 px-3 py-1 rounded">
            {id}
          </span>
        </p>

        <Link className="bg-amber-900 p-3 rounded-xl text-white" to={"/"}>
          back to the home page
        </Link>
      </div> */}
    </>
  );
};
export default ProductDetails;
