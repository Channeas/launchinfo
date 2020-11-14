<!-- Menu component -->
<template>
    <div class="menu">
        <div class="menuContent">
            <router-link to="/" class="menuTitle">LaunchInfo</router-link>
            <div class="menuLinks">
                <router-link
                    to="/agencies"
                    class="menuButton"
                    :class="{ highlighted: this.$route.name == 'Agencies' }"
                    >Agencies</router-link
                >
                <router-link
                    to="/rockets"
                    class="menuButton"
                    :class="{ highlighted: this.$route.name == 'Rockets' }"
                    >Rockets</router-link
                >
                <router-link
                    to="/launches"
                    class="menuButton"
                    :class="{
                        highlighted:
                            this.$route.name == null ||
                            this.$route.name == 'Launches landing' ||
                            this.$route.name == 'Launches'
                    }"
                    >Launches</router-link
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Menu",
    created() {
        console.log(this.$route);
    }
};
</script>

<style>
.menu {
    height: 68px;
    width: 100%;
    background-color: #fff;
}

.menuContent {
    height: 100%;
    width: var(--page-width);
    max-width: var(--page-max-width);
    margin: var(--page-margin);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* Menu title */
.menuTitle {
    margin: 0;
    font-size: 22px;
    font-weight: bold;
    color: var(--text-color);
    text-decoration: none;
}

/* Menu buttons (that link to other views) */
.menuButton {
    margin: 0;
    margin-left: 65px;
    font-size: 18px;
    color: var(--text-color);
    text-decoration: none;
}

.menuButton:first-of-type {
    margin-left: 0;
}

.highlighted {
    font-weight: 700;
}
</style>
