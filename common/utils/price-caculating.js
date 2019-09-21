
function paymentType0() {
    return 0
}

function paymentType1() {
}

function paymentType2() {

}

function paymentType3() {

}

function discountType0() {
    return 0
}

function discountType1() {

}

function discountType2() {

}

function discountType3() {

}

paymentTypeCalculators = [paymentType0, paymentType1, paymentType2, paymentType3]
discountTypeCalculators = [discountType0, discountType1, discountType2, discountType3]

module.exports = async function calculatePrice(history, constraint) {
    let totalPrice = 0
    let actions = []
    for (let i in history) {
        let [err, action] = await to (Action.findOne({where: {actionId: history[i].actionId}}))
        if (err || action == undefined) {
            console.log("error when finding Machine Action", err)
            return 0
        }
        actions.push(action)
    }

    for (let i in actions) {
        totalPrice += calculatePrice[actions.paymentType | 0](actions[i])
    }

    for (let i in discountTypeCalculators) {
        totalPrice -= discountTypeCalculators[i](actions)
    }

        // totalPrice += (history[i].actionAmount || 1) * (action.price || 0)
    return totalPrice
}