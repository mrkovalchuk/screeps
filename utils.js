const getCreepByRole = function(role) {
    return _.filter(Game.creeps, function(creep){ return creep.memory.role === role})
}

module.exports = {getCreepByRole}