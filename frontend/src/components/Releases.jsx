import React from "react";

const Releases = ({ tracks }) => {
  return (
    <>
      <div className="container bg-black mx-auto px-5 pb-5">
        <div className="p-2">
          <p className="font-bold text-white text-4xl">Stream my releases</p>
        </div>
        <div
          id="releases"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20"
        >
          {tracks.map((track) => (
            <div key={track.id} className="w-full py-5 px-1">
              <iframe
                width="100%"
                height="300"
                scrolling="no"
                frameborder="no"
                allow="autoplay"
                src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${track.id}&color=%235bff00&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`}
              ></iframe>
              <a href={`${track.dlUrl}`}>
                <button className="w-full bg-white text-black py-2 mt-4 font-mono hover:bg-gray-200 rounded-3xl">
                  {track.platform === "soundcloud"
                    ? "Download"
                    : track.platform === "spotify"
                    ? "Stream on Spotify"
                    : "Download"}
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
      ;
    </>
  );
};

export default Releases;
