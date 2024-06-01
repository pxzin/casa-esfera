import createCache from "@emotion/cache";

const isBrowser = typeof document !== "undefined";

// On the client side, create a cache that is scoped to a single document, in this case, the current document.
const createEmotionCache = () => {
  let insertionPoint;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]'
    );
    insertionPoint = emotionInsertionPoint ? [emotionInsertionPoint] : [];
  }

  return createCache({ key: "mui-style", insertionPoint });
};

export default createEmotionCache;
