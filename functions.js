const build_structure = function(creep) {
    let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length) {
        creep.memory.target = target;

        while (creep.carry.energy) {
            if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#303aff'}});
            }
        }
        return true
    }
    return false
};

const repair_structure = function(creep) {
    let target = creep.pos.findClosestByPath(creep.room.find(FIND_STRUCTURES, {
        filter: object => object.hits < object.hitsMax
    }));

    if(target){
        creep.memory.target = target;

        while(target.hits < target.hitsMax && creep.carry.energy > 0){
            if(creep.repair(target) === ERR_NOT_IN_RANGE){
                creep.moveTo(target)
            }
        }
        return true
    }
    return false
};


const upgrade_controller = function(creep) {
    while(creep.carry.energy){
        if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
    return true
};


const use_withdraw = function(creep) {
    let target = creep.pos.findClosestByPath(creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return ((structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0)
                || (structure.structureType === STRUCTURE_EXTENSION && structure.energy > 0))
        }}));

    if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
};

module.exports = {build_structure, repair_structure, use_withdraw, upgrade_controller};
