<!-- Component displaying the details of a single agency -->
<template>
    <div class="agency">
        <ViewBody>
            <div class="viewContainer">
                <!-- Page header -->
                <HeaderSection
                    :header="viewData.header"
                    class="topSection"
                ></HeaderSection>

                <!-- Rocket details -->
                <DetailsSection
                    :detailsData="viewData.details"
                    class="detailsSection"
                ></DetailsSection>

                <!-- Upcoming launches of this rocket -->
                <p class="generalSubTitle listTitle">Upcoming launches</p>
                <List
                    :listHead="viewData.upcomingLaunches.listHead"
                    :listData="viewData.upcomingLaunches.listData"
                    :hasButton="true"
                    :buttonText="viewData.upcomingLaunches.buttonText"
                    class="launchList"
                ></List>
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
            viewData: this.dataManager.getData(this.$route)
        };
    },
    props: {
        dataManager: {
            required: true
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

.launchList {
    grid-template-columns: 1fr 160px 1fr 120px;
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
