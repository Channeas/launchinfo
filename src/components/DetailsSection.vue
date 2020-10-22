<!-- Component that displays details in two lists-->
<template>
    <div class="detailsSection">
        <p class="detailsHeader">Details</p>
        <div class="detailsContainer">
            <div class="detailsBlock">
                <List class="detailsList" :listData="list1Data"></List>
            </div>
            <div class="detailsBlock">
                <List class="detailsList" :listData="list2Data"></List>
            </div>
        </div>
    </div>
</template>

<script>
import List from "./List.vue";

export default {
    props: {
        detailsData: {
            type: Array,
            required: true
        }
    },
    computed: {
        // Split the details data into two arrays for the two lists
        list1Data: function() {
            return this.detailsData.slice(0, this.detailsData.length / 2 + 0.5);
        },
        list2Data: function() {
            return this.detailsData.slice(
                this.detailsData.length / 2 + 0.5,
                this.detailsData.length
            );
        }
    },
    components: {
        List
    }
};
</script>

<style>
.detailsSection {
    margin-top: 60px;
}

.detailsHeader {
    font-size: 26px;
    font-weight: bold;
    margin: 0;
    margin-bottom: 15px;
}

.detailsContainer {
    display: grid;
    grid-gap: 0 40px;
    grid-template-columns: 1fr 1fr;
}
.detailsList {
    grid-template-columns: 0.75fr 1fr;
}

.detailsList tr td:first-of-type {
    font-weight: bold;
}

.detailsList tr td:last-of-type {
    text-align: right;
    padding-right: 0;
}

/* Combine the two list into one */
@media (max-width: 1150px) {
    .detailsContainer {
        grid-template-columns: 1fr;
    }

    .detailsBlock:last-of-type {
        border-top: 1px solid #e2e2e2;
    }
}
</style>
