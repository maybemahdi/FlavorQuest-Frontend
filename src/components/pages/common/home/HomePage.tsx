import React from "react";
import FeaturedSpots from "./FeaturedSpots/FeaturedSpots";
import Banner from "./Banner/Banner";
import FoodCategories from "./FoodCategories/FoodCategories";
import PremiumBenefits from "./PremiumBenefits/PremiumBenefits";
import TopRated from "./TopRated/TopRated";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <FeaturedSpots />
      <FoodCategories />
      <PremiumBenefits />
      <TopRated />
    </div>
  );
};

export default HomePage;
