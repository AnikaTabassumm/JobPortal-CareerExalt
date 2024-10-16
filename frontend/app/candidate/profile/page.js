import React from 'react'
import ProfileView from '@/app/components/ProfileView';

const CProfile = () => {
  

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <ProfileView />

      {/* About Section */}
      {/* <ProfileEditForm
        name="John Doe"
        title="Software Engineer"
        location="San Francisco, CA"
        // onSave={handleSaveProfile}
      /> */}

      {/* Rest of the profile content remains unchanged */}
    </div>
  );
};

export default CProfile;
