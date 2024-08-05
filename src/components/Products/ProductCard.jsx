import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import axios from "axios";

const CardWrapper = styled.div`
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 15px;
  padding: 25px;
  width: 100%;
  max-width: 400px;
  color: #ffffff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  display: block;
  margin-bottom: 20px;
`;

const QuantityBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #ffd700;
  color: #1a1a1a;
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
`;

const ProductName = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #ffffff;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
`;

const Badge = styled.span`
  background-color: rgba(255, 215, 0, 0.2);
  color: #ffd700;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
`;

const Notes = styled.p`
  font-size: 16px;
  margin: 15px 0;
  color: #cccccc;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const TakeButton = styled(Button)`
  background-color: #4caf50;
  color: white;
  border: none;

  &:hover {
    background-color: #45a049;
  }
`;

const RemoveButton = styled(Button)`
  background-color: #f44336;
  color: white;
  border: none;

  &:hover {
    background-color: #da190b;
  }
`;

const ProductCard = ({
  id,
  name,
  notes,
  location,
  expiryDate,
  initialQuantity,
  onRemove,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const updateQuantity = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        console.log(newQuantity);
        const debouncedUpdate = debounce(async () => {
          try {
            const result = await axios.patch(
              `${axios.defaults.baseURL}/products/${id}`,
              {
                quantity: newQuantity,
              }
            );
            console.log(result);
          } catch (error) {
            console.error("Failed to update item quantity:", error);
            return prevQuantity;
          }
        }, 500);

        debouncedUpdate();
        return prevQuantity - 1;
      });
    }
  };

  // Debounce function to limit API call frequency
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  return (
    <CardWrapper>
      <QuantityBadge>{quantity}</QuantityBadge>
      <ProductName>{name}</ProductName>
      <Notes>{notes}</Notes>
      <BadgeContainer>
        <Badge>📍 {location}</Badge>
        <Badge>🗓 {dayjs(expiryDate).format("DD/MM/YYYY")}</Badge>
      </BadgeContainer>
      <ButtonContainer>
        <TakeButton onClick={updateQuantity}>Take Me</TakeButton>
        <RemoveButton onClick={() => onRemove(id)}>Remove</RemoveButton>
      </ButtonContainer>
    </CardWrapper>
  );
};

export default ProductCard;
