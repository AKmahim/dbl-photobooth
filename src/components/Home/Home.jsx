import { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import './Home.css';
import HomeImg from '../../assets/home.jpg'



const Home = () => {
        const videoRef = useRef(null);
        const navigate = useNavigate();

        // Function to toggle full screen using f key
        function toggleFullScreen() {
            if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
            } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            }
        }

        useEffect(() => {
            const handleKeyPress = (event) => {
                // console.log(event.keyCode);
                if (event.key === 'F' || event.key === 'f') {
                    toggleFullScreen();
                } 
                else if (event.key === ' ') { // Space key
                    navigate("/capture-image");
                }
            };

            document.addEventListener('keydown', handleKeyPress);

            return () => {
                document.removeEventListener('keydown', handleKeyPress);
            };
        }, []);
        

    return (
        <div className="flex justify-center items-center">
            <img className='w-full h-screen' src={HomeImg} />
        </div>
    );
};

export default Home;