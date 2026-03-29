import { MapPin, AlertCircle, HeartOff, Loader2 } from "lucide-react";
import { useAddFavourite } from "../../../hooks/mutaion/favourite";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { toast } from "react-toastify";
import type { FavouriteDto } from "../../types/favourite";
import { useRemoveFavourites } from "../../../hooks/mutaion/favourite";
import { useFavorites } from "../../../hooks/query/favourite";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop";

export const Favourite = () => {
  const { data, isLoading, error } = useFavorites();
  const { mutateAsync, isPending } = useRemoveFavourites();

  const handleRemoveFavourite = async (id: number) => {
    try {
      await mutateAsync(id);
      toast.success("Favourites removed");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = DEFAULT_IMAGE;
  };

  return (
    <div className="p-4">
      <div className="mb-6 px-2">
        <h1 className="text-2xl font-bold text-slate-900">My Favourites</h1>
        <p className="text-slate-500 text-sm">Manage your saved dream homes.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card
              key={i}
              className="overflow-hidden border-none bg-slate-50/50"
            >
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
          <p className="font-medium">Failed to load favourites.</p>
        </div>
      ) : data && data.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((fav: FavouriteDto) => (
            <Card
              className="group relative overflow-hidden transition-all hover:shadow-md border-none bg-slate-50/50"
              key={fav.id}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 z-10 bg-black/5 transition-colors group-hover:bg-black/20" />

                <img
                  src={fav.property.imageUrl || DEFAULT_IMAGE}
                  alt={fav.property.title}
                  onError={handleImageError}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute top-3 right-3 z-20">
                  <Badge
                    variant="secondary"
                    className="bg-white/80 backdrop-blur-sm text-slate-900 border-none shadow-sm"
                  >
                    <MapPin className="mr-1 h-3 w-3 text-indigo-600" />
                    {fav.property.location.split(",")[0]}
                  </Badge>
                </div>

                <div className="absolute bottom-3 left-3 z-20">
                  <Badge className="bg-indigo-600 text-white px-3 py-1 shadow-lg border-none">
                    Rs. {fav.property.price.toLocaleString()}
                  </Badge>
                </div>
              </div>

              <CardHeader className="space-y-1">
                <div className="flex items-center text-xs font-medium text-indigo-600 uppercase tracking-wider">
                  {fav.property.location}
                </div>
                <CardTitle className="line-clamp-1 text-xl font-bold text-slate-800">
                  {fav.property.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-slate-500">
                  {fav.property.description}
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Button
                  className="cursor-pointer border border-red-500 w-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-lg transition-all"
                  variant="outline"
                  onClick={() => handleRemoveFavourite(fav.property.id)}
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Remove from Favourites
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-slate-400">
          <HeartOff className="h-12 w-12 mb-4 opacity-20" />
          <p className="font-medium text-slate-900">No properties saved yet.</p>
          <p className="text-sm">Start exploring to fill your list!</p>
        </div>
      )}
    </div>
  );
};
