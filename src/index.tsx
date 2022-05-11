import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { PrivateRoute } from "@/components/PrivateRoute";
import Record from "./views/record/Record";
import Collection from "./views/collection/Collection";
import PlayList from "./views/play-list/PlayList";
import Rank from "./views/rank/Rank";

// ReactDOM
//   .createRoot(document.getElementById('root'))
//   .render(
//     <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   );

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute component={App} />}>
            <Route path="record" element={<PrivateRoute component={Record} needAuth={true} path="record" />} />
            <Route path="collection" element={<PrivateRoute component={Collection} needAuth={true} path="collection" />} />
            <Route path="play-list" element={<PrivateRoute component={PlayList} />} />
            <Route path="rank" element={<PrivateRoute component={Rank} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
