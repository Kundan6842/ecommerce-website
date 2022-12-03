import React from "react";
import {Link} from 'react-router-dom'
import { useContext } from "react";
import AuthContext from "../Store/auth-context";
import cartContext from "../Store/cart-context";
const Header = (props) => {
  const authCtx = useContext(AuthContext)
  const crtCntxt= useContext(cartContext)
  const { countCartItems } = props;
  const logoutHandler=()=>{
    authCtx.logout()
    crtCntxt.logoutCartHandler()
  }
  let total = 0;
  let arr = crtCntxt.item.length
  for(let i=0;i<arr;i++){
 total += crtCntxt.item[i].quantity;
  }
  return (
    <div className="row center block">
      <div>
        {" "}
       
          <Link to='/list1'> The Generics Shopping Cart</Link>
        
      </div>
      <div>
        <Link to="/cart">
          Cart1
          {/* {countCartItems ?  */}
            <button className="badge">{total}</button>
           {/* : ("") */}
            
          
        </Link><br />
        {/* {" "} */}
        <Link to="signin">SignIn</Link><br />
        <Link to="/Home">Home</Link><br />
        <Link to="/About">About</Link><br /><br />
        <Link to="/Contact">Contact us</Link><br />
        <Link to="/Login">Login</Link><br /> <br />
        <button onClick={logoutHandler}>Logout</button>
      </div>
      
    </div>
  );
};

export default Header;
