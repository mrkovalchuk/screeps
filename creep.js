const upgrade_controller = require("./functions").upgrade_controller;
const repair_structure = require("./functions").repair_structure;
const use_withdraw = require("./functions").use_withdraw;
const build_structure = require("./functions").build_structure;
const BUILDER_BODY = require("./global").BUILDER_BODY;

class Creep {
    constructor(creep) {
        this.creep = creep;
        console.log('WE ARE HERE, AND THIS OUR CREEP: '+this.creep+'AND ANOTHER CREEP:'+creep);
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

    static createCreep(role, creep=NaN) {
        switch(role) {
            case 'builder':  // if (x === 'value1')
                console.log('TRY CREATE BUILDER');
                return new CreepBuilder(creep);
            default:
                break;
        }
    }

    runRole() {
        for(let i in this._functions){
            console.log('Function: ' + this.creep.name);
            this._functions[i](this.creep)
        }
    }
}


class CreepBuilder extends Creep {
    constructor(creep=NaN) {
        super(creep);
        if(!creep) {
            console.log('WE ALMOST CREATED CREEP');
            const creepName = 'B|Ball#' + Math.floor(Math.random() * 1000);
            const creep = Game.spawns['PrimeTown'].spawnCreep(BUILDER_BODY, creepName, {memory: {role: 'builder'}});
            this.creep = creep
        }
        console.log('IT\'S OUR CREEP: ' + this.creep);
        this._functions = [
            build_structure,
            use_withdraw,
            repair_structure,
            upgrade_controller
        ];
    }
}


module.exports = Creep;

