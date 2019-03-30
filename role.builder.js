const upgrade_controller = require("./functions").upgrade_controller;
const use_withdraw = require("./functions").use_withdraw;
const repair_structure = require("./functions").repair_structure;
const build_structure = require("./functions").build_structure;

const functions = [build_structure, repair_structure, upgrade_controller, use_withdraw];
const roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if(arguments[1]){
            console.log('Arguments: ' + arguments[1]);
            creep.memory.working_room = arguments[1]
        }
        if (creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
            creep.say('harvest');
        }
        else if (!creep.memory.building && creep.carry.energy > 0) {
            if(creep.room.name === creep.memory.working_room){
                creep.memory.building = true;
            }
            else{
                console.log('Working room: ' + creep.memory.working_room);
                creep.moveTo(new RoomPosition(1, 33, creep.memory.working_room));
                creep.say('going to another room');
                return
            }

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
