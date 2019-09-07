'use strict';

let vjson = require('../utils/vinid-json')
let app = require('../../server/server')
let to = require('await-to-js').to


module.exports = function(Machine) {
    Machine.createOrderForm = async function(machineId) {
        let orderForm = vjson.createJson();
        let MachineAction = app.models.MachineAction
        let [err, actions] = await to(MachineAction.find({where: {machineId: machineId}}))
        if (err) {
            console.log(err)
            vjson.addElement(orderForm, {
                type: 'text',
                style: 'paragraph',
                content: 'Error when finding machine actions'
            })
            console.log(err)
            return orderForm;
        }

        // console.log(actions)
        let elements = []
        let i
        for (i in actions) {
            let action = actions[i]
            // console.log(action)
            let element = vjson.actionToElement(action)
            // console.log(element)
            elements.push(element);
            // console.log(elements)
        }
        // console.log(elements)
        vjson.addElements(orderForm, elements)

        return orderForm
    }

    Machine.remoteMethod(
        'createOrderForm', {
            path: '/getOrderForm',
            accepts: {arg: 'machineId', type: 'number', required: 'true'},
            returns: {arg: 'data', type: 'object'}
        }
    )
};
