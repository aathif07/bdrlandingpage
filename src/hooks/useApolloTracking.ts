import { useEffect } from 'react';

declare global {
  interface Window {
    trackingFunctions?: {
      onLoad: (config: { appId: string }) => void;
    };
  }
}

export const useApolloTracking = () => {
  useEffect(() => {
    const initApollo = () => {
      // Check if already loaded
      if (window.trackingFunctions) {
        return;
      }

      const randomString = Math.random().toString(36).substring(7);
      const script = document.createElement('script');
      
      script.src = `https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=${randomString}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.trackingFunctions) {
          window.trackingFunctions.onLoad({
            appId: "679d0d93ef079101b2b5f714"
          });
        }
      };
      
      document.head.appendChild(script);
    };

    initApollo();
  }, []);
};