/* eslint-disable react-refresh/only-export-components */
import styled from "styled-components";

export const Header = styled.header`
  width: 100%;
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

  @media only screen and (max-width: 875px) {
    padding-bottom: 90px;
  }
  @media only screen and (max-width: 360px) {
    padding-bottom: 120px;
  }
`;
export const NavMenu = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px 30px;

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
  @media only screen and (max-width: 875px) {
    padding: 10px 5px;
    position: absolute;
    width: 100%;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%);
  }
  @media only screen and (max-width: 545px) {
    padding: 10px 15px;
    position: absolute;
    width: 100%;
    bottom: -10px;
    left: 50%;
    transform: translate(-50%);
  }
  @media only screen and (max-width: 365px) {
    padding: 10px 5px;
    position: absolute;
    width: 100%;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%);
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
`;
