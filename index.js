// useGlobalState, global state management

import { useCallback, useMemo, useState } from "react";

// Written by: Nightness
const React = require("react");

const globalObjects = {};
const listeners = {};

const set = (name, value) => {
  if (typeof value === "function") {
    // eslint-disable-next-line no-param-reassign
    value = value(globalObjects[name]);
  }
  globalObjects[name] = value;
  listeners[name].forEach((listener) => {
    listener.callback(value);
  });
};

const subscribe = (name, listener) => {
  if (!listeners[name]) listeners[name] = [];
  listeners[name].push({
    key: name,
    callback: listener,
  });
};

const unsubscribe = (name, listener) => {
  listeners[name] = listeners[name].filter(
    (l) => l.key !== name && l.callback !== listener
  );
};

// The second argument is ignored after the singleton is set, to change the singleton use it's setter
export const useGlobalState = (name, initialValue, forceUpdate) => {
  const [singletonObject, setSingletonObject] = useState(
    forceUpdate
      ? (globalObjects[name] = initialValue)
      : globalObjects[name] ?? (globalObjects[name] = initialValue)
  );

  const setter = (value) => set(name, value);

  React.useEffect(() => {
    subscribe(name, setSingletonObject);
    return () => {
      unsubscribe(name, setSingletonObject);
    };
  }, []);

  return [singletonObject, setter];
};

export const useGlobalMemo = (
  name,
  initialValue,
  deps,
  forceUpdate = false
) => {
  // console.log("useGlobalMemo", name, initialValue, deps, forceUpdate);
  return useMemo(
    forceUpdate
      ? (globalObjects[name] = initialValue)
      : globalObjects[name] ?? (globalObjects[name] = initialValue),
    deps
  );
};

export const useGlobalCallback = (
  name,
  initialValue,
  deps,
  forceUpdate = false
) => {
  // console.log("useGlobalCallback", name, initialValue, deps, forceUpdate);
  return useCallback(
    forceUpdate
      ? (globalObjects[name] = initialValue)
      : globalObjects[name] ?? (globalObjects[name] = initialValue),
    deps
  );
};
