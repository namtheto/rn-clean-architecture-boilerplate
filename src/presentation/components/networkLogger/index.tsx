import React, {RefObject} from 'react';
import ReactNativeModal from 'react-native-modal';
import NetworkLogger from 'react-native-network-logger';
import {BaseHeader} from '../baseHeader';
import {useNetworkLoggerStyle} from './styles';
import {BaseView} from '../baseView';
import EdgeInsets from '../../../app/types/EdgeInsets';

export interface NetworkInspectorProps {}
interface NetworkInspectorRef {
  show: () => void;
  hide: () => void;
}

const NetworkInspectorComponent = React.forwardRef<
  NetworkInspectorRef,
  NetworkInspectorProps
>((props, ref) => {
  const {} = props;
  const {styles} = useNetworkLoggerStyle();

  const [visible, setVisible] = React.useState(false);

  const show = React.useCallback(() => {
    setVisible(true);
  }, []);

  const hide = React.useCallback(() => {
    setVisible(false);
  }, []);

  React.useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  return (
    <ReactNativeModal
      isVisible={visible}
      onBackdropPress={hide}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      useNativeDriver
      useNativeDriverForBackdrop
      style={styles.container}>
      <BaseView style={styles.primaryBox}>
        <BaseView padding={EdgeInsets.symmetric({horizontal: 12})}>
          <BaseHeader onPressBack={hide} />
        </BaseView>
        <NetworkLogger />
      </BaseView>
    </ReactNativeModal>
  );
});

declare type NetworkInspector = NetworkInspectorRef;

let refs: RefObject<NetworkInspector>[] = [];

const addNewRef = (newRef: NetworkInspector) => {
  refs.push({
    current: newRef,
  });
};

const removeOldRef = (oldRef?: NetworkInspector) => {
  refs = refs.filter(r => r.current !== oldRef);
};

const getRef = () => {
  const reversePriority = [...refs].reverse();
  const activeRef = reversePriority.find(ref => ref?.current !== null);
  if (!activeRef) {
    return null;
  }

  return activeRef.current;
};

export default function NetworkInspector(props: NetworkInspectorProps) {
  const ref = React.useRef<NetworkInspector>();

  const setRef = React.useCallback((newRef: NetworkInspector) => {
    if (newRef) {
      ref.current = newRef;
      addNewRef(newRef);
    } else {
      removeOldRef(ref?.current);
    }
  }, []);

  return <NetworkInspectorComponent {...props} ref={setRef} />;
}

NetworkInspector.displayName = 'NetworkInspector';
NetworkInspector.show = () => {
  getRef()?.show();
};
NetworkInspector.hide = () => {
  getRef()?.hide();
};
