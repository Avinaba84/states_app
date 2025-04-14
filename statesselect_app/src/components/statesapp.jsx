import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./statesapp.module.css";

const Cityselector = () => {
 
    const [countries,setCountries] = useState([]);
    const [states,setStates] = useState([]);
    const [cities,setCities] = useState([]);
    const [selectedCountry,setselectedCountry] = useState("");
    const [selectedState,setselectedState] = useState("");
    const [selectedCity,setselectedCity] = useState("");

    useEffect(()=>{
        axios.get(`https://crio-location-selector.onrender.com/countries`)
        .then((response)=>{
            setCountries(response.data);
    })
    .catch((error)=>{
        console.error("Error fetching countries",error);
    });
  },[]);

  useEffect(()=>{
    if(selectedCountry){
    axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
    .then((response)=>{
      setStates(response.data);
      setselectedState(""); //Reset state selection
      setCities([]);//clear cities
      setselectedCity("");//Reset city selection
    })
    .catch((error)=>{
        console.error("Error in fetching states",error)
    });
   }
  },[selectedCountry]);

  useEffect(()=>{
    if(selectedCountry && selectedState){
    axios.get( `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
    .then((response)=>{
        setCities(response.data);
        setselectedCity("");//reset city selection
    })
    .catch((error)=>{
        console.error("Error in fetching cities",error)
    });
   }
  },[selectedCountry,selectedState]);

  return (
    <div className={styles["city-selector"]}>
        <h1>Select Location</h1>
        <div className={styles.dropdown}>
            <select
               value={selectedCountry}
               onChange={(e)=>setselectedCountry(e.target.value)} className={styles.dropdown}>
                <option value="" disabled>
                    select Country
                </option>
                {countries.map((country)=>(
                    <option key = {country} value={country}>
                        {country}
                    </option>
                ))}
               </select>
               <select
                 value={selectedState}
                 onChange={(e) => setselectedState(e.target.value)}
                 disabled={!selectedCountry}
                 className={styles.dropdown}>
                    <option value="" disabled>
                        Select State
                    </option>
                    {states.map((state)=>(
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                    </select>
                <select 
                 value={selectedCity}
                 onChange={(e) => setselectedCity(e.target.value)}
                 disabled={!selectedState}
                 className={styles.dropdown}>
                    <option value="" disabled>
                        Select City
                    </option>
                    {cities.map((city)=>(
                        <option key={city} value={city}>
                            {city}
                        </option>
                       ))} 
                </select>
        </div>
        {selectedCity && (
            <h2 className= {styles.result}>
                You selected <span className={styles.highlight}>{selectedCity}</span>,
                <span className={styles.fade}>
                    {" "}
                    {selectedState}, {selectedCountry}
                </span>
            </h2>
        )}
    </div>
  );
};
export default Cityselector;