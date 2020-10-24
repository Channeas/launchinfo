<!-- Component displaying a list of all launches -->
<template>
    <div class="launches">
        <ViewBody>
            <ListView :title="viewData.title">
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
    name: "Launches",
    components: {
        ViewBody,
        ListView,
        ImageList
    },
    data: function() {
        return {
            viewData: {
                items: this.dataManager.getData(this.$route),
                title: "Upcoming launches",
                urlPrefix: "/launches/"
            }
        };
    },
    props: {
        dataManager: {
            required: true
        }
    }
};
</script>

<style scoped>
@media (max-width: 650px) {
    .launches {
        background-color: #f5f5f5;
    }
}
</style>
