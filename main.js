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
        console.log('upgraders:  '+ upgraders.length + '\n' + 'builders: ' + builders.length + '\n'
            + 'harvesters: '+ harvesters.length + '\ntransporters: ' + transporters.length);

        if(harvesters.length < creepsCount.harvesters_mini){
            creepFactory.build('harvester', room_name);
        }
        if(harvesters.length < creepsCount.harvesters){
            creepFactory.build('harvester', room_name);
        }
        else if(transporters.length < creepsCount.transporters.in){
            creepFactory.build('transporter', room_name, 'in');
        }
        else if(transporters.length < creepsCount.transporters.from){
            creepFactory.build('transporter', room_name, 'from');
        }
        if(transporters.length > 2){
            if(builders.length < creepsCount.builders) {
                creepFactory.build('builder', room_name);
            }
            else if(upgraders.length < creepsCount.upgraders) {
                creepFactory.build('upgrader', room_name);
            }
            else if(upgraders.length < creepsCount.upgraders) {
                creepFactory.build('explorer_builder', room_name);
            }
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
