import React, { useEffect, useState } from "react";
import { getSections } from "../../services/sectionApi";
import Navbar from "../../components/Navbar";

export const Section = () => {
  const [sections, setSections] = useState([]);
  const fetchSections = async () => {
    try {
      const response = await getSections();
      const sectiondata = response.data;
      //   console.log(sectiondata);
      setSections(sectiondata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Section Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => (
              <tr key={section._id}>
                <td>{section.name}</td>
                <td>
                  <button>Add</button>
                </td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
