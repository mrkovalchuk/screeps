const harvest = function(creep) {
    var target = Game.getObjectById(creep.memory.target_id)
    if(creep.store.getFreeCapacity() > 0) {    
        if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }
};

module.exports = {harvest};