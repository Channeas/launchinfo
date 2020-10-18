<!-- Component for keeping alignment and page width the same on different views -->
<template>
    <div class="viewBody">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "ViewBody"
};
</script>

<style>
.viewBody {
    width: 80%;
    max-width: var(--page-width);
    margin: auto;
}
</style>
