const asyncHandler = require("express-async-handler");
const CandidateCertificate = require('../models/candidateCertificate');

//@desc Create a candidate's certificate
//@route POST /api/certificates
//@access Private
const createCertificate = asyncHandler(async (req, res) => {
    const { userId, certificateName, institution, year } = req.body;

    const certificate = await CandidateCertificate.create({ userId, certificateName, institution, year });
    res.status(201).json({ success: true, data: certificate });
});

//fetch certificate
const getCertificate = asyncHandler(async (req, res) => {
    const { userId } = req.params; 
    
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }
  
    try {
      const certificate = await CandidateCertificate.findAll({
        where: { userId },
      });
  
      if (!certificate) {
        return res.status(404).json({ message: 'No certificate found' });
      }
      
      res.json( {certificate} );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching certificates' });
    }
  });

//@desc Update a candidate's certificate
//@route PUT /api/certificates/:id
//@access Private
const updateCertificate = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const certificate = await CandidateCertificate.findByPk(id);

    if (!certificate) {
        res.status(404);
        throw new Error('Certificate not found');
    }

    const updatedCertificate = await certificate.update(req.body);
    res.status(200).json({ success: true, updatedCertificate });
});

//@desc Delete a candidate's certificate
//@route DELETE /api/certificates/:id
//@access Private
const deleteCertificate = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const certificate = await CandidateCertificate.findByPk(id);

    if (!certificate) {
        res.status(404);
        throw new Error('Certificate not found');
    }

    await certificate.destroy();
    res.status(200).json({ success: true, message: 'Certificate deleted' });
});

module.exports = {
    createCertificate,
    updateCertificate,
    deleteCertificate,
    getCertificate
};
