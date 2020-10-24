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
                <p class="listTitle">Upcoming launches</p>
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
    padding: 40px;
    border-radius: 5px;
}

.listTitle {
    margin: 60px 0 15px 0;
    font-size: 26px;
    font-weight: bold;
}

.launchList {
    grid-template-columns: 1fr 160px 1fr 120px;
}
</style>
