import { useState } from "react";
import Tabs from "../../components/Tabs";
import Category from "./Category";
import Video from "./Video";
import "./Admin.css";

function Admin() {
    const [tabActived, setTabActived] = useState("Video");
    return (
        <div className="admin-main">
            <Tabs
                tabActived={tabActived}
                tablist={["Category", "Video"]}
                onChange={setTabActived}
            />
            {tabActived === "Video" ? <Video /> : <Category />}
        </div>
    );
}

export default Admin;
