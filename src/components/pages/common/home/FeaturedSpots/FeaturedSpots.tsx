// components/FeaturedSpots.tsx
import { FoodSpotCard } from "@/components/shared/FoodSpotCard/FoodSpotCard";
import MyContainer from "@/components/shared/MyContainer/MyContainer";
import SectionHead from "@/components/shared/SectionHead/SectionHead";
import MyButton from "@/components/ui/MyButton/MyButton";
import { foodSpots } from "@/data/foodSpots";
import { IPost } from "@/types/post.interface";
import Link from "next/link";

export default function FeaturedSpots() {
  return (
    <section className="py-12 md:py-16 bg-slate-100/90">
      <MyContainer>
        <div className="flex justify-between items-center mb-6 md:mb-10">
          <SectionHead title="Featured Street Eats" />
          <Link href={"/spots"} className="hidden md:block">
            <MyButton label="View all" isArrow className="rounded-full" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foodSpots?.map((spot: IPost) => (
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
