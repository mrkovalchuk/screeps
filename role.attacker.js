const upgrade_controller = require("./functions").upgrade_controller;
const use_withdraw = require("./functions").use_withdraw;
const repair_structure = require("./functions").repair_structure;
const build_structure = require("./functions").build_structure;

const functions = [build_structure, upgrade_controller, use_withdraw];
const roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
            creep.say('harvest');
        }
        else if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('build');
        }

        if (creep.memory.building) {
            for(let i in functions){
                if(functions[i](creep) === true){
                    break;
                }
            }
        }
        else {
            use_withdraw(creep)
        }
    }
};

module.exports = roleBuilder;
