import Header from "./Components/Header";
import "./App.css";
import Main from "./Components/Main";
import Basket from "./Components/Basket";
import "./index.css";
import Data from "./Data";
import React,{ useState, useContext, useEffect,Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import LoadingSpinner from "./Components/Pages/LoadingSpinner";
import AuthForm from "./Auth/Authform";
import AuthContext from "./Store/auth-context";
//const Home = React.lazy(()=>{import('./Components/Pages/Home')})
//const About = React.lazy(()=>{import('./Components/Pages/About')})
//const Contact = React.lazy(()=>{import('./Components/Pages/Contact')})



function App() {
  const authCtx = useContext(AuthContext);

  console.log(authCtx);
  const isLoggedIn = authCtx.isLoggedIn;
 // const [cartItems, setcartItems] = useState([]);
   const { products } = Data;
  
console.log('kundan')
  async function addDataHandler(data1) {
    console.log(data1);
    const response = await fetch(
      "https://demo2-fe74f-default-rtdb.firebaseio.com/data1.json",
      {
        method: "POST",
        body: JSON.stringify(data1),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }
  // const islogin = !!isLoggedIn
  console.log(authCtx.isLoggedIn);
  return (
    <div>
      <Header  />
      <span>
        {/* <Suspense fallback={<LoadingSpinner/>}> */}
        <Switch>
          {authCtx.isLoggedIn && (
            <>
              <Route path="/list1">
                <div className="row">
                  <Main
                    // cartItems={cartItems}
                   // onAdd={onAdd}
                    // onRemove={onRemove}
                    products={products}
                  />
                </div>
              </Route>
              <Route path="/cart">
                <div className="row">
                  <Basket
                
                    //cartItems={cartItems}
                    //onAdd={onAdd}
                    //onRemove={onRemove}
                  />
                </div>
              </Route>

              {/* <Route path="/" exact>
                <Redirect to="/List1" />
              </Route> */}
              <Route path="/About">
                <About />
              </Route>
              <Route path="/Home">
                <Home />
              </Route>
              <Route path="/Contact">
                <Contact onAddData={addDataHandler} />
              </Route>
            </>
          )}

          {!authCtx.isLoggedIn && (
            <Route path="/Login">
              <AuthForm />
            </Route>
          )}

         
        </Switch>
       {/* </Suspense> */}
      </span>
    </div>
  );
}

export default App;
