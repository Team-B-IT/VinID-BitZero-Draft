'use strict';

let vjson = require('../utils/vinid-json')
let app = require('../../server/server')
let to = require('await-to-js').to
let calculatePrice = require('../utils/price-caculating')


module.exports = function(Machine) {
    Machine.getOrderForm = async function(machineId, rootMachineActionId, rootMachineActionAmount, history) {
        // console.log(machineId, rootMachineActionId, rootMachineActionAmount, history)
        let orderForm = vjson.createJson()
        if (history != undefined) {
            orderForm.history = history
        }
        let MachineAction = app.models.MachineAction
        let [err, machineActions] = await to(MachineAction.find({where: {machineId: machineId}}))
        if (err) {
            console.log("error when finding Machine Action", err)
            return orderForm
        }
        if (rootMachineActionId == undefined) {
            for (let i in machineActions) {
                if (machineActions[i].parentId == undefined || machineActions[i].parentId == machineActions[i].machineActionId) {
                    let element = vjson.actionToElement(machineActions[i]);
                    vjson.addElement(orderForm, element)
                }
            }
        } else {
            if (rootMachineActionAmount == undefined) {
                rootMachineActionAmount = 1
            }
            orderForm.history.push({
                machineActionId: rootMachineActionId,
                machineActionAmount: rootMachineActionAmount
            })
            let childrenCounter = 0
            for (let i in machineActions) {
                if (machineActions[i].parentId == rootMachineActionId) {
                    childrenCounter += 1
                    let element = vjson.actionToElement(machineActions[i]);
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
