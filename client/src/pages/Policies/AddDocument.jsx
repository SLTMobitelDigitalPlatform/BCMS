import React from 'react';

const AddDocument = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-lg mx-auto relative">
      {/* Close button (top right) */}
     
      <button className="absolute top-4 right-4 text-black text-xl font-semibold">✕</button>
      
      {/* Title */}
      <h2 className="text-2xl font-semibold text-blue-900 text-center mb-6">Add Document</h2>
      
      {/* Progress Bar */}
      <div className="flex justify-around items-center mb-6">
        <div className="text-center">
          <p className="text-sm font-medium">Section 1</p>
          <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">Section 2</p>
          <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">Section 3</p>
          <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">Section 4</p>
          <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
        </div>
      </div>

      {/* Form Title */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-black">
          Section 1 - Contact for Inquiries & Proposed Changes
        </h3>
      </div>

      {/* Form */}
      <form className="space-y-4">
        <div>
          <input 
            type="text" 
            placeholder="Name" 
            className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Designation" 
            className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Contact No" 
            className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Next Button */}
        <div className="text-right">
          <button 
            type="submit" 
            className="bg-blue-900 text-white py-2 px-6 rounded-md hover:bg-blue-700"
          >
            Next &gt;
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDocument;
