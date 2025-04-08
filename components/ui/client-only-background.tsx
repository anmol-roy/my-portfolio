"use client";

import { useEffect, useState } from "react";
import SerpentineWaveBackground from "@/components/wave-background";

export default function ClientOnlyBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <SerpentineWaveBackground />;
} 