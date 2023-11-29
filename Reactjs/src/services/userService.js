import axios from '../axios'
// khai báo Api
const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password });
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {data: {id: userId}});
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcodce?type=${inputType}`);
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`);
}

const saveDetailInforDoctor = (data) => {
    return axios.post('/api/save-infor-doctors', data);
}

const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
}

const savebulkScheduleSchedule = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}

const postBookAppointmet = (data) => {
    return axios.post('/api/patient-book-appointmet', data);
}

const postVerifyBookAppointmet = (data) => {
    return axios.post('/api/verify-book-appointmet', data);
}

const postCreateNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data);
}

const getAllSpecialty = (data) => {
    return axios.get('/api/get-specialty');
}

const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}

const postCreateNewClinic = (data) => {
    return axios.post('/api/create-new-Clinic', data);
}

const getAllClinic = (data) => {
    return axios.get('/api/get-Clinic');
}

const getDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-Clinic-by-id?id=${data.id}`);
}

const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
}

const postsendRemedy = (data) => {
    return axios.post('/api/send-remedy', data);
}

export { handleLoginApi, getAllUsers, createNewUserService, saveDetailInforDoctor, getDetailInforDoctor, 
    getScheduleDoctorByDate, getExtraInforDoctorById, postVerifyBookAppointmet, getAllSpecialty, getDetailSpecialtyById,
    deleteUserService, editUserService, getAllCodeService, getTopDoctorHomeService, getAllDoctors, 
    savebulkScheduleSchedule, getProfileDoctorById, postBookAppointmet, postCreateNewSpecialty,
    postCreateNewClinic, getAllClinic, getDetailClinicById, getAllPatientForDoctor, postsendRemedy };