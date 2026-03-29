import { useState } from "react";
import { MapPin, AlertCircle, Home, Heart } from "lucide-react";
import { useProperty } from "../../hooks/query/property";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useAddFavourite } from "../../hooks/mutaion/favourite";
import { toast } from "react-toastify";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop";

export const PropertyList = () => {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const { data, isLoading, error } = useProperty();
  const { mutateAsync } = useAddFavourite();

  const handleFavourite = async (id: number) => {
    setLoadingId(id);
    try {
      await mutateAsync(id);
      toast.success("Added to favourites");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = DEFAULT_IMAGE;
  };

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 text-red-500">
          <AlertCircle className="h-10 w-10 mb-2" />
          <p>Failed to load properties. Please try again later.</p>
        </div>
      ) : data && data.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((property) => (
            <Card
              className="group relative overflow-hidden transition-all hover:shadow-md border-none bg-slate-50/50"
              key={property.id}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 z-10 bg-black/5 transition-colors group-hover:bg-black/20" />
                <img
                  src={property.imageUrl || DEFAULT_IMAGE}
                  alt={property.title}
                  onError={handleImageError}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute top-3 right-3 z-20">
                  <Badge
                    variant="secondary"
                    className="bg-white/80 backdrop-blur-sm text-slate-900 border-none shadow-sm"
                  >
                    <MapPin className="mr-1 h-3 w-3 text-indigo-600" />
                    {property.location.split(",")[0]}
                  </Badge>
                </div>

                <div className="absolute bottom-3 left-3 z-20">
                  <Badge className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-1 shadow-lg border-none">
                    Rs. {property.price.toLocaleString()}
                  </Badge>
                </div>

                {property.isFavourite && (
                  <div className="absolute top-3 left-3 z-20">
                    <div className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-sm">
                      <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                    </div>
                  </div>
                )}
              </div>

              <CardHeader className="space-y-1">
                <div className="flex items-center text-xs font-medium text-indigo-600 uppercase tracking-wider">
                  {property.location}
                </div>
                <CardTitle className="line-clamp-1 text-xl font-bold text-slate-800">
                  {property.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-slate-500">
                  {property.description}
                </CardDescription>
              </CardHeader>

              <CardFooter>
                {property.isFavourite ? (
                  <Button
                    className="w-full bg-red-50 text-red-500 border border-red-200 rounded-lg cursor-not-allowed hover:bg-red-50"
                    variant="outline"
                    disabled
                  >
                    <Heart className="mr-2 h-4 w-4 fill-red-500 text-red-500" />
                    Already a favourite
                  </Button>
                ) : (
                  <Button
                    className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all"
                    variant="default"
                    disabled={loadingId === property.id}
                    onClick={() => handleFavourite(property.id)}
                  >
                    <Heart
                      className={`mr-2 h-4 w-4 ${loadingId === property.id ? "animate-pulse" : ""}`}
                    />
                    {loadingId === property.id
                      ? "Adding..."
                      : "Add to favourites"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Home className="h-10 w-10 mb-2 opacity-20" />
          <p>No properties found in the database.</p>
        </div>
      )}
    </div>
  );
};
