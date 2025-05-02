import { IFoodSpot } from "@/types";

export const foodSpots: IFoodSpot[] = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    title: "Mama's Taco Truck",
    description:
      "Authentic Mexican street tacos with homemade tortillas and a variety of salsas made daily. Famous for their al pastor tacos cooked on a vertical spit.",
    location: "Downtown Square, 5th Avenue",
    minPrice: 3.5,
    maxPrice: 8.0,
    userId: "string",
    categoryId: "string",
    image:
      "https://images.unsplash.com/photo-1702568206165-3e81c138e256?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: {
      id: "c1",
      name: "Mexican",
    },
    status: "APPROVED",
    isPremium: true,
    adminComment: "Verified owner with food handling certificate",
    user: {
      id: "u1",
      name: "Maria Gonzalez",
      avatar: "/user-avatars/maria.jpg",
    },
    createdAt: new Date("2023-10-15T08:00:00Z"),
    commentsCount: 24,
    votesCount: 156,
    reviewCount: 156,
    averageRating: 4.8,
    isFavorite: false,
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
    title: "Dragon Noodle House",
    description:
      "Sizzling wok noodles with customizable spice levels. Specializing in Sichuan-style street noodles with authentic ingredients imported weekly.",
    location: "Chinatown Night Market, Stall #12",
    minPrice: 5.0,
    maxPrice: 12.0,
    userId: "string",
    categoryId: "string",
    image:
      "https://images.unsplash.com/photo-1702568206165-3e81c138e256?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: {
      id: "c2",
      name: "Asian",
    },
    status: "APPROVED",
    isPremium: false,
    adminComment: "",
    user: {
      id: "u2",
      name: "Li Wei",
      avatar: "/user-avatars/li.jpg",
    },
    createdAt: new Date("2023-11-02T10:15:00Z"),
    commentsCount: 18,
    votesCount: 92,
    reviewCount: 92,
    averageRating: 4.6,
    isFavorite: true,
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
    title: "Burger Bunker",
    description:
      "Gourmet smash burgers with secret sauce and locally sourced beef. Features monthly special burgers voted by customers.",
    location: "Food Truck Park, West Side",
    minPrice: 6.5,
    maxPrice: 14.0,
    userId: "string",
    categoryId: "string",
    image:
      "https://images.unsplash.com/photo-1702568206165-3e81c138e256?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: {
      id: "c3",
      name: "American",
    },
    status: "PENDING",
    isPremium: false,
    adminComment: "Needs verification of business license",
    user: {
      id: "u3",
      name: "Jamal Wilson",
      avatar: "/user-avatars/jamal.jpg",
    },
    createdAt: new Date("2023-11-10T16:45:00Z"),
    commentsCount: 5,
    votesCount: 32,
    reviewCount: 32,
    averageRating: 4.2,
    isFavorite: false,
  },
];
