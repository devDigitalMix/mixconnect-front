/* eslint-disable react-refresh/only-export-components */
import styled from "styled-components";

export const Header = styled.header`
  width: 100%;
  position: relative;
  z-index: 20;
  #nav {
    margin: 30px auto;
    max-width: 1200px;
    border-radius: 12px;
    padding: 1px;
    background-color: var(--dark);
    position: relative;
    #navgradbottom {
      position: absolute;
      left: 0;
      bottom: 0;
    }
    #navgradtop {
      position: absolute;
      right: 0;
      top: 0;
    }
    @media only screen and (max-width: 800px) {
      margin: 30px auto 60px;
    }
    @media only screen and (max-width: 580px) {
      margin: 30px auto 40px;
    }
    @media only screen and (max-width: 340px) {
      margin: 30px auto 40px;
    }
  }
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 20px;
  padding-right: 5px;
  background-color: var(--dark);
  z-index: 1;
  border-radius: 11px;
  color: var(--light);
`;

export const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  z-index: 1001;

  span {
    width: 30px;
    height: 4px;
    background: var(--light);
    border-radius: 3px;
    transition: all 0.3s ease;
    box-shadow: 0 0 15px var(--main);
  }

  ${({ open }) =>
    open &&
    `
    span:nth-child(1) {
      transform: rotate(45deg) translate(8px, 8px);
    }
    span:nth-child(2) {
      transform: rotate(45deg) translate(1.2px, 1.2px);
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(-45deg) translate(6px, -6px);
    }
    span {
    background: var(--light);
  }
  `}

  @media (max-width: 1111px) {
    display: flex;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px 30px;
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
  overflow: hidden;

  .logoStudio {
    img {
      height: 33px;
    }
  }
  button {
    font-size: 1.25rem;
    letter-spacing: 1px;
    font-weight: 500;
    display: flex;
    align-items: center;
    position: relative;
    top: 3px;
    &::after {
      height: 2px;
      margin: 0 auto;
      width: 0;
      background-color: var(--sec);
      content: "";
      display: block;
      transition: 0.3s;
      position: absolute;
      bottom: 0;
    }
    &:hover,
    &.active {
      color: var(--sec);
      &::after {
        width: 100%;
      }
    }
  }
  @media (max-width: 1111px) {
    max-height: ${({ open }) => (open ? "420px" : "0")};
    padding-top: ${({ open }) => (open ? "50px" : "0")};
    padding-bottom: ${({ open }) => (open ? "50px" : "0")};
    opacity: ${({ open }) => (open ? "1" : "0")};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    gap: 10px;
    width: 100%;
    z-index: 10;
    transition: all.3s;
    flex-direction: column;
    flex-wrap: nowrap;
    background-color: var(--dark);
    box-shadow: 0 -2px 0 0 var(--main) inset;
  }
`;

export const ErrorSpan = styled.span`
  background-color: #ffd7d7;
  color: #9e0000;
  padding: 0.5rem;
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 1rem;
  border-radius: 7px;
`;

export const InputNav = styled.div`
  display: flex;
  gap: 5px;
  input {
    background-color: #f9f8fe !important;
    border: none;
    color: var(--dark);
    outline: none;
    padding: 8px 10px;
    max-height: 37px;
    font-weight: 600;
    border-radius: 13px;
    width: 100%;
    max-width: 300px;
    resize: vertical;
    font-family: var(--font2);
    &::placeholder {
      font-style: italic;
      color: var(--main);
      font-weight: 400;
    }
  }
`;
export const PerfilMenu = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  #perfil-img {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    object-fit: cover;
    cursor: pointer;
    box-shadow: 0 0 0 1.5px var(--main);
  }
  button:hover {
    filter: drop-shadow(0 0 2px var(--main)) drop-shadow(0 0 2px var(--main))
      brightness(110%);
  }
  @media only screen and (max-width: 1111px) {
    padding-right: 60px;
  }
`;
