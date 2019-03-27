const build_structure = require('functions');
const BUILDER_BODY = require("./global").BUILDER_BODY;

class Creep {
    constructor(creep) {
        this.creep = creep;
        this._functions = []
    }

    static defineCreep(creep){
        switch(creep.memory.role) {
            case 'builder':
                return new CreepBuilder.defineCreep(creep);
            default:
                break;
        }
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
            console.log('Function: ' + this._functions[i]);
            this._functions[i](this.creep)
        }
    }
}


class CreepBuilder extends Creep {
    constructor() {
        const creepName = 'B|Ball#'+ Math.floor(Math.random() * 1000);
        const creep = Game.spawns['PrimeTown'].spawnCreep(BUILDER_BODY, 'B|'+creepName, {memory: {role: 'builder'}});
        super(creep);
        this._functions = [
            build_structure,
        ];
    }

    static defineCreep(creep){
        this.creep = creep;
        this._functions = [
            build_structure,
        ];
    }
}


module.exports = Creep;

