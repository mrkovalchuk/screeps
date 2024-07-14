const { CREEP_MODES } = require('./constants');

const harvest = function(creep, spawn) {
    if (creep.store.getFreeCapacity() === 0) {
        creep.memory.mode = CREEP_MODES.IDLE;
        return CREEP_MODES.IDLE;
    }

    if (creep.memory.mode !== CREEP_MODES.HARVESTING) {
        creep.memory.mode = CREEP_MODES.HARVESTING;
    }

    let target = Game.getObjectById(creep.memory.target_id);
    if (!target) {
        target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (!target) {
            creep.memory.mode = CREEP_MODES.IDLE;
            return CREEP_MODES.IDLE;
        }
        creep.memory.target_id = target.id;
    }

    if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
    return CREEP_MODES.HARVESTING;
};

const build = function(creep, spawn) {
    if (creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.mode = CREEP_MODES.IDLE;
        creep.memory.target_id = null;
        return CREEP_MODES.IDLE;
    }

    if (creep.memory.mode !== CREEP_MODES.BUILDING) {
        creep.memory.mode = CREEP_MODES.BUILDING;
    }

    let target = Game.getObjectById(creep.memory.target_id);
    if (!target) {
        target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if (!target) {
            creep.memory.mode = CREEP_MODES.IDLE;
            return CREEP_MODES.IDLE;
        }
        creep.memory.target_id = target.id;
    }

    if(creep.build(target) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
    return CREEP_MODES.BUILDING;
};

const transfer_energy = function(creep, spawn) {
    if (creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.mode = CREEP_MODES.IDLE;
        creep.memory.target_id = null;
        return CREEP_MODES.IDLE;
    }

    if (creep.memory.mode !== CREEP_MODES.TRANSFERRING) {
        creep.memory.mode = CREEP_MODES.TRANSFERRING;
    }

    let target = Game.getObjectById(creep.memory.target_id);
    if (!target) {
        target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_SPAWN || 
                        structure.structureType === STRUCTURE_EXTENSION) && 
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if (!target) {
            creep.memory.mode = CREEP_MODES.IDLE;
            return CREEP_MODES.IDLE;
        }
        creep.memory.target_id = target.id;
    }

    if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
    return CREEP_MODES.TRANSFERRING;
};

const upgrade_controller = function(creep, spawn) {
    if (creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.mode = CREEP_MODES.IDLE;
        return CREEP_MODES.IDLE;
    }

    if (creep.memory.mode !== CREEP_MODES.UPGRADING) {
        creep.memory.mode = CREEP_MODES.UPGRADING;
    }

    if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    }
    return CREEP_MODES.UPGRADING;
};

module.exports = {harvest, transfer_energy, upgrade_controller, build};