import React, {createContext, useState} from 'react';
import {courses} from "../Data/data";
const DownloadedCoursesContext = createContext()

const DownloadedCoursesProvider = (props) => {
    const [downloadedCourses, setDownloadedCourses] = useState(courses.slice(4, 7))
    return(
        <DownloadedCoursesContext.Provider value={{downloadedCourses, setDownloadedCourses}}>
            {props.children}
        </DownloadedCoursesContext.Provider>
    )
};

export { DownloadedCoursesProvider, DownloadedCoursesContext };
