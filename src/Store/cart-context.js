import React, { useCallback, useContext, useState, useEffect } from "react";
//import { useHistory } from "react-router-dom";
import AuthContext from "./auth-context";
//import Data from "../Data";

const cartContext = React.createContext({
  item: [],
  totalamount: 0,
  addItem: () => {},
  removeItem: () => {},
  purchased: () => {},
  logoutCartHandler: () => {},
  loginCartHandler: () => {},
});

export const CartContextProvider = (props) => {
  const authCtx = useContext(AuthContext);
  //const history = useHistory();

  let userEmail;
  if (localStorage.getItem("tokenId")) {
    userEmail = JSON.parse(localStorage.getItem("tokenId")).email;
    userEmail = userEmail.replace(/[@.]/g, "");
  }
  const [cartItems, setcartItems] = useState([]);
  const [Change, setChange] = useState(false);
  //const { products } = Data;

  // Add Function
  //console.log(cartItems);
  const addItem = async (product) => {
    console.log(product);
    console.log(cartItems);
    let cartItemIndex = -1;
    for (let i = 0; i < cartItems.length; i++) {
      if ((cartItems[i].name === product.name && cartItems.length)) {
        cartItemIndex = i;
        break;
      }
    }
    if (cartItemIndex === -1) {
      try {
        const response = await fetch(
          `https://crudcrud.com/api/48e33b078cbb4d4ebce0902fa8bd9171/${userEmail}`,
          {
            method: "POST",
            body: JSON.stringify({
              name: product.name,
              price: product.price,
              quantity: product.quantity,
            }),
            // method: "PUT",
            // body: JSON.stringify(newCartItems),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        cartItems.push(data);
        setChange((pre) => {
          return !pre;
        });
        // setcartItems((pre)=>{
        //   return [...pre]
        // })
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("kundan");
      //const newQuantity = (updatedItem[cartItemIndex].quantity += 1);
      // const newCartItems = cartItems.map((x) =>
      //   x.name === product.name ? { ...cartItems, quantity: newQuantity } : x
      // );
       cartItems[cartItemIndex].quantity++;
      //setcartItems(newCartItems);
      console.log(product);
      try {
         await fetch(
          `https://crudcrud.com/api/48e33b078cbb4d4ebce0902fa8bd9171/${userEmail}/${cartItems[cartItemIndex]._id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              name: product.name,
              price: product.price,
              quantity: cartItems[cartItemIndex].quantity,
            }),
            // method: "PUT",
            // body: JSON.stringify(newCartItems),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setChange((pre) => {
          return !pre;
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  //Remove function

  const removeItem = async(product) => {
    console.log('kundan')
    let cartItemIndex;
    for (let i = 0; i < cartItems.length; i++) {
      if ((cartItems[i].name === product.name && cartItems.length)) {
        cartItemIndex = i;
        break;
      }
    }
      // const cartItemIndex = updatedItem.findIndex(
      //   (item) => item.name === product.name
      // );
      //const exist = cartItems.find((x) => x.name === product.name);
      if (cartItems[cartItemIndex].quantity === 1) {
        // updatedItem = cartItems.filter((x) => x.id !== product.id);
        try {
          await fetch(
            `https://crudcrud.com/api/48e33b078cbb4d4ebce0902fa8bd9171/${userEmail}/${cartItems[cartItemIndex]._id}`,
            {
              method: "DELETE",
            }
          );

          let updatedItem = cartItems.filter(
            (item) => item.name !== product.name
          );

          setcartItems( updatedItem );
          //return { item: updatedItem };
        } catch (err) {
          console.log(err.message);
        }
      } else {
        //setcartItems(cartItems.map((x) => x.name === product.name ? { ...exist, qty: exist.qty - 1 } : x));
        try {
          await fetch(
            `https://crudcrud.com/api/48e33b078cbb4d4ebce0902fa8bd9171/${userEmail}/${cartItems[cartItemIndex]._id}`,
            {
              method: "PUT",
              body: JSON.stringify({
                name: cartItems[cartItemIndex].name,
                price: cartItems[cartItemIndex].price,
                quantity: cartItems[cartItemIndex].quantity - 1,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

         cartItems[cartItemIndex].quantity -= 1;
         setChange((pre) => {
          return !pre;
        });
          //return { item: updatedItem };
        } catch (err) {
          console.log(err.message);
        }
      }
    
    
  };

  //purchase button
  const purchased = () => {
    alert("Your order has been placed"); 

    const purchaseCompleted = (cartItems) => {
      cartItems.forEach(async (item) => {
        try {
          await fetch(
            `https://crudcrud.com/api/48e33b078cbb4d4ebce0902fa8bd9171/${userEmail}/${item._id}`,
            {
              method: "DELETE",
            }
          );
        } catch (err) {
          console.log(err.message);
        }
      });
    };

    setcartItems(() => {
      purchaseCompleted(cartItems);
     
    });
  };

  //login context

  const loginCartHandler = useCallback(async () => {
    if (userEmail) {
      try {
        const response = await fetch(
          `https://crudcrud.com/api/48e33b078cbb4d4ebce0902fa8bd9171/${userEmail}`
        );

        const data = await response.json();

        if (data.length > 0) {
          let refreshedItem = [];

          data.forEach((item) => {
            refreshedItem.push(item);
          });
          setcartItems( refreshedItem );
        }
      } catch (err) {
        console.log(err.message);
      }
    } else {
      authCtx.login(JSON.parse(localStorage.getItem("tokenId")));
      // history.replace('/product');
    }
  }, [userEmail, authCtx]);

  //logout cart handler
  const logoutCartHandler = () => {
    setcartItems( [] );
  };

  //fetching cart data on refresh
  useEffect(() => {
    loginCartHandler();
  }, [loginCartHandler]);

  // context values
  const contextValues = {
    item: cartItems,
    addItem: addItem,
    removeItem: removeItem,
    purchased: purchased,
    logoutCartHandler: logoutCartHandler,
    loginCartHandler: loginCartHandler,
  };

  return (
    <cartContext.Provider value={contextValues}>
      {props.children}
    </cartContext.Provider>
  );
};
export default cartContext;
