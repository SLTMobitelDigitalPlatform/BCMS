import UserProfile from "./UserProfile";
import EventCard from "./EventCard";
import MeetingCard from "./MeetingCard";
import MyMiniCalendar from "./MyMiniCalendar"; // Mini version of your calendar

const Profile = () => {
  return (
    <div className="flex flex-col md:flex-row h-full gap-3 bg-blue-200 overflow-y-auto">
      <div className="h-full md:w-3/5 space-y-10">
        <UserProfile />
        <MyMiniCalendar />
      </div>
      <div className="md:w-2/5 h-full flex flex-col space-y-2 ">
        <EventCard />
        <MeetingCard />
      </div>
    </div>
  );
};

export default Profile;
