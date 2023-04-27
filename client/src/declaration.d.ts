declare module "*.module.scss";

declare module "*.svg" {
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}