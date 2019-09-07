
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
    let machineActions = []
    for (let i in history) {
        let [err, machineAction] = await to (MachineAction.findOne({where: {machineActionId: history[i].machineActionId}}))
        if (err || machineAction == undefined) {
            console.log("error when finding Machine Action", err)
            return 0
        }
        machineActions.push(machineAction)
    }

    for (let i in machineActions) {
        totalPrice += calculatePrice[machineActions.paymentType | 0](machineActions[i])
    }

    for (let i in discountTypeCalculators) {
        totalPrice -= discountTypeCalculators[i](machineActions)
    }

        // totalPrice += (history[i].machineActionAmount || 1) * (machineAction.price || 0)
    return totalPrice
}