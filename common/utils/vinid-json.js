

module.exports = {
    createJson: async function() {
        return {
            "data": {
                "metadata": {
                    "app_name": "bitZero",
                    "title": "Ứng dụng mua hàng tự động cùng bitZero",
                    "submit_button": {
                        "label": "Gửi thông tin",
                        "background_color": "#6666ff",
                        "cta": "request",
                        "url": "https://teambit.tech/api/send-response"
                    },
                    "reset_button": {
                        "label": "Xoá bản ghi",
                        "background_color": "#669999"
                    },
                    "elements": []
                }
            }
        }
    },
    
    addElement: async function(json, element) {
        json.data.metadata.element.add(element);
    },

    addElements: async function(json, elements) {
        for (element in elements) {
            this.addElements(json, element);
        }
    }
}