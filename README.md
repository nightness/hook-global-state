### Install
---
```
npm i hook-global-state
```
or
```
yarn add hook-global-state
```
### Example
---
```
// Initial value is ignored if already set, forceUpdate defaults to false and overrides this behavior
const [state, setState] = useGlobalState('key', initialValue, forceUpdate);

// Initial value is ignored if already set, forceUpdate defaults to false and overrides this behavior
const callback = useGlobalCallback('key', initialValue, deps, forceUpdate));

// Initial value is ignored if already set, forceUpdate defaults to false and overrides this behavior
const memo = useGlobalMemo('key', initialValue, deps, forceUpdate));
```