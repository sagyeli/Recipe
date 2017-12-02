## Installation

```
npm install -g recipe-to-json
```

## Usage

```js
import { Recipe } from 'recipe-to-json'

var recipe = new Recipe({"Wait":[{"Pour onto":[{"Crack":["egg"]},{"Spread":[{"Heat":["pan","45C"]},"butter"]}]},"5min"]})

console.log(recipe.toString())
/*
returns:
"Wait with
    Pour onto with
        Crack with
            egg
        and
        Spread with
            Heat with
                pan
                and
                45C
            and
            butter
    and
    5min"
*/

var anotherRecipe = new Recipe({"Wait":[{"Pour onto":[{"Crack":["egg"]},{"Spread":[{"Heat":["pan","45C"]},"butter"]}]},"10min"]})
console.log(recipe.getDistance(anotherRecipe))
/*
returns:
1
*/
```
