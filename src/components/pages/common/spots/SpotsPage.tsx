// app/spots/page.tsx
"use client";

import { FoodSpotCard } from "@/components/shared/FoodSpotCard/FoodSpotCard";
import MyContainer from "@/components/shared/MyContainer/MyContainer";
import { foodSpots } from "@/data/foodSpots";
import { Empty } from "antd";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";

// Mock data matching your Prisma model
const spots = foodSpots;

const categories = [
  { id: "1", name: "Mexican" },
  { id: "2", name: "Asian" },
  { id: "3", name: "Snacks" },
  { id: "4", name: "Meals" },
];

const SpotsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  // Filter logic
  const filteredSpots = spots.filter((spot) => {
    const matchesSearch =
      spot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.category.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? spot.category.id === selectedCategory
      : true;
    const matchesPrice =
      spot.minPrice >= priceRange[0] && spot.maxPrice <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort logic
  const sortedSpots = [...filteredSpots].sort((a, b) => {
    if (sortBy === "popular") return b.votesCount - a.votesCount;
    if (sortBy === "rating") return b.averageRating - a.averageRating;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const onFavoriteToggle = async (id: string) => {
    console.log(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <MyContainer>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Discover Street Food
          </h1>
          <p className="text-gray-600 mt-2">
            Find the best hidden food spots in your city
          </p>
        </MyContainer>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white border-b sticky top-0 z-20">
        <MyContainer className="py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or category..."
                className="w-full border border-primary focus:outline-primary bg-transparent text-gray-400 rounded-lg p-2 pl-10 pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                className="appearance-none border border-primary focus:outline-primary bg-transparent text-primary rounded-lg p-2 pr-8 cursor-pointer w-full"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none border border-primary focus:outline-primary bg-transparent text-primary rounded-lg p-2 pr-8 cursor-pointer w-full"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([parseInt(e.target.value), priceRange[1]])
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], parseInt(e.target.value)])
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </MyContainer>
      </div>

      {/* Spots Grid */}
      <MyContainer className="py-8 md:py-12">
        {sortedSpots.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedSpots.map((spot) => (
              <FoodSpotCard
                key={spot?.id}
                spot={spot}
                onFavoriteToggle={onFavoriteToggle}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Empty description={false} />
            <h3 className="text-lg font-medium text-gray-900">
              No spots found
            </h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </MyContainer>
    </div>
  );
};

export default SpotsPage;
