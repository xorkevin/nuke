import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from 'react';
import ReactDOM from 'react-dom';

const positionSet = new Set(['start', 'center', 'end']);

const useStateRef = (val = null) => {
  const [ref, setRef] = useState(val);
  const cbRef = useCallback(
    (node) => {
      setRef(node);
    },
    [setRef],
  );
  return [ref, cbRef];
};

const ModalDefaultOpts = Object.freeze({
  root: document.body,
});

const ModalCtx = createContext(ModalDefaultOpts);

const ModalMiddleware = (value) => {
  const v = Object.assign({}, ModalDefaultOpts, value);
  return {
    ctxProvider: ({children}) => (
      <ModalCtx.Provider value={v}>{children}</ModalCtx.Provider>
    ),
  };
};

const useModal = () => {
  const [anchor, anchorRef] = useStateRef(null);
  const [show, setShow] = useState(false);
  const close = useCallback(() => {
    setShow(false);
  }, [setShow]);
  const toggle = useCallback(() => {
    setShow((v) => !v);
  }, [setShow]);
  return {
    anchor,
    anchorRef,
    show,
    setShow,
    close,
    toggle,
  };
};

const Modal = ({
  className,
  alignx,
  aligny,
  close,
  anchor,
  onClick,
  children,
}) => {
  const ctx = useContext(ModalCtx);
  const [modal, modalRef] = useStateRef(null);

  const clickInModal = useRef(false);

  const clickHandler = useCallback(
    (e) => {
      if (clickInModal.current) {
        clickInModal.current = false;
        return;
      }
      if (anchor && anchor.contains(e.target)) {
        return;
      }
      if (modal && modal.contains(e.target)) {
        return;
      }
      if (close) {
        close();
      }
    },
    [clickInModal, anchor, modal, close],
  );

  useEffect(() => {
    window.addEventListener('click', clickHandler);
    return () => {
      window.removeEventListener('click', clickHandler);
    };
  }, [clickHandler]);

  const onClickCapture = useCallback(() => {
    clickInModal.current = true;
  }, [clickInModal]);

  const k = ['modal'];
  if (positionSet.has(alignx)) {
    k.push(`horizontal-${alignx}`);
  } else {
    k.push('horizontal-center');
  }
  if (positionSet.has(aligny)) {
    k.push(`vertical-${aligny}`);
  } else {
    k.push('vertical-center');
  }
  if (className) {
    k.push(className);
  }
  return ReactDOM.createPortal(
    <div
      ref={modalRef}
      className={k.join(' ')}
      onClick={onClick}
      onClickCapture={onClickCapture}
    >
      {children}
    </div>,
    ctx.root,
  );
};

const modalSizeSet = new Set(['sm', 'md', 'lg']);

const ModalSurface = ({
  className,
  size,
  alignx,
  aligny,
  close,
  anchor,
  onClick,
  children,
}) => {
  const k = ['modal-surface'];
  if (modalSizeSet.has(size)) {
    k.push(size);
  }
  if (className) {
    k.push(className);
  }
  return (
    <Modal
      className={k.join(' ')}
      alignx={alignx}
      aligny={aligny}
      close={close}
      anchor={anchor}
      onClick={onClick}
    >
      {children}
    </Modal>
  );
};

export {
  Modal as default,
  ModalDefaultOpts,
  ModalCtx,
  ModalMiddleware,
  Modal,
  ModalSurface,
  useModal,
};
