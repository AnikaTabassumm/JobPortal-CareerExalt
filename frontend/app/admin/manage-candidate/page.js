
const CandidatesTable = () => {
    const candidates = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
      { id: 3, name: 'Robert Johnson', email: 'robert.johnson@example.com' },
    ];
  
    return (
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">All Candidates</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white border-collapse shadow-md rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-4 text-left text-gray-700">Name</th>
                  <th className="p-4 text-left text-gray-700">Email</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate, index) => (
                  <tr
                    key={candidate.id}
                    className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <td className="p-4">{candidate.name}</td>
                    <td className="p-4">{candidate.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
   export default CandidatesTable;