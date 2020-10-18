<!-- Component displaying the details of a single rocket -->
<template>
    <div class="rocket">
        <ViewBody>
            <p>A single rocket with the id {{ $route.params.rocketId }}</p>
        </ViewBody>
    </div>
</template>

<script>
import ViewBody from "@/components/ViewBody.vue";

export default {
    name: "Rocket",
    components: {
        ViewBody
    }
};
</script>
