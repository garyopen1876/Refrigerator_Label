const db = require('../models/index.js');
const nodemailer = require('nodemailer');
const label_service = require('../services/label_service.js');
const user_service = require('../services/user_service.js');

manual_send_mail = async (mail) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: process.env.MAIL_USER,
        to: mail.users,
        subject: mail.subject,
        text: mail.text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.status(500).json({ message: error });
        } else {
            return res.status(200).json({ message: "寄信成功" });
        }
    });
    transporter.close();
    
}

auto_send_mail = async (req,res) => {

    const time = await label_service.time_out();
    let all_mail = ""
    for(let i = 0; i < time.length; i++){            
        let array = time[i]['date'].split(" ")
        var Today=new Date();
        const date1 = new Date(array[0]);
        const date2 = new Date(Today.getFullYear()+"-"+(Today.getMonth()+1)+"-"+Today.getDate())
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        if(diffDays == 7){
            let mail = await user_service.card_id_find_mail(time[i]['card_id'])
            all_mail = all_mail+mail['dataValues']['mail']+","                
        }
        
    }

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: process.env.MAIL_USER,
        to: all_mail,
        subject: '冰箱物品管理系統提醒',
        text: '\n\n\n'+'您的物品已經在mono共同工作室冰箱中放置超過七天，提醒您請盡快取回。'+'\n\n\n\n'+'此封信件為冰箱小精靈自動發送，請勿直接回覆。'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.status(500).json({ message: error });
        } else {
            return res.status(200).json({ message: "寄信成功" });
        }
    });
    transporter.close();


}


module.exports = {
    manual_send_mail,
    auto_send_mail
}