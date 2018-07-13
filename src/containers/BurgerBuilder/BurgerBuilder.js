import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from  '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

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
        ingredients: null,
        totalPrice : 4,
        totalIngQuantity: 0,
        purchasing: false,
        loading: false,
        error: false
    }
    
    componentDidMount () {
        axios.get('https://react-burger-app-1c1a8.firebaseio.com/ingredients.json')
        .then((res) => {
            this.setState({ingredients: res.data})
        })
        .catch((res) => {
            this.setState({error: true})
        });
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
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinuedHandler = () => {
        //alert('CONTINUED!!!');
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice, // should be computed on server side for safty (can be altered before send)
            customer: {
                name: 'Test Name',
                address : {
                street: 'Test Street',
                ZipCode: '1234455',
                Country: 'South Africa'
                },
                email: 'test@test.com',
                deliveryMethod: 'fastest'
            }
        };
        axios.post('/orders.json', order)
        .then((res) => {
            console.log(res);
            this.setState({loading: false, purchasing: false});
        })
        .catch((err) => {
            console.log(err);
            this.setState({loading: false, purchasing: false})
        })
        
    }

    render () {

        let disabledBtns = {...this.state.ingredients};
        for (let key in disabledBtns){
            disabledBtns[key] = disabledBtns[key] === 0 ? true : false;
        }

        let orderSummary =  null;
        let burger = this.state.error ? <p>Ingredients cannot be loaded!</p> : (
            <Spinner />
        );
 
        if ( this.state.ingredients) {
            burger = (
                <React.Fragment>
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
          
            orderSummary = (
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    purchaseCancelled = {this.purchaseCancelHandler}
                    purchaseContinued = {this.purchaseContinuedHandler}
                    totalPrice={this.state.totalPrice.toFixed(2)}/>
            );
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <React.Fragment>
                <Modal 
                    show={this.state.purchasing}
                    closeModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);