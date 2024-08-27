import React from 'react';

const BIA = () => {
  return (
    
    <div className="bia-container">
      <div className="bia-header">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-500">Business Impact Analysis</h1>
      </div>

      <form className="bia-form">
        <div className="bia-form-group">
          <label htmlFor="sectionName">Section Name</label>
          <select id="sectionName" className="bia-input">
            <option>Please Select Your Section</option>
            {/* Add more options here */}
          </select>
        </div>

        <div className="bia-form-group">
          <label htmlFor="dateNextReview">Date due for next review</label>     
          <input type="date" id="dateNextReview" className="bia-input" />
        </div>

        <div className="bia-form-group">
          <label htmlFor="owner">Owner</label>
          <select id="owner" className="bia-input">
            <option>Please Select Owner</option>
            {/* Add more options here */}
          </select>
        </div>

        <div className="bia-form-group">
          <label htmlFor="maintainers">Maintainers</label>
          <input type="text" id="maintainers" className="bia-input" placeholder="Please enter the maintainers" />
        </div>

        <div className="bia-form-group">
          <label htmlFor="viewers">Viewers</label>
          <input type="text" id="viewers" className="bia-input" placeholder="Please enter the viewers" />
        </div>

        <div className="bia-form-group">
          <label htmlFor="dateApproved">Date approved</label>
          <input type="date" id="dateApproved" className="bia-input" />
        </div>

        <div className="bia-form-group">
          <label htmlFor="dateLastReviewed">Date last reviewed</label>
          <input type="date" id="dateLastReviewed" className="bia-input" />
        </div>

        <div className="bia-form-group">
          <label htmlFor="changesLastReview">Changes of the last review</label>
          <input type="text" id="changesLastReview" className="bia-input" placeholder="Please enter the changes" />
        </div>

        <button type="submit" className="bia-submit-button">Submit</button>
      </form>
    </div>
  );
}

export default BIA;