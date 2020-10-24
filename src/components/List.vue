<!-- Regular list component -->
<template>
    <table class="list">
        <thead v-if="listHead">
            <tr>
                <th v-for="(item, index) in listHead" :key="index">
                    {{ item }}
                </th>
            </tr>
        </thead>
        <tbody>
            <ListItem
                v-for="(item, index) in listData"
                :rowItem="item"
                :key="index"
                :hasButton="hasButton"
                :buttonText="buttonText"
            ></ListItem>
        </tbody>
    </table>
</template>

<script>
import ListItem from "./ListItem";

export default {
    props: {
        listHead: {
            type: Array,
            required: false
        },
        listData: {
            type: Array,
            required: true
        },
        /* Note that if the below parameter is true, .list grid-template-columns 
           requires an additional column, and the table header requires either a 
           description of the button, or an empty cell */
        hasButton: {
            type: Boolean,
            required: false
        },
        buttonText: {
            type: String,
            required: false
        }
    },
    components: {
        ListItem
    },
    name: "List"
};
</script>

<style>
.list {
    display: grid;
    min-width: 100%;
    border-collapse: collapse;

    /* Override this value for custom cell sizes */
    grid-template-columns: 1fr min-content;
}

thead,
tbody,
tr {
    display: contents;
}

td {
    border-bottom: 1px solid #e2e2e2;
}

.dataColumn {
    padding: 15px 40px 15px 0;
}

.list tr:last-of-type td {
    border: none;
}

th {
    text-align: left;
}
</style>
