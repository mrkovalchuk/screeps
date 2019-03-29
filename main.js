const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleTransporter = require('role.transport');
const creepFactory = require("./factory.creep").creepFactory;


module.exports.loop = function () {
    let upgraders = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'upgrader'});
    let builders = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'builder'});
    let harvesters = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'harvester'});
    let transporters = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'transporter'});

    for(const i in Game.spawns) {
        let spawn = Game.spawns[i];

        const creepName = 'Ball#'+ Math.floor(Math.random() * 1000);
        console.log('upgraders:  '+ upgraders.length + '\n' + 'builders: ' + builders.length + '\n' + 'harvesters: '+ harvesters.length);

        if(harvesters.length < 2){
            spawn.spawnCreep([WORK, WORK, MOVE, CARRY], 'H|'+creepName, {memory: {role: 'harvester'}});
        }
        if(harvesters.length < 6){
            spawn.spawnCreep([WORK, WORK, WORK, MOVE, CARRY], 'H|'+creepName, {memory: {role: 'harvester'}});
        }
        else if(transporters.length < 2){
            spawn.spawnCreep([MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                'T|'+creepName, {memory: {role: 'transporter'}});
            break;
        }
        else if(builders.length < 3) {
            creepFactory.build('builder');
        }

        else if(upgraders.length < 9) {
            spawn.spawnCreep([WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY], 'U|'+creepName, {memory: {role: 'upgrader'}});
        }

    }


    for(let name in Game.creeps) {
        let creep = Game.creeps[name];

        if(creep.memory.role === 'transporter'){
            roleTransporter.run(creep)
        }
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
