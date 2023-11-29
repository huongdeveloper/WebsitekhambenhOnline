require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD
        },
    });

    let info = await transporter.sendMail({
        from: '"huong.fullstack 👻" <huong.fullstack@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line
        html: getBodyHTMLEmail(dataSend),
    });
    
}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if(dataSend.language === 'vi') {
        result = `
        <h3> Xin Chào: ${dataSend.patientName} </h3>
        <p> Bạn nhận được Email này vì đã đặt lịch khám bệnh Online trên trang Website của chúng tôi. </p>
        <p> Thông tin đặt lịch khám bệnh: </p>
        <div><b>Thời gian: ${dataSend.time} </b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName} </b></div>

        <p> Nếu thông tin trên là đúng sự thật, vui lòng Click vào đường linh bên dưới để xác nhận sự thật và hoàn tất thủ tục khám bệnh.
        </p>
        <div> <a href= ${dataSend.redirectLink} target="_blank"> Click here</a></div>
        <div> Xin chân thành cảm ơn quý khách </div>
        `
    }

    if(dataSend.language === 'en') {
        result = `
        <h3> Dear: ${dataSend.patientName} </h3>
        <p> You received this email because you booked an online medical appointment on our website. </p>
        <p> Information to book a medical appointment: </p>
        <div><b>Time: ${dataSend.time} </b></div>
        <div><b>Doctor: ${dataSend.doctorName} </b></div>

        <p> If the above information is true, please click on the link below to confirm the truth and complete the medical examination..
        </p>
        <div> <a href= ${dataSend.redirectLink} target="_blank"> Click here</a></div>
        <div> Thank you very much</div>
        `
    }
    return result;
}

let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD
        },
    });

    let info = await transporter.sendMail({
        from: '"huong.fullstack 👻" <huong.fullstack@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh ✔", // Subject line
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
            {
                filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                content: dataSend.imgBase64.split("base64,")[1],
                encoding: 'base64'
            },
        ],
    });
    resolve(true)
    }catch(e) {
        reject(e);
    }
    })
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = ''
    if(dataSend.language === 'vi') {
        result = `
        <h3> Xin Chào: ${dataSend.patientName} </h3>
        <p> Bạn nhận được Email này vì đã đặt lịch khám bệnh Online trên trang Website của chúng tôi. </p>
        <p> Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm. </p>
        <div> Xin chân thành cảm ơn quý khách </div>
        `
    }

    if(dataSend.language === 'en') {
        result = `
        <h3> Dear: ${dataSend.patientName} } </h3>
        <p> You received this email because you booked an online medical appointment on our website. </p>
        <p> Prescription/invoice information is sent in the attached file. </p>
        <div> Thank you very much</div>
        `
    }
    return result;
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment
}