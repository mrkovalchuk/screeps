var builder = require('creepsFactory')
var role = require('role');
var _ = require('lodash')



const CREEPS_CONFIG = {
    'harvester': {
        'body': [WORK, CARRY, MOVE],
        'memory': {
            'role': 'harvester'
        },
        'count': 4,
    },
    'builder': {
        'body': [WORK, CARRY, MOVE],
        'memory': {
            'role': 'builder'
        },
        'count': 3,
    },
    'multiworker': {
        'body': [WORK, CARRY, MOVE],
        'memory': {
            'role': 'multiworker'
        },
        'count': 8,
    }
}


module.exports.loop = function () {
    var spawn = Game.spawns['Spawn1']

    const harvesters_count = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length
    const builders_count = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length
    
    if (harvesters_count < CREEPS_CONFIG.harvester.count) {
        builder.build(CREEPS_CONFIG.harvester.body, spawn, 'harvester')
    }

    // if (builders_count < CREEPS_CONFIG.builder.count) {
    //     builder.build(CREEPS_CONFIG.builder.body, spawn, 'builder')
    // }
    

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        role.run(creep, spawn);
    }
};
