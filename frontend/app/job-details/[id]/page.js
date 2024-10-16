import Footer from "@/app/components/Footer";
import JobDetails from "@/app/components/JobDetails";

const Details = ({ params }) => {
    const {id} = params;


  return (
    <><div className="flex justify-center overflow-y-auto h-screen bg-gray-100">
        <div className="flex-grow py-16 px-6 md:px-22 lg:px-56">
            <JobDetails jobId={id} />
        </div>
      
    </div>
    </>
    
    
  );
};

export default Details;