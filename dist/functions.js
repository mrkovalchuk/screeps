const harvest = function(creep) {
    var target = Game.getObjectById(creep.memory.target_id)
    if(creep.store.getFreeCapacity() > 0) {    
        if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
        return true
    }
    return false
};

const transfer_energy = function(creep) {
    const target = creep.pos.findClosestByPath(creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (
                structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
        }
    }));
    if(target) {
        transfer_to(creep, target);
        return true
    }
    return false
};

const transfer_to = function(creep, target) {
    if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
        return true
    }
    return false
};

module.exports = {harvest, transfer_energy};