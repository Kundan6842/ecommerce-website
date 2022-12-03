import React, { useContext } from "react";
import cartContext from "../Store/cart-context";

const Product = (props) => {
  const crtCntxt = useContext(cartContext);
  const { product } = props;
  const additemHandler = () => {
    
    let obj = {
      ...product,
      quantity: 1,
    };
    console.log(product);
    crtCntxt.addItem(obj);
  };
  return (
    <div className="card">
      <img className="small" src={product.image} />
      <h3>{product.name}</h3>
      <div>${product.price}</div>
      <div>
        {/* {item?(
          <div>
            <button onClick={()=>onRemove(item)} className="remove">-</button>
            <span className='p-1'>{item.qty}</span>
            <button onClick={()=>onAdd(item)} className="add">+</button>
          </div>
        ):(<button onClick={()=>onAdd(product)}>Add To Cart</button>) */}
        <button
          onClick={() => {
            additemHandler();
            alert("item selected");
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
