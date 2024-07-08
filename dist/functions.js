const harvest = function(creep, spawn) {
    if (creep.store.getFreeCapacity() == 0) {
        // do not harvest if full
        return false
    }

    let target = Game.getObjectById(creep.memory.target_id)

    if (!target) {
        console.log('looking for a new target to harvest', creep.name)
        target = spawn.room.find(FIND_SOURCES)[0]
        creep.memory.target_id = target.id
    }

    if(creep.store.getFreeCapacity() > 0) {    
        if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
        return true
    }

    creep.memory.target_id = null
    return false
};

const transfer_energy = function(creep, spawn) {
    if (creep.store.getFreeCapacity() === creep.store.getCapacity()) {
        // nothing to transfer
        return false
    }

    let target = Game.getObjectById(creep.memory.target_id)

    if (!target) {
        console.log('looking for a new target to transfer')
        target = creep.pos.findClosestByPath(creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
            }
        }));
    }
    
    if(target) {
        creep.memory.target_id = target.id
        const trasnfered = transfer_to(creep, target);
        if (trasnfered) {
            creep.memory.target_id = null
        }
        return true
    }

    return false
};

const transfer_to = function(creep, target) {
    if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
        return false
    }
    return true
};

module.exports = {harvest, transfer_energy};