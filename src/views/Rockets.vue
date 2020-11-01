<!-- Component displaying a list of all agencies -->
<template>
    <div class="rockets">
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
    name: "Rockets",
    components: {
        ViewBody,
        ListView,
        ImageList
    },
    data: function() {
        return {
            title: "Rockets",
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

<style scoped>
@media (max-width: 650px) {
    .rockets {
        background-color: #f5f5f5;
    }
}
</style>
