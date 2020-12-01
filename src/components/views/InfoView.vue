<!-- Component used on the views displaying individual information (Agency, Launch and Rocket) -->
<template>
    <div class="viewContainer">
        <div class="loadedSection" v-if="state == 'loaded'">
            <!-- Page header -->
            <HeaderSection
                :header="viewData.header"
                class="topSection"
            ></HeaderSection>

            <!-- Entity (agency, launch or rocket) details -->
            <DetailsSection
                :detailsData="viewData.details"
                class="detailsSection"
            ></DetailsSection>

            <!-- Upcoming launches of this entity -->
            <div class="listSection" v-if="viewData.upcomingLaunches.listData">
                <p class="generalSubTitle listTitle">
                    Upcoming launches
                </p>
                <List
                    :listHead="viewData.upcomingLaunches.listHead"
                    :listData="launches"
                    :hasButton="true"
                    :buttonText="viewData.upcomingLaunches.buttonText"
                    class="launchList"
                ></List>
                <p class="noLaunches" v-if="launches.length == 0">
                    No upcoming launches
                </p>
            </div>
        </div>

        <!-- Content that is displayed if the entity was NOT found -->
        <p class="generalTitle" v-if="state == 'error'">
            {{ errorMessage }}
        </p>
    </div>
</template>

<script>
import HeaderSection from "../sections/HeaderSection.vue";
import DetailsSection from "../sections/DetailsSection.vue";
import List from "@/components/subcomponents/List.vue";

// Import the countdown calculation function
import getCountdown from "../../js/functions/getCountdown";

export default {
    components: {
        HeaderSection,
        DetailsSection,
        List
    },
    data: function() {
        return {
            viewData: {
                header: {},
                details: [],
                upcomingLaunches: {}
            },
            errorMessage: "Launch not found",
            state: "loading"
        };
    },
    computed: {
        launches: function() {
            // Make sure there are launches
            if (!this.viewData.upcomingLaunches.listData) {
                return [];
            }

            // Edit the array of launches to contain a countdown instead of a timestamp
            const launches = [...this.viewData.upcomingLaunches.listData];
            for (const launch of launches) {
                const launchTime = launch.rowData[1];
                launch.rowData[1] = getCountdown(launchTime, Date.now());
            }

            return launches;
        }
    },
    created() {
        // Request the data from the API (is returned using the saveData method as a callback)
        this.getDataFromApi(this.$route, this.saveData, this.displayError);
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

        // Method for displaying that the selected entity was not found
        displayError(errorCode) {
            // Update the state
            this.state = "error";

            // Display the correct error message
            switch (errorCode) {
                case 404 || 500:
                    this.errorMessage = `${this.entityType} was not found`;
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
    name: "InfoView",
    props: {
        getDataFromApi: {
            required: true
        },
        entityType: {
            required: true,
            type: String
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
