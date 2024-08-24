import UserProfile from "./UserProfile";
import EventCard from "./EventCard";

const Profile = () => {
  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-2/3 h-full">
        <UserProfile />
      </div>
      <div className="w-full md:w-1/3 h-full">
        <EventCard />
      </div>
    </div>
  );
};

export default Profile;
