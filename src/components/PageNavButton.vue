<!-- Subcomponent used by the PageNavigation component as links to other pages -->
<template>
    <a
        :href="`?page=${buttonData.value}`"
        class="pageNavButton"
        v-if="buttonData.value != '...' && !buttonData.active"
        >{{ buttonData.value }}</a
    >
    <div
        v-else
        class="pageNavButton"
        :class="{ buttonActive: buttonData.active }"
    >
        {{ buttonData.value }}
    </div>
</template>

<script>
export default {
    name: "PageNavButton",
    props: {
        buttonData: {
            type: Object,
            required: true
        }
    },
    computed: {
        link: function() {
            return `/agencies?page=${this.pageNumber}`;
        }
    }
};
</script>

<style scoped>
.pageNavButton {
    height: 40px;
    width: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    text-decoration: none;
    color: #3e3e3e;
    margin: 0;
    user-select: none;
}

.buttonActive {
    background-color: #1885f2;
    color: #fff;
}

div {
    cursor: default;
}
</style>
