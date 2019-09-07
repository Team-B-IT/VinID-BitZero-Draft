

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
            },
            "history": []
        }
    },
    
    addElement: function(json, element) {
        json.metadata.elements.push(element);
    },

    addElements: function(json, elements) {
        for (let i in elements) {
            this.addElement(json, elements[i])
        }
    },

    actionToElement: function(action) {
        var element = {}
        if (action.valueType == "number"){
            element.type = "input"
            element.input_type = "number"
            element.label = action.actionName
            element.required = true
            element.name = action.actionName
        }
        else if (action.valueType == "radio"){
            element.type = "radio"
            element.display = "inline"
            element.label = action.actionName
            element.name = action.actionName
        }
        else if (action.valueType == "checkbox"){
            element.type = "checkBox"
            element.display = "inline"
            element.label = action.actionName
            element.name = action.actionName
            element.options = [
                {
                    "label1": "option1"
                }
            ]
        }
        return element
    }
}