<!-- Menu component -->
<template>
    <div class="menu">
        <div class="menuContent">
            <div class="menuMain">
                <!-- Logo (soon maybe...) linking to the root view -->
                <router-link to="/" class="menuTitle">LaunchInfo</router-link>

                <!-- Button for toggling the menu on mobile -->
                <div
                    class="menuToggle"
                    :class="{
                        toggleActive: menuToggled
                    }"
                    @click="menuToggled = !menuToggled"
                >
                    <!-- The three lines in the menu toggle that are animated -->
                    <div class="menuLine"></div>
                    <div class="menuLine"></div>
                    <div class="menuLine"></div>
                </div>
            </div>

            <!-- General links to the different views -->
            <div
                class="menuLinks"
                :class="{ showLinks: menuToggled }"
                @click="menuToggled = false"
            >
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
    created() {
        // Listen to clicks (to potentially close the menu)
        document.addEventListener("click", this.trackClicks);

        // Make the menu toggle animatable (after they have loaded, to prevent an animation when they initially load)
        window.setTimeout(() => {
            // Get the menu lines
            const menuLines = document.getElementsByClassName("menuLine");

            // Loop through them and add the animation duration
            for (var element of menuLines) {
                element.setAttribute("style", "animation-duration: 0.3s");
            }
        }, 300);
    },

    data: function() {
        return {
            menuToggled: false
        };
    },

    destroyed() {
        // Stop listening to clicks
        document.removeEventListener("click", this.trackClicks);
    },

    methods: {
        // Function that checks if a click should close the menu
        trackClicks(event) {
            // Determine if the click was outside the menu
            const clickedInsideMenu = this.hasParent(event.target, "menu");

            // If the menu is shown and the click was outside the menu, hide the menu
            if (this.menuToggled && !clickedInsideMenu) {
                this.menuToggled = false;
            }
        },

        // Recursive function for finding if an element has a parent with a certain class
        hasParent(element, className, index = 0) {
            if (element.classList.contains(className)) {
                // Check if the current element has the requested class
                return true;
            } else if (element.tagName == "BODY" || index > 100) {
                // Else check if this is the body tag, or if the max iteration is reached
                return false;
            } else {
                // Else continue searching
                return this.hasParent(element.parentNode, className, index++);
            }
        }
    },

    name: "Menu"
};
</script>

<style scoped>
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

/* Menu buttons container (that link to other views) */
.menuLinks {
    transition: 0.7s ease;
}

/* The actual menu buttons (links) */
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

/* Class that highlights the current page */
.highlighted {
    font-weight: 700;
}

/* Toggling button (on mobile) */
.menuToggle {
    display: none;
    cursor: pointer;
}

/* Each individual line in the button */
.menuLine {
    height: 3px;
    width: 30px;
    background-color: #000;
    margin-bottom: 6px;
    transform-origin: center;
    animation-duration: 0s;
    animation-fill-mode: forwards;
    animation-timing-function: ease;
}

/* The default animations for the lines */
.menuLine:nth-of-type(1) {
    animation-name: animateTopDefault;
}

.menuLine:nth-of-type(2) {
    animation-name: animateMiddleDefault;
}

.menuLine:nth-of-type(3) {
    animation-name: animateBottomDefault;
    margin-bottom: 0;
}

/* The animations for when the menu is toggled on */
.toggleActive .menuLine:nth-of-type(1) {
    animation-name: animateTop;
}

.toggleActive .menuLine:nth-of-type(2) {
    animation-name: animateMiddle;
}

.toggleActive .menuLine:nth-of-type(3) {
    animation-name: animateBottom;
}

.showLinks {
    bottom: 60px !important;
}

/* Responsiveness */
@media (max-width: 700px) {
    /* Move the menu bar to the bottom and add a shadow */
    .menu {
        position: fixed;
        bottom: 0;
    }

    /* Remove the margin of the menu content */
    .menuContent {
        margin: unset;
    }

    /* Update alignment of the main (bottom) content */
    .menuMain {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--page-margin);
        z-index: 1000;
        background-color: #fff;
    }

    /* Show the menu toggle */
    .menuToggle {
        display: block;
    }

    /* Hide the menu links */
    .menuLinks {
        position: fixed;
        bottom: -98px;
        width: 100%;
        background-color: #fff;
        padding: var(--page-margin);
        padding-top: 10px;
        z-index: 999;
        transform: translateY(0) rotateZ(0deg);
        transition: 0.3s;
        -webkit-box-shadow: 0px -2px 5px 0px rgba(0, 0, 0, 0.15);
        -moz-box-shadow: 0px -2px 5px 0px rgba(0, 0, 0, 0.15);
        box-shadow: 0px -2px 5px 0px rgba(0, 0, 0, 0.15);
    }

    .menuButton {
        display: block;
        margin: 0;
        padding: 15px 0;
    }
}

/* Toggle button animations */
@keyframes animateTop {
    from {
        transform: translateY(0) rotateZ(0deg);
    }
    50% {
        transform: translateY(9px) rotateZ(0deg);
    }
    to {
        transform: translateY(9px) rotateZ(45deg);
    }
}

@keyframes animateMiddle {
    50% {
        opacity: 1;
    }
    51% {
        opacity: 0;
    }
    to {
        opacity: 0;
    }
}

@keyframes animateBottom {
    from {
        transform: translateY(0) rotateZ(0deg);
    }
    50% {
        transform: translateY(-9px) rotateZ(0deg);
    }
    to {
        transform: translateY(-9px) rotateZ(-45deg);
    }
}

/* D */
@keyframes animateTopDefault {
    from {
        transform: translateY(9px) rotateZ(45deg);
    }
    50% {
        transform: translateY(9px) rotateZ(0deg);
    }
    to {
        transform: translateY(0) rotateZ(0deg);
    }
}

@keyframes animateMiddleDefault {
    50% {
        opacity: 0;
    }
    51% {
        opacity: 1;
    }
    to {
        opacity: 1;
    }
}

@keyframes animateBottomDefault {
    from {
        transform: translateY(-9px) rotateZ(-45deg);
    }
    50% {
        transform: translateY(-9px) rotateZ(0deg);
    }
    to {
        transform: translateY(0) rotateZ(0deg);
    }
}
</style>
