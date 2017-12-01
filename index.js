var diff = require('deep-diff').diff;
var _ = require('lodash');

exports.Recipe = function(json) {
    const errMsg = 'Invalid Recipe';

    function isValidRecipe(recipe) {
        if (!recipe || (typeof recipe !== 'string' && Object.prototype.toString.call(recipe) !== '[object Object]')) {
            return false;
        }

        var isValid = true;
        for (var key in recipe) {
            if (!(recipe[key] instanceof Array)) {
                return false
            }
            var i = recipe[key].length;
            while (i--) {
                isValid &= typeof recipe[key][i] === 'string' || isValidRecipe(recipe[key][i]);
            }
        }
        return isValid;
    }

    var recipe;
    if (!json || (typeof json !== 'string' && Object.prototype.toString.call(json) !== '[object Object]')) {
        throw new Error(errMsg);
    } else if (typeof json === 'string') {
        try {
            recipe = JSON.parse(json)
        } catch (e) {
            throw new Error(errMsg);
        }
    } else {
        recipe = Object.assign({}, json);
    }
    if (!isValidRecipe(recipe)) {
        throw new Error(errMsg);
    }

    this.getRecipe = function() {
        return Object.assign({}, recipe);
    }

    this.toString = function() {
        // TODO
    }

    this.getDistance = function(targetRecipe) {
        var difference;
        if (targetRecipe instanceof this.constructor) {
            difference = diff(recipe, targetRecipe.getRecipe());
        } else if (isValidRecipe(targetRecipe)) {
            difference = diff(recipe, targetRecipe);
        } else {
            throw new Error(errMsg);
        }
        return difference ? difference.length : 0;
    }
}