import React, {createContext, useState} from 'react';
const FavouriteCoursesContext = createContext()

const FavouriteCoursesProvider = (props) => {
    const [favouriteCourses, setFavouriteCourses] = useState([])
    return(
        <FavouriteCoursesContext.Provider value={{favouriteCourses, setFavouriteCourses}}>
            {props.children}
        </FavouriteCoursesContext.Provider>
    )
};

export { FavouriteCoursesProvider, FavouriteCoursesContext };
