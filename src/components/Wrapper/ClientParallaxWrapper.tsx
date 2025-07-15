"use client";

import { ParallaxProvider } from "react-scroll-parallax";

export default function ClientParallaxWrapper({ children }: { children: React.ReactNode }) {
  return <ParallaxProvider>{children}</ParallaxProvider>;
}
