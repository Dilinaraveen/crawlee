import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";



export const AppContext = createContext();

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()


    const [allCourses, setAllCourses] = useState([])
    const [isEducator, setIsEducator] = useState(false)
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(false)

    const getAuthState=async()=>{
        try{
            const res = await axios.get(backendUrl + "/api/auth/is-auth");
            const data = res.data;
            if (data.success){
                setIsLoggedin(true)
                getUserData()
            }
        }catch(error){
            toast.error(error.response?.data?.message || "An error occurred");
        }
    }

    const getUserData = async () => {
        try {
            const res = await axios.get(backendUrl + "/api/user/data");
            const data = res.data;
            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    }

   
    //Fetch all courses
    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses)
    }


    //Function to calculate average rating of course
    const calculateRating = (course) => {

        if (course.courseRatings.length === 0) {
            return 0
        }

        let totalRating = 0
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating
        })
        return Math.floor(totalRating / course.courseRatings.length)
    }

    useEffect(() => {
        fetchAllCourses()
    }, [])
    
    useEffect(() => {
        getAuthState()
    }, [])

    const value = {
        backendUrl,
        currency,
        allCourses,
        navigate,
        calculateRating,
        isEducator,
        setIsEducator,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}