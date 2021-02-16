import { createApp } from "vue";
import App from "./App.vue";

import TheHeader from "./UI/TheHeader.vue";
import TheFooter from "./UI/TheFooter.vue";

const app = createApp(App);

app.component("the-footer", TheFooter);
app.component("the-header", TheHeader);

app.mount("#app");
