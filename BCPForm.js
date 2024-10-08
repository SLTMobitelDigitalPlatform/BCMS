import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/RecoveryResumption.css';
import Layout from '../components/Layout';
import '../css/BCPForm.css'; // Import your CSS file for styling

const BCPForm = () => {
  const [formValues, setFormValues] = useState({
    date: '',
    template: '',
    legalEntity: '',
    approver: '',
    maintainers: '',
    viewers: '',
    dateApproved: '',
    dateLastReviewed: '',
    dateNextReview: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formValues);
  };

  return (
    <div className="bcp-form-container">
      <Layout/>
      <h2 className="form-title">Business Continuity Plan</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formValues.date}
            onChange={handleChange}
            placeholder="Please Select Your Section"
          />
        </div>

        <div className="form-row">
          <label>Template</label>
          <input
            type="text"
            name="template"
            value={formValues.template}
            onChange={handleChange}
            placeholder="Please Enter Template Number"
          />
        </div>

        <div className="form-row">
          <label>Legal Entity</label>
          <select
            name="legalEntity"
            value={formValues.legalEntity}
            onChange={handleChange}
          >
            <option value="">Please Select Legal Entity</option>
            <option value="Entity1">Entity 1</option>
            <option value="Entity2">Entity 2</option>
          </select>
        </div>

        <div className="form-row">
          <label>Approver</label>
          <select
            name="approver"
            value={formValues.approver}
            onChange={handleChange}
          >
            <option value="">Please Select Owner</option>
            <option value="Owner1">Owner 1</option>
            <option value="Owner2">Owner 2</option>
          </select>
        </div>

        <div className="form-row">
          <label>Maintainers</label>
          <input
            type="text"
            name="maintainers"
            value={formValues.maintainers}
            onChange={handleChange}
            placeholder="Please Enter the maintainers"
          />
        </div>

        <div className="form-row">
          <label>Viewers</label>
          <input
            type="text"
            name="viewers"
            value={formValues.viewers}
            onChange={handleChange}
            placeholder="Please Enter the viewers"
          />
        </div>

        <div className="form-row">
          <label>Date Approved</label>
          <input
            type="date"
            name="dateApproved"
            value={formValues.dateApproved}
            onChange={handleChange}
            placeholder="Please Enter the approved date"
          />
        </div>

        <div className="form-row">
          <label>Date Last Reviewed</label>
          <input
            type="date"
            name="dateLastReviewed"
            value={formValues.dateLastReviewed}
            onChange={handleChange}
            placeholder="Please Enter the last review date"
          />
        </div>

        <div className="form-row">
          <label>Date Due for Next Review</label>
          <input
            type="date"
            name="dateNextReview"
            value={formValues.dateNextReview}
            onChange={handleChange}
            placeholder="Please Enter the Due Date"
          />
        </div>

        <div className="form-submit-row">
          <button type="submit" className="submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default BCPForm;