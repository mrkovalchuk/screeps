const roleAttacker = {
    move: function(creep){
        if(creep.room.name !== creep.memory.target_room){
            const path = creep.memory.path;
            creep.moveTo(new RoomPosition(path.x, path.y, path.roomName));
            return false
        }
        else {
            return true
        }
    },
    to_spawn_point: function(creep){
        if(!creep.pos.inRangeTo(creep.memory.spawn_point, 4)) {
            creep.moveTo(creep.memory.spawn_point)
        }

    },
    /** @param {Creep} creep **/
    run: function (creep) {

        if(creep.body.includes('RANGED_ATTACK')) {
            if(target){
                const targets = creep.pos.findInRange(FIND_HOSTILE_CONSTRUCTION_SITES, 3);
                if (targets.length > 0) {
                creep.rangedAttack(targets[0])
                }
            }
            else {
                this.move(creep)
            }

        }
        if(creep.body.includes('ATTACK')){
            const target = creep.pos.findClosestByRange(FIND_HOSTILE_CONSTRUCTION_SITES);
            if(target) {
                if(creep.attack(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }

    }
};

module.exports = roleAttacker;
