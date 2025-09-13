import Layout from "../pages/Layout";
import FormPage from "../pages/ContactFormPage";
import ListPage from "../pages/ContactListPage";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <ListPage />
      },
      {
        path: "/contactsForm",
        element: <FormPage />
      }
    ]
  },

  // {
  //   path: "/contactsDetail",
  //   element: <DetailsPage />
  // },
]);
export default router;