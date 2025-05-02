import { LocationEdit, Star, Vote } from "lucide-react";

const UserDashboardHomePage = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-primary">
        {/* Stat Card Template */}
        {[
          {
            title: "Total Posts",
            value: "55",
            icon: <LocationEdit size={30} className="text-white" />,
          },
          {
            title: "Total Votes",
            value: "Upvote: 5, Downvote: 4",
            icon: <Vote size={30} className="text-white" />,
          },
          {
            title: "Ratings",
            value: "Total: 56, Avg: 4.4",
            icon: <Star size={30} className="text-white" />,
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-primary/20 shadow-inner hover:shadow-lg transition-all duration-300 flex flex-col gap-4"
          >
            <h2 className="font-semibold text-xl md:text-2xl text-primary">
              {card.title}
            </h2>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-primary to-blue-500 p-3 rounded-2xl shadow-md">
                {card.icon}
              </div>
              <p className="font-medium text-lg text-primary">
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboardHomePage;
