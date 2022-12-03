import { useState, useRef, useContext } from "react";
import AuthContext from "../Store/auth-context";
import classes from "./AuthForm.module.css";
import cartContext from "../Store/cart-context";

const AuthForm = () => {
  const crtCntxt =  useContext(cartContext)
  
  const emailInputref = useRef();
  const passwordInputref = useRef();
  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const SubmitHandler = async(event) => {
    event.preventDefault();
    const enteredemail = emailInputref.current.value;
    const enteredpassword = passwordInputref.current.value;
    let url;
    if (isLogin === true) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbZq6JLA7phjgK8L3SzfyX9ZixVPJLz1I";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbZq6JLA7phjgK8L3SzfyX9ZixVPJLz1I";
    }
    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredemail,
          password: enteredpassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        const convertedData = JSON.stringify(data)
        localStorage.setItem('tokenId', convertedData);
      authCtx.login(data);
       // history.replace('/product');
       crtCntxt.loginCartHandler();
      } else {
        const data = await res.json();
        throw new Error(data.error.message);
      }
    } 
    // fetch(url, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email: enteredemail,
    //     password: enteredpassword,
    //     returnSecureToken: true,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => {
    //     if (res.ok === true) {
    //       res.json().then((data) => {
    //         // console.log(data.idToken);
    //         authCtx.login(data.idToken);
            
    //       })
    //        //not to be added from 50 to 59 
    //       // .then((data) => {
    //       //   authCtx.login(data.idToken);
    //       // })
    //       // console.log(data)
    //       // } else {
    //       //   return res.json().then((data) => {
    //       //     // show an error modal
    //       //     console.log(data);
    //       //   });
    //       // }

    //       crtCntxt.loginCartHandler()
    //     }
    //   })
      
     
    catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={SubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputref} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputref}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin === true ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin === true
              ? "Create new account"
              : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
