<!-- Component used on the views displaying lists giving a uniform title -->
<template>
    <div class="listView">
        <h1 class="listName">{{ title }}</h1>
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
