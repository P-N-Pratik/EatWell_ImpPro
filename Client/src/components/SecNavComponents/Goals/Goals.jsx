import React from "react";
// import "./goals.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import IfGoalSelected from "./IfGoalSelected/IfGoalSelected";
import SelectGoals from "./SelectGoals/SelectGoals";
import axios from "../../../axios";
// import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import UserDetails from "./UserDetails/UserDetails";

// Styled component Container
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  // background: ${({ theme }) => theme.bg};
  background: linear-gradient(45deg, #E6E6FA, #D8BFD8, #E0B0FF);

  color: ${({ theme }) => theme.text_primary};
  transition: all 0.2s ease;
`;

function Goals() {

  const { user } = useAuth0();
  const userId=user?.sub
  const [usersGoal, setUsersGoal] = useState("");
  const [usersInfo, setUsersInfo] = useState({});
  const [storedUsersInfo,setStoredUsersInfo] = useState({})

  const fetchUsersInfofromDatabase = async (userId) => {
    try {
        const response = await axios.post(
            "http://localhost:3001/checkusersinfo",
            { userId }
            
        );
        const usersInfo = response.data;
        setUsersInfo(usersInfo);
        setUsersGoal(usersInfo.users_goal);

        // Store the usersInfo in localStorage
        localStorage.setItem("usersInfo", JSON.stringify(usersInfo));

        console.log("Data fetched successfully");
    } catch (error) {
        console.error("Error fetching data:", error.message || error);
    }
};

  useEffect(() => {

    if(!user){return}
    console.log("useEffect called")
    console.log("hello")
    // setStoredUsersInfo(JSON.parse(localStorage.getItem("usersInfo")))
    const storedUsersInfo = localStorage.getItem("usersInfo");
    console.log("storedUsersInfo",storedUsersInfo)
          if(storedUsersInfo) {

            const parsedUsersInfo = JSON.parse(storedUsersInfo);
            console.log("parsedUsersInfo",parsedUsersInfo)
            setUsersInfo(parsedUsersInfo);
            console.log("usersInfo",usersInfo)

            setUsersGoal(parsedUsersInfo.users_goal);
            console.log("usersGoal",usersGoal)

    
          } 
          else{

            fetchUsersInfofromDatabase(userId);
            
          
          }
      
      
  

   
  }, [user]); 

  const handleChangeGoalClick = () => {
    // Navigate to the goal selection page or render a goal selection component
    navigate("/userdetails");
  };


  // const { user } = useAuth0();

  
  const navigate = useNavigate();
  

  return (
    <Container>
      {usersGoal ? (
        <IfGoalSelected
          userGoal={usersGoal}
          onChangeGoalClick={handleChangeGoalClick}
        />
      ) : (
        <UserDetails />
      )}
    </Container>
  );
}

export default Goals;
