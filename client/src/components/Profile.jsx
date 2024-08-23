import UserProfile from "./UserProfile";
import EventCard from "./EventCard";

const Profile = () => {
  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-3/4 h-full">
        <UserProfile />
      </div>
      <div className="w-full md:w-1/4 h-full">
        <EventCard />
      </div>
    </div>
  );
};

export default Profile;
