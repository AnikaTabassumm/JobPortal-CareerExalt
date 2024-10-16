import CompanyInfo from '@/app/components/CompanyInfo';

const Company = async () => {

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      {/* Render EditCompanyProfile as a client-side component */}
      <CompanyInfo />
    </div>
  );
};

export default Company;
