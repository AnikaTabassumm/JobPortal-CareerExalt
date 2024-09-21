import ProfileCompletion from "@/app/components/ProfileCompletion";
import ResumeUpdate from "@/app/components/ResumeUpdate";




const Dashboard = () => {
  // Example profile data
  const profile = {
    name: 'John Doe',
    email: 'john@example.com',
    resume: null, 
    bio: 'Web developer with 5 years of experience',
    skills: ['JavaScript', 'React'],
  };

  return (
    <div className="min-h-screen p-8">
      {/* <div className="max-w-lg mx-auto "> */}
        <div className="flex flex-col lg:flex-row justify-between">
            <h1 className="text-lg md:text-2xl lg:text-3xl font-bold pt-5 text-gray-600">Welcome to the Dashboard</h1>
            <div className="flex lg:justify-end"><ProfileCompletion profile={profile} /></div>   
        </div>
        <div className="flex flex-col md:flex-row gap-3 md:gap-6 pt-7">
            <ResumeUpdate count={0} status={"Published Resumes"}/>
            <ResumeUpdate count={0} status={"Pending Resumes"}/>
            <ResumeUpdate count={0} status={"Expired Resumes"}/>
        </div>
        
      {/* </div> */}
    </div>
  );
};

export default Dashboard;
