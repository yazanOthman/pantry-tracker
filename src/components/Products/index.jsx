import React, { useEffect, useState } from "react";
import {
  StyledItemWrapper,
  StyledSection,
  StyledSectionTitle,
  Styledcontainer,
  StyleNavIcon,
} from "../shared";
import { GetActiveRoute } from "../Util";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import axios from "axios";

const Products = ({ initialProducts, onRemove }) => {
  const navigate = useNavigate();
  const title = GetActiveRoute().split("/")[1].replace("-", " ");
  const activeUrl = GetActiveRoute().split("/")[1];
  const [products, setProducts] = useState([]);
  console.log(initialProducts);

  useEffect(() => {
    setProducts(
      initialProducts.filter((product) => product.category === activeUrl)
    );
  }, [initialProducts, activeUrl]);

  const handleRemove = async (id) => {
    try {
      const removeItem = await axios.delete(
        `${axios.defaults.baseURL}/products/${id}`
      );
      if (removeItem) {
        onRemove();
      }
    } catch (error) {}
  };
  return (
    <StyledSection>
      <div className="title-wrapper">
        <StyledSectionTitle>{title}</StyledSectionTitle>
        <StyleNavIcon
          className="back-btn"
          $isBackBtn={true}
          onClick={() => navigate("/")}
        >
          <IoMdArrowRoundBack size={30} />
        </StyleNavIcon>
      </div>
      <Styledcontainer>
        <StyledItemWrapper>
          {products.length > 0 &&
            products.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  notes={product.notes}
                  location={product.location}
                  expiryDate={product.expiryDate}
                  initialQuantity={product.quantity}
                  onRemove={handleRemove}
                />
              );
            })}
        </StyledItemWrapper>
      </Styledcontainer>
    </StyledSection>
  );
};

export default Products;
