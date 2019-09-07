'use strict';

let vjson = require('../utils/vinid-json')
let app = require('../../server/server')
let to = require('await-to-js').to


module.exports = function(Machine) {
    Machine.getOrderForm = async function(machineId, rootMachineActionId, history) {
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
            orderForm.history.push({
                machineActionId: rootMachineActionId
            })
            for (let i in machineActions) {
                if (machineActions[i].parentId == rootMachineActionId) {
                    let element = vjson.actionToElement(machineActions[i]);
                    vjson.addElement(orderForm, element)
                }
            }
        }
        return orderForm
    }

    Machine.remoteMethod(
        'getOrderForm', {
            http: {
                path: '/order_form',
                verb: 'POST',

            },
            accepts: [
                {
                    arg: 'machine_id', type: 'number', required: 'true', http: {source: 'query'}
                }, {
                    arg: 'root_machine_action_id', type: 'number'
                }, {
                    arg: 'history', type: 'any'
                }
            ],
            returns: {arg: 'data', type: 'object'}
        }
    )
};
