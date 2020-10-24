<!-- Component that displays details in two lists-->
<template>
    <div class="detailsSection">
        <p class="generalSubTitle detailsHeader">Details</p>
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
    margin-bottom: 15px;
}

.detailsContainer {
    display: grid;
    grid-gap: 0 40px;
    grid-template-columns: 1fr 1fr;
}

/* Make the leftmost cells bold */
.detailsList tr td:first-of-type {
    font-weight: bold;
}

/* Align the rightmost cells */
.detailsList tr td:last-of-type {
    text-align: right;
    padding-right: 0;
}

/* Remove the padding of the bottom cells for correct whitespace below */
.detailsList tr:last-of-type td {
    padding-bottom: 0;
}

/* Combine the two list into one */
@media (max-width: 1150px) {
    .detailsContainer {
        grid-template-columns: 1fr;
    }

    .detailsBlock:last-of-type {
        border-top: 1px solid #e2e2e2;
    }

    .detailsBlock:first-of-type tr:first-of-type td:first-of-type {
        padding-top: 0;
    }

    .detailsBlock:first-of-type tr:last-of-type td:last-of-type {
        padding-bottom: 15px;
    }
}

@media (max-width: 650px) {
    .detailsList {
        grid-template-columns: 1fr;
    }

    .detailsList tr td:first-of-type {
        border-bottom: none;
        padding-bottom: 0;
    }

    .detailsList tr td:last-of-type {
        text-align: left;
        padding-top: 10px;
    }
}
</style>
