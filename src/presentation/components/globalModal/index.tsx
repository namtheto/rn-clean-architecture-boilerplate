import React, {RefObject} from 'react';
import {ModalContent} from './GlobalModalView';
import {GlobalModalProps} from './type';

let refs: RefObject<ModalContent>[] = [];

function addNewRef(newRef: ModalContent) {
  refs.push({
    current: newRef,
  });
}

function removeOldRef(oldRef?: ModalContent) {
  refs = refs.filter(r => r.current !== oldRef);
}

export function GlobalModalPopup(props: GlobalModalProps) {
  const popupRef = React.useRef<ModalContent>();

  const setRef = React.useCallback((ref: ModalContent) => {
    if (ref) {
      popupRef.current = ref;
      addNewRef(ref);
    } else {
      removeOldRef(popupRef?.current);
    }
  }, []);

  return <ModalContent ref={setRef} {...props} />;
}

function getRef() {
  const reversePriority = [...refs].reverse();
  const activeRef = reversePriority.find(ref => ref?.current !== null);
  if (!activeRef) {
    return null;
  }

  return activeRef.current;
}

GlobalModalPopup.show = (props?: GlobalModalProps) => {
  getRef()?.show(props);
};

GlobalModalPopup.close = () => {
  getRef()?.hide();
};
