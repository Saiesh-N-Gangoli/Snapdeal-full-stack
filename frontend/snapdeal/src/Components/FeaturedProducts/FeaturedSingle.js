import React from "react";
import { Button, Card } from "react-bootstrap";
import * as Icons from "react-bootstrap-icons";
import "./products.css";
import { NavLink } from "react-router-dom";
import MyPrice from "./MyPrice";
import RatingProducts from "../SingleProduct/RatingProducts";

function FeaturedSingle(props) {
  const { product } = props;
  const { product_id, product_name, product_image, product_price , ratings} = product;

  return (
    <>
    <div className="ProductCard-f">
      <Card className="Card-Product-f">
        <Card.Img variant="top" src={product_image} className="ImgCard-f" />
        <Card.Body>
          <Card.Text style={{ display: "none" }}>{product_id}</Card.Text>
          <Card.Title className="Title">
            <center>{product_name}</center>
            <div style={{"position": "relative", "top" : "4px"}}><center><RatingProducts stars={ratings}/></center></div>
          </Card.Title>
          <Card.Text
            style={{
              margin: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "600",
            }}
          >
            <div className="price-container">
            <MyPrice price={product_price} />
              (<span className="strike"><MyPrice price={product_price + 200} /></span> )
            </div>
          </Card.Text>
          <div className="mainBut">
            <NavLink to={`/singleproduct/${product_id}`} style={{ textDecoration: "none" }}>
              <Button className="CartButton featured-but">
              View
                <Icons.EyeFill
                  style={{
                    marginLeft: "7px",
                    position: "relative",
                    color: "white",
                  }}
                />
              </Button>
            </NavLink>
          </div>
        </Card.Body>
      </Card>
    </div>
    </>
  );
}

export default FeaturedSingle;
