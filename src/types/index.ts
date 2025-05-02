export interface IFoodSpot {
  id: string;
  title: string;
  description: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  image: string;
  category: {
    id: string;
    name: string;
  };
  status: "PENDING" | "APPROVED" | "REJECTED";
  isPremium: boolean;
  adminComment?: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  commentsCount: number;
  votesCount: number;
  reviewCount: number;
  averageRating: number;
  isFavorite?: boolean;
  className?: string;
  onFavoriteToggle?: () => void;
  showAdminInfo?: boolean;
}
