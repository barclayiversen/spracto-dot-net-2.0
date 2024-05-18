import React from "react";
import Divider from "./Divider";

const Releases: React.FC = () => {
  return (
    <div className="text-center p-4">
      {/* Wrapper for centered content */}
      <div className="max-w-3xl mx-auto">
        {/* SoundCloud Iframe */}
        <div className="mb-8">
          <iframe
            width="100%"
            height="800"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1732888257&color=%235bff00&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
            className="mx-auto sm:h-600 md:h-900"
          ></iframe>
          <div
            style={{
              fontSize: "10px",
              color: "#cccccc",
              lineBreak: "anywhere",
              wordBreak: "normal",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              fontFamily:
                "Interstate, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Garuda, Verdana, Tahoma, sans-serif",
              fontWeight: 100,
            }}
          >
            <a
              href="https://soundcloud.com/spracto"
              title="Spracto"
              target="_blank"
              style={{ color: "#cccccc", textDecoration: "none" }}
            >
              Spracto
            </a>{" "}
            ·{" "}
            <a
              href="https://soundcloud.com/spracto/boom"
              title="Boom"
              target="_blank"
              style={{ color: "#cccccc", textDecoration: "none" }}
            >
              Boom
            </a>
          </div>
        </div>

        {/* Divider */}
        <Divider />

        {/* Album Art for Next Release */}
        <div className="mt-8">
          <img
            src="https://storage.googleapis.com/spracto-net-images/UpcomingRelease/top%20back.png"
            alt="Album Art for Next Release"
            className="mx-auto rounded-lg p-4 sm:p-8"
          />
        </div>
      </div>
    </div>
  );
};

export default Releases;
