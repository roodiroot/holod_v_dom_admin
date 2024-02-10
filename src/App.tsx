import { Admin, Resource, combineDataProviders } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";

import dataTypeProviders from "./providers/dataTypeProviders";
import dataProductProviders from "./providers/dataProductProviders";
import types from "./components/type";
import brands from "./components/brand";
import products from "./components/product";
import { authProvider } from "./providers/authProviders";
import { theme } from "./theme/theme";
import ruMessages from "./providers/ruMess";
import { Layout } from "./layout";
import Login from "./layout/login";

const dataProvider = combineDataProviders((resource) => {
  switch (resource) {
    case "type":
      return dataTypeProviders;
    case "brand":
      return dataTypeProviders;
    case "product":
      return dataProductProviders;
    default:
      throw new Error(`Unknown resource: ${resource}`);
  }
});

const i18nProvider = polyglotI18nProvider(
  () => {
    return ruMessages;
  },
  "ru",
  [{ locale: "ru", name: "Russian" }]
);

function App() {
  return (
    <Admin
      i18nProvider={i18nProvider}
      authProvider={authProvider}
      dataProvider={dataProvider}
      theme={theme}
      layout={Layout}
      loginPage={Login}
    >
      <Resource name='type' {...types} options={{ label: "Типы" }} />
      <Resource name='brand' {...brands} options={{ label: "Бренды" }} />
      <Resource name='product' {...products} options={{ label: "Товары" }} />
    </Admin>
  );
}

export default App;
