import { useEffect, useRef, useState } from "react";
import background from "../../assets/qr.jpg";
// import frame from "../../assets/frame.png"; // 1024*1024
// import frame from "../../assets/frame2.png"; // 1280*720 
// import frame from "../../assets/frame3.png"; // 1280*720 reposition frame
// import frame from "../../assets/frame4.png"; // 640*480 reposition frame
import frame from "../../assets/frame6.png"; // 640*480 reposition logo
import { useNavigate } from "react-router-dom";

const CaptureImage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera: ", error);
      }
    };

    startCamera();

    // Cleanup to stop the camera when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      captureImage();
    }
  }, [countdown]);

  // const captureImage = () => {
  //   if (canvasRef.current && videoRef.current) {
  //     const canvas = canvasRef.current;
  //     const context = canvas.getContext("2d");
  
  //     // // Set canvas size to match video
  //     canvas.width = videoRef.current.videoWidth; //1280
  //     canvas.height = videoRef.current.videoHeight; //720

  //     // Set canvas size to match video
  //     // canvas.width = 640;
  //     // canvas.height = 480;
  
  //     console.log(videoRef.current.videoHeight);
  //     console.log('canvas=>', canvas.width, canvas.height);
  
  //     // Draw the video frame with mirror effect
  //     // context.translate(canvas.width, 0);
  //     // context.scale(-1, 1);
  //     context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  
  //     // Draw the overlay without mirror effect
  //     const img = new Image();
  //     img.src = frame;
  //     img.onload = () => {
  //       context.drawImage(img, 0, 0, canvas.width, canvas.height);
  //       const dataURL = canvas.toDataURL("image/png");
  //       console.log("Captured Image Data URL:", dataURL);
  //       navigate("/preview", { state: { imageData: dataURL } });
  //     };
  //   }
  // };

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
  
      // Set canvas size to the cropped dimensions
      canvas.width = 640;
      canvas.height = 480;
  
      // Calculate cropping area (center crop)
      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;
  
      const cropWidth = 640;
      const cropHeight = 480;
  
      const cropX = (videoWidth - cropWidth) / 2;
      const cropY = (videoHeight - cropHeight) / 2;
  
      console.log(`Cropping from center: x=${cropX}, y=${cropY}, width=${cropWidth}, height=${cropHeight}`);
  
      // Apply mirror effect by flipping the context horizontally
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
  
      // Draw the cropped video frame with the mirror effect
      context.drawImage(
        videoRef.current, // Source
        cropX, // Source X
        cropY, // Source Y
        cropWidth, // Source Width
        cropHeight, // Source Height
        0, // Destination X
        0, // Destination Y
        canvas.width, // Destination Width
        canvas.height // Destination Height
      );
  
      // Reset the transform to prevent overlay image from flipping
      context.setTransform(1, 0, 0, 1, 0, 0);
  
      // Draw the overlay
      const img = new Image();
      img.src = frame;
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL("image/png");
        console.log("Captured Image Data URL:", dataURL);
        navigate("/preview", { state: { imageData: dataURL } });
      };
    }
  };
  
  

  return (
    <div
      className="flex items-center justify-center h-screen relative"
      style={{
        backgroundColor: "#4677ba",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        id="cameraPreview"
        className="relative w-[640px] h-[480px] border-red-100 border-2"
      >
        {/* Webcam View */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover transform -scale-x-100"
          autoPlay
          muted
        />
        {/* Overlay Frame */}
        <img
          src={frame}
          alt="Overlay Frame"
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
      </div>
      <div className="absolute right-[200px] top-[45%]">
        <h1 className="text-[60px]" id="CountDown">
          {countdown > 0 ? countdown : ""}
        </h1>
      </div>
      {/* Hidden Canvas for Capturing Image */}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
};

export default CaptureImage;
