/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Loading from "@/components/shared/Loading/Loading";
import MyButton from "@/components/ui/MyButton/MyButton";
import { useGetSinglePostQuery } from "@/redux/features/posts/posts.user.api";
import { IFoodSpot } from "@/types";
import { ChevronLeft, Lock, MapPin, Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SpotDetailsPage = ({ spotId }: { spotId: string }) => {
  // const spot = {
  //   id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   title: "Mama's Taco Truck",
  //   description:
  //     "Authentic Mexican street tacos with homemade tortillas and a variety of salsas made daily. Famous for their al pastor tacos cooked on a vertical spit.",
  //   location: "Downtown Square, 5th Avenue",
  //   minPrice: 3.5,
  //   maxPrice: 8.0,
  //   category: {
  //     id: "c1",
  //     name: "Mexican",
  //   },
  //   status: "APPROVED",
  //   isPremium: true,
  //   adminComment: "Verified owner with food handling certificate",
  //   user: {
  //     id: "u1",
  //     name: "Maria Gonzalez",
  //     avatar: "/user-avatars/maria.jpg",
  //   },
  //   createdAt: new Date("2023-10-15T08:00:00Z"),
  //   commentsCount: 24,
  //   votesCount: 156,
  //   reviewCount: 156,
  //   averageRating: 4.8,
  //   isFavorite: false,
  //   image:
  //     "https://images.unsplash.com/photo-1702568206165-3e81c138e256?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // };

  const { data: response, isLoading } = useGetSinglePostQuery(spotId, {
    skip: !spotId,
  });

  const spot: IFoodSpot = response?.data;
  const priceRange = `$${spot?.minPrice.toFixed(2)} - $${spot?.maxPrice.toFixed(
    2
  )}`;
  const postedDate = new Date(spot?.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (isLoading) {
    return <Loading />;
  }

  console.log(response);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        href="/spots"
        className="inline-flex items-center mb-6 text-primary hover:underline"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to all spots
      </Link>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image */}
        <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
          <Image
            src={spot?.image || "/placeholder.png"}
            alt={spot?.title}
            fill
            className="object-cover"
            priority
          />

          {/* Premium Badge */}
          {spot?.isPremium && (
            <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-md">
              <Lock className="w-3 h-3 mr-1" />
              <span>Premium</span>
            </div>
          )}
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Title and Rating */}
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">{spot.title}</h1>
            <div className="flex items-center bg-primary/10 px-3 py-1 rounded-md">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
              <span className="font-medium">
                {spot?.averageRating.toFixed(1)} ({spot?.ratings?.length}{" "}
                reviews)
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-700">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            <span>{spot?.location}</span>
          </div>

          {/* Price and Category */}
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold text-primary">
              {priceRange}
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              {spot?.category?.name}
            </span>
          </div>

          {/* Description */}
          <div className="prose max-w-none">
            <p className="text-gray-700">{spot?.description}</p>
          </div>

          {/* Posted By */}
          <div className="flex items-center pt-4 border-t border-gray-200">
            {spot.user.profilePhoto ? (
              <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                <Image
                  src={spot?.user.profilePhoto || "/placeholder.png"}
                  alt={spot?.user.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium mr-3">
                {spot?.user?.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-medium">{spot?.user?.name}</p>
              <p className="text-sm text-gray-500">Posted on {postedDate}</p>
            </div>
          </div>

          {/* Admin Note */}
          {spot?.adminComment && (
            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">Admin Note:</p>
              <p className="text-sm text-yellow-700 mt-1">
                {spot?.adminComment}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <MyButton
              label={`Like (${spot?.upvoteCount})`}
              customIcon={<ThumbsUp className="w-5 h-5 mr-2" />}
              variant="outline"
              className="flex items-center"
            />
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {/* <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <ReviewSection spotId={spot.id} />
      </section> */}

      {/* Comments Section */}
      {/* <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">
          Comments ({spot.commentsCount})
        </h2>
        <CommentSection spotId={spot.id} />
      </section> */}
    </div>
  );
};

export default SpotDetailsPage;
