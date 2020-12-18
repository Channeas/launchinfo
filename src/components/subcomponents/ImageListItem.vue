<!-- Component that is the basis for the ImageList.vue component -->
<template>
    <div class="imageListItem">
        <!-- Section containing the image -->
        <div class="imageSection" :style="imageStyle">
            <img :src="content.imageSrc" :alt="imageAlt" />
        </div>

        <!-- Section containing the text -->
        <div class="textSection">
            <p class="location">
                {{ content.imageTitle }}
            </p>
            <p class="title">{{ content.title }}</p>

            <!-- Tags that determine whether or not to display a countdown -->
            <p class="subTitle" v-if="content.subTitleAsCountdown">
                {{ timeCountDown }}
            </p>
            <p class="subTitle" v-else>{{ content.subTitle || "&nbsp;" }}</p>

            <!-- Potentially display a launchdate -->
            <p
                class="description"
                v-if="
                    $route.name == 'Launches' ||
                        $route.name == 'Launches landing'
                "
            >
                {{ content.launchDate }}
            </p>

            <p class="description">{{ content.description }}</p>
            <router-link :to="urlPrefix + content.id" class="cardButton">
                Learn more
            </router-link>
        </div>
    </div>
</template>

<script>
// Import the countdown calculation function
import getCountdown from "../../js/functions/getCountdown";

export default {
    computed: {
        // Computed alt text for the image, telling what rocket is pictured
        imageAlt: function() {
            if (this.content.type == "Launch") {
                const desc = this.content.description;
                return desc.substring(desc.indexOf("|") + 2, desc.length);
            } else {
                return this.content.title;
            }
        },

        // CSS style change that centers the image for agency logos
        imageStyle: function() {
            if (this.content.type == "Agency") {
                return "align-items: center;";
            } else {
                return "";
            }
        },

        timeCountDown: function() {
            return getCountdown(this.content.subTitle, this.currentTimeStamp);
        }
    },

    name: "ImageListItem",

    props: {
        content: {
            type: Object,
            required: true
        },
        urlPrefix: {
            type: String,
            required: true
        },
        currentTimeStamp: {
            type: Number,
            required: false
        }
    }
};
</script>

<style>
/* The card */
.imageListItem {
    max-width: 360px;
    background-color: #fff;
    border-radius: 5px;
    -webkit-box-shadow: 0px 2px 11px -5px rgba(0, 0, 0, 0.52);
    -moz-box-shadow: 0px 2px 11px -5px rgba(0, 0, 0, 0.52);
    box-shadow: 0px 2px 11px -5px rgba(0, 0, 0, 0.52);
}

/* The top section of the card, containing the image */
.imageSection {
    height: 210px;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
}

/* The actual image */
.imageSection img {
    width: 100%;
}

/* The bottom section of teh card, containing the text */
.textSection {
    padding: 25px;
}

/* The text right below the image */
.location {
    font-size: 13px;
    font-weight: bold;
    color: #444444;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
}

/* The title of the card */
.title {
    font-size: 32px;
    font-weight: bold;
    margin: 15px 0;
    white-space: nowrap;
    overflow: hidden;
}

/* The subtitle (which may contain a countdown) */
.subTitle {
    font-size: 22px;
    font-weight: bold;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    min-height: 27px;
}

/* The smallest text on the card */
.description {
    margin: 15px 0;
    white-space: nowrap;
    overflow: hidden;
}

.description:nth-child(1) {
    margin-top: 0;
}

/* The button leading to the individual page */
.cardButton {
    margin: 0;
    padding: 10px 0;
    width: 100%;
    background-color: #1885f2;
    color: #fff;
    font-weight: bold;
    font-size: 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: block;
    text-align: center;
    text-decoration: none;
}
</style>
