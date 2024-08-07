import styled from "styled-components";

export const StyledSection = styled.section`
  background-color: ${(props) => props.bg || "#000"};
  color: ${(props) => props.color || "#fff"};
  padding: 20px 20px;
  font-family: Arial, sans-serif;
`;

export const StyledSectionTitle = styled.h1`
  text-align: center;
  font-size: 28px;
  margin-bottom: 10px;
  text-transform: capitalize;
`;

export const StyledSectionSubtitle = styled.p`
  text-align: center;
  color: ${(props) => props.color || "#fff"};
  font-size: 16px;
  margin-bottom: 40px;
`;

export const Styledcontainer = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  box-sizing: border-box;
  margin: 3rem 0;
  justify-content: center;
`;

export const StyledItemWrapper = styled.div`
  flex-flow: wrap;
  box-sizing: border-box;
  display: flex;
  place-content: center;
  align-items: center;
  gap: 30px;
  width: 100%;
`;

export const StyleNavIcon = styled.button`
  color: #ffffff80;
  background-color: #fff0;
  border: solid 0.1em rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  vertical-align: center;
  width: ${(props) => (props.$isBackBtn ? "4em" : "7em")};
  height: ${(props) => (props.$isBackBtn ? "4em" : "7em")};
  -webkit-user-select: none;
  user-select: none;
  transition: 0.4s;

  &:hover {
    cursor: pointer;
    color: #fff;
    background-color: #ffffff1a;
    border: solid 0.2em rgb(255, 255, 255);
    transform: scale(1.1);
  }
`;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // Ensure it's on top of other content
`;

export const ModalContainer = styled.div`
  background-color: white;
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const SaveButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#ccc" : "#111")};
  color: white;
  padding: 10px 0;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#333")};
  }
`;
