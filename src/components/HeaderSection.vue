<!-- Component that is used at the top of the detail pages -->
<template>
    <div class="headerSection">
        <div class="subSection">
            <img class="headerImage" :src="header.imageSource" />
        </div>
        <div class="subSection">
            <p class="headerTitle">{{ header.title }}</p>
            <p class="headerSubTitle">{{ header.subTitle }}</p>
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
    }
};
</script>

<style>
/* Styling */
.headerSection {
    display: grid;
    grid-gap: 60px 40px;
    grid-template-columns: 1fr 1fr;
}

.headerImage {
    width: 100%;
    border-radius: 5px;
}

.headerTitle {
    font-size: 42px;
    font-weight: bold;
    margin: 0;
}

.headerSubTitle {
    font-size: 26px;
    font-weight: bold;
    margin: 20px 0;
}

.headerSmallTitle {
    font-size: 20px;
    font-weight: bold;
    margin: 20px 0;
}

.headerDescription {
    font-size: 20px;
}

.headerButton {
    background-color: #1885f2;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
    padding: 10px 15px;
    text-decoration: none;
}

/* Responsiveness */
@media (max-width: 1150px) {
    .headerSection {
        grid-template-columns: 1fr;
    }
}
</style>
