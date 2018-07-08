import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const PRICE_MAP = {
    salad: 0.4,
    bacon: 0.6,
    cheese: 0.3,
    meat: 1.8
}

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice : 4
    }

    _operateIngredient = (type, op) => {
        let newCount = this.state.ingredients[type] + 1 * op;
        if (newCount < 0)
            return;
        let newPrice = this.state.totalPrice + PRICE_MAP[type] * op;
        let newIngredients = {
            ...this.state.ingredients
        }
        newIngredients[type] = newCount;
        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice
        });
    }


    addIngredientHandler = (type) => {
        this._operateIngredient(type, 1);
    };

    removeIngredientHandler = (type) => {
        this._operateIngredient(type, -1);
    };

    render () {

        let disabledBtns = {...this.state.ingredients};
        for (let key in disabledBtns){
            disabledBtns[key] = disabledBtns[key] === 0 ? true : false;
        }


        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledBtns={disabledBtns} />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;