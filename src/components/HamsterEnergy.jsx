import React, { useState, useEffect } from "react";
import { useLocalStorageState } from "./useLocalStorageState";

const HamsterEnergy = () => {
  const maxEnergy = 1000;
  const [energy, setEnergy] = useLocalStorageState("energy", 1000);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isRestoring, setIsRestoring] = useState(true);
  

  useEffect(() => {
    let interval;
    if (isRestoring && energy < maxEnergy) {
      interval = setInterval(() => {
        setEnergy(prevEnergy => Math.min(prevEnergy + (1), maxEnergy));
      }, 1000);
      setIsEnabled(true)
    } else if (!isRestoring) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRestoring, energy, maxEnergy]);

  const toggleEnabled = () => {
    setIsEnabled(!isEnabled);
  };

  const startRestoringEnergy = () => {
    setIsRestoring(true);
  };

  const stopRestoringEnergy = () => {
    setIsRestoring(false);
  };

  const handleEnergyChange = () => {
    if (energy > 0) {
      setEnergy(energy - 1);
    } else {
      setIsEnabled(!isEnabled);
    }
  };
  return {
    energy,
    isEnabled,
    startRestoringEnergy,
    stopRestoringEnergy,
    handleEnergyChange,
    toggleEnabled,
    setEnergy
  };

}

export default HamsterEnergy;