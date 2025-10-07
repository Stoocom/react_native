import { makeAutoObservable } from 'mobx';
import { Shift } from '../shared/types/types';

class ShiftsStore {
  currentShift: Shift | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentShift = (item: Shift) => {
    this.currentShift = item;
  }
}

export default new ShiftsStore();