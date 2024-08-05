import React from "react";
import styled from "styled-components";

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

const NavButton = styled(Button)`
  background-color: white;
  color: black;
  border: none;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const Navbar = ({ HandleModalOpen }) => {
  return (
    <nav>
      <div className="nav-header">
        <div className="log">
          <a href="/" className="logo-btn">
            Pantry Inventory
          </a>
        </div>
        <div className="button-wrapper">
          <NavButton onClick={HandleModalOpen}>Add Product</NavButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
