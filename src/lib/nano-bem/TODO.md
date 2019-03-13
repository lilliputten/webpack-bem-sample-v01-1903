# TODO

- events: `{Block|Elem}.emit()`, `{Block|Elem}.{events|domEvents}().{on|off|once}()`
- change mod classes on mod changes (modCache)
- convertModHandlersToMethods
- emit mod change events
- override mod methods
- `declMod` (?)
- `setMod`
- `delMod`
- `declElem` -- ???
- `findChildBlock`
- `findChildBlocks`
- `findParentBlock`
- `find*`
- collection (?)

### Later:

- findChildElem
- findChildElems

## Params (see `i-bem__internal.vanilla.js`):

```js
  BEM_CLASS_NAME = 'i-bem',
  BEM_SELECTOR = '.' + BEM_CLASS_NAME,
  BEM_PARAMS_ATTR = 'data-bem',

  NAME_PATTERN = bemInternal.NAME_PATTERN,

  MOD_DELIM = bemInternal.MOD_DELIM,
  ELEM_DELIM = bemInternal.ELEM_DELIM,

  buildModPostfix = bemInternal.buildModPostfix,
  buildClassName = bemInternal.buildClassName,
```

