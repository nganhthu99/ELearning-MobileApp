import React, {createContext, useState} from 'react';
const CurrentLessonContext = createContext()

const CurrentLessonProvider = (props) => {
    const [currentLesson, setCurrentLesson] = useState({})
    return(
        <CurrentLessonContext.Provider value={{currentLesson, setCurrentLesson}}>
            {props.children}
        </CurrentLessonContext.Provider>
    )
};

export { CurrentLessonProvider, CurrentLessonContext };
