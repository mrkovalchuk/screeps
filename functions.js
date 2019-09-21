const build_structure = function(creep) {
    let target = Game.getObjectById(creep.memory.build_target);
    if(!target) {
        target = creep.room.find(FIND_CONSTRUCTION_SITES)[0];
    }
    if (target) {
        creep.memory.build_target = target.id;
        creep.memory.building = true;
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
        creep.memory.building = true;
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
    creep.memory.building = true;
    if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    }
    return true
};


const use_withdraw = function(creep) {
    let target = creep.pos.findClosestByPath(creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return ((structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0)
                || (structure.structureType === STRUCTURE_EXTENSION && structure.energy > 0)
                || (structure.structureType === STRUCTURE_SPAWN && structure.energy > 0))
        }}));
    
    if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
};

const transfer_energy = function(creep) {
    const target = creep.pos.findClosestByPath(creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return ((structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_EXTENSION) &&
                structure.energy < structure.energyCapacity) || (structure.structureType === STRUCTURE_CONTAINER
                && structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
        }
    }));
    if(target) {
        transfer_to(creep, target);
        return true
    }
    return false
};

const transfer_energy_only_to_container = function (creep) {
    const target = creep.pos.findClosestByPath(creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] < structure.storeCapacity)
        }
    }));
    if(target){
        transfer_to(creep, target);
        return true
    }
    return false
};

const external_harvest = function (creep) {
    if(creep.carry.energy < creep.carryCapacity) {
        const energy = creep.room.find(FIND_FLAGS, {
            filter: (flag) => {
                return flag.name.includes('EnergySpot')
            }
        })[0];
        const source = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES, {
            filter: (structure) => {
                return ((structure.pos.x === energy.pos.x)
                    && structure.pos.y === energy.pos.y)
            } }));

        if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
        return true


    }
    return false
};

const external_builde_structure = function(creep) {
    let target = Game.getObjectById(creep.memory.build_target);
    if(!target) {
        target = creep.room.find(FIND_MY_CONSTRUCTION_SITES)[0];
    }
    if (target) {
        creep.memory.build_target = target.id;
        creep.memory.building = true;
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

const harvest_energy = function (creep) {
    if(creep.carry.energy < creep.carryCapacity) {
        const source = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));

        if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
        return true
    }
    return false
};


const transfer_to = function(creep, target) {
    if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
};

module.exports = {build_structure, repair_structure, use_withdraw, upgrade_controller, transfer_energy,
    transfer_energy_only_to_container, harvest_energy, external_harvest, external_builde_structure};
