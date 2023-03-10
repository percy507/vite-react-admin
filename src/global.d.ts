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

interface Window {
  __adaptorWidth: number;
}

/** vite 环境变量 */
declare const VITE_MODE: 'local' | 'dev' | 'test' | 'prod';
