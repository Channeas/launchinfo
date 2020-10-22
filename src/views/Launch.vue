<!-- Component displaying the details of a single launch -->
<template>
    <div class="launch">
        <ViewBody>
            <div class="viewContainer">
                <HeaderSection
                    :header="viewData.header"
                    class="topSection"
                ></HeaderSection>

                <DetailsSection
                    :detailsData="viewData.details"
                    class="detailsSection"
                ></DetailsSection>
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
</style>
