declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';

declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string
  export default url
}

declare global {
  interface Window {
    // add your attr: type
  }
}

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;
