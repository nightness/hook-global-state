// useGlobalState, global state management
// Written by: Nightness
const React = require('react');

const globalObjects = {};
const listeners = {};

const set = (name, value) => {
  if (typeof value === 'function') {
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
export const useGlobalState = (name, initialValue) => {
  const [singletonObject, setSingletonObject] = React.useState(
    globalObjects[name] ?? (globalObjects[name] = initialValue)
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
