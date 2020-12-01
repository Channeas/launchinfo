<!-- Component displaying the details of a single launch -->
<template>
    <div class="launch">
        <ViewBody>
            <InfoView
                :getDataFromApi="getDataFromApi"
                :entityType="'Launch'"
            ></InfoView>
        </ViewBody>
    </div>
</template>

<script>
import ViewBody from "@/components/sections/ViewBody.vue";
import InfoView from "@/components/views/InfoView.vue";

export default {
    name: "Launch",
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
