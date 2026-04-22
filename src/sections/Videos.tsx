"use client";

import VideoPlayer from "../components/VideoPlayer";

export default function Videos() {
    return (
        <section id="videos" className="w-full bg-gray-50 py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <VideoPlayer src="/answerst.mp4" title="Video Institucional" />
            </div>
        </section>
    );
}
