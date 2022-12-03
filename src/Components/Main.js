import React from "react";
import Product from "./Product";

const Main = (props) => {
  const { products } = props;
  return (
    <div className=" block col-2">
      <h2> Main-Products</h2>
      <div className="row">
        {products.map((product) => (
          <Product
            key={product.id}

            product={product}
            // item = {cartItems.find((x)=>x.name===product.name)}
           // onAdd={onAdd}
            // onRemove={onRemove}
          >
            {" "}
          </Product>
        ))}
      </div>
    </div>
  );
};

export default Main;
