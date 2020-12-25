import React, {createContext, useState} from 'react';
const DownloadedCoursesContext = createContext()

const DownloadedCoursesProvider = (props) => {
    const [downloadedCourses, setDownloadedCourses] = useState([])
    return(
        <DownloadedCoursesContext.Provider value={{downloadedCourses, setDownloadedCourses}}>
            {props.children}
        </DownloadedCoursesContext.Provider>
    )
};

export { DownloadedCoursesProvider, DownloadedCoursesContext };
