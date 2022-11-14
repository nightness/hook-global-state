// useGlobalState, global state management
// Written by: Nightness
import { useCallback, useEffect, useMemo, useState } from "react";

const allState = {};
const listeners = {};

const set = (name, value) => {
  const newValue = value;
  if (typeof value === "function") {
    // Get the new state by passing current state to the set state function
    newValue = value(allState[name]);
  }
  allState[name] = newValue;
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
  const [state, setState] = useState(
    forceUpdate
      ? (allState[name] = initialValue)
      : allState[name] ?? (allState[name] = initialValue)
  );

  const setter = useCallback((value) => set(name, value), []);

  useEffect(() => {
    subscribe(name, setState);
    return () => {
      unsubscribe(name, setState);
    };
  }, []);

  return [state, setter];
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
      ? (allState[name] = initialValue)
      : allState[name] ?? (allState[name] = initialValue),
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
      ? (allState[name] = initialValue)
      : allState[name] ?? (allState[name] = initialValue),
    deps
  );
};
