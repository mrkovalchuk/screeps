const roleHarvester = require('harvester');
const roleUpgrader = require('upgrader');
const roleBuilder = require('builder');

module.exports.loop = function () {
    for(let i in Game.spawns) {
        Game.spawns[i].spawnCreep([WORK, MOVE, MOVE, CARRY], {memory: {role: 'harvest'}});
    }

    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if(creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
    }
};