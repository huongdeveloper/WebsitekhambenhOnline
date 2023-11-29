import patientServices from '../services/patientServices';

let postBookAppointmet = async (req, res) => {
    try {
        let response = await patientServices.postBookAppointmet(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server'
        })
    }
} 

let postVerifyBookAppointmet = async (req, res) => {
    try {
        let response = await patientServices.postVerifyBookAppointmet(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server'
        })
    }
} 

module.exports = {
    postBookAppointmet: postBookAppointmet,
    postVerifyBookAppointmet: postVerifyBookAppointmet


}