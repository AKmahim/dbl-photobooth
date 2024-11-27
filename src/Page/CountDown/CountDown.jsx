import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import image1 from "../../assets/1.jpg";
import image2 from "../../assets/2.jpg";
import image3 from "../../assets/3.jpg";
import image4 from "../../assets/4.jpg";
import image5 from "../../assets/5.jpg";

const CountDown = () => {
    const [count, setCount] = useState(5);
    const [imageIndex, setImageIndex] = useState(0);
    const [loading, setLoading] = useState(false); // Loading state for API response
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const count_image_list = [image1, image2, image3, image4, image5];

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prevCount) => prevCount - 1);
            setImageIndex((prevIndex) => (prevIndex + 1) % count_image_list.length);
        }, 1000);

        if (count === 0) {
            clearInterval(timer);
            startCamera(); // Start the camera after countdown finishes
        }

        return () => clearInterval(timer);
    }, [count]);

    // Start camera and schedule automatic image capture after 3 seconds
    const startCamera = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                    // Schedule the image capture after 3 seconds
                    // setTimeout(captureImage, 5000);
                })
                .catch((err) => {
                    console.error("Error accessing camera: ", err);
                });
        }
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const video = videoRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext("2d");

            // Flip the video horizontally for mirror effect
            context.translate(canvas.width, 0);
            context.scale(-1, 1);
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Convert the image to a data URL
            const dataURL = canvas.toDataURL("image/png");
            console.log("Captured Image Data URL:", dataURL);

            // Convert data URL to File
            const file = dataURLToFile(dataURL, "captured_image.png");

            // Send file to API
            uploadFile(file);

            // Stop the video stream after capturing
            const stream = video.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
        }
    };

    // Function to convert Data URL to File
    const dataURLToFile = (dataURL, filename) => {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    // Function to upload file to API
    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        setLoading(true); // Show loading spinner

        try {
            const response = await fetch("http://127.0.0.1:5000/process_image", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Image uploaded successfully:", result);
                
                setLoading(false); // Hide loading spinner

                // Redirect to /preview with the result data
                navigate("/preview", { state: { imageData: result } });
            } else {
                console.error("Error uploading image:", response.statusText);
                setLoading(false); // Hide loading spinner on error
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            setLoading(false); // Hide loading spinner on error
        }
    };

    return (
        <section
            className="flex items-center justify-center h-screen relative"
            style={{ backgroundColor: '#4677ba' }}>

            {count > 0 ? (
                <>
                    <img
                        className="w-full h-screen"
                        src={count_image_list[imageIndex]}
                        alt="Countdown"
                    />
                </>
            ) : (
                <video
                    ref={videoRef}
                    autoPlay
                    className="w-full h-full object-cover transform -scale-x-100" // Flip video horizontally
                    style={{ backgroundColor: '#4677ba' }}
                />
            )}
            <canvas ref={canvasRef} style={{ display: "none" }} />

            {/* Loading spinner overlay */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-[#4677ba]">
                    <div className='flex flex-col items-center'>
                        <span className="loading loading-ball w-16"></span>
                        <span className="loading loading-ball w-24"></span>
                        <span className="loading loading-ball w-28"></span>
                    </div>
                </div>
            )}
        </section>

    );
};

export default CountDown;
