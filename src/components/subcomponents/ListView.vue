<template>
    <div class="listView">
        <p class="listName">{{ title }}</p>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "ListView",
    props: {
        title: {
            type: String,
            required: true
        }
    }
};
</script>

<style>
.listName {
    font-size: 50px;
    font-weight: bold;
    color: var(--text-color);
    margin: 0;
    padding: 30px 0;
}

@media (max-width: 775px) {
    .listName {
        text-align: center;
    }
}
</style>
