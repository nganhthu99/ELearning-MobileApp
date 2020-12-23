import React, {createContext, useState} from 'react';
import {courses} from "../../Data/data";
const FavouriteCoursesContext = createContext()

const FavouriteCoursesProvider = (props) => {
    const [favouriteCourses, setFavouriteCourses] = useState(courses.slice(7))
    return(
        <FavouriteCoursesContext.Provider value={{favouriteCourses, setFavouriteCourses}}>
            {props.children}
        </FavouriteCoursesContext.Provider>
    )
};

export { FavouriteCoursesProvider, FavouriteCoursesContext };
