<!-- Component displaying a list of all agencies -->
<template>
    <div class="agencies">
        <ViewBody>
            <ListView :title="title">
                <ImageList :contentList="viewData"></ImageList>
            </ListView>
        </ViewBody>
    </div>
</template>

<script>
// Import the components used
import ViewBody from "@/components/ViewBody.vue";
import ListView from "@/components/ListView.vue";
import ImageList from "@/components/ImageList.vue";

export default {
    name: "Agencies",
    components: {
        ViewBody,
        ListView,
        ImageList
    },
    data: function() {
        return {
            title: "Agencies",
            viewData: this.getDataFromApi(this.$route)
        };
    },
    props: {
        getDataFromApi: {
            required: true
        }
    }
};
</script>

<style>
/* Modify the card styling to ensure the logos fit */
.agencies .imageSection {
    background-size: contain;
    margin: 20px;
    margin-bottom: 0;
}

.agencies .title {
    margin-top: 0;
}

@media (max-width: 650px) {
    .agencies {
        background-color: #f5f5f5;
    }
}
</style>
