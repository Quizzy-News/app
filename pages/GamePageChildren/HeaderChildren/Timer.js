import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

import Svg, { Path } from "react-native-svg";



// This component encapsulates timer/countdown logic.
export default function Timer({ onTimeOut, countdown, setCountdown, inProgress }) {

  //const [minute, setMinute] = useState(0);

  // Increment the minute every second
  useEffect(() => {
    if (!inProgress) return; // Only run the interval if inProgress is true
    const interval = setInterval(() => {
      setCountdown((prevMinute) => {
        let m = (prevMinute + 1);
        // console.log("GameTimer: ", m);
        return m;
      }); // Keep minute between 0 and 59
    }, 1000);

    // Clear interval on component unmount
    return () => {
      clearInterval(interval);
      
    }
  }, [inProgress]);

  const sliceAngle = countdown * 6; // Convert countdown to angle
  //console.log("sa: ", sliceAngle);
  // Convert degrees to radians
  const radians = (Math.PI / 180) * sliceAngle;
  //console.log("rad: ", radians);

  // Keep both pizza slice and background circle with the same radius
  const radius = 50;
  const x = 50 + radius * Math.sin(radians); // 50 is the center of the circle in x-axis
  const y = 50 - radius * Math.cos(radians); // 50 is the center of the circle in y-axis (flipped in SVG)

  // Create the pizza slice path (white cutout)
  const largeArcFlag = sliceAngle > 180 ? 1 : 0;
  const path = `M 50 50 L 50 0 A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x} ${y} Z`;

  // Change the color if sliceAngle is 10% or less (36 degrees or less)
  var circleColor = "#F6C443";
  if (sliceAngle >= 55 * 6 && sliceAngle < 360) {
    circleColor = "red";
  } else if (sliceAngle == 360) {
    circleColor = "white";
  }



    
  
    useEffect(() => {

        if (countdown === 61) {
          console.log('at 61')
            onTimeOut(); // See GamePage.js
            return;
          }

    }, [countdown, onTimeOut])

    return (
      <View style={styles.container} className="h-timer-height w-timer-width">
        <Svg height="49px" width="49px" viewBox="0 0 100 100">
          {/* Orange/Red Circle based on the sliceAngle */}
          <Path
            d="M 50 50 m -50, 0 a 50,50 0 1,0 100,0 a 50,50 0 1,0 -100,0"
            fill={circleColor}
          />
          {/* White pizza slice (cutout) */}
          <Path d={path} fill="white" />
        </Svg>
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});






// import React, { useState, useEffect } from "react";
// import { View, StyleSheet } from "react-native";
// import Svg, { Path } from "react-native-svg";

// const PizzaSlice = () => {
//   const [minute, setMinute] = useState(57);

//   // Increment the minute every second
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setMinute((prevMinute) => {
//         let m = (prevMinute + 1) % 61;
//         console.log("m: ", m);
//         return m;
//       }); // Keep minute between 0 and 59
//     }, 1000);

//     // Clear interval on component unmount
//     return () => clearInterval(interval);
//   }, []);

//   const sliceAngle = minute * 6; // Convert minute to angle
//   console.log("sa: ", sliceAngle);
//   // Convert degrees to radians
//   const radians = (Math.PI / 180) * sliceAngle;
//   console.log("rad: ", radians);

//   // Keep both pizza slice and background circle with the same radius
//   const radius = 50;
//   const x = 50 + radius * Math.sin(radians); // 50 is the center of the circle in x-axis
//   const y = 50 - radius * Math.cos(radians); // 50 is the center of the circle in y-axis (flipped in SVG)

//   // Create the pizza slice path (white cutout)
//   const largeArcFlag = sliceAngle > 180 ? 1 : 0;
//   const path = M 50 50 L 50 0 A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x} ${y} Z;

//   // Change the color if sliceAngle is 10% or less (36 degrees or less)
//   var circleColor = "orange";
//   if (sliceAngle >= 55 * 6 && sliceAngle < 360) {
//     circleColor = "red";
//   } else if (sliceAngle == 360) {
//     circleColor = "lightgray";
//   }

//   return (
//     <View style={styles.container}>
//       <Svg height="100" width="100" viewBox="0 0 100 100">
//         {/* Orange/Red Circle based on the sliceAngle */}
//         <Path
//           d="M 50 50 m -50, 0 a 50,50 0 1,0 100,0 a 50,50 0 1,0 -100,0"
//           fill={circleColor}
//         />
//         {/* White pizza slice (cutout) */}
//         <Path d={path} fill="lightgray" />
//       </Svg>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 50,
//   },
// });

// export default PizzaSlice;






// import React, { useState, useEffect } from "react";
// import { View, Image } from "react-native";
// import {  } from 'nativewind';

// const Image = (Image);
// const View = (View);

// // This component encapsulates timer/countdown logic.

// export default function Timer({ initialCountdown, onTimeOut }) {
//     const [countdown, setCountdown] = useState(initialCountdown); 
//     const timerFramesImport = require.context('../../../public/timer-frames', true);
//     const timerFrames = timerFramesImport.keys().map(image => timerFramesImport(image));
  
//     useEffect(() => {

//         if (countdown === 0) {
//             onTimeOut(); // See GamePage.js
//             return;
//           }
      
//         // Decrement countdown to 0 with a 1 sec delay; setInterval() is a built-in JS function.
//           const intervalId = setInterval(() => {
//             setCountdown((currentCountdown) => currentCountdown - 1);
//           }, 1000);
      
//         // Cleanup
//           return () => clearInterval(intervalId);

//     }, [countdown, onTimeOut])


//     return (
//       <>
//         <Image source={timerFrames[countdown]} className="h-timer-height w-timer-width"/>
//       </>
//     )


// }