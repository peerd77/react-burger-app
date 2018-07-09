import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OredrSummary/OrderSummary';

const PRICE_MAP = {
    salad: 0.4,
    bacon: 0.6,
    cheese: 0.3,
    meat: 1.8
}
/**
 * Represents the BurgerBuilder component
 */
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
        totalPrice : 4,
        totalIngQuantity: 0,
        purchasing: false
    }
    
    /**
     * This is a generic function for adding and removing ingredients
     * from the hamburger and updating state accordingly
     * @param  {string} type - type of the ingredient to operate
     * @param  {number} op - 1 for add, -1 for remove
     * @private
     */
    _operateIngredient = (type, op) => {
        const countDiff =  1 * op
        let newCount = this.state.ingredients[type] + countDiff;
        if (newCount < 0)
            return;
        const newTotalIngQuantityDiff = this.state.totalIngQuantity + countDiff;
        let newPrice = this.state.totalPrice + PRICE_MAP[type] * op;
        let newIngredients = {
            ...this.state.ingredients
        }
        newIngredients[type] = newCount;
        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice,
            totalIngQuantity: newTotalIngQuantityDiff
        });
    }


    addIngredientHandler = (type) => {
        this._operateIngredient(type, 1);
    };

    removeIngredientHandler = (type) => {
        this._operateIngredient(type, -1);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    render () {

        let disabledBtns = {...this.state.ingredients};
        for (let key in disabledBtns){
            disabledBtns[key] = disabledBtns[key] === 0 ? true : false;
        }


        return (
            <React.Fragment>
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients}></OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledBtns={disabledBtns}
                    price={this.state.totalPrice.toFixed(2)}
                    purchasable = {this.state.totalIngQuantity !== 0}
                    ordered = {this.purchaseHandler}/>
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;