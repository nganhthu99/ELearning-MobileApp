import React, {createContext, useState} from 'react';
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
