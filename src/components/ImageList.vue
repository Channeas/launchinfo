<!-- Component that displays a dataset as a list of card with images -->
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
import ImageListItem from "./ImageListItem.vue";

export default {
    name: "ImageList",
    components: {
        ImageListItem
    },
    props: {
        contentList: {
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
    }
};
</script>

<style>
.imageList {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: 45px;
}

@media (max-width: 1180px) {
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
