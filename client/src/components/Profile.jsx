import UserProfile from "./UserProfile";
import EventCard from "./EventCard";
import MeetingCard from "./MeetingCard";
import MyMiniCalendar from "./MyMiniCalendar"; // Mini version of your calendar

const Profile = () => {
  return (
    <div className="flex flex-col md:flex-row h-full overflow-y-auto mb-10">
      <div className=" md:w-3/5 h-screen mb-10">
        {/* User Profile Component */}
        <UserProfile />
        {/* Mini Calendar Component */}
        <MyMiniCalendar className="mt-4" /> {/* Add margin for spacing */}
      </div>
      <div className="w-full md:w-2/5 h-full flex flex-col space-y-2">
        {/* Space between EventCard and MeetingCard */}
        <div className="mt-4">
          {/* Event Card */}
          <EventCard />
        </div>
        <div>
          {/* Meeting Card */}
          <MeetingCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;
