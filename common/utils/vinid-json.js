

module.exports = {
    createJson: function() {
        return {
            "metadata": {
                "app_name": "bitZero",
                "title": "bitZero - Tự định nghĩa cách bạn mua hàng",
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
    },
    
    addElement: function(json, element) {
        json.metadata.elements.push(element);
    },

    addElements: function(json, elements) {
        for (i in elements) {
            element = elements[i]
            this.addElement(json, element);
        }
    },

    actionToElement: function(action) {
        // console.log(action)
        var element = {}
        element.type = 'text';
        element.style = 'paragraph'
        element.content = action.actionName
        // console.log(element)
        return element
    }
}