/**
 * examples.js
 *
 * Taken from:
 * https://github.com/google/traceur-compiler/wiki/LanguageFeatures
 */


/**
 * Classes
 * https://github.com/google/traceur-compiler/wiki/LanguageFeatures#classes
 */
class Character {
    constructor(x, y) {
    }

    attack(character) {
    }
}

class Monster extends Character {
    constructor(x, y, name) {
        super(x, y);
        this.name = name;
        this.health_ = 100;
    }

    attack(character) {
        super.attack(character);
    }
}



/**
 * Rest Parameters
 * https://github.com/google/traceur-compiler/wiki/LanguageFeatures#rest-parameters
 */
function push(array, ...items) {
    array.push(...items);
    return array;
}
console.log('Rest Parameters', push([], 'a', 'b', 'c', 1, 2, 3));


/**
 * Spread Operator
 * https://github.com/google/traceur-compiler/wiki/LanguageFeatures#spread-operator
 */
function add(x, y) {
    return x + y;
}
var numbers = [4, 38];
console.log('Spread Operator', add(...numbers));