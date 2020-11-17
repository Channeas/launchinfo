<!-- 404 view -->
<template>
    <div class="error404">
        <ViewBody>
            <p class="errorTitle">404 - sorry, but we can't find that page</p>
            <!-- Button that redirects the user to the previous page -->
            <button class="errorButton" @click="$router.go(-1)">Go back</button>
        </ViewBody>
    </div>
</template>

<script>
import ViewBody from "../components/sections/ViewBody.vue";

export default {
    name: "Error_404",
    components: {
        ViewBody
    },
    created() {
        // Update the page title
        document.title = "404 - page not found";
    }
};
</script>

<style scoped>
.errorTitle {
    font-size: 50px;
    font-weight: bold;
    color: var(--text-color);
    margin: 0;
    padding: 30px 0 15px 0;
}

.errorButton {
    background-color: #1885f2;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
    padding: 10px 45px;
    text-decoration: none;
    margin-top: 1em;
    display: inline-block;
    border: none;
    cursor: pointer;
}

/* Responsiveness */
@media (max-width: 700px) {
    .error404 {
        text-align: center;
    }

    .errorTitle {
        font-size: 35px;
    }
}
</style>
