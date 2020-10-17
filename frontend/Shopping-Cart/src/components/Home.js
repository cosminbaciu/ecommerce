import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import axios from 'axios';
import Item1 from '../images/1.jpg'
import Item2 from '../images/2.jpeg'
import Item3 from '../images/3.jpg'
import Item4 from '../images/4.jpg'
import Item5 from '../images/5.jpg'
import Item6 from '../images/6.jpg'

 class Home extends Component{

     state = {
         products: [],
         images: [Item1, Item2, Item3, Item4, Item5, Item6]

     }

    handleClick = (id)=>{
        axios.post(`http://localhost:8070/shoppingCart/addProduct/` + id)
            .then(res => {
                // const products = res.data;
                // this.setState({ products });
            })
    }

     componentDidMount() {
         axios.get(`http://localhost:8070/getProducts`)
             .then(res => {
                 const products = res.data;
                 this.setState({ products });
             })
     }

    render(){
        let itemList = this.state.products.map(item=>{
            return(
                <div className="card" key={item.id}>
                        <div className="card-image">
                            <div>
                            <img src={this.state.images[item.id-1]} alt={item.name}/>
                            </div>
                            <span className="card-title">{item.name}</span>
                            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={()=>{this.handleClick(item.id)}}><i className="material-icons">add</i></span>
                        </div>

                        <div className="card-content">
                            <p>{item.description}</p>
                            <p><b>Price: {item.price}$</b></p>
                        </div>
                 </div>

            )
        })

        return(
            <div className="container">
                <h3 className="center">Our items</h3>
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
      items: state.items
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
