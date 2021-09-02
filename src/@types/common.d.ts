declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.json';
declare module '*.css';
declare module '*.less';

declare module 'quill-delta';
declare module 'less-vars-to-js';

interface Window {}

/** vite 打包环境变量 */
declare const VITE_BUILD_MODE: 'dev' | 'test' | 'prod';
