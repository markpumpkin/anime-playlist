declare interface InitDataType {
    sidebarOpen?: boolean;
    currentPageActived?: string;
}

declare interface ContentSpaceDataType {
    baseAPI?: string;
    user?: {
        email?: string;
        id?: string;
        permission?: number;
        username?: string;
        iat?: number;
        exp?: number;
    };
}

declare interface DataTypes {
    mainStore: InitDataType;
    contentStore: ContentSpaceDataType;
}
