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
body {
    margin: 0;
    font-family: "Montserrat", sans-serif;
}

#app {
    height: 100vh;
    width: 100%;
    background-color: #f5f5f5;
}

/* Variables */
:root {
    --text-color: #141414;
    --page-width: 1110px;
}
</style>
