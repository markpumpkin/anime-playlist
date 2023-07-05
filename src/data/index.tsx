import { data as dldl_p1 } from "./dldl_p1";
import { data as dldl_p2 } from "./dldl_p2";
import { data as dptk_ova3 } from "./dptk_ova3";
import { data as dptk_p4 } from "./dptk_p4";
import { data as dptk_p5 } from "./dptk_p5";
import { data as tavt } from "./tavt";

export const dataFullName = {
    dldl_p1: "Đấu La Đại Lục - Phần 1",
    dldl_p2: "Đấu La Đại Lục - Phần 2",
    dptk_ova3: "Đấu Phá Thương Khung - VOA3 - Hẹn ước 3 năm",
    dptk_p4: "Đấu Phá Thương Khung - Phần 4",
    dptk_p5: "Đấu Phá Thương Khung - Phần 5",
    tavt: "Thần Ấn Vương Toạ",
};

export type ItemData = {
    value?: string;
    label?: string;
    source?: string;
    content?: {
        overview?: string;
        exercise?: string;
    };
    timestamp?: string;
    thumbnail?: string;
};

export type DatabaseTypes = {
    dldl_p1: ItemData[];
    dldl_p2: ItemData[];
    dptk_ova3: ItemData[];
    dptk_p4: ItemData[];
    dptk_p5: ItemData[];
    tavt: ItemData[];
};

export default {
    dldl_p1,
    dldl_p2,
    dptk_ova3,
    dptk_p4,
    dptk_p5,
    tavt,
} as DatabaseTypes;
