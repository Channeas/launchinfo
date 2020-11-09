<!-- Component for displaying attribution -->
<template>
    <div class="attribution">
        <p>
            <span class="attributionSection"
                >Built by
                <a href="https://johannes.software">Johannes Idarsson</a></span
            >
            <span class="attributionDivider"> | </span>
            <span class="attributionSection"
                >Data from
                <a href="https://thespacedevs.com/"> The Space Devs </a></span
            >
        </p>
    </div>
</template>

<script>
export default {
    name: "Attribution"
};
</script>

<style>
.attribution {
    text-align: center;
}

.attribution p {
    margin: 0;
    padding: 1em;
}

.attribution a {
    color: #1885f2;
}

@media (max-width: 600px) {
    .attributionSection {
        display: block;
    }

    .attributionDivider {
        display: none;
    }
}
</style>
