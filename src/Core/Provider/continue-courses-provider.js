import React, {createContext, useState} from 'react';
import {courses} from "../../Data/data";
const ContinueCoursesContext = createContext()

const ContinueCoursesProvider = (props) => {
    const [continueCourses, setContinueCourses] = useState([])
    return(
        <ContinueCoursesContext.Provider value={{continueCourses, setContinueCourses}}>
            {props.children}
        </ContinueCoursesContext.Provider>
    )
};

export { ContinueCoursesProvider, ContinueCoursesContext };
