<!-- Component that displays a dataset as a list of cards with images -->
<template>
    <div class="imageList">
        <ImageListItem
            v-for="item in contentList.items"
            :content="item"
            :urlPrefix="contentList.urlPrefix"
            :key="item.id"
            :currentTimeStamp="currentTimeStamp"
        ></ImageListItem>
    </div>
</template>

<script>
// Import other components
import ImageListItem from "../subcomponents/ImageListItem.vue";

export default {
    components: {
        ImageListItem
    },

    data: function() {
        return {
            currentTimeStamp: Date.now(),

            // Update the current time every second, for the countdowns
            timeInterval: window.setInterval(() => {
                this.currentTimeStamp = Date.now();
            }, 1000)
        };
    },

    destroyed() {
        // Clear the interval that updates the time when the component is destroyed
        window.clearInterval(this.timeInterval);
    },

    name: "ImageList",

    props: {
        contentList: {
            type: Object,
            required: true
        }
    }
};
</script>

<style>
.imageList {
    display: grid;
    /* Determines the amount of cards per row */
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: 45px;
}

@media (max-width: 1180px) {
    /* Decrease the amount of cards per row */
    .imageList {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .imageList > .imageListItem {
        max-width: unset;
    }

    .imageList .imageSection {
        height: 240px;
    }
}

@media (max-width: 1100px) {
    .imageList .imageSection {
        height: 210px;
    }
}

@media (max-width: 900px) {
    .imageList .imageSection {
        height: 180px;
    }
}

@media (max-width: 775px) {
    /* Set it so that only one card is displayed per row */
    .imageList {
        grid-template-columns: minmax(0, 1fr);
        text-align: center;
    }

    .imageList .imageSection {
        height: 240px;
    }
}

@media (max-width: 550px) {
    .imageList .imageSection {
        height: 210px;
    }
}

@media (max-width: 400px) {
    .imageList .imageSection {
        height: 180px;
    }
}
</style>
