/* eslint-disable react-refresh/only-export-components */
import styled from "styled-components";

export const Header = styled.header`
  width: 100%;
  & > div {
    margin: 30px auto;
    max-width: 1200px;
    border-radius: 12px;
    padding: 1px;
    background: linear-gradient(
      to right,
      #c5c3ff 0%,
      #a3a0f8 50%,
      #4441c8 100%
    );
    @media only screen and (max-width: 800px) {
      margin: 30px auto 60px;
    }
    @media only screen and (max-width: 580px) {
      margin: 30px auto 90px;
    }
    @media only screen and (max-width: 340px) {
      margin: 30px auto 130px;
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
  background-color: var(--dark);
  z-index: 1;
  border-radius: 12px;
  color: var(--light);
  #perfil-img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    object-fit: cover;
    cursor: pointer;
    box-shadow: 0 0 0 1px var(--main);
  }
  @media only screen and (max-width: 800px) {
    border-radius: 12px 12px 0 0;
  }
`;
export const NavMenu = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px 20px;
  button {
    font-size: 1.05rem;
    font-weight: 500;
    font-family: var(--font);
    &::after {
      height: 2px;
      margin: 0 auto;
      width: 0;
      background-color: var(--main);
      content: "";
      display: block;
      transition: 0.3s;
    }
    &:hover {
      color: var(--main);
      &::after {
        width: 100%;
      }
    }
  }
  @media only screen and (max-width: 800px) {
    background-color: var(--dark);
    box-shadow: 0 1px 0 var(--main);
    border-radius: 0 0 12px 12px;
    padding: 10px 5px;
    position: absolute;
    width: 100%;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 100%);
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
  input {
    background-color: #beb1fd !important;
    color: var(--dark);
    outline: none;
    padding: 8px 10px 5px;
    max-height: 37px;
    font-weight: 600;
    border-radius: 6px;
    width: 100%;
    max-width: 300px;
    resize: vertical;
  }
`;
