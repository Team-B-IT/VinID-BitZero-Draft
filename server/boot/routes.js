module.exports = function (app) {
    app.get('/test', function (req, res) {
        return res.json({
            "data": {
                "metadata": {
                    "app_name": "Bữa tối cho mọi ngươ",
                    "app_id": 123456,
                    "title": "Tiêu đề trong card ",
                    "submit_button": {
                        "label": "Gửi thông tin",
                        "background_color": "#6666ff", //Background color of submit button
                        "cta": "request",
                        "url": "https://carbid.getsandbox.com/api/send-response"
                    },
                    "reset_button": {
                        "label": "Xóa toàn bộ",
                        "background_color": "#669999" //Background color of reset button
                    },
                    "elements": [
                        // Form Elements   
                    ]
                }
            }
        });
    });
}