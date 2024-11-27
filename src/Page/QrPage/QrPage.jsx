import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useState } from "react";

import qrbg from '../../assets/qr.jpg'

const QrPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { photoUrl } = location.state || {}; // Get photoUrl from state

    useEffect(() => {
        const handleKeyPress = (event) => {
          console.log(event.key);
          if (event.key === "X" || event.key === "x") {
            navigate("/");
          }
        };
    
        document.addEventListener("keydown", handleKeyPress);
    
        return () => {
          document.removeEventListener("keydown", handleKeyPress);
        };
      }, []);

    return (
        <div className='flex items-center justify-center h-screen relative'>
            <div className='relative'>
                <img className='w-screen h-screen' src={qrbg} />
            </div>
            <div className='absolute top-[250px] left-[40%]'>
                {photoUrl ? (
                    <QRCodeCanvas
                        value={photoUrl} // URL for the QR code
                        size={250}       // Set size to 500x500
                        includeMargin={true}
                    />
                ) : (
                    <p>No photo URL available</p>
                )}
            </div>
        </div>
    );
};

export default QrPage;
