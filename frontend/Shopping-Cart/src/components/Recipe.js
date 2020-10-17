import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from "axios";
import Item2 from "../images/2.jpeg";
import Item1 from "../images/1.jpg";
import Item3 from "../images/3.jpg";
import Item4 from "../images/4.jpg";
import Item5 from "../images/5.jpg";
import Item6 from "../images/6.jpg";
//import { addShipping } from './actions/cartActions'
class Recipe extends Component{

    state = {
        total: 0
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

    componentDidMount() {
        axios.get(`http://localhost:8070/total`)
            .then(res => {
                const total = res.data;
                this.setState({ total });
            })
    }

    render(){
  
        return(
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
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        addedItems: state.addedItems,
        total: state.total
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        addShipping: ()=>{dispatch({type: 'ADD_SHIPPING'})},
        substractShipping: ()=>{dispatch({type: 'SUB_SHIPPING'})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Recipe)
