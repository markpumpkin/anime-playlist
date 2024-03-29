import { useState, useMemo } from "react";
import _ from "lodash";
// import Text from '../Text';
import { useDetectClickOutside } from "../../helpers/outsideClick";
import "./Dropdown.css";

export type DropdownProps = {
    options: { label?: string; value?: string | number }[];
    value?: string | number;
    onChange?: (value?: string | number) => void;
    showEmptyOption?: boolean;
};

function Dropdown(props: DropdownProps) {
    const { options, value, showEmptyOption = true, onChange } = props;
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const ref = useDetectClickOutside({
        onTriggered: () => setShowDropdown(false),
    });

    const handleToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleChangeValue = (value?: string | number) => {
        _.isFunction(onChange) && onChange(value);
    };

    const currentTitle = useMemo(() => {
        return _.find(
            options,
            (option) => _.toNumber(option.value) === _.toNumber(value)
        )?.label;
    }, [options, value]);

    return (
        <div
            className="dropdown-root"
            onClick={handleToggle}
            ref={ref}
            role="button"
            tabIndex={0}
        >
            <div className="adminShow">
                <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="24"
                    height="24"
                >
                    <path d="M19,7.5 L19,17 C19,18.3807119 15.8659932,19.5 12,19.5 C8.13400675,19.5 5,18.3807119 5,17 L5,7.5 C5,6.11928813 8.13400675,5 12,5 C15.8659932,5 19,6.11928813 19,7.5 Z M6,17 C6,17.5482291 8.66495842,18.5 12,18.5 C15.3350416,18.5 18,17.5482291 18,17 L18,15.2884238 C16.7751029,16.0144349 14.5463251,16.5 12,16.5 C9.45367486,16.5 7.22489715,16.0144349 6,15.2884238 L6,17 Z M6,12.2884238 L6,14.0000002 C6,14.5482291 8.66495842,15.5 12,15.5 C15.3350416,15.5 18,14.5482291 18,14 L18,12.2884238 C16.7751029,13.0144349 14.5463251,13.5 12,13.5 C9.45367486,13.5 7.22489715,13.0144349 6,12.2884238 Z M18,8.78842379 C16.7751029,9.51443494 14.5463251,10 12,10 C9.45367486,10 7.22489715,9.51443494 6,8.78842379 L6,11 C6,11.5482291 8.66495842,12.5 12,12.5 C15.3350416,12.5 18,11.5482291 18,11 L18,8.78842379 Z M12,9 C15.3350416,9 18,8.04822914 18,7.5 C18,6.95177086 15.3350416,6 12,6 C8.66495842,6 6,6.95177086 6,7.5 C6,8.04822914 8.66495842,9 12,9 Z"></path>
                </svg>
                <h5 className="adminTitle">{currentTitle || "All"}</h5>
            </div>
            {showDropdown && (
                <div className="dropdownContent">
                    {showEmptyOption && (
                        <div
                            className={`option ${
                                value === "" ? "actived" : ""
                            }`}
                            onClick={() => handleChangeValue("")}
                        >
                            <p className="optionTitle">All</p>
                        </div>
                    )}
                    {_.map(options, (option, index) => (
                        <div
                            key={index}
                            className={`option ${
                                _.toNumber(value) === _.toNumber(option.value)
                                    ? "actived"
                                    : ""
                            }`}
                            onClick={() => handleChangeValue(option.value)}
                        >
                            <p className="optionTitle">{option.label}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dropdown;
