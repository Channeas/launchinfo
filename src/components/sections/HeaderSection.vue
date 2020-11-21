<!-- Component that is used at the top of the detail pages -->
<template>
    <div class="headerSection">
        <div class="subSection">
            <!-- <img class="headerImage" :src="header.imageSrc" /> -->
            <div class="headerImage" :style="imageSource"></div>
        </div>
        <div class="subSection">
            <p class="generalTitle">{{ header.title }}</p>
            <p
                class="generalSubTitle headerSubTitle"
                v-if="header.subTitleAsCountdown"
            >
                {{ timeCountDown }}
            </p>
            <p class="generalSubTitle headerSubTitle" v-else>
                {{ header.subTitle }}
            </p>
            <p class="headerSmallTitle">{{ header.smallTitle }}</p>
            <p class="headerDescription">{{ header.description }}</p>
            <router-link
                v-if="header.buttonUrl"
                :to="header.buttonUrl"
                class="headerButton"
            >
                {{ header.buttonText }}
            </router-link>
        </div>
    </div>
</template>

<script>
// Import the countdown calculation function
import getCountdown from "../../js/functions/getCountdown";

export default {
    computed: {
        imageSource: function() {
            return `background-image: url("${this.header.imageSrc}");`;
        },

        // Returns how long is left until launch in countdown format
        timeCountDown: function() {
            return getCountdown(
                this.header.subTitle,
                this.currentTimeStamp,
                true
            );
        }
    },

    data: function() {
        return {
            currentTimeStamp: Date.now(),

            // Update the current time every second
            timeInterval: window.setInterval(() => {
                this.currentTimeStamp = Date.now();
            }, 1000)
        };
    },

    destroyed() {
        // Clear the interval that updates the time when the component is destroyed
        window.clearInterval(this.timeInterval);
    },

    name: "HeaderSection",

    props: {
        header: {
            type: Object,
            required: true
        }
    }
};
</script>

<style>
/* Styling */
.headerSection {
    display: grid;
    grid-gap: 20px 40px;
    grid-template-columns: 1fr 1fr;
}

.headerImage {
    height: 350px;
    width: 100%;
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;
    border-radius: 5px;
}

.headerSubTitle {
    margin: 20px 0;
}

.headerSmallTitle {
    font-size: 20px;
    font-weight: bold;
    margin: 20px 0;
}

.headerDescription {
    font-size: 20px;
    margin-bottom: 0;
    line-height: 1.4em;
}

.headerButton {
    background-color: #1885f2;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
    padding: 10px 15px;
    text-decoration: none;
    margin-top: 1em;
    display: inline-block;
}

/* Responsiveness */
@media (max-width: 1150px) {
    .headerSection {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 800px) {
    .headerSection .subSection:first-of-type {
        margin: -40px;
        margin-bottom: 0;
    }

    .headerImage {
        border-radius: 5px 5px 0 0;
    }

    .generalTitle {
        font-size: 34px;
    }
}

@media (max-width: 650px) {
    .headerSection .subSection:first-of-type {
        margin-top: 0;
    }

    .headerImage {
        border-radius: 0;
    }
}

@media (max-width: 550px) {
    .headerSection .subSection:first-of-type {
        margin: -30px;
        margin-top: 0;
        margin-bottom: 0;
    }
}
</style>
