<!-- Component displaying the details of a single rocket -->
<template>
    <div class="rocketDetails">
        <ViewBody>
            <div class="viewContainer">
                <!-- Page header -->
                <HeaderSection
                    :header="viewData.header"
                    class="topSection"
                    v-if="state == 'loaded'"
                ></HeaderSection>

                <!-- Rocket details -->
                <DetailsSection
                    :detailsData="viewData.details"
                    class="detailsSection"
                    v-if="state == 'loaded'"
                ></DetailsSection>

                <!-- Upcoming launches of this rocket -->
                <p class="generalSubTitle listTitle" v-if="state == 'loaded'">
                    Upcoming launches
                </p>
                <List
                    :listHead="viewData.upcomingLaunches.listHead"
                    :listData="launches"
                    :hasButton="true"
                    :buttonText="viewData.upcomingLaunches.buttonText"
                    class="launchList"
                    v-if="state == 'loaded'"
                ></List>
                <p
                    class="noLaunches"
                    v-if="launches.length == 0 && this.state == 'loaded'"
                >
                    No upcoming launches
                </p>

                <!-- Content that is displayed if the rocket was NOT found -->
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
import List from "@/components/subcomponents/List.vue";

// Import the countdown calculation function
import getCountdown from "../js/functions/getCountdown";

export default {
    name: "Rocket",
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
        this.getDataFromApi(this.$route, this.saveData, this.displayerror);
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

            // Potentially update the page title and the meta description
            if (data.pageTitle) {
                document.title = data.pageTitle;

                // Update the meta description
                document
                    .querySelector("meta[name='description']")
                    .setAttribute("content", `Learn about ${data.pageTitle}`);
            }

            // Update the state
            this.state = "loaded";
        },

        // Method for displaying that the selected rocket was not found
        displayerror(errorCode) {
            // Update the state
            this.state = "error";

            // Display the correct error message
            switch (errorCode) {
                case 404 || 500:
                    this.errorMessage = "Rocket not found";
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
    },
    computed: {
        launches: function() {
            // Edit the array of launches to contain a countdown instead of a timestamp
            const launches = [...this.viewData.upcomingLaunches.listData];
            for (const launch of launches) {
                const launchTime = launch.rowData[1];
                launch.rowData[1] = getCountdown(launchTime, Date.now());
            }

            return launches;
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

.listTitle {
    margin: 60px 0 15px 0;
}

.launchList {
    grid-template-columns: minmax(0, 1fr) 160px minmax(0, 1fr) 140px;
}

.noLaunches {
    margin: 0;
}

/* List responsiveness */
@media (max-width: 1050px) {
    .launchList {
        grid-template-columns: 1fr !important;
    }

    .launchList thead {
        display: none;
    }

    .launchList .buttonColumn {
        padding-left: 0;
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
