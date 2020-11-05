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
export default {
    name: "HeaderSection",
    props: {
        header: {
            type: Object,
            required: true
        }
    },
    data: function() {
        return {
            currentTimeStamp: Date.now()
        };
    },
    created() {
        // Update the current time every second
        window.setInterval(() => {
            this.currentTimeStamp = Date.now();
        }, 1000);
    },
    computed: {
        imageSource: function() {
            return `background-image: url("${this.header.imageSrc}");`;
        },

        // Returns how long is left until launch in countdown format
        timeCountDown: function() {
            // Constants used in the calculations below
            const dayInMilliseconds = 86400000,
                hourInMilliseconds = 3600000,
                minuteInMilliseconds = 60000;

            // Get the launch timestamp
            var launchTime = this.header.subTitle;

            // Calculate the difference between right now and launch in milliseconds
            var difference = launchTime - this.currentTimeStamp;

            // Calculate the day
            var days = Math.floor(difference / dayInMilliseconds);
            difference -= days * dayInMilliseconds;

            // Calculate the hour
            var hours = Math.floor(difference / hourInMilliseconds);
            difference -= hours * hourInMilliseconds;

            // Calculate the minute
            var minutes = Math.floor(difference / minuteInMilliseconds);
            difference -= minutes * minuteInMilliseconds;

            // Calculate the second
            var seconds = Math.floor(difference / 1000);

            // Return the time left in countdown format
            return `T- ${days}D ${hours}H ${minutes}M ${seconds}S`;
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
</style>
