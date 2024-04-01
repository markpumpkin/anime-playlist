import _ from "lodash";
// import { dataFullName } from "../../data";
// import { TabActivedName } from "../../App";
import "./Tabs.css";

export type TabProps = {
    tabActived?: string;
    tablist?: string[];
    children?: React.ReactNode;
    onChange?: (tabName: any) => void;
};

function Tabs(props: TabProps) {
    const { tablist, tabActived, children, onChange } = props;

    return (
        <div className="tab-container">
            <div className="tabHead">
                <a className="btn-home" href="/">
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="24"
                        height="24"
                    >
                        <path d="M6.99980918,10.9770511 L6.997,18 L9.997,18 L9.997,13 L14.997,13 L14.997,18 L17.997,18 L17.997,12 L18,10.9768841 L12.5,6.16438411 L6.99980918,10.9770511 Z M19,18 C19,18.5522847 18.5522847,19 18,19 L7,19 C6.44771525,19 6,18.5522847 6,18 L6,17.6566502 C5.99800797,17.622839 5.997,17.5886132 5.997,17.554 L5.997,11.8545091 L4.8292523,12.8762883 C4.62143399,13.0581294 4.30555268,13.0370706 4.12371165,12.8292523 C3.94187063,12.621434 3.96292938,12.3055527 4.1707477,12.1237117 L12.4999931,4.83561589 L20.8292523,12.1237117 C21.0370706,12.3055527 21.0581294,12.621434 20.8762883,12.8292523 C20.6944473,13.0370706 20.378566,13.0581294 20.1707477,12.8762883 L19,11.8518841 L19,18 Z M10.997,18 L13.997,18 L13.997,14 L10.997,14 L10.997,18 Z"></path>
                    </svg>
                </a>
                {_.map(tablist, (tab, index) => (
                    <span
                        key={index}
                        className={
                            tabActived === tab
                                ? "tabHeadItem actived"
                                : "tabHeadItem"
                        }
                        onClick={() =>
                            _.isFunction(onChange) && onChange(tab as any)
                        }
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="24"
                            height="24"
                        >
                            <path d="M19,7.5 L19,17 C19,18.3807119 15.8659932,19.5 12,19.5 C8.13400675,19.5 5,18.3807119 5,17 L5,7.5 C5,6.11928813 8.13400675,5 12,5 C15.8659932,5 19,6.11928813 19,7.5 Z M6,17 C6,17.5482291 8.66495842,18.5 12,18.5 C15.3350416,18.5 18,17.5482291 18,17 L18,15.2884238 C16.7751029,16.0144349 14.5463251,16.5 12,16.5 C9.45367486,16.5 7.22489715,16.0144349 6,15.2884238 L6,17 Z M6,12.2884238 L6,14.0000002 C6,14.5482291 8.66495842,15.5 12,15.5 C15.3350416,15.5 18,14.5482291 18,14 L18,12.2884238 C16.7751029,13.0144349 14.5463251,13.5 12,13.5 C9.45367486,13.5 7.22489715,13.0144349 6,12.2884238 Z M18,8.78842379 C16.7751029,9.51443494 14.5463251,10 12,10 C9.45367486,10 7.22489715,9.51443494 6,8.78842379 L6,11 C6,11.5482291 8.66495842,12.5 12,12.5 C15.3350416,12.5 18,11.5482291 18,11 L18,8.78842379 Z M12,9 C15.3350416,9 18,8.04822914 18,7.5 C18,6.95177086 15.3350416,6 12,6 C8.66495842,6 6,6.95177086 6,7.5 C6,8.04822914 8.66495842,9 12,9 Z"></path>
                        </svg>
                        <a
                            href="/"
                            className="tab-head-title"
                            // title={dataFullName[tab as any]}
                            onClick={(e) => e.preventDefault()}
                        >
                            {tab.replace(/_/g, " ").toUpperCase()}
                        </a>
                    </span>
                ))}
            </div>
            <div className="tabContent">{children}</div>
        </div>
    );
}

export default Tabs;
