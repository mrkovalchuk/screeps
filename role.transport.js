
const roleTransporter = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.carry.energy < creep.carryCapacity && !creep.memory.working) {
            const target = creep.pos.findClosestByPath(creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
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
            const target = creep.pos.findClosestByPath(creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_EXTENSION
                        || structure.structureType == STRUCTURE_SPAWN)
                        && structure.energy < structure.energyCapacity);
                }
            }));
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        if(creep.carry.energy == 0){
            creep.memory.working = false
        }
    }
};

module.exports = roleTransporter;

