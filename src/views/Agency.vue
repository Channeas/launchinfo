<!-- Component displaying the details of a single agency -->
<template>
    <div class="agency">
        <ViewBody>
            <p>A single agency with the id {{ $route.params.agencyId }}</p>
        </ViewBody>
    </div>
</template>

<script>
import ViewBody from "@/components/ViewBody.vue";

export default {
    name: "Agency",
    components: {
        ViewBody
    }
};
</script>
