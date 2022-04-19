const { searchData } = require("../controller/index.js");


module.exports = function(router) {

    router.get('/', (req, res) => {
        res.send('Hello World!')
    })
    
    router.get('/api/manual_send_mail',manual_send_mail)

    router.get('/api/auto_send_mail',auto_send_mail)

    router.get('/api/find_user_all', find_user_all);

    router.get('/api/find_fridge_label_all', find_fridge_label_all);

    router.delete("/api/delete_fridge_label", delete_fridge_label);

    router.put("/api/update_fridge_label",update_fridge_label)

    router.post('/api/create_users',create_users);

    router.post('/api/create_fridge_labels',create_fridge_labels);

    router.post('/api/send_email_to_fridge_user',send_email_to_fridge_user)

}