<!-- Menu component -->
<template>
    <div class="menu">
        <div class="menuContent">
            <router-link to="/" class="menuTitle">LaunchInfo</router-link>
            <div class="menuLinks">
                <router-link to="/agencies" class="menuButton"
                    >Agencies</router-link
                >
                <router-link to="/rockets" class="menuButton"
                    >Rockets</router-link
                >
                <router-link to="/launches" class="menuButton"
                    >Launches</router-link
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Menu"
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
    width: 80%;
    max-width: var(--page-width);
    margin: auto;
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
</style>
