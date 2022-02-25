const harvest_energy = function(creep) {
    if(creep.carry.energy < creep.carryCapacity) {
        const source = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));

        if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
        return true
    }
    return false
};

module.exports = {harvest_energy};