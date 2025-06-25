import * as React from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";

// Styles
import "video.js/dist/video-js.css";

export interface VideoPlayerProps {
    autoplay: string | boolean;
    url: string;
    videoType: string;
    options?: Player["options"];
}


export const VideoPlayer: React.FC<VideoPlayerProps> = ({
    autoplay, 
    url, 
    videoType,
    options,
    ...props
}) => {
    const videoRef = React.useRef<HTMLDivElement>(null);
    const playerRef = React.useRef<Player | null>(null);

    React.useEffect(() => {

        // Make sure Video.js player is only initialized once
        if (!playerRef.current && videoRef.current) {
            const videoElement = document.createElement("video-js");

            videoElement.classList.add("vjs-big-play-centered");
            videoRef.current.appendChild(videoElement);

            playerRef.current = videojs(videoElement, {
                sources: [{
                    src: url,
                    type: videoType
                }],
                autoplay: autoplay,
                controls: true,
                fluid: true,
                "vtt.js": ''
            });
        } 
    }, [autoplay, url, videoType]);

    // Dispose the Video.js player when the functional component unmounts
    React.useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <div data-vjs-player {...props}>
            <div ref={videoRef} />
        </div>
    );
};

export default VideoPlayer;
