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
// Initial value is ignored if already set
const [state, setState] = useGlobalState('key', initialValue);
```
