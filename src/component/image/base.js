import React, {useState, useEffect, useCallback, useRef} from 'react';

const getImg = (src) => {
  return new Promise(function(resolve, reject) {
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

    const cancelRef = {current: false};
    (async () => {
      const img = await getImg(src);
      if (cancelRef.current) {
        return;
      }
      setImg(img);
    })();

    return () => {
      cancelRef.current = true;
    };
  }, [src, setImg]);
  return img;
};

const useViewIntersectOnce = (refelem, callback) => {
  const [intersected, setIntersect] = useState(false);
  useEffect(() => {
    if (intersected) {
      return;
    }
    if (!refelem.current) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIntersect(true);
          callback();
        }
      });
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

const Img = ({className, src, preview, size, light, children}) => {
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
  if (light) {
    k.push('light');
  }
  if (className) {
    k.push(className);
  }

  const j = {};
  if (img) {
    k.push('loaded');
    if (!size) {
      j.paddingBottom = getImgPercentage(img);
    }
  } else if (previewImg) {
    if (!size) {
      j.paddingBottom = getImgPercentage(previewImg);
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
