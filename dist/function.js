const harvest = function(creep) {
    if(creep.store.getFreeCapacity() > 0) {    
        if(creep.harvest(creep.memory.target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.memory.target);
        }
    }
};

module.exports = {harvest};