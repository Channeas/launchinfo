<!-- Component displaying a list of all agencies -->
<template>
    <div class="rockets">
        <ViewBody>
            <ListView :title="title">
                <ImageList :contentList="viewData"></ImageList>
            </ListView>
        </ViewBody>
    </div>
</template>

<script>
// Import the components used
import ViewBody from "@/components/ViewBody.vue";
import ListView from "@/components/ListView.vue";
import ImageList from "@/components/ImageList.vue";

export default {
    name: "Rockets",
    components: {
        ViewBody,
        ListView,
        ImageList
    },
    data: function() {
        return {
            title: "Rockets",
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
