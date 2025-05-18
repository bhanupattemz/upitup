import React, { useState } from "react";
import "./Cube.css";

const Cube = () => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const rollLeft = () => {
        setRotation((prev) => {
            if (prev.x % 360 == 0) {
                return { ...prev, y: prev.y - 90 }
            }
            if(prev.x%180==0){
                return { ...prev, y: prev.y + 90 }
            }
            if(prev.x%270==0){
                return { ...prev, x: prev.x - 90 }
            }
            if(prev.x%90==0){
                return { ...prev, y: prev.y - 90 }
            }
        });
    };
    const rollRight = () => {
        setRotation((prev) => ({ ...prev, y: prev.y + 90 }));
    };
    const rollDown = () => {
        setRotation((prev) => ({ ...prev, x: prev.x - 90 }));
    };
    const rollUp = () => {
        setRotation((prev) => ({ ...prev, x: prev.x + 90 }));
    };
    return (
        <div className="scene">
            <div
                className="cube"
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                }}
            >
                <div className="face front">Front</div>
                <div className="face back">Back</div>
                <div className="face left">Left</div>
                <div className="face right">Right</div>
                <div className="face top">Top</div>
                <div className="face bottom">Bottom</div>
            </div>
            <div className="buttons">
                <button onClick={rollLeft}>Roll Left</button>
                <button onClick={rollRight}>Roll Right</button>
                <button onClick={rollDown}>Roll Down</button>
                <button onClick={rollUp}>Roll Up</button>
            </div>
        </div>
    );
};

export default Cube;
