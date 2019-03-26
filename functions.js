function build_structure(creep) {
    let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length) {
        while (creep.carry.energy) {
            if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#303aff'}});
            }
        }
        return true
    }
    return false
}
