const transfer_energy_only_to_container = require("./functions").transfer_energy_only_to_container;
const harvest_energy = require("./functions").harvest_energy;

const functions = [harvest_energy, transfer_energy_only_to_container];

const roleExplorerHarvester = {
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
        for(let i in functions){
            if(functions[i](creep) === true){
                break;
            }
        }
    }
};

module.exports = roleExplorerHarvester;

