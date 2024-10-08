import React from 'react';
import '../css/BCPlans.css';
import '../css/Button.css';

const BCPlans = () => {
  const rows = [
    { planNo: 'P001', template: 'Plan 1', date: 'Plan No', entity: 'Plan No', approver: 'Plan No', maintainer: 'Plan No', dateApproved: 'Plan No', lastReview: 'Plan No' },
    { planNo: 'P002', template: 'Plan 2', date: 'Plan No', entity: 'Plan No', approver: 'Plan No', maintainer: 'Plan No', dateApproved: 'Plan No', lastReview: 'Plan No' },
    { planNo: 'P003', template: 'Plan 3', date: 'Plan No', entity: 'Plan No', approver: 'Plan No', maintainer: 'Plan No', dateApproved: 'Plan No', lastReview: 'Plan No' },
    { planNo: 'P004', template: 'Plan 4', date: 'Plan No', entity: 'Plan No', approver: 'Plan No', maintainer: 'Plan No', dateApproved: 'Plan No', lastReview: 'Plan No' },
    { planNo: 'P005', template: 'Plan 5', date: 'Plan No', entity: 'Plan No', approver: 'Plan No', maintainer: 'Plan No', dateApproved: 'Plan No', lastReview: 'Plan No' },
  ];

  return (
    <div className="table-container">
        <h2>Business Continuity Plans</h2>
       <div className="table-header">
        <p> </p>
        <button className="add-plan-btn">Add Plan</button> {/* Gradient button */}
      </div>
      <table>
        <thead>
          <tr>
            <th>Plan No</th>
            <th>Date</th>
            <th>Template</th>
            <th>Legal Entity</th>
            <th>Approver</th>
            <th>Maintainer</th>
            <th>Date Approved</th>
            <th>Date Last Reviewed</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.planNo}</td>
              <td>{row.date}</td>
              <td>{row.template}</td>
              <td>{row.entity}</td>
              <td>{row.approver}</td>
              <td>{row.maintainer}</td>
              <td>{row.dateApproved}</td>
              <td>{row.lastReview}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BCPlans;
