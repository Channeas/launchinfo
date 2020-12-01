<!-- Component displaying a list of all agencies -->
<template>
    <div class="agencies">
        <ViewBody>
            <ListView :title="title" :errorCode="errorCode">
                <ImageList :contentList="viewData"></ImageList>
            </ListView>
            <PageNavigation :pageData="pageData"></PageNavigation>
        </ViewBody>
    </div>
</template>

<script>
// Import the components used
import ViewBody from "@/components/sections/ViewBody.vue";
import ImageList from "@/components/sections/ImageList.vue";
import ListView from "@/components/subcomponents/ListView.vue";
import PageNavigation from "@/components/subcomponents/PageNavigation.vue";

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
            errorCode: null,
            title: "Agencies",
            viewData: {
                items: [],
                urlPrefix: "/agencies/"
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
        this.getDataFromApi(this.$route, this.saveData, this.displayError);

        // Update the page title
        document.title = "Agencies";

        // Update the meta description
        document
            .querySelector("meta[name='description']")
            .setAttribute("content", "Learn about space agencies");
    },
    methods: {
        // Method for saving requested data asynchronously
        saveData(data) {
            this.viewData.items = data.items;
            this.pageData = data.pageData;

            // Make sure to reset the error message
            this.errorCode = null;
        },

        // Error callback for displaying an error
        displayError(errorCode) {
            this.errorCode = errorCode;
        }
    }
};
</script>

<style>
/* Modify the card styling to ensure the logos fit */
.agencies .imageSection {
    background-size: contain;
    background-position: center;
    margin: 25px;
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
