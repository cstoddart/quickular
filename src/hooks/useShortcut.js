import { useEffect } from 'react';

export const useShortcut = ({ eventType, triggerKey, eventHandler }) => {
  useEffect(() => {
    const handleEvent = (event) => event.code === triggerKey && eventHandler();
    document.addEventListener(eventType, handleEvent);
    return () => document.removeEventListener(eventType, handleEvent);
  });
};
