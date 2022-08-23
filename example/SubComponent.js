import { useGlobalCallback } from "hook-global-state";
import React from "react";
import { Button } from "react-native";

const SubComponent = () => {
  const callback = useGlobalCallback("callback");

  return (
    <Button
      title="ABC"
      onPress={() => {
        callback();
      }}
    />
  );
};

export default SubComponent;
