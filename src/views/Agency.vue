<!-- Component displaying the details of a single agency -->
<template>
    <div class="agency">
        <ViewBody>
            <InfoView
                :getDataFromApi="getDataFromApi"
                :entityType="'Agency'"
            ></InfoView>
        </ViewBody>
    </div>
</template>

<script>
import ViewBody from "@/components/sections/ViewBody.vue";
import InfoView from "@/components/views/InfoView.vue";

export default {
    name: "Agency",
    components: {
        ViewBody,
        InfoView
    },
    props: {
        getDataFromApi: {
            required: true
        }
    }
};
</script>

<style>
.agency .launchList {
    grid-template-columns: minmax(0, 1fr) 160px 160px minmax(0, 1fr) 140px;
}

/* Make sure the agency logo has whitespace around it */
.agency .headerSection .subSection:first-of-type {
    margin: 0;
    margin-top: 20px;
}

.agency .headerImage {
    background-size: contain;
    background-position: center;
}
</style>
