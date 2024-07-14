var builder = require('creepsFactory')
var role = require('role');
var _ = require('lodash')



const CREEPS_CONFIG = {
    'harvester': {
        'body': [WORK, CARRY, MOVE],
        'memory': {
            'role': 'harvester'
        },
        'count': 3,
    },
    'multiworker': {
        'body': [WORK, CARRY, MOVE],
        'memory': {
            'role': 'multiworker'
        },
        'count': 3,
    }
}


module.exports.loop = function () {
    var spawn = Game.spawns['Spawn1']

    const harvesters_count = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length
    const multiworkers_count = _.filter(Game.creeps, (creep) => creep.memory.role == 'multiworker').length
    
    if (harvesters_count < CREEPS_CONFIG.harvester.count) {
        builder.build(CREEPS_CONFIG.harvester.body, spawn, 'harvester')
    }

    if (multiworkers_count < CREEPS_CONFIG.multiworker.count) {
        builder.build(CREEPS_CONFIG.multiworker.body, spawn, 'multiworker')
    }
    

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        role.run(creep, spawn);
    }
};
