import { Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionStorageService } from '../config/services/session-storage.service';

const preserveData = (observer: BehaviorSubject<any>, localKey: string) => {
  if (!observer.value) {
    const sessionuserType = sessionStorage.getItem(localKey) as string;
    observer.next(sessionuserType);
  }
};
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
