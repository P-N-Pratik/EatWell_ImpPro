import React, { useState } from "react";
import styled from "styled-components";
import { MenuRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import LogoImg from "../../../assets/logo2.png";
import { useAuth0 } from "@auth0/auth0-react";
// import { Avatar } from "@mui/material";
import "./navbar.css";
import { useDispatch } from "react-redux";
// import { logout } from "../redux/reducers/userSlice";

const Nav = styled.div`
  //   background-color: ${({ theme }) => theme.bg};
  //  background-color: #f8d3dc;
  // background: linear-gradient(45deg, #e0c3fc, #8e44ad, #4b0082);
  background: linear-gradient(45deg, #E6E6FA, #D8BFD8, #E0B0FF);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
  //   border-bottom: 2px solid ${({ theme }) => theme.text_secondary + 20};
  border-bottom: 1px solid grey;
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const Navlink = styled(NavLink)`
  display: flex;
  align-items: center;
  // color: ${({ theme }) => theme.text_primary};
  color: blue;
  font-weight: 500;
  cursor: pointer;
  transition: all 1s slide-in;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom: 1.8px solid ${({ theme }) => theme.primary};
  }
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLogo = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 6px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  //    background-color: #f8d3dc;
  color: ${({ theme }) => theme.black};
`;

const Logo = styled.img`
  //  background-color: #f8d3dc;
  height: 62px;
`;

const UserContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  align-items: center;
  padding: 0 6px;
  color: black;
`;

const TextButton = styled.div`
  text-align: end;
  //   color: ${({ theme }) => theme.secondary};
  color: blue;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  font-weight: 600;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Mobileicon = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  padding: 0 6px;
  list-style: none;
  width: 90%;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.bg};
  position: absolute;
  top: 80px;
  right: 0;
  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-100%)"};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;

const Navbar = () => {
  const [isOpen, setisOpen] = useState(false);
  const { user, logout } = useAuth0();

  return (
    <Nav>
      <NavContainer>
        <Mobileicon onClick={() => setisOpen(!isOpen)}>
          <MenuRounded sx={{ color: "inherit" }} />
        </Mobileicon>

        <NavLogo to="/">
          <Logo src={LogoImg} />
          {/* EatWell                                                                                                                                                                                       */}
        </NavLogo>

        <MobileMenu isOpen={isOpen}>
          <Navlink to="user/dashboard">Dashboard</Navlink>
          <Navlink to="/workouts">Workouts</Navlink>
          <Navlink to="/recipes">Recipes</Navlink>
          <Navlink to="/blogs">Blogs</Navlink>
          <Navlink to="/contact">Contact</Navlink>
        </MobileMenu>

        <NavItems>
          <Navlink to="/dashboard">Dashboard</Navlink>
          {/* <Navlink to="/workouts">Workouts</Navlink> */}
          <Navlink to="/recipes">Recipes</Navlink>
          <Navlink to="/logIntake">Today's Intake</Navlink>
          <Navlink to="/goals">Goals</Navlink>
          <Navlink to="/diet">Diet</Navlink>
        </NavItems>

        <UserContainer>
          <div>
            <Avatar src={user?.picture}></Avatar>
            {user?.email}
          </div>
          {/* <TextButton>Logout</TextButton> */}
          <div className="navbar-sign">
            <button
              onClick={() => {
                localStorage.clear();
                logout();
              }}
            >
              Logout
            </button>
          </div>
        </UserContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
