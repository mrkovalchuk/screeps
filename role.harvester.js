
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        let workers_by_node = {}
        if(creep.carry.energy < creep.carryCapacity && !creep.memory.working) {
            var sources = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));

            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
            }
        }
        else {
            creep.memory.working = true;
            var target = creep.pos.findClosestByPath(creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            }));
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                var target = creep.pos.findClosestByPath(creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] >= 0)
                    }
                }))
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
                else{
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                }
            }
        }
        if(creep.carry.energy == 0){
            creep.memory.working = false;
        }
    }
};

module.exports = roleHarvester;

