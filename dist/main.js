var builder = require('creepsFactory')
var role = require('role');

module.exports.loop = function () {
    var spawn = Game.spawns['Spawn1']
    builder.build([WORK, CARRY, MOVE], spawn, 'harvester')

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        role.run(creep);
    }
};
