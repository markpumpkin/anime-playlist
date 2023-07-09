import { data as dldl_p1 } from "./dldl_p1";
import { data as dldl_p2 } from "./dldl_p2";
import { data as dptk_ova1 } from "./dptk_ova1";
import { data as dptk_ova2 } from "./dptk_ova2";
import { data as dptk_ova3 } from "./dptk_ova3";
import { data as dptk_ova4 } from "./dptk_ova4";
import { data as dptk_p4 } from "./dptk_p4";
import { data as dptk_p5 } from "./dptk_p5";
import { data as tavt } from "./tavt";
import { data as tt_p1 } from "./tt_p1";
import { data as dct_p1 } from "./dct_p1";

export const dataFullName = {
    dldl_p1: "Đấu La Đại Lục - Phần 1",
    dldl_p2: "Đấu La Đại Lục - Phần 2",
    dptk_ova1: "Đấu Phá Thương Khung - VOA1 - Bản đặc biệt",
    dptk_ova2: "Đấu Phá Thương Khung - VOA2 - Sa Chi Lan Ca",
    dptk_ova3: "Đấu Phá Thương Khung - VOA3 - Hẹn ước 3 năm",
    dptk_ova4: "Đấu Phá Thương Khung - VOA4 - Duyên Khởi",
    dptk_p4: "Đấu Phá Thương Khung - Phần 4",
    dptk_p5: "Đấu Phá Thương Khung - Phần 5",
    tavt: "Thần Ấn Vương Toạ",
    tt_p1: "Tru Tiên - Phần 1",
    dct_p1: "Đại Chúa Tể - Phần 1",
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
    dptk_ova1: ItemData[];
    dptk_ova2: ItemData[];
    dptk_ova3: ItemData[];
    dptk_ova4: ItemData[];
    dptk_p4: ItemData[];
    dptk_p5: ItemData[];
    tavt: ItemData[];
    tt_p1: ItemData[];
    dct_p1: ItemData[];
};

export default {
    dldl_p1,
    dldl_p2,
    dptk_ova1,
    dptk_ova2,
    dptk_ova3,
    dptk_ova4,
    dptk_p4,
    dptk_p5,
    tavt,
    tt_p1,
    dct_p1,
} as DatabaseTypes;
