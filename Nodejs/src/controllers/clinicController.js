import clinicService from '../services/clinicService';

let postCreateNewClinic = async (req, res) => {
    try {
        let response = await clinicService.postCreateNewClinic(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server'
        })
    }
} 

let getAllClinic = async (req, res) => {
    try {
        let infor = await clinicService.getAllClinic();
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server'
        })
    }
} 

let getDetailClinicById = async (req, res) => {
    try {
        let infor = await clinicService.getDetailClinicById(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server'
        })
    }
} 

module.exports = {
    postCreateNewClinic: postCreateNewClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById


}