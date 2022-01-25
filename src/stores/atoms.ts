
import { atom } from 'recoil';

const todoListState = atom({
  key: 'todoListState',
  default: [],
});

const filterState = atom({
  key: 'filterState',
  default: [],
});

export { todoListState, filterState };
