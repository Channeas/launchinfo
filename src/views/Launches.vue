<!-- Component displaying a list of all launches -->
<template>
    <div class="launches">
        <ViewBody>
            <ListView :title="viewData.title">
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
    name: "Launches",
    components: {
        ViewBody,
        ListView,
        ImageList
    },
    data: function() {
        return {
            viewData: {
                items: [],
                title: "Upcoming launches",
                urlPrefix: "/launches/"
            }
        };
    },
    props: {
        getDataFromApi: {
            required: true
        }
    },
    created() {
        // Request the data from the datamanager (is returned using the saveData method as a callback)
        this.getDataFromApi(this.$route, this.saveData);
    },
    methods: {
        // Method for saving requested data asynchronously
        saveData(data) {
            this.viewData.items = data;
        }
    }
};
</script>

<style scoped>
@media (max-width: 650px) {
    .launches {
        background-color: #f5f5f5;
    }
}
</style>
