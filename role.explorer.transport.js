
const roleExplorerTransporter = {
    to_room: function(creep){
        if((creep.room.name !== creep.memory.working_room) && !creep.memory.working){
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
        if((creep.carry.energy < creep.carryCapacity) && !creep.memory.working) {
            const target = creep.pos.findClosestByPath(creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType === STRUCTURE_CONTAINER
                        && (structure.store[RESOURCE_ENERGY] >= creep.carryCapacity)
                }
            }));

            if(creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            creep.memory.working = true;
            console.log('TARGET: '+creep.memory.base_container);
            const target = creep.pos.findClosestByPath(Game.getObjectById(creep.memory.base_container));
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        if(creep.carry.energy === 0){
            creep.memory.working = false
        }
    }
};

module.exports = roleExplorerTransporter;

