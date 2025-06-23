

import React from "react";

import "./styles.css";

export default function RotateImage() {
  return (
    <div className="">

    <div className="banner">
      <div
        className="slider"
        style={{ "--quatity": 10 } as React.CSSProperties}
      >
        <div className="item" style={{ "--position": 1 } as React.CSSProperties}>
          <img
            src="/images/obac_info_1.jpg"

            alt="test"
          />
        </div>

        <div className="item" style={{ "--position": 2 } as React.CSSProperties}>
          <img
            src="/images/obac_info_2.jpg"

            alt="test"
          />
        </div>

        <div className="item" style={{ "--position": 3 } as React.CSSProperties}>
          <img
            src="/images/obac_info_3.jpg"

            alt="test"
          />
        </div>

        <div className="item" style={{ "--position": 4 } as React.CSSProperties}>
          <img
            src="/images/obac_poster_1.jpg"
            alt="test"
          />
        </div>
        <div className="item" style={{ "--position": 5 } as React.CSSProperties}>
          <img
            src="/images/obac_poster_2.jpg"
            alt="test"
          />
        </div>
        <div className="item" style={{ "--position": 6 } as React.CSSProperties}>
          <img
            src="/images/obac_poster_3.jpg"
            alt="test"
          />
        </div>
        <div className="item" style={{ "--position": 7 } as React.CSSProperties}>
          <img
            src="/images/event.jpg"
            alt="test"
          />
        </div>
        <div className="item" style={{ "--position": 8 } as React.CSSProperties}>
          <img
            src="/images/event.jpg"
            alt="test"
          />
        </div>

        <div className="item" style={{ "--position": 9 } as React.CSSProperties}>
          <img
            src="/images/event.jpg"
            alt="test"
          />
        </div>
        <div className="item" style={{ "--position": 10 } as React.CSSProperties}>
          <img
            src="/images/event.jpg"
            alt="test"
          />
        </div>
      </div>
      <div className="content">
        
      </div>
    </div>
    </div>
  );
}
