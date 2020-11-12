<!-- Component displaying a list of all launches -->
<template>
    <div class="launches">
        <ViewBody>
            <ListView :title="viewData.title">
                <ImageList :contentList="viewData"></ImageList>
            </ListView>
            <PageNavigation :pageData="pageData"></PageNavigation>
        </ViewBody>
    </div>
</template>

<script>
// Import the components used
import ViewBody from "@/components/ViewBody.vue";
import ListView from "@/components/ListView.vue";
import ImageList from "@/components/ImageList.vue";
import PageNavigation from "@/components/PageNavigation.vue";

export default {
    name: "Launches",
    components: {
        ViewBody,
        ListView,
        ImageList,
        PageNavigation
    },
    data: function() {
        return {
            viewData: {
                items: [],
                title: "Upcoming launches",
                urlPrefix: "/launches/"
            },
            pageData: {
                itemCount: 1,
                itemsPerPage: 1
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

        // Update the page title
        document.title = "Upcoming launches";
    },
    methods: {
        // Method for saving requested data asynchronously
        saveData(data) {
            this.viewData.items = data.items;
            this.pageData = data.pageData;
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
