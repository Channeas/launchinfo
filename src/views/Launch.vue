<!-- Component displaying the details of a single launch -->
<template>
    <div class="launch">
        <ViewBody>
            <p>A single launch with the id {{ $route.params.launchId }}</p>
        </ViewBody>
    </div>
</template>

<script>
import ViewBody from "@/components/ViewBody.vue";

export default {
    name: "Launch",
    components: {
        ViewBody
    }
};
</script>
