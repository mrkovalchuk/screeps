const repair_structure = require("./functions").repair_structure;
const build_structure = require("./functions").build_structure;
const harvest_energy = require("./functions").harvest_energy;


const functions = [harvest_energy, build_structure, repair_structure];

const roleExplorer = {
    take_room_path: function(creep){
        if(creep.room.name !== creep.memory.working_room){
            creep.memory.path = new RoomPosition(2, 18, creep.memory.working_room).id
        }
    },
    to_room: function(creep){
        creep.moveTo(creep.memory.path)
    },
    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.memory.path){
            this.take_room_path(creep);
            this.to_room(creep)
        }
        for(let i in functions){
            if(functions[i](creep) === true){
                break;
            }
        }
    }
};

module.exports = roleExplorer;

