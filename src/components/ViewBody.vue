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
    width: var(--page-width);
    max-width: var(--page-max-width);
    margin: var(--page-margin);
}
</style>
