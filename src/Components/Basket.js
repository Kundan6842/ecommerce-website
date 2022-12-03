import React from "react";
import { useContext } from "react";
import cartContext from "../Store/cart-context";

const Basket = (props) => {
  const crtCntxt =  useContext(cartContext)
  //const { cartItems, onAdd, onRemove } = props;
  const itemsPrice = crtCntxt.item.reduce((a, c) =>( a + c.quantity * c.price), 0);
  console.log(itemsPrice,crtCntxt.item)

  const totalPrice = itemsPrice;
  const additemHandler = (item1) => {
    crtCntxt.addItem(item1);
  };
  const removeitemHandler =(item1)=>{crtCntxt.removeItem(item1)}
  const purchaseHandler = ()=>{crtCntxt.purchased()}
  console.log(crtCntxt.item)
  return (
    <aside className=" block col-1">
      <h2>Cart Items</h2>
      <div>
        {crtCntxt.item.length === 0 && <div>cart is empty</div>}
       
        {crtCntxt.item.map((item1) => (
          <div key={item1.id} className="row">
            <div className="col-1">{item1.name}</div>
            <div className="col-1">
              <button onClick={()=>removeitemHandler(item1)} className="remove">
                -
              </button>
              <button onClick={()=>additemHandler(item1)} className="add">
                +
              </button>
            </div>
            <div className="col-1 text-right">
              {item1.quantity}* ${item1.price.toFixed(2)}
            </div>
          </div>
        ))}
        {crtCntxt.item.length !== 0 && (
          <>
            <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            <hr />
            <div className="row">
              <button onClick={purchaseHandler}>
                Purchase
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default Basket;
