import React, { useState, useEffect } from 'react';

const MessageLoader = () => {
    const [bubbles, setBubbles] = useState([0, 1, 2]);

    useEffect(() => {
        const interval = setInterval(() => {
            setBubbles((prevBubbles) => [...prevBubbles.slice(1), prevBubbles[0]]);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const bg = {
        red:'#f1f3f6'
    }
    return (
        <div className="flex justify-center items-center space-x-1 bg-gray-100 rounded-full " style={{width:"60px",height:"28px",margin:"auto 0"}}>
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
    );
};

export default MessageLoader;
