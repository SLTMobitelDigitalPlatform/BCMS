import UserProfile from "./UserProfile";
import EventCard from "./EventCard";
import MeetingCard from "./MeetingCard";
import MyMiniCalendar from "./MyMiniCalendar";

const Profile = () => {
  return (
    <div className="flex flex-col md:flex-row h-full gap-3 bg-blue-200 overflow-y-auto">
      <div className="h-full md:w-3/5 space-y-2">
        <UserProfile />
        <MyMiniCalendar />
      </div>
      <div className="md:w-2/5 h-full flex flex-col ">
        <h1 className="text-2xl sm:text-3xl font-bold text-center my-4">
          Upcoming Events
        </h1>
        <EventCard />
        <h1 className="text-2xl sm:text-3xl font-bold text-center my-4">
          Upcoming Meetings
        </h1>
        <MeetingCard />
      </div>
    </div>
  );
};

export default Profile;
