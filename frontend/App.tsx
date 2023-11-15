import router from 'Frontend/routes.js';
import {RouterProvider} from 'react-router-dom';
import {Provider} from "react-redux";
import {store} from "Frontend/redux/store";
import "./main.css";

export default function App() {

    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    );
}
