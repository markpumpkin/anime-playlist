import _ from "lodash";
import "./Tabs.css";

export type TabProps = {
    tabActived?: string;
    tablist?: string[];
    children?: React.ReactNode;
    onChange?: (tabName: string) => void;
};

function Tabs(props: TabProps) {
    const { tablist, tabActived, children, onChange } = props;

    return (
        <div className="tab-container">
            <div className="tabHead">
                {_.map(tablist, (tab) => (
                    <span
                        className={
                            tabActived === tab
                                ? "tabHeadItem actived"
                                : "tabHeadItem"
                        }
                        onClick={() => _.isFunction(onChange) && onChange(tab)}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="24"
                            height="24"
                        >
                            <path d="M19,7.5 L19,17 C19,18.3807119 15.8659932,19.5 12,19.5 C8.13400675,19.5 5,18.3807119 5,17 L5,7.5 C5,6.11928813 8.13400675,5 12,5 C15.8659932,5 19,6.11928813 19,7.5 Z M6,17 C6,17.5482291 8.66495842,18.5 12,18.5 C15.3350416,18.5 18,17.5482291 18,17 L18,15.2884238 C16.7751029,16.0144349 14.5463251,16.5 12,16.5 C9.45367486,16.5 7.22489715,16.0144349 6,15.2884238 L6,17 Z M6,12.2884238 L6,14.0000002 C6,14.5482291 8.66495842,15.5 12,15.5 C15.3350416,15.5 18,14.5482291 18,14 L18,12.2884238 C16.7751029,13.0144349 14.5463251,13.5 12,13.5 C9.45367486,13.5 7.22489715,13.0144349 6,12.2884238 Z M18,8.78842379 C16.7751029,9.51443494 14.5463251,10 12,10 C9.45367486,10 7.22489715,9.51443494 6,8.78842379 L6,11 C6,11.5482291 8.66495842,12.5 12,12.5 C15.3350416,12.5 18,11.5482291 18,11 L18,8.78842379 Z M12,9 C15.3350416,9 18,8.04822914 18,7.5 C18,6.95177086 15.3350416,6 12,6 C8.66495842,6 6,6.95177086 6,7.5 C6,8.04822914 8.66495842,9 12,9 Z"></path>
                        </svg>
                        {tab.replace(/_/g, " ").toUpperCase()}
                    </span>
                ))}
            </div>
            <div className="tabContent">{children}</div>
        </div>
    );
}

export default Tabs;
