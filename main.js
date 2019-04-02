const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleTransporter = require('role.transport');
const roleExplorerTransporter = require('role.explorer.transport');
const roleExplorerHarvester = require('role.explorer.harvester');
const roleAttacker = require('role.attacker');
const roleTower = require('tower');
const roleExplorer = require("./role.explorer_builder");
const ROOM_CREEPS = require("./settings").ROOM_CREEPS;
const creepFactory = require("./factory.creep").creepFactory;


module.exports.loop = function () {
    let upgraders = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'upgrader'});
    let builders = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'builder'});
    let harvesters = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'harvester'});
    let transporters = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'transporter'});


    let spawn = Game.spawns['PrimeTown'];
    spawn.memory.creepsSet = ROOM_CREEPS;

    const towers = spawn.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType === STRUCTURE_TOWER
        }
    });
    console.log("Towers:" + towers);
    for(const i in towers){
        roleTower(towers[i])
    }

    for(const room_name in ROOM_CREEPS){
        let explorer_builders = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'explorer_builder'
            && (creep.memory.working_room === room_name)
        });
        let explorer_transporters = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'explorer_transporter'
            && (creep.memory.working_room === room_name)
        });
        let explorer_harvesters = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'explorer_harvester'
            && (creep.memory.working_room === room_name)
        });
        let attack_ranger = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'attack_ranger'});
        let attack_milli = _.filter(Game.creeps, function(creep){ return creep.memory.role === 'attack_milli'});

        const creepsCount = ROOM_CREEPS[room_name];
        console.log('roomName: ' + room_name);
        console.log('upgraders:  '+ upgraders.length + '\n' + 'builders: ' + builders.length + '\n'
            + 'harvesters: '+ harvesters.length + '\ntransporters: ' + transporters.length);
        console.log('Explorers: '+ explorer_builders);

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
        if(transporters.length >= 2){
            if(attack_ranger.length < creepsCount.attack_rangers){
                creepFactory.build('attack_milli', 'E45N19');
            }
            if(attack_milli.length < creepsCount.attack_milli){
                creepFactory.build('attack_ranger', 'E45N19');
            }
            if((attack_milli.length + attack_ranger.length) === 11)
                spawn.room.memory.attack = true;

            if(builders.length < creepsCount.builders) {
                creepFactory.build('builder', room_name);
            }
            else if(upgraders.length < creepsCount.upgraders) {
                creepFactory.build('upgrader', room_name);
            }
            if(explorer_builders.length < creepsCount.explorer_builders) {
                creepFactory.build('explorer_builder', room_name);
            }
            if(explorer_harvesters.length < creepsCount.explorer_harvester) {
                creepFactory.build('explorer_harvester', room_name);
            }
            if(explorer_transporters.length < creepsCount.explorer_transporters) {
                const storage = spawn.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType === STRUCTURE_STORAGE
                    }
                })[0];
                creepFactory.build('explorer_transporter', room_name, storage.id);
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
        if(creep.memory.role === 'explorer_builder'){
            roleExplorer.run(creep)
        }
        if(creep.memory.role === 'explorer_transporter'){
            roleExplorerTransporter.run(creep)
        }
        if(creep.memory.role === 'explorer_harvester'){
            roleExplorerHarvester.run(creep)
        }
        if((creep.memory.role === 'attack_ranger') || creep.memory.role === 'attack_milli'){
            if(spawn.room.memory.attack){
                roleAttacker.run(creep)
            }
            else {
                if(!creep.spawning){
                    roleAttacker.to_spawn_point(creep)
                }
            }
        }
    }
};
