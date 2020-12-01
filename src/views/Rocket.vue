<!-- Component displaying the details of a single rocket -->
<template>
    <div class="rocketDetails">
        <ViewBody>
            <InfoView
                :getDataFromApi="getDataFromApi"
                :entityType="'Rocket'"
            ></InfoView>
        </ViewBody>
    </div>
</template>

<script>
import ViewBody from "@/components/sections/ViewBody.vue";
import InfoView from "@/components/views/InfoView.vue";

export default {
    name: "Rocket",
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

<style></style>
