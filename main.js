const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleTransporter = require('role.transport');
const ROOM_CREEPS = require("./settings").ROOM_CREEPS;
const creepFactory = require("./factory.creep").creepFactory;


module.exports.loop = function () {
    let upgraders = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'upgrader'});
    let builders = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'builder'});
    let harvesters = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'harvester'});
    let transporters = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'transporter'});


    let spawn = Game.spawns['PrimeTown'];
    spawn.memory.creepsSet = ROOM_CREEPS;

    for(const room_name in ROOM_CREEPS){
        const creepsCount = ROOM_CREEPS[room_name];
        console.log('roomName: ' + room_name);

        const creepName = 'Ball#'+ Math.floor(Math.random() * 1000);
        console.log('upgraders:  '+ upgraders.length + '\n' + 'builders: ' + builders.length + '\n' + 'harvesters: '+ harvesters.length);

        if(harvesters.length < creepsCount.harvesters_mini){
            spawn.spawnCreep([WORK, WORK, MOVE, CARRY], 'H|'+creepName, {memory: {role: 'harvester',
                    working_room: room_name}});
        }
        if(harvesters.length < creepsCount.harvesters){
            spawn.spawnCreep([WORK, WORK, WORK, MOVE, CARRY], 'H|'+creepName, {memory: {role: 'harvester',
                    working_room: room_name}});
        }
        else if(transporters.length < creepsCount.transporters){
            spawn.spawnCreep([MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                'T|'+creepName, {memory: {role: 'transporter',
                        working_room: room_name}});
        }
        else if(builders.length < creepsCount.builders) {
            creepFactory.build('builder', room_name);
        }

        else if(upgraders.length < creepsCount.upgraders) {
            spawn.spawnCreep([WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY], 'U|'+creepName, {memory: {role: 'upgrader',
                    working_room: room_name}});
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
