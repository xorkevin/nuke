import {useState, useEffect, useCallback, useRef} from 'react';

const getImg = (src) => {
  return new Promise((resolve, _reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.src = src;
  });
};

const useImg = (src) => {
  const [img, setImg] = useState(undefined);
  useEffect(() => {
    if (!src) {
      return;
    }

    const controller = new AbortController();
    (async () => {
      const img = await getImg(src);
      if (controller.signal.aborted) {
        return;
      }
      setImg(img);
    })();

    return () => {
      controller.abort();
    };
  }, [src, setImg]);
  return img;
};

const useViewIntersectOnce = (refelem, callback) => {
  const [intersected, setIntersect] = useState(false);
  useEffect(() => {
    if (!refelem.current) {
      return;
    }
    if (intersected) {
      callback();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((i) => i.isIntersecting)) {
        setIntersect(true);
      }
    });
    observer.observe(refelem.current);

    return () => {
      observer.disconnect();
    };
  }, [intersected, setIntersect, refelem, callback]);
  return intersected;
};

const ImgSizeSet = new Set(['full', 'fill']);

const getImgPercentage = (img) => {
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  if (w == 0) {
    return '';
  }
  return (h / w).toFixed(4) * 100 + '%';
};

const Img = ({className, src, preview, ratio, size, children}) => {
  const [imgsrc, setImgsrc] = useState(null);
  const imgref = useRef(null);
  const intersectCb = useCallback(async () => {
    setImgsrc(src);
  }, [src, setImgsrc]);
  useViewIntersectOnce(imgref, intersectCb);
  const previewImg = useImg(preview);
  const img = useImg(imgsrc);

  const k = ['img'];
  if (ImgSizeSet.has(size)) {
    k.push('sized');
    k.push(size);
  }
  if (className) {
    k.push(className);
  }

  if (img) {
    k.push('loaded');
  }

  const j = {};
  if (!size) {
    if (img) {
      j.paddingBottom = getImgPercentage(img);
    } else if (previewImg) {
      j.paddingBottom = getImgPercentage(previewImg);
    } else if (ratio) {
      j.paddingBottom = ratio.toFixed(4) * 100 + '%';
    } else {
      // guess a placeholder space
      j.paddingBottom = '50%';
    }
  }

  return (
    <div className={k.join(' ')} ref={imgref}>
      <div className="inner" style={j}>
        {children && <div className="children">{children}</div>}
        <img className="image" src={imgsrc} />
        {preview && <img className="image preview" src={preview} />}
      </div>
    </div>
  );
};

export default Img;
