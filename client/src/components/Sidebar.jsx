import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const handleLogout = async () => {
  try {
    localStorage.removeItem("token");

    window.location.href = "/login";
  } catch (error) {
    console.error("Error logging out:", error);
    alert("Failed to log out. Please try again.");
  }
};

const Sidebar = () => {
  return (
    <div>
      <div className="ml-5 rounded-2xl w-full bg-[#001A3E] text-center p-5 flex flex-col justify-between">
        <div>
          <Link to="">
            <h1 className="text-[40px] font-bold text-[#00BBF6]">BCMS</h1>
          </Link>
          <h1 className="text-md text-[#C8ECFE] font-semibold">Dashboard</h1>
        </div>
        <div className="px-7 text-center">
          <ul className="text-white text-lg flex flex-col gap-7 text-left mt-10">
            <Link to="/employee">
              <li className="flex gap-4 items-center hover:underline">
                Employees
              </li>
            </Link>
            <hr className="opacity-50" />
            {/* <Link to="/document">
              <li className="flex gap-4 items-center hover:underline">Documents</li>
            </Link> */}

            {/* New Doc Tab */}

            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-between text-lg items-center text-white ">
                  Documents
                  {/* <ChevronDownIcon
                    className="-mr-1 h-5 w-5 text-white"
                    aria-hidden="true"
                  /> */}
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white font-medium shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-90">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/riskAssesements"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900 "
                              : "text-gray-700",
                            "block px-4 py-2 text-[17px]"
                          )}
                        >
                          Risk Assesements
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/versionControls"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900 "
                              : "text-gray-700",
                            "block px-4 py-2 text-[17px]"
                          )}
                        >
                          Context of the Organization
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/documents"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900 "
                              : "text-gray-700",
                            "block px-4 py-2 text-[17px]"
                          )}
                        >
                          BIA
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/documents"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900 "
                              : "text-gray-700 ",
                            "block px-4 py-2 text-[17px]"
                          )}
                        >
                          BCP
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* End New Doc Tab */}

            <hr className="opacity-50" />
            <Link to="/calendar">
              <li className="flex gap-4 items-center hover:underline">
                Calendar
              </li>
            </Link>
            <hr className="opacity-50" />
            <Link to="/meeting">
              <li className="flex gap-4 items-center hover:underline">
                Meetings
              </li>
            </Link>
            <hr className="opacity-50" />
            <Link to="/roles">
              <li className="flex gap-4 items-center hover:underline">
                Roles & Responsibilities
              </li>
            </Link>
          </ul>
        </div>
        <div className="flex gap-3 mt-10">
          <button
            className="px-8 py-1 bg-[#00BBF6] text-black font-semibold rounded-2xl"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button className="px-8 py-1 bg-[#C8ECFE] text-black font-semibold rounded-2xl">
            Intranet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
