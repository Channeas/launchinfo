<!-- Component displaying a list of all launches -->
<template>
    <div class="launches">
        <ViewBody><p>Launches</p></ViewBody>
    </div>
</template>

<script>
import ViewBody from "@/components/ViewBody.vue";

export default {
    name: "Launches",
    components: {
        ViewBody
    }
};
</script>
