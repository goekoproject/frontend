import { Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionStorageService } from '../config/services/session-storage.service';

export const preserveDataSession = (
  observer: BehaviorSubject<any>,
  localKey: string
) => {
  if (!observer.value) {
    const sessionData = getItem(localKey) as string;
    observer.next(sessionData);
  }
};

const getItem = (name: string) => {
  const stringifiedObj = sessionStorage.getItem(name);

  if (stringifiedObj && stringifiedObj !== 'undefined') {
    const decode = window.atob(stringifiedObj);
    return JSON.parse(decode);
  }

  return null;
};
