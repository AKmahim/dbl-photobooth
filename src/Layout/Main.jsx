
import { Outlet } from 'react-router-dom';


const Main = () => {
    // Function to toggle full screen using f key
    // function toggleFullScreen() {
    //     if (!document.fullscreenElement) {
    //     document.documentElement.requestFullscreen().catch((err) => {
    //         console.error(`Error attempting to enable full-screen mode: ${err.message}`);
    //     });
    //     } else {
    //     if (document.exitFullscreen) {
    //         document.exitFullscreen();
    //     }
    //     }
    // }
    // useEffect(() => {
    //     const handleKeyPress = (event) => {
    //         // console.log(event.keyCode);
    //         if (event.key === 'F' || event.key === 'f') {
    //             toggleFullScreen();
    //         }
    //     };

    //     document.addEventListener('keydown', handleKeyPress);

    //     return () => {
    //         document.removeEventListener('keydown', handleKeyPress);
    //     };
    // }, []);

    
    return (
        <div>
            {/* <Header></Header> */}
            <Outlet></Outlet>
        </div>
    );
};

export default Main;