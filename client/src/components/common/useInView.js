// src/components/common/useInView.js — Intersection Observer hook
import { useEffect, useRef, useState } from "react";

/**
 * Custom hook that returns [ref, inView]
 * inView becomes true when element enters viewport
 */
const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
};

export default useInView;
