const repair_structure = require("./functions").repair_structure;
const build_structure = require("./functions").build_structure;
const harvest_energy = require("./functions").harvest_energy;


const functions = [harvest_energy, build_structure, repair_structure];

const roleExplorer = {
    to_room: function(creep){
        if(creep.room.name !== creep.memory.working_room){
            const path = creep.memory.path;
            creep.moveTo(new RoomPosition(path.x, path.y, path.roomName));
            return false
        }
        else {
            return true
        }
    },
    /** @param {Creep} creep **/
    run: function(creep) {
        if(!this.to_room(creep)){
            return
        }
        if (creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
            creep.say('harvest');
        }
        else if (!creep.memory.building && creep.carry.energy > 0) {
            creep.memory.building = true;
            creep.say('build');
        }
        for(let i in functions){
            if(functions[i](creep) === true){
                break;
            }
        }
    }
};

module.exports = roleExplorer;

