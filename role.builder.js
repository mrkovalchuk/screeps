const upgrade_controller = require("./functions").upgrade_controller;
const use_withdraw = require("./functions").use_withdraw;
const repair_structure = require("./functions").repair_structure;
const build_structure = require("./functions").build_structure;

const functions = [build_structure, repair_structure, upgrade_controller, use_withdraw];
const roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.building) {
            for(let i in functions){
                if(functions[i](creep) === true){
                    break;
                }
            }
        }
        else {
            creep.memory.building = false;
            use_withdraw(creep)
        }
    }
};

module.exports = roleBuilder;
