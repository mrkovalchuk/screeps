var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        let workers_by_node = {}
        if(creep.carry.energy < creep.carryCapacity) {
            var source = creep.room.find(FIND_SOURCES)[0];
            creep.memory.source = source
            console.log(workers_by_node)
            if(workers_by_node[source].length > 5) {
                var source = creep.room.find(FIND_SOURCES)[1];
                creep.memory.source = source
            }
            workers_by_node[source] += 1
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            creep.moveTo()
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;