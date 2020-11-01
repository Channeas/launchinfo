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
                <p class="generalTitle" v-if="state == '404'">
                    Launch not found
                </p>
            </div>
        </ViewBody>
    </div>
</template>

<script>
import ViewBody from "@/components/ViewBody.vue";
import HeaderSection from "@/components/HeaderSection.vue";
import DetailsSection from "@/components/DetailsSection.vue";

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
        this.getDataFromApi(this.$route, this.saveData, this.display404);
    },
    methods: {
        // Method for saving requested data asynchronously
        saveData(data) {
            this.viewData = data;
            this.state = "loaded";
        },

        // Method for displaying that the selected rocket was not found
        display404() {
            this.state = "404";
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
    box-shadow: 0px 2px 11px -5px rgba(0, 0, 0, 0.52);
}
</style>
