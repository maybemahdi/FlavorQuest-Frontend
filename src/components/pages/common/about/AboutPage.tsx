// app/about/page.tsx
"use client";
import Image from "next/image";
import { MapPin, Users, Star } from "lucide-react";
import { FoodSpotCard } from "@/components/shared/FoodSpotCard/FoodSpotCard";
import { foodSpots } from "@/data/foodSpots";
import MyButton from "@/components/ui/MyButton/MyButton";
import Link from "next/link";
import SectionHead from "@/components/shared/SectionHead/SectionHead";
import MyContainer from "@/components/shared/MyContainer/MyContainer";

const AboutPage = () => {
  const onFavoriteToggle = async (id: string) => {
    console.log(id);
  };
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Story Behind <span className="text-primary">FlavorQuest</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            We’re on a mission to connect food lovers with the best hidden
            street food spots around the world.
          </p>
          <Link
            href={"/auth/register"}
            className="flex items-center justify-center"
          >
            <MyButton label="Join Our Community" className="rounded-full" />
          </Link>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-6 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                Street food is more than just a quick bite—it’s culture,
                tradition, and passion served on a plate. Yet, many of these
                incredible spots remain undiscovered.
              </p>
              <p className="text-gray-600 mb-6">
                FlavorQuest was born to solve this. We empower foodies to share
                their finds, rate their experiences, and build a community
                around authentic street food.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-amber-100 px-4 py-2 rounded-full">
                  <MapPin className="text-amber-600 mr-2" size={18} />
                  <span className="text-sm font-medium">15+ Cities</span>
                </div>
                <div className="flex items-center bg-amber-100 px-4 py-2 rounded-full">
                  <Users className="text-amber-600 mr-2" size={18} />
                  <span className="text-sm font-medium">10K+ Foodies</span>
                </div>
                <div className="flex items-center bg-amber-100 px-4 py-2 rounded-full">
                  <Star className="text-amber-600 mr-2" size={18} />
                  <span className="text-sm font-medium">5K+ Reviews</span>
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1737786609145-2b24ed22cfe9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Street food market"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-6 md:py-12 bg-slate-100/90">
        <MyContainer>
          <SectionHead title="How FlavorQuest Works" className="mb-8 md:mb-10" />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover</h3>
              <p className="text-gray-600">
                Browse hidden street food spots recommended by our community.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share</h3>
              <p className="text-gray-600">
                Post your favorite finds and help others explore great food.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">
                Join a community of food lovers and support local vendors.
              </p>
            </div>
          </div>
        </MyContainer>
      </section>

      {/* Featured Spots (Example) */}
      <section className="py-6 md:py-12">
        <MyContainer>
        <SectionHead title="Recently Added Gems" className="mb-8 md:mb-10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example FoodSpotCards */}
            <FoodSpotCard
              spot={foodSpots[0]}
              onFavoriteToggle={onFavoriteToggle}
            />
            <FoodSpotCard
              spot={foodSpots[0]}
              onFavoriteToggle={onFavoriteToggle}
            />
            <FoodSpotCard
              spot={foodSpots[0]}
              onFavoriteToggle={onFavoriteToggle}
            />
            {/* Add 2 more example cards */}
          </div>
        </MyContainer>
      </section>

      {/* CTA */}
      <section className="py-6 md:py-12 bg-primary text-white text-center">
        <MyContainer>
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of foodies discovering the best street food in their
            city.
          </p>
          <Link
            href={"/auth/register"}
            className="flex items-center justify-center"
          >
            <MyButton
              label="Sign Up Free"
              className="!bg-white !text-primary rounded-full hover:bg-gray-100 px-8 py-3 font-bold"
            />
          </Link>
        </MyContainer>
      </section>
    </div>
  );
};

export default AboutPage;
