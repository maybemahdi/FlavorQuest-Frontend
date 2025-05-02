// components/FeaturedSpots.tsx
import { foodSpots } from "@/data/foodSpots";
import { FoodSpotCard } from "@/components/shared/FoodSpotCard/FoodSpotCard";
import { IFoodSpot } from "@/types";
import MyButton from "@/components/ui/MyButton/MyButton";
import MyContainer from "@/components/shared/MyContainer/MyContainer";
import Link from "next/link";
import SectionHead from "@/components/shared/SectionHead/SectionHead";

export default function FeaturedSpots() {
  return (
    <section className="py-12 md:py-16 bg-slate-100/90">
      <MyContainer>
        <div className="flex justify-between items-center mb-6 md:mb-10">
          <SectionHead title="Featured Street Eats" />
          <Link href={"/feed"} className="hidden md:block">
            <MyButton label="View all" isArrow className="rounded-full" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foodSpots?.map((spot: IFoodSpot) => (
            <FoodSpotCard
              key={spot?.id}
              spot={spot}
              // onFavoriteToggle={onFavoriteToggle}
            />
          ))}
        </div>
      </MyContainer>
    </section>
  );
}
