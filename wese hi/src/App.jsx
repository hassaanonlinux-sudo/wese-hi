import React, { useState } from 'react';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Centralized form state keeps data safe when moving between steps
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    newsletter: false,
    notifications: false,
  });

  const [errors, setErrors] = useState({});

  // Generic input change handler
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
    // Clear validation error on type
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };

  // Per-step validation business logic
  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required.";
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Enter a valid email address.";
      }
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    }

    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = "Street address is required.";
      if (!formData.city.trim()) newErrors.city = "City is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      setIsSubmitted(true);
    }
  };

  const stepsConfig = [
    { label: "Personal", num: 1 },
    { label: "Address", num: 2 },
    { label: "Settings", num: 3 },
    { label: "Review", num: 4 },
  ];

  // Render Success Screen
  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">✓</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2"></h2>
        <p className="text-gray-600">Your details have been successfully recorded.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl">
      
      {/* Progress Indicator Component */}
      <div className="flex items-center justify-between mb-8 text-xs font-semibold text-gray-400">
        {stepsConfig.map((s, idx) => (
          <React.Fragment key={s.num}>
            <div className={`flex flex-col items-center flex-1 ${step >= s.num ? 'text-indigo-600' : 'text-gray-400'}`}>
              <span className={`w-8 h-8 flex items-center justify-center rounded-full mb-1 border-2 transition-colors ${
                step > s.num ? 'bg-green-100 border-green-600 text-green-600' : 
                step === s.num ? 'bg-indigo-100 border-indigo-600 text-indigo-600' : 'bg-gray-100 border-gray-200'
              }`}>
                {step > s.num ? '✓' : s.num}
              </span>
              <span>{s.label}</span>
            </div>
            {idx < stepsConfig.length - 1 && (
              <div className={`w-full h-1 flex-1 mx-2 mb-4 transition-colors ${step > s.num ? 'bg-green-500' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Main Dynamic Multi-Step Form */}
      <form onSubmit={handleSubmit} noValidate>
        
        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>
        )}

        {/* Step 2: Address Details */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Address Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Street Address</label>
              <input type="text" id="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input type="text" id="city" value={formData.city} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
          </div>
        )}

        {/* Step 3: Preferences */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Preferences & Settings</h2>
            <div className="flex items-center">
              <input type="checkbox" id="newsletter" checked={formData.newsletter} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
              <label htmlFor="newsletter" class="ml-2 block text-sm text-gray-900">Subscribe to newsletter updates</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="notifications" checked={formData.notifications} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
              <label htmlFor="notifications" class="ml-2 block text-sm text-gray-900">Enable SMS notifications</label>
            </div>
          </div>
        )}

        {/* Step 4: Review and Confirm */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Review and Confirm</h2>
            <div className="bg-gray-50 p-4 rounded-md space-y-2 text-sm text-gray-700">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Address:</strong> {formData.address}, {formData.city}</p>
              <p><strong>Newsletter:</strong> {formData.newsletter ? 'Yes' : 'No'}</p>
              <p><strong>SMS Alerts:</strong> {formData.notifications ? 'Yes' : 'No'}</p>
            </div>
          </div>
        )}

        {/* Navigation Action Footer */}
        <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
          {step > 1 ? (
            <button type="button" onClick={handleBack} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">
              Back
            </button>
          ) : (
            <div /> // Keeps alignment uniform
          )}
          
          {step < 4 ? (
            <button type="button" onClick={handleNext} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
              Next
            </button>
          ) : (
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
