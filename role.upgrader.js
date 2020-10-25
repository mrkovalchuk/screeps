var roleUpgrader = {

  /** @param {Creep} creep **/
  run: function(creep) {

      if(creep.memory.upgrading && creep.carry.energy == 0) {
          creep.memory.upgrading = false;
          creep.say('harvesting');
      }
      if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
          creep.memory.upgrading = true;
          creep.say('upgrading');
      }

      if(creep.memory.upgrading) {
          if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
              creep.moveTo(creep.room.controller);
          }

      }
      else {
          const source = creep.pos.findClosestByPath(creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
              return ((structure.structureType == STRUCTURE_EXTENSION && structure.energy > 0) || (structure.structureType === STRUCTURE_SPAWN && structure.energy > 0))
          }}));
          if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
          }
      }
  }
};

module.exports = roleUpgrader;
