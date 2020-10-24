<!-- Component that is used at the top of the detail pages -->
<template>
    <div class="headerSection">
        <div class="subSection">
            <img class="headerImage" :src="header.imageSrc" />
        </div>
        <div class="subSection">
            <p class="generalTitle">{{ header.title }}</p>
            <p class="generalSubTitle headerSubTitle">{{ header.subTitle }}</p>
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
    grid-gap: 20px 40px;
    grid-template-columns: 1fr 1fr;
}

.headerImage {
    width: 100%;
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
