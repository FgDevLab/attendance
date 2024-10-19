import { Button } from 'antd';
import React, { useEffect, useRef } from 'react';

export default function Camera({ onCapture, captureLabel }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = streamRef.current;
                }
            } catch (error) {
                console.error("Error accessing the camera:", error);
            }
        };

        startCamera();

        return () => {
            if (streamRef.current) {
                const tracks = streamRef.current.getTracks();
                tracks.forEach((track) => {
                    track.stop();
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = null;
                }
            }
        };
    }, []);

    const capture = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (video && canvas) {
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            const dataUrl = canvas.toDataURL('image/png');

            fetch(dataUrl)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], 'clockin.png', { type: 'image/png' });
                    onCapture(file);
                });
        }
    };

    return (
        <div className="flex flex-col items-center">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg"
            />
            <canvas ref={canvasRef} className="hidden" width={640} height={480} />
            <Button onClick={capture} type="primary" size='large' className='w-full mt-3'>{captureLabel}</Button>
        </div>
    );
}
