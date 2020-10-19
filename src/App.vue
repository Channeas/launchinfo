<template>
    <div id="app">
        <Menu></Menu>
        <router-view />
    </div>
</template>

<script>
import Menu from "@/components/Menu.vue";

export default {
    name: "App",
    components: {
        Menu
    }
};
</script>

<style>
/* Variables */
:root {
    --text-color: #141414;
    --page-width: 1110px;
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
</style>
