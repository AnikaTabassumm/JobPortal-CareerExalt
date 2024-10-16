// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import jobSeekerReducer from './slices/jobSeekerSlice';
import candidateExperienceReducer from './slices/candidateExperienceSlice';
import candidateCertificateReducer from './slices/candidateCertificateSlice';
import candidateEducationReducer from './slices/candidateEducationSlice';
import candidateSkillReducer from './slices/candidateSkillSlice';
import commonExperienceReducer from './slices/commonExperienceSlice';
import commonSkillReducer from './slices/commonSkillSlice';
import employerReducer from './slices/employerSlice';
import jobPostReducer from './slices/jobPostSlice';
import jobApplicationReducer from './slices/jobApplicationSlice';
import packageReducer from './slices/packageSlice';
import orderReducer from './slices/orderSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    jobSeeker: jobSeekerReducer,
    candidateExperience: candidateExperienceReducer,
    candidateCertificate: candidateCertificateReducer,
    candidateEducation: candidateEducationReducer,
    candidateSkill: candidateSkillReducer,
    commonExperience: commonExperienceReducer,
    commonSkill: commonSkillReducer,
    employer: employerReducer,
    jobPost: jobPostReducer,
    jobApplication: jobApplicationReducer,
    packages: packageReducer,
    order: orderReducer,

  },
});

export default store;
