'use client';

import { useState, useEffect } from 'react';

const ProfileCompletion = ({ profile }) => {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    calculateCompletion();
  }, [profile]);

  const calculateCompletion = () => {
    const totalFields = 5;
    let filledFields = 0;

    // Check each field of the profile
    if (profile.name) filledFields++;
    if (profile.email) filledFields++;
    if (profile.resume) filledFields++;
    if (profile.bio) filledFields++;
    if (profile.skills?.length > 0) filledFields++;

    // Calculate completion percentage
    const percentage = Math.round((filledFields / totalFields) * 100);
    setCompletion(percentage);
  };

  return (
    <div className=" lg:w-2/3 pt-4">
      <h3 className="lg:text-lg font-semibold text-gray-700 mb-2">Profile Completion</h3>
      <div className=" bg-gray-200 rounded-full h-1.5 md:h-1.7 lg:h-2.5 mb-4">
        <div
          className={`h-1.5 md:h-1.7 lg:h-2.5 rounded-full ${completion < 100 ? 'bg-blue-500' : 'bg-green-500'}`}
          style={{ width: `${completion}%` }}
        ></div>
      </div>
      <p className="text-xs lg:text-sm text-gray-600">
        Your profile is {completion}% complete. {completion < 100 ? 'Complete your profile to increase your chances of being noticed.' : 'Your profile is fully complete!'}
      </p>
    </div>
  );
};

export default ProfileCompletion;
