<template>
    <div id="app">
        <Menu></Menu>
        <router-view />
        <Attribution></Attribution>
    </div>
</template>

<script>
import Menu from "@/components/sections/Menu.vue";
import Attribution from "@/components/sections/Attribution.vue";

export default {
    name: "App",
    components: {
        Menu,
        Attribution
    }
};
</script>

<style>
/* Variables */
:root {
    --text-color: #141414;
    --page-width: 80%;
    --page-max-width: 1110px;
    --page-margin: auto;
    --page-padding: 40px;
}

/* Styling */
body {
    margin: 0;
    font-family: "Montserrat", sans-serif;
}

#app {
    min-height: 100vh;
    width: 100%;
    background-color: #f5f5f5;
    color: var(--text-color);
}

/* Styles used by the views */
.generalTitle {
    font-size: 42px;
    font-weight: bold;
    margin: 0;
}

.generalSubTitle {
    font-size: 26px;
    font-weight: bold;
    margin: 0;
}

/* Responsiveness */
@media (max-width: 800px) {
    :root {
        --page-width: unset;
        --page-margin: 0 40px;
    }
}

@media (max-width: 650px) {
    :root {
        --page-padding: 0;
    }

    #app {
        background-color: #fff;
    }

    .viewContainer {
        box-shadow: none !important;
        margin-top: 0 !important;
    }
}

@media (max-width: 550px) {
    :root {
        --page-width: unset;
        --page-margin: 0 30px;
    }
}

@media (max-width: 400px) {
    :root {
        --page-margin: 0 20px;
    }
}
</style>
