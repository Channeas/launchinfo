<!-- Regular list component -->
<template>
    <table class="list">
        <!-- Row displaying column names -->
        <thead v-if="listHead">
            <tr>
                <th v-for="(item, index) in listHead" :key="index">
                    {{ item }}
                </th>
            </tr>
        </thead>

        <!-- Actual list content -->
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
    components: {
        ListItem
    },

    name: "List",

    props: {
        buttonText: {
            type: String,
            required: false
        },

        /* Note that if the below parameter is true, .list grid-template-columns 
           requires an additional column, and the table header requires either a 
           description of the button, or an empty cell */
        hasButton: {
            type: Boolean,
            required: false
        },

        listData: {
            type: Array,
            required: true
        },

        listHead: {
            type: Array,
            required: false
        }
    }
};
</script>

<style>
.list {
    display: grid;
    min-width: 100%;
    border-collapse: collapse;
    overflow: hidden;

    /* Override this value for custom cell sizes */
    grid-template-columns: min-content minmax(0, 1fr);
}

thead,
tbody,
tr {
    display: contents;
}

th {
    text-align: left;
    padding-left: 30px;
}

td {
    border-bottom: 1px solid #e2e2e2;
    background-color: #fff;
}

.dataColumn {
    padding: 15px 0 15px 30px;
}

.list tr .dataColumn:first-of-type,
.list tr th:first-of-type {
    padding-left: 0;
}

.list tr:last-of-type td {
    border: none;
}

.list .buttonColumn {
    padding-left: 30px;
    background-color: #fff;
}
</style>
