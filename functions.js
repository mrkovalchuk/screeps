const build_structure = function(creep) {
    let target = Game.getObjectById(creep.memory.build_target);
    if(!target) {
        target = creep.room.find(FIND_CONSTRUCTION_SITES)[0];
    }
    if (target) {
        creep.memory.build_target = target.id;

        if (creep.build(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#303aff'}});
        }
        if (target.progress === target.progressTotal) {
            creep.memory.build_target = null
        }
        return true
    }
    return false
};

const repair_structure = function(creep) {
    let target = Game.getObjectById(creep.memory.repair_target);
    if(!target){
        target = creep.pos.findClosestByPath(creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
        }));
    }

    if(target){
        creep.memory.repair_target = target.id;

        if(creep.repair(target) === ERR_NOT_IN_RANGE){
            creep.moveTo(target)
        }
        if(target.hits === target.hitsMax) {
            creep.memory.repair_target = null
        }
        return true
    }
    return false
};


const upgrade_controller = function(creep) {
    if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
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
