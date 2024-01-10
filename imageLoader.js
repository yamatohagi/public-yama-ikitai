const normalizeSrc = (src) => {
  return src.startsWith('/') ? src.slice(1) : src;
};

export default function cloudflareLoader({src, width, quality}) {
  const params = [`width=${width}`, `quality=${quality || 75}`, 'format=auto'];
  return `https://sta-media.yama-ikitai.com/cdn-cgi/image/${params.join(',')}/${src}`;
}
