import { useState } from "react";
import "./Content.css";

export type ContentProps = {
    overview?: string;
    exercise?: string;
};

function Content(props: ContentProps) {
    const { overview, exercise } = props;
    const [isTabActived, setIsTabActived] = useState("overview");

    return exercise || overview ? (
        <div className="contentMain">
            {overview && exercise && (
                <div className="tabHead">
                    {overview && (
                        <span
                            className={
                                isTabActived === "overview" ? "tabHeadItem actived" : "tabHeadItem"
                            }
                            onClick={() => setIsTabActived("overview")}
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                <path d="M17,4 C17.5522847,4 18,4.44771525 18,5 L18,19 C18,19.5522847 17.5522847,20 17,20 L6,20 C5.44771525,20 5,19.5522847 5,19 L5,5 C5,4.44771525 5.44771525,4 6,4 L17,4 Z M17,5 L6,5 L6,19 L17,19 L17,5 Z M15,15 L15,16 L8,16 L8,15 L15,15 Z M15,13 L15,14 L8,14 L8,13 L15,13 Z M15,11 L15,12 L8,12 L8,11 L15,11 Z M12,7 L12,8 L8,8 L8,7 L12,7 Z"></path>
                            </svg>
                            Overview
                        </span>
                    )}
                    {exercise && (
                        <span
                            className={
                                isTabActived === "exercise" ? "tabHeadItem actived" : "tabHeadItem"
                            }
                            onClick={() => setIsTabActived("exercise")}
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                <path d="M13,5 L13,6 L6,6 L6,19 L19,19 L19,12 L20,12 L20,19 C20,19.5522847 19.5522847,20 19,20 L6,20 C5.44771525,20 5,19.5522847 5,19 L5,6 C5,5.44771525 5.44771525,5 6,5 L13,5 Z M19.2071068,4.5 L20.5,5.79289322 C20.8905243,6.18341751 20.8905243,6.81658249 20.5,7.20710678 L12.7071068,15 L10,15 L10,12.2928932 L17.7928932,4.5 C18.1834175,4.10947571 18.8165825,4.10947571 19.2071068,4.5 Z M16.5,7.20689322 L11,12.706 L11,14 L12.292,14 L17.793,8.49989322 L16.5,7.20689322 Z M18.5,5.207 L17.207,6.49989322 L18.5,7.79289322 L19.793,6.5 L18.5,5.207 Z"></path>
                            </svg>
                            Exercise
                        </span>
                    )}
                </div>
            )}
            <div className="tabContent">
                {((overview && !exercise) ||
                    (overview && exercise && isTabActived === "overview")) && (
                    <div
                        className="_content overview"
                        dangerouslySetInnerHTML={{
                            __html: overview || "",
                        }}
                    />
                )}
                {((exercise && !overview) ||
                    (overview && exercise && isTabActived === "exercise")) && (
                    <div
                        className="_content exercise"
                        dangerouslySetInnerHTML={{
                            __html: exercise || "",
                        }}
                    />
                )}
            </div>
        </div>
    ) : null;
}

export default Content;
