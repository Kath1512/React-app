import { useState, useEffect } from 'react'
import './App.css'
export default function App() {

        useEffect(() => {
            function handleResize() {
                console.log("Window resized:", window.innerWidth);
            }

            window.addEventListener("resize", handleResize);

            // 🧹 cleanup
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }, []); // only runs once

        return <p>Resize the window and check console</p>;
}
