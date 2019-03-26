const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');

module.exports.loop = function () {
    var upgraders = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'upgrader'})
    var builders = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'builder'})
    var harvesters = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'harvester'})

    for(const i in Game.spawns) {
        if((_.filter(Game.creeps).length) >= Game.spawns[i].memory.maxCreeps){
            break;
        }
        const creepName = 'Ball#'+ Math.floor(Math.random() * 1000)
        console.log('upgraders:  '+ upgraders.length + '\n' + 'builders: ' + builders.length + '\n' + 'harvesters: '+ harvesters.length)

        if(harvesters.length < 4){
            Game.spawns[i].spawnCreep([WORK, WORK, MOVE, CARRY], 'H|'+creepName, {memory: {role: 'harvester'}});
        }
        else if(builders.length < (_.filter(Game.creeps).length/4)) {
            console.log('CREATE BUILDER')
            Game.spawns[i].spawnCreep([WORK, WORK, WORK, MOVE, MOVE, CARRY], 'B|'+creepName, {memory: {role: 'builder'}});
        }

        else if(upgraders.length < 2) {
            Game.spawns[i].spawnCreep([WORK, MOVE, WORK, CARRY, WORK], 'U|'+creepName, {memory: {role: 'upgrader'}});
        }

        else if(!Game.spawns[i].memory.stopHarvester){

            Game.spawns[i].spawnCreep([WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY], 'H|'+creepName, {memory: {role: 'harvester'}});

        }
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
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
