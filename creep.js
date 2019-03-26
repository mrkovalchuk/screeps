const BUILDER_BODY = require('global');
const build_structure = require('functions');

class Creep {
    constructor(creep) {
        this.creep = creep;
        this._functions = []
    }

    static createCreep(role) {
        switch(role) {
            case 'builder':  // if (x === 'value1')
                return new CreepBuilder();
            default:
                break;
        }
    }

    runRole() {
        for(let i in this._functions){
            this._functions[i](this.creep)
        }
    }
}


class CreepBuilder extends Creep {
    constructor(...args) {
        const creepName = 'B|Ball#'+ Math.floor(Math.random() * 1000);
        const creep = Game.spawns[i].spawnCreep(BUILDER_BODY, 'B|'+creepName, {memory: {role: 'builder'}});
        super(creep);
        this._functions = [
            build_structure,
        ];
    }
}

