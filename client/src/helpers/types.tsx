export type CategoryProps = {
    id: number;
    title: string;
    slug?: string;
    thumbnail?: string;
    description?: string;
};

export type VideoProps = {
    id: number;
    source: string;
    value: string;
    label: string;
    category: string;
    thumbnail?: string;
    content?: {
        overview?: string;
        exercise?: string;
    };
    timestamp?: string;
};
