import JobList from "../components/JobList";

const page = () => {
  
    return (
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Job Listings</h1>
          <JobList />
        </div>
      </div>
    );
  }

  export default page;
  