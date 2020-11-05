<!-- Component displaying the details of a single agency -->
<template>
    <div class="agency">
        <ViewBody>
            <div class="viewContainer">
                <!-- Page header -->
                <HeaderSection
                    :header="viewData.header"
                    class="topSection"
                    v-if="state == 'loaded'"
                ></HeaderSection>

                <!-- Agency details -->
                <DetailsSection
                    :detailsData="viewData.details"
                    class="detailsSection"
                    v-if="state == 'loaded'"
                ></DetailsSection>

                <!-- Upcoming launches of this agency -->
                <p class="generalSubTitle listTitle" v-if="state == 'loaded'">
                    Upcoming launches
                </p>
                <List
                    :listHead="viewData.upcomingLaunches.listHead"
                    :listData="viewData.upcomingLaunches.listData"
                    :hasButton="true"
                    :buttonText="viewData.upcomingLaunches.buttonText"
                    class="launchList"
                    v-if="state == 'loaded'"
                ></List>

                <!-- Content that is displayed if the agency was NOT found -->
                <p class="generalTitle" v-if="state == '404'">
                    Agency not found
                </p>
            </div>
        </ViewBody>
    </div>
</template>

<script>
import ViewBody from "@/components/ViewBody.vue";
import HeaderSection from "@/components/HeaderSection.vue";
import DetailsSection from "@/components/DetailsSection.vue";
import List from "@/components/List.vue";

export default {
    name: "Agency",
    components: {
        ViewBody,
        HeaderSection,
        DetailsSection,
        List
    },
    data: function() {
        return {
            viewData: {
                header: {},
                details: [],
                upcomingLaunches: {
                    listHead: [],
                    listData: []
                }
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
            // Potentially save the header
            if (data.header) {
                this.viewData.header = data.header;
            }

            // Potentially save the details
            if (data.details) {
                this.viewData.details = data.details;
            }

            // Potentially save upcoming launch data
            if (data.upcomingLaunches) {
                this.viewData.upcomingLaunches = data.upcomingLaunches;
            }

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

.listTitle {
    margin: 60px 0 15px 0;
}

.agency .launchList {
    grid-template-columns: 1fr 1fr 160px 1fr 108px;
}

.agency .headerImage {
    background-size: contain;
    background-position: center;
}

/* List responsiveness */
@media (max-width: 1050px) {
    .launchList {
        grid-template-columns: 1fr !important;
    }

    .launchList thead {
        display: none;
    }

    .launchList tr td {
        border-bottom: 0px;
        padding: 8px 0;
    }

    .launchList tr td:last-of-type {
        border-bottom: 1px solid #e2e2e2;
        padding-bottom: 25px;
    }

    .launchList tr td:first-of-type {
        font-weight: bold;
        padding-top: 25px;
    }

    .launchList tr:first-of-type td:first-of-type {
        padding-top: 0;
    }

    .launchList tr:last-of-type td:last-of-type {
        padding-bottom: 0;
        border-bottom: 0;
    }
}
</style>
