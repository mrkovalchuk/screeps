const getCreepByRole = function(role) {
  return _.filter(Game.creeps, function(creep){ return creep.memory.role === role}).length
}

BODY_COST = new Map([
  ["WORK", 100],
  ["MOVE", 50],
  ["CARRY", 50],
  ["ATTACK", 80],
  ["RANGED_ATTACK", 150],
  ["HEAL", 250],
  ["TOUGH", 10],
  ["CLAIM", 600],
])

const calculateCreepCost = function(creep) {
  return _.reduce(creep.body, function(result, el) { return result + BODY_COST.get(el.type)}, 0)
}

module.exports = {getCreepByRole, calculateCreepCost}