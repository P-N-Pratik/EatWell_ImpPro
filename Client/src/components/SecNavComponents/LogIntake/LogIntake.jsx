import React, { useEffect,useContext } from "react";
import { useState } from "react";
import axios from '../../../axios';
// import  Axios  from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import UsersInfoContext from "../../../contexts/usersInfoContext";

import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import "./logintake.css";
const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
  background: linear-gradient(45deg, #E6E6FA, #D8BFD8, #E0B0FF);

`;

const Wrapper = styled.div`
  // flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  };
  justify-cpntent: center;
  // border: 1px solid black;
  // overflow-y: auto;
  // scrollbar-widh: none;
  
}
`;

function LogIntake() {
  
  const [totals,setTotals] = useState({});
  const {user} = useAuth0();
  const [remaining,setRemaining ] = useState({});
  const foodData = ["breakfast", "lunch", "dinner", "snacks"];
  const {remainingGoal,setRemainingGoal} = useContext(UsersInfoContext)

  // const [foodData, setFoodData] = useState([
  //   {
  //     id: "breakfast",
  //     calories: 0,
  //     carbs: 6,
  //     fat: 0,
  //     protein: 0,
  //     sodium: 0,
  //     sugar: 0,
  //   },
  //   {
  //     id: "lunch",
  //     calories: 10242,
  //     carbs: 1613,
  //     fat: 83,
  //     protein: 504,
  //     sodium: 0,
  //     sugar: 0,
  //   },
  //   {
  //     id: "dinner",
  //     calories: 0,
  //     carbs: 0,
  //     fat: 0,
  //     protein: 0,
  //     sodium: 0,
  //     sugar: 0,
  //   },
  //   {
  //     id: "snacks",
  //     calories: 0,
  //     carbs: 0,
  //     fat: 0,
  //     protein: 0,
  //     sodium: 0,
  //     sugar: 0,
  //   },
  // ]);

  const [forBreakFastTable, setForBreakFastTable] = useState({});
  const [forLunchTable, setForLunchTable] = useState({});
  const [forDinnerTable, setForDinnerTable] = useState({});
  const [forSnackTable, setForSnackTable] = useState({});

  const location = useLocation();
  // const selectedFood = location.state?.selectedFood;
  const[selectedFood,setSelectedFood] = useState(location.state?.selectedFood || {});
  const[ servings,setServings ]= useState(location.state?.servings); 
  const [ whichMeal,setWhichMeal] = useState(location.state?.value); //Add breakfast

  

  // const [currentMeal,setCurrentMeal] = useState({});


  function storeInLocalStorage(){
    if(selectedFood)
    {
      localStorage.setItem(selectedFood.meal,JSON.stringify(selectedFood));

    }

  }
  
  const sendDataToDatabase = async () => {
    try {
      axios.post('http://localhost:3001/dailyfoodlog',selectedFood)
      .then(response => {
         console.log(response.data);
       })
      .catch(error => {
         console.log('Error sending data to database:');
       });
    } catch (error) {
      
      console.log(error);
    }
  };


  // Example of Good Axios
    
  // const sendDataToDatabase = async () => {
  //   try {
  //     const response =  await Axios.get('http://localhost:3001/about');
  //     console.log(response);

      
  //   } catch (error) {
      
  //     console.error(error);
  //   }
  // };



  useEffect(() => {

    selectedFood.user_Id = user?.sub;
    const currentDate = new Date();
    // const currentDay = currentDate.getDate();
    // const currentMonth = currentDate.getMonth();
    // const currentYear = currentDate.getFullYear();
    selectedFood.date =currentDate;

    console.log(user)


    
    let saykey = "";
    if (whichMeal === "Add Breakfast") {
      saykey = "breakfast";
      selectedFood.meal= "breakfast";
      // console.log(selectedFood);
 
    } else if (whichMeal === "Add Lunch") {
      saykey = "lunch";
      selectedFood.meal= "lunch";

    } else if (whichMeal === "Add Dinner") {
      saykey = "dinner";
      selectedFood.meal= "dinner";

    } else if(whichMeal === "Snack's Here"){
      saykey = "snacks";
      selectedFood.meal= "snacks";

    }else{
      console.log("")
    }



    storeInLocalStorage();
    console.log(selectedFood)

    sendDataToDatabase();
// 
    setForBreakFastTable(JSON.parse(localStorage.getItem("breakfast")))
    setForLunchTable(JSON.parse(localStorage.getItem("lunch")))
    setForDinnerTable(JSON.parse(localStorage.getItem("dinner")))
    setForSnackTable(JSON.parse(localStorage.getItem("snacks")))


    // fetchDataFromDatabase();
    


    // const setDataInFoodData = (saykey) => {
    //   // console.log(`key in setDataInMeal = ${saykey}`);
    //   // for (const meal in foodData){
    //   //   console.log(meal.carbs)


    //   for (const meal in foodData) {
    //     mealStored = JSON.parse(localStorage.getItem(meal.id))
    //     if(mealStored){

    //     }
    //     totalCalories += foodData[meal].calories;
    //     totalCarbs += foodData[meal].carbs;
    //     totalFat += foodData[meal].fat;
    //     totalProtein += foodData[meal].protein;
    //     totalSodium += foodData[meal].sodium;
    //     totalSugar += foodData[meal].sugar;
    //   }

    //   const meal = foodData.find((result) => result.id === saykey);
    //   console.log("meal",meal);

    //   console.log("foodDaTA",foodData);

    //   // if (meal ) {
    //   //   foodData[meal].calories = selectedFood.calories;
    //   //   foodData[meal].carbs = selectedFood.carbs;
    //   //   foodData[meal].fat = selectedFood.fat;
    //   //   foodData[meal].protein = selectedFood.protein;
    //   //   foodData[meal].sodium = selectedFood.sodium;
    //   //   foodData[meal].sugar = selectedFood.sugar;

  
    //   // } else {
    //   //   console.log("");
    //   // }
    // };
    // setDataInFoodData();

    const calculateTotals = () => {
      let totalCalories = 1;
      let totalCarbs = 1;
      let totalFat = 1;
      let totalProtein = 1;
      let totalSodium = 0;
      let totalSugar = 0;
     
  
      for (let i=0;i<foodData.length;i++) {

        // const mealStored = JSON.parse(localStorage.getItem(meal.id))
        console.log("meal",foodData[i])
        const mealStored = JSON.parse(localStorage.getItem(foodData[i]))
        // console.log("meal id",meal.id)
        // console.log("meal Stored",mealStored);
        if(mealStored){
          mealStored.calories ? totalCalories += mealStored.calories : totalCalories += 0;
          mealStored.carbs ? totalCarbs += parseFloat(mealStored.carbs.replace('g', '')) :totalCarbs +=0 ;
          mealStored.fat ? totalFat += parseFloat(mealStored.fat.replace('g', '')) :totalFat +=0 ;
          mealStored.protein ? totalProtein += parseFloat(mealStored.protein.replace('g', '')) :totalProtein +=0 ;
         
          // totalSodium += parseFloat(mealStored.sodium.replace('g', ''));
          // totalSugar += parseFloat(mealStored.sugar.replace('g', ''));
        }
      }
  
      setTotals({
        calories: totalCalories,
        carbs: totalCarbs,
        fat: totalFat,
        protein: totalProtein,
        sodium: totalSodium,
        sugar: totalSugar
      });
      localStorage.setItem('totalnutrition',JSON.stringify({
        calories: totalCalories,
        carbs: totalCarbs,
        fat: totalFat,
        protein: totalProtein,
        sodium: totalSodium,
        sugar: totalSugar
      }))
  
      // return {
      //   calories: totalCalories,
      //   carbs: totalCarbs,
      //   fat: totalFat,
      //   protein: totalProtein,
      //   sodium: totalSodium,
      //   sugar: totalSugar,
      // };
    };

    calculateTotals();

    

    const totalNutrition = JSON.parse(localStorage.getItem("totalnutrition"))
    setRemaining ({
      calories: dailyGoal.calories - totalNutrition.calories ,
      carbs:  dailyGoal.carbs - totalNutrition.carbs,
      fat: dailyGoal.fat - totalNutrition.fat  ,

      protein: dailyGoal.protein -  totalNutrition.protein,
      sodium: dailyGoal.sodium - totalNutrition.sodium ,
      sugar:  dailyGoal.sugar - totalNutrition.sugar
    }
    );

    localStorage.setItem('remainingnutrition',JSON.stringify({
      calories: dailyGoal.calories - totalNutrition.calories ,
      carbs:  dailyGoal.carbs - totalNutrition.carbs,
      fat: dailyGoal.fat - totalNutrition.fat  ,

      protein: dailyGoal.protein -  totalNutrition.protein,
      sodium: dailyGoal.sodium - totalNutrition.sodium ,
      sugar:  dailyGoal.sugar - totalNutrition.sugar

    }));
    // setRemainingGoal(remaining);
    // console.log("remaining Goal");
    // console.log(remainingGoal);




  }, [selectedFood, servings, whichMeal]);

  const dailyGoal = {
    calories: 1920,
    carbs: 240,
    fat: 64,
    protein: 96,
    sodium: 2300,
    sugar: 72,
  };






  // const handleFoodChange = (meal, nutrient, value) => {
  //   setFoodData((prevData) => ({
  //     ...prevData,
  //     [meal]: {
  //       ...prevData[meal],
  //       [nutrient]: parseFloat(value) || 0,
  //     },
  //   }));
  // };



  const navigate = useNavigate();

  const handleAddFoodClick = (event) => {
    let value = event.target.textContent;
    navigate("/foodintake", { state: { value } });
  };

  // function addFoodMetaData(){

  // }
  // useEffect(()=>{

  // },[])

  // const [selectedLunch,setSelectedLunch] = useState("");
  // const [selectedLunchServings,setSelectedLunchServings] = useState("");

  return (
    // <div className="container">
    //   <div className="food-tracker">
    <Container>
      <Wrapper>
        <h1>Food Tracker</h1>

        <div className="meal-section">
          <h2><b>Breakfast</b></h2>
          <div className="food-item">
            {forBreakFastTable && forBreakFastTable.title ? (
              <b>{forBreakFastTable.title}</b>
            ) : (
              <b>No food selected</b>
            )}
            <b>Servings : {servings}</b>

            <div className="nutrition-info">
              <div className="nutrient">
                <span className="nutrient-name">Calories</span>
                <span className="nutrient-value">
                  {forBreakFastTable?.calories}
                </span>
                <span className="nutrient-unit">kcal</span>
              </div>
              <div className="nutrient">
                <span className="nutrient-name">Carbs</span>
                <span className="nutrient-value">
                  {forBreakFastTable?.carbs}
                </span>
                {/* <span className="nutrient-unit">g</span> */}
              </div>
              <div className="nutrient">
                <span className="nutrient-name">Fat</span>
                <span className="nutrient-value">{forBreakFastTable?.fat}</span>
                {/* <span className="nutrient-unit">g</span> */}
              </div>
              <div className="nutrient">
                <span className="nutrient-name">Protein</span>
                <span className="nutrient-value">
                  {forBreakFastTable?.protein}
                </span>
                {/* <span className="nutrient-unit">g</span> */}
              </div>
              <div className="nutrient">
                <span className="nutrient-name">Sodium</span>
                <span className="nutrient-value">{forBreakFastTable?.sodium}</span>
                {/* <span className="nutrient-unit">mg</span> */}
              </div>
              <div className="nutrient">
                <span className="nutrient-name">Sugar</span>
                <span className="nutrient-value">{forBreakFastTable?.sugar}</span>
                {/* <span className="nutrient-unit">g</span> */}
              </div>
            </div>
          </div>

          <div className="add-food-button">
            <button onClick={handleAddFoodClick}>Add Breakfast</button>
            {/* <button>Quick Tools</button> */}
          </div>
        </div>


        {/* Lunch */}

        <div className="meal-section">
          <h2><b>Lunch</b></h2>
          <div className="food-item">
            {forLunchTable && forLunchTable.title ? (
              <b>{forLunchTable.title}</b>
            ) : (
              <b>No food selected</b>
            )}
            <b>Servings : {servings}</b>

            <div className="nutrition-info">
              <div className="nutrient">
                <span className="nutrient-name">Calories</span>
                <span className="nutrient-value">
                  {forLunchTable?.calories}
                </span>
                <span className="nutrient-unit">kcal</span>
              </div>
              <div className="nutrient">
                <span className="nutrient-name">Carbs</span>
                <span className="nutrient-value">
                  {forLunchTable?.carbs}
                </span>
                {/* <span className="nutrient-unit">g</span> */}
              </div>
              <div className="nutrient">
                <span className="nutrient-name">Fat</span>
                <span className="nutrient-value">{forLunchTable?.fat}</span>
                {/* <span className="nutrient-unit">g</span> */}
              </div>
              <div className="nutrient">
                <span className="nutrient-name">Protein</span>
                <span className="nutrient-value">
                {forLunchTable?.protein}
                </span>
                {/* <span className="nutrient-unit">g</span> */}
              </div>
              <div className="nutrient">
                <span className="nutrient-name">Sodium</span>
                <span className="nutrient-value">{forLunchTable?.sodium}</span>
                {/* <span className="nutrient-unit">mg</span> */}
              </div>
              <div className="nutrient">
                <span className="nutrient-name">Sugar</span>
                <span className="nutrient-value">{forLunchTable?.sugar}</span>
                {/* <span className="nutrient-unit">g</span> */}
              </div>
            </div>
          </div>
          <div className="add-food-button">
            <button onClick={handleAddFoodClick}>Add Lunch</button>
            {/* <button>Quick Tools</button> */}
          </div>
        </div>




        <div className="meal-section">
          <h2><b>Dinner</b></h2>
          <div className="food-item">
            {forDinnerTable && forDinnerTable.title ? (
              <b>{forDinnerTable.title}</b>
            ) : (
              <b>No food selected</b>
            )}
            <b>Servings : {servings}</b>

            <div className="nutrition-info">
              <div className="nutrient">
                <span className="nutrient-name">Calories</span>
                <span className="nutrient-value">
                  {forDinnerTable?.calories}
                </span>
                <span className="nutrient-unit">kcal</span>
              </div>
              <div className="nutrient">
                <span className="nutrient-name">Carbs</span>
                <span className="nutrient-value">
                  {forDinnerTable?.carbs}
                </span>
                {/* <span className="nutrient-unit">g</span> */}
              </div>
              <div className="nutrient">
                <span className="nutrient-name">Fat</span>
                <span className="nutrient-value">{forDinnerTable?.fat}</span>
                {/* <span className="nutrient-unit">g</span> */}
              </div>
              <div className="nutrient">
                <span className="nutrient-name">Protein</span>
                <span className="nutrient-value">
                  {forDinnerTable?.protein}
                </span>
                {/* <span className="nutrient-unit">g</span> */}
              </div>
              <div className="nutrient">
                <span className="nutrient-name">Sodium</span>
                <span className="nutrient-value">{forDinnerTable?.sodium}</span>
                {/* <span className="nutrient-unit">mg</span> */}
              </div>
              <div className="nutrient">
                <span className="nutrient-name">Sugar</span>
                <span className="nutrient-value">{forDinnerTable?.sugar}</span>
                {/* <span className="nutrient-unit">g</span> */}
              </div>
            </div>
          </div>
          <div className="add-food-button">
            <button onClick={handleAddFoodClick}>Add Dinner</button>
            {/* <button>Quick Tools</button> */}
          </div>
        </div>

        <div className="meal-section">
          <h2><b>Snack's Here</b></h2>
          <div className="food-item">
            {forSnackTable && forSnackTable.title ? (
              <b>{forSnackTable.title}</b>
            ) : (
              <b>No food selected</b>
            )}
            <b>Servings : {servings}</b>

            <div className="nutrition-info">
              <div className="nutrient">
                <span className="nutrient-name">Calories</span>
                <span className="nutrient-value">
                  {forSnackTable?.calories}
                </span>
                <span className="nutrient-unit">kcal</span>
              </div>
              <div className="nutrient">
                <span className="nutrient-name">Carbs</span>
                <span className="nutrient-value">
                  {forSnackTable?.carbs}
                </span>
                {/* <span className="nutrient-unit">g</span> */}
              </div>
              <div className="nutrient">
                <span className="nutrient-name">Fat</span>
                <span className="nutrient-value">{forSnackTable?.fat}</span>
                {/* <span className="nutrient-unit">g</span> */}
              </div>
              <div className="nutrient">
                <span className="nutrient-name">Protein</span>
                <span className="nutrient-value">
                {forSnackTable?.protein}
                </span>
                {/* <span className="nutrient-unit">g</span> */}
              </div>
              <div className="nutrient">
                <span className="nutrient-name">Sodium</span>
                <span className="nutrient-value">{forSnackTable?.sodium}</span>
                {/* <span className="nutrient-unit">mg</span> */}
              </div>
              <div className="nutrient">
                <span className="nutrient-name">Sugar</span>
                <span className="nutrient-value">{forSnackTable?.sugar}</span>
                {/* <span className="nutrient-unit">g</span> */}
              </div>
            </div>
          </div>
          <div className="add-food-button">
            <button onClick={handleAddFoodClick}>Snack's Here</button>
            {/* <button>Quick Tools</button> */}
          </div>
        </div>

        <div className="summary-section">
          <div className="totals-container">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Calories</th>
                  <th>Carbs</th>
                  <th>Fat</th>
                  <th>Protein</th>
                  <th>Sodium</th>
                  <th>Sugar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Totals</td>
                  <td>{totals.calories}</td>
                  <td>{totals.carbs}</td>
                  <td>{totals.fat}</td>
                  <td>{totals.protein}</td>
                  <td>{totals.sodium}</td>
                  <td>{totals.sugar}</td>
                </tr>
                <tr>
                  <td>Your Daily Goal</td>
                  <td>{dailyGoal.calories}</td>
                  <td>{dailyGoal.carbs}</td>
                  <td>{dailyGoal.fat}</td>
                  <td>{dailyGoal.protein}</td>
                  <td>{dailyGoal.sodium}</td>
                  <td>{dailyGoal.sugar}</td>
                </tr>
                <tr>
                  <td>Remaining</td>
                  <td>{remaining?.calories}</td>
                  <td>{remaining?.carbs}</td>
                  <td>{remaining?.fat}</td>
                  <td>{remaining?.protein}</td>
                  <td>{remaining?.sodium}</td>
                  <td>{remaining?.sugar}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Wrapper>
    </Container>
  );
}

export default LogIntake;
