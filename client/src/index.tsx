// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//     <React.StrictMode>
//         <RouterWraper />
//     </React.StrictMode>
// );

import { createRoot } from 'react-dom/client';
import RouterWraper from './routes';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<RouterWraper />);
