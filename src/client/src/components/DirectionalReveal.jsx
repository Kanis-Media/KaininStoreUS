import React, { Children, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function DirectionalReveal({}){
 return(
    // 1. Create a ref for the target container/element
    const ref = useRef(null);

    // 2. Use useScroll to track scroll progress of the container
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"] // Starts when target top hits viewport bottom, ends when target bottom hits viewport top
    });

    // 3. Use useTransform to map scroll progress (0 to 1) to width (0% to 100%)
    const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
        <div>
        {/* Add some initial height to enable scrolling to the element */}
        <div style={{ height: "100vh" }}>Scroll down to see the animation</div>

        {/* The main container that triggers the scroll effect */}
        <div ref={ref} style={{ height: "50vh", background: "#eee", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* The wrapper keeps the underlying content centered while the inner motion div grows */}
            <div style={{ position: 'relative', width: '80%', height: '50px', background: '#ccc' }}>
            
            {/* The motion div animates its width to reveal the content */}
            <motion.div
                style={{
                width: width, // Apply the transformed width
                height: '100%',
                background: '#007bff', // The "revealing" color/element
                position: 'absolute',
                top: 0,
                left: 0,
                overflow: 'hidden' // Hide overflow if you put content inside
                }}
            >
        
            {children} // load the children components here
            
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                Content Revealed
            </div>
            </div>
        </div>

        {/* Add more height to allow scrolling past the element */}
        <div style={{ height: "100vh" }}>End of section</div>
  );
};

export default DirectionaalReveal;
