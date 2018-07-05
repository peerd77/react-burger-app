import React from 'react';

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredient = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])]
        .map((_, i) => {
            return <BurgerIngredient key={igKey+i} type={igKey} />})
    })
    .reduce((arr,el) => arr.concat(el) , []);
    // let sumOfingredients = 0;
    // for (let prop in props.ingredients){
    //     sumOfingredients += props.ingredients[prop];
    // }
    if (transformedIngredient.length === 0){
        transformedIngredient = <p>Please start adding ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;