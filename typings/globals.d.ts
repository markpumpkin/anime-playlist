declare module '*.st.css' {
    export * from '@stylable/runtime/stylesheet';

    const defaultExport: unknown;
    export default defaultExport;
}

declare module '*.png' {
    const urlToFile: string;
    export default urlToFile;
}

declare module '*.jpg' {
    const urlToFile: string;
    export default urlToFile;
}

declare module '*.jpeg' {
    const urlToFile: string;
    export default urlToFile;
}

declare module '*.gif' {
    const urlToFile: string;
    export default urlToFile;
}

declare module '*.svg' {
    // https://duncanleung.com/typescript-module-declearation-svg-img-assets/
    const urlToFile: string;
    export default urlToFile;
    export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
}
