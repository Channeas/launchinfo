<!-- Component that is the basis for the ImageList.vue component -->
<template>
    <div class="imageListItem">
        <div class="imageSection" :style="imageSource"></div>
        <div class="textSection">
            <p class="location">
                {{ content.imageTitle }}
            </p>
            <p class="title">{{ content.title }}</p>
            <p class="timeLeft">{{ content.subTitle }}</p>
            <p class="rocket">{{ content.description }}</p>
            <router-link :to="urlPrefix + content.id" class="cardButton">
                Learn more
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        content: {
            type: Object,
            required: true
        },
        urlPrefix: {
            type: String,
            required: true
        }
    },
    computed: {
        imageSource: function() {
            return `background-image: url("${this.content.imageSrc}");`;
        }
    }
};
</script>

<style>
.imageListItem {
    max-width: 360px;
    /* height: 430px; */
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 2px 11px -5px rgba(0, 0, 0, 0.52);
}

.imageSection {
    height: 210px;
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;
    border-radius: 5px 5px 0 0;
}

.textSection {
    padding: 25px;
}

.location {
    font-size: 13px;
    font-weight: bold;
    color: #444444;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
}

.title {
    font-size: 32px;
    font-weight: bold;
    margin: 15px 0;
    white-space: nowrap;
    overflow: hidden;
}

.timeLeft {
    font-size: 22px;
    font-weight: bold;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
}

.rocket {
    margin: 15px 0;
    white-space: nowrap;
    overflow: hidden;
}

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
