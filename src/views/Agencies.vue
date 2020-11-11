<!-- Component displaying a list of all agencies -->
<template>
    <div class="agencies">
        <ViewBody>
            <ListView :title="title">
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
    name: "Agencies",
    components: {
        ViewBody,
        ListView,
        ImageList,
        PageNavigation
    },
    data: function() {
        return {
            title: "Agencies",
            viewData: {
                items: [],
                urlPrefix: "/agencies/"
            },
            pageData: {
                itemCount: 0,
                itemsPerPage: 0
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
            this.viewData.items = data.items;
            this.pageData = data.pageData;
        }
    }
};
</script>

<style>
/* Modify the card styling to ensure the logos fit */
.agencies .imageSection {
    background-size: contain;
    background-position: center;
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
