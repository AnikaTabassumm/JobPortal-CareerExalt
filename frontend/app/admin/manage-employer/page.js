const CompaniesTable = () => {
    const companies = [
      { id: 1, companyName: 'Tech Innovators', email: 'contact@techinnovators.com', location: 'San Francisco, CA' },
      { id: 2, companyName: 'Design Studios', email: 'hr@designstudios.com', location: 'New York, NY' },
      { id: 3, companyName: 'Market Experts', email: 'info@marketexperts.com', location: 'Chicago, IL' },
    ];
  
    return (
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">All Companies</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white border-collapse shadow-md rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-4 text-left text-gray-700">Company Name</th>
                  <th className="p-4 text-left text-gray-700">Email</th>
                  <th className="p-4 text-left text-gray-700">Location</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company, index) => (
                  <tr
                    key={company.id}
                    className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <td className="p-4">{company.companyName}</td>
                    <td className="p-4">{company.email}</td>
                    <td className="p-4">{company.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  export default CompaniesTable;