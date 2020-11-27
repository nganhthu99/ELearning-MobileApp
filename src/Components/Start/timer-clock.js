import React, {useContext, useEffect} from 'react';
import {ThemeContext} from "../../Provider/theme-provider";
import {CountdownCircleTimer} from "react-native-countdown-circle-timer";
import {Animated, Text, View} from "react-native";

const TimerClock = (props) => {
    const {theme} = useContext(ThemeContext)

    useEffect(() => {
        return
    }, [])

    return (
        <CountdownCircleTimer
            onComplete={() => {
                props.onComplete()
            }}
            isPlaying={true}
            duration={60}
            size={100}
            colors={[
                ['#3996FB', 0.4],
                ['#f37628', 0.4],
                ['#f33c28', 0.2],
            ]}>
            {({remainingTime, animatedColor}) => {
                if (remainingTime === 0 ){
                    return (
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: theme.secondaryButton, fontSize: 12}}>Too Late!</Text>
                        </View>
                    )
                } else return (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'gray', fontSize: 8}}>Remaining</Text>
                        <Animated.Text style={{color: animatedColor}}>
                            {remainingTime}
                        </Animated.Text>
                        <Text style={{color: 'gray', fontSize: 8}}>seconds</Text>
                    </View>
                )
            }}
        </CountdownCircleTimer>
    )
};

export default TimerClock;
