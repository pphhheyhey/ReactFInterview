import DetailsPage from "../pages/ContactDetailPage";
import FormPage from "../pages/ContactFormPage";
import ListPage from "../pages/ContactListPage";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListPage />
  },
  {
    path: "/contactsDetail",
    element: <DetailsPage />
  },
  {
    path: "/contactsForm",
    element: <FormPage />
  }
])
export default router