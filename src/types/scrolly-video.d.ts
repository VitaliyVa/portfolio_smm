declare module "scrolly-video/dist/ScrollyVideo.esm.jsx" {
  import React from "react";

  export interface ScrollyVideoRef {
    setVideoPercentage: (p: number, opts?: { transitionSpeed?: number; jump?: boolean }) => void;
  }

  interface ScrollyVideoProps {
    src: string;
    sticky?: boolean;
    full?: boolean;
    cover?: boolean;
    trackScroll?: boolean;
    transitionSpeed?: number;
    onReady?: () => void;
  }

  const ScrollyVideo: React.ForwardRefExoticComponent<
    ScrollyVideoProps & React.RefAttributes<ScrollyVideoRef>
  >;
  export default ScrollyVideo;
}
