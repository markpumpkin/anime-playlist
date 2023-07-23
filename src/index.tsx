// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//     <React.StrictMode>
//         <RouterWraper />
//     </React.StrictMode>
// );

import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { initStore } from 'stores/store';
import RouterWraper from './routes';
// import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
// const store = initStore();
root.render(<RouterWraper />);
