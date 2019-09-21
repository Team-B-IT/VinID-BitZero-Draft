'use strict';

module.exports = function(Customer) {
    Customer.getOrderForm = async function(machineId, rootActionId, rootActionAmount, history) {
        let orderForm = vjson.createJson()
        if (history != undefined) {
            orderForm.history = history
        }
        let machine = await Machine.findOne({where: {machineId: machineId}})
        let Action = app.models.Action
        let actions = await Action.find({where: {machineTypeId: machine.machineTypeId}})
        if (rootActionId == undefined) {
            for (let i in actions) {
                if (actions[i].parentId == undefined || actions[i].parentId == actions[i].machineId) {
                    let element = vjson.actionToElement(actions[i]);
                    vjson.addElement(orderForm, element)
                }
            }
        } else {
            if (rootActionAmount == undefined) {
                rootActionAmount = 1
            }
            orderForm.history.push({
                actionId: rootActionId,
                actionAmount: rootActionAmount
            })
            let childrenCounter = 0
            for (let i in actions) {
                if (actions[i].parentId == rootActionId) {
                    childrenCounter += 1
                    let element = vjson.actionToElement(actions[i]);
                    vjson.addElement(orderForm, element)
                }
            }
            if (childrenCounter == 0) {
                let totalPrice = await calculatePrice(history)
                orderForm.addElements([
                    {
                        'type': 'text',
                        'style': 'paragraph',
                        'content': `Giao dịch của bạn tốn ${totalPrice}
                        Bạn chắc chắn muốn tiếp tục?`
                    },
                    {
                        'type': 'input',
                        'display': 'inline',
                        'label': 'Xác nhận',
                        'name': 'Xác nhận',
                        'options': [
                            {
                                'Đồng ý': 'Đồng ý',
                            },
                            {
                                'Từ chối': 'Từ chối'
                            }
                        ]
                    }
                ])
            }
        }
        return orderForm
    }

    Machine.excuteAction = async function(actions) {
        for (let i in actions) {
            axios.post(actions[i].address, {'data': actions[i].actionName})
        }
    }

    Machine.sellerAddMachine = async function() {
        
    }

    Machine.remoteMethod(
        'getOrderForm', {
            http: {
                path: '/order-form',
                verb: 'POST',

            },
            accepts: [
                {
                    arg: 'machine_id', type: 'number', required: 'true', http: {source: 'query'}
                }, {
                    arg: 'root_machine_action_id', type: 'number', http :{source: 'form'}
                }, {
                    arg: 'root_machine_action_amount', type: 'number', http :{source: 'form'}
                }, {
                    arg: 'history', type: 'any', http :{source: 'form'}
                }
            ],
            returns: {arg: 'data', type: 'object'}
        }
    )
};
