import React from "react";
import { Styledcontainer, StyledItemWrapper, StyleNavIcon } from "./shared";
import { GiOpenedFoodCan } from "react-icons/gi";
import { MdEmojiFoodBeverage } from "react-icons/md";
import { GiSlicedBread } from "react-icons/gi";
import { GiChocolateBar } from "react-icons/gi";
import { GiHerbsBundle } from "react-icons/gi";
import { GiFruitBowl } from "react-icons/gi";
import { MdFastfood } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Categories = ({ categories }) => {
  const navigate = useNavigate();

  const iconMap = {
    "canned-goods": GiOpenedFoodCan,
    "dry-goods": MdFastfood,
    beverages: MdEmojiFoodBeverage,
    spices: GiHerbsBundle,
    fruits: GiFruitBowl,
    snacks: GiChocolateBar,
    "baking-supplies": GiSlicedBread,
  };

  const handleNavigation = (page) => {
    navigate(`${page}`);
  };

  return (
    <Styledcontainer>
      <StyledItemWrapper>
        {categories.map((category) => {
          const IconComponent = iconMap[category];
          const label = category.replace("-", " ");
          return (
            <div key={label} className="item-wrapper">
              <StyleNavIcon
                className="nav-icon-btn"
                onClick={() => handleNavigation(category)}
              >
                {IconComponent ? <IconComponent size={50} /> : "?"}
              </StyleNavIcon>
              <div className="nav-text">{label}</div>
            </div>
          );
        })}
      </StyledItemWrapper>
    </Styledcontainer>
  );
};

export default Categories;
