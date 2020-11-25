import React, {createContext, useState} from 'react';
import {courses} from "../Data/data";
const RegisteredCoursesContext = createContext()

const RegisteredCoursesProvider = (props) => {
    const [registeredCourses, setRegisteredCourses] = useState(courses.slice(0, 4))
    return(
        <RegisteredCoursesContext.Provider value={{registeredCourses, setRegisteredCourses}}>
            {props.children}
        </RegisteredCoursesContext.Provider>
    )
};

export { RegisteredCoursesProvider, RegisteredCoursesContext };
