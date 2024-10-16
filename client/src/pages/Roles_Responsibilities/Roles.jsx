import { Link } from "react-router-dom";
import { useRoles } from "../../hooks/useRoles";
import { useUsers } from "../../hooks/useUsers";
import { useEffect } from "react";

const Roles = () => {
  const {
    roles,
    loading: rolesLoading,
    error: rolesError,
    fetchRoles,
  } = useRoles();
  const {
    user,
    loading: userLoading,
    error: userError,
    fetchUserDetails,
  } = useUsers();

  useEffect(() => {
    fetchUserDetails();
    fetchRoles();
  }, []);

  if (rolesLoading || userLoading) return <div>Loading...</div>;
  if (rolesError) return <div>{rolesError}</div>;
  if (userError) return <div>{userError}</div>;

  return (
    <div className="flex flex-col gap-x-10 h-full">
      <div className="justify-between flex">
        <h1 className="topic">Roles & Responsibilities</h1>
        {user &&
        (user.role === "Super Admin" ||
          user.role === "Secretariat Coordinator") ? (
          <div className="space-x-4">
            <Link to="/roles/createRoles">
              <button type="button" className="btn-primary">
                Add
              </button>
            </Link>
            <Link to="/roles/editRoles">
              <button type="button" className="btn-secondary">
                Update
              </button>
            </Link>
          </div>
        ) : (
          " "
        )}
      </div>

      {/* Table */}
      <div className="relative overflow-y-auto rounded-b-2xl mt-5">
        <table className="table-fixed w-full min-w-full bg-cyan-50 border-green-500">
          <thead className="bg-indigo-800 text-white h-12">
            <tr>
              <th className="w-2/5 border border-green-500">Roles</th>
              <th className="w-20 border border-green-500">Responsibilities</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={index} className="doc-table-hover">
                <td className="py-3 px-8 border border-green-500 text-blue-900 text-lg">
                  {role.roles}
                </td>
                <td className="py-4 px-8 border border-green-500 text-blue-900 text-base text-justify">
                  <ol className="list-decimal list-inside">
                    {role.responsibilities
                      .split(/(\d+\.\s)/g)
                      .filter(Boolean)
                      .map(
                        (item, idx) =>
                          idx % 2 !== 0 && <li key={idx}>{item.trim()}</li>
                      )}
                  </ol>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Roles;
