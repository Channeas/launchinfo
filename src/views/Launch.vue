<!-- Component displaying the details of a single launch -->
<template>
    <div class="launch">
        <ViewBody>
            <div class="viewContainer">
                <!-- Content that is displayed if the launch was found -->
                <HeaderSection
                    :header="viewData.header"
                    class="topSection"
                    v-if="state == 'loaded'"
                ></HeaderSection>

                <DetailsSection
                    :detailsData="viewData.details"
                    class="detailsSection"
                    v-if="state == 'loaded'"
                ></DetailsSection>

                <!-- Content that is displayed if the launch was NOT found -->
                <p class="generalTitle" v-if="state == 'error'">
                    {{ errorMessage }}
                </p>
            </div>
        </ViewBody>
    </div>
</template>

<script>
import ViewBody from "@/components/sections/ViewBody.vue";
import HeaderSection from "@/components/sections/HeaderSection.vue";
import DetailsSection from "@/components/sections/DetailsSection.vue";

export default {
    name: "Launch",
    components: {
        ViewBody,
        HeaderSection,
        DetailsSection
    },
    data: function() {
        return {
            viewData: {
                header: {},
                details: []
            },
            errorMessage: "Launch not found",
            state: "loading"
        };
    },
    props: {
        getDataFromApi: {
            required: true
        }
    },
    created() {
        // Request the data from the API (is returned using the saveData method as a callback)
        this.getDataFromApi(this.$route, this.saveData, this.displayError);
    },
    methods: {
        // Method for saving requested data asynchronously
        saveData(data) {
            this.viewData = data;
            this.state = "loaded";

            // Potentially update the page title and the meta description
            if (data.pageTitle) {
                document.title = data.pageTitle;

                // Update the meta description
                document
                    .querySelector("meta[name='description']")
                    .setAttribute("content", `Learn about ${data.pageTitle}`);
            }
        },

        // Method for displaying that the selected rocket was not found
        displayError(errorCode) {
            // Update the state
            this.state = "error";

            // Display the correct error message
            switch (errorCode) {
                case 404 || 500:
                    this.errorMessage = "Launch not found";
                    break;
                case 429:
                    this.errorMessage = "API limit exceeded. Sorry";
                    break;
                default:
                    this.errorMessage = "Unknown error";
            }

            // Update the page title
            document.title = this.errorMessage;
        }
    }
};
</script>

<style>
.viewContainer {
    background-color: #fff;
    margin-top: 30px;
    padding: var(--page-padding);
    border-radius: 5px;
    -webkit-box-shadow: 0px 2px 11px -5px rgba(0, 0, 0, 0.52);
    -moz-box-shadow: 0px 2px 11px -5px rgba(0, 0, 0, 0.52);
    box-shadow: 0px 2px 11px -5px rgba(0, 0, 0, 0.52);
}
</style>
