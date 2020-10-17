import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity} from './actions/cartActions'
import Recipe from './Recipe'
import axios from "axios";
import Item1 from '../images/1.jpg'
import Item2 from '../images/2.jpeg'
import Item3 from '../images/3.jpg'
import Item4 from '../images/4.jpg'
import Item5 from '../images/5.jpg'
import Item6 from '../images/6.jpg'
class Cart extends Component{



    state = {
        total: 0,

        products: {},
        images: [Item2, Item1, Item3, Item4, Item5, Item6]
    }

    componentWillUnmount() {
        if(this.refs.shipping.checked)
            this.props.substractShipping()
    }
    handleChecked = (e)=>{
        if(e.target.checked){
            this.props.addShipping();
        }
        else{
            this.props.substractShipping();
        }
    }

    //to remove the item completely
    handleRemove = (id)=>{
        axios.delete(`http://localhost:8070/shoppingCart/removeProduct/` + id)
            .then(res => {
                const products = res.data;
                this.setState({ products });
            })
        this.state.total = 0;
    }
    //to add the quantity
    handleAddQuantity = (id)=>{
        axios.post(`http://localhost:8070/shoppingCart/addProduct/` + id)
            .then(res => {
                const products = res.data;
                this.setState({ products });
            })
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id)=>{
        axios.post(`http://localhost:8070/shoppingCart/substractProduct/` + id)
            .then(res => {
                const products = res.data;
                this.setState({ products });
            })
    }

    componentDidMount() {
        axios.get(`http://localhost:8070/shoppingCart`)
            .then(res => {
                const products = res.data;
                this.setState({ products });
            })

        axios.get(`http://localhost:8070/total`)
            .then(res => {
                const total = res.data;
                this.setState({ total });
            })
    }
    render(){
              
        let addedItems = this.state.products.length ?
            (  
                this.state.products.map(item=>{
                    return(
                       
                        <li className="collection-item avatar" key={item.id}>
                                    <div className="item-img">
                                        <img src={this.state.images[item.id-1]} alt={item.img} className=""/>
                                    </div>
                                
                                    <div className="item-desc">
                                        <span className="title">{item.name}</span>
                                        <p>{item.description}</p>
                                        <p><b>Price: {item.price}$</b></p> 
                                        <p>
                                            <b>Quantity: {item.quantity}</b> 
                                        </p>
                                        <div className="add-remove">
                                            <Link to="/cart"><i className="material-icons" onClick={()=>{this.handleAddQuantity(item.id)}}>arrow_drop_up</i></Link>
                                            <Link to="/cart"><i className="material-icons" onClick={()=>{this.handleSubtractQuantity(item.id)}}>arrow_drop_down</i></Link>
                                        </div>
                                        <button className="waves-effect waves-light btn pink remove" onClick={()=>{this.handleRemove(item.id)}}>Remove</button>
                                    </div>
                                    
                                </li>
                         
                    )
                })
            ):

             (
                <p>Nothing.</p>
             )
       return(
            <div className="container">
                <div className="cart">
                    <h5>You have ordered:</h5>
                    <ul className="collection">
                        {addedItems}
                    </ul>
                </div>
                <div className="container">
                    <div className="collection">
                        <li className="collection-item">
                            <label>
                                <input type="checkbox" ref="shipping" onChange= {this.handleChecked} />
                                <span>Shipping(+6$)</span>
                            </label>
                        </li>
                        <li className="collection-item"><b>Total: {this.state.total} $</b></li>
                    </div>
                    <div className="checkout">
                        <button className="waves-effect waves-light btn">Checkout</button>
                    </div>
                </div>
            </div>
       )
    }
}


const mapStateToProps = (state)=>{
    return{
        items: state.addedItems,
        //addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id)=>{dispatch(removeItem(id))},
        addQuantity: (id)=>{dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)
