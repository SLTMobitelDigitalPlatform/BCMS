import React, { useState } from 'react';

const AddDocument = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(prev => (prev < 4 ? prev + 1 : prev));
  };
  const prevStep = () => {
    setCurrentStep(prev => (prev > 1 ? prev - 1 : prev));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep === 4) {
      // Final submission logic
      console.log('Form submitted');
    } else {
      nextStep();
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-lg mx-auto relative">
      {/* Close button */}
      
      <button className="absolute top-4 right-4 text-black text-xl font-semibold">✕</button>
      

      {/* Title */}
      <h2 className="text-2xl font-semibold text-blue-900 text-center mb-6">Add Document</h2>

      {/* Progress Bar */}
      <div className="flex justify-around items-center mb-6">
        {[1, 2, 3, 4].map(step => (
          <div key={step} className="text-center">
            <p className="text-sm font-medium">Section {step}</p>
            <div
              className={`w-4 h-4 ${
                currentStep >= step ? 'bg-green-500' : 'bg-gray-300'
              } rounded-full mx-auto`}
            ></div>
          </div>
        ))}
      </div>

      {/* Form Section */}
      <div className="max-h-96 overflow-y-auto mb-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {currentStep === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-black">
                Section 1 - Contact for Inquiries & Proposed Changes
              </h3>
              <br />
              <div>
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                />
              </div>
              <br />
              <div>
                <input 
                  type="text" 
                  placeholder="Designation" 
                  className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                />
              </div>
              <br />
              <div>
                <input 
                  type="text" 
                  placeholder="Contact No" 
                  className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                />
              </div>
              <br />
              <div>
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-black">
                Section 2 - Document Preparation Committee
              </h3>
              <br />
              <div>
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                />
              </div>
              <br />
              <div>
                <input 
                  type="text" 
                  placeholder="Designation" 
                  className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                />
              </div>
              <br />
              <div>
                <input 
                type="text" 
                placeholder="Revision No" 
                className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                />
              </div>
              
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h3 className="text-lg font-semibold text-black">
                Section 3 - Controlled Circulation List
              </h3>
              <br />
              <div>
                <input 
                  type="text" 
                  placeholder="Designation of the Officer" 
                  className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                />
              </div>
              <br />
              <div>
                <input 
                  type="text" 
                  placeholder="Group" 
                  className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                />
              </div>
              <br />
              <div>
                <input 
                  type="text" 
                  placeholder="Copy No" 
                  className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h3 className="text-lg font-semibold text-black">
                Section 4 - Contact for Inquiries & Proposed Changes
              </h3>
              <br />
              <div>
                <input 
                  type="text" 
                  placeholder="Issue No" 
                  className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                />
              </div>
              <br />
              <div>
                <input 
                  type="text" 
                  placeholder="Issue Date" 
                  className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                />
              </div>
              <br />
              <div>
                <input 
                  type="text" 
                  placeholder="Revision No" 
                  className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                />
              </div>
              <br />
              <div>
                <input 
                  type="text" 
                  placeholder="Revision Date" 
                  className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                />
              </div>
              <br />
              <div>
                <input 
                  type="text" 
                  placeholder="Updated By" 
                  className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                />
              </div>
              <br />
              <div>
                <input 
                  type="text" 
                  placeholder="Checked By" 
                  className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                />
              </div>
              <br />
              <div>
                <input 
                  type="text" 
                  placeholder="Approved By" 
                  className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                />
              </div>
              <br />
              <div>
                <input 
                  type="text" 
                  placeholder="Description of Changes"
                  className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          )}

           {/* Navigation Buttons */}
          <div className="mt-4 flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-blue-900 text-white py-2 px-6 rounded-md hover:bg-blue-700"
              >
                &lt; Previous
              </button>
            )}
            <button 
              type="submit" 
              className="bg-blue-900 text-white py-2 px-6 rounded-md hover:bg-blue-700"
            >
              {currentStep === 4 ? 'Submit' : 'Next >'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDocument;
