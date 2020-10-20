<!-- Component that is used as the rows in the List.vue component -->
<template>
    <tr class="listItem">
        <td
            v-for="(item, index) in rowItem.rowData"
            :key="index"
            class="dataColumn"
        >
            {{ item }}
        </td>
        <td v-if="hasButton" class="buttonColumn">
            <router-link :to="rowItem.rowLink" class="listButton">{{
                buttonText
            }}</router-link>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        rowItem: {
            type: Object,
            required: true
        },
        hasButton: {
            type: Boolean,
            required: false
        },
        buttonText: {
            type: String,
            required: false
        }
    },
    name: "ListItem"
};
</script>

<style>
td {
    white-space: nowrap;
    overflow: hidden;
}

.buttonColumn {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.listButton {
    padding: 5px 11px;
    border: 1px solid #1885f2;
    border-radius: 5px;
    color: #1885f2;
    background-color: #fff;
    display: block;
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
}
</style>
