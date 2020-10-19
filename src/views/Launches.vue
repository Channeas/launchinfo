<!-- Component displaying a list of all launches -->
<template>
    <div class="launches">
        <ViewBody>
            <ListView :title="contentList.title">
                <ImageList :contentList="contentList"></ImageList>
            </ListView>
        </ViewBody>
    </div>
</template>

<script>
import ViewBody from "@/components/ViewBody.vue";
import ListView from "@/components/ListView.vue";
import ImageList from "@/components/ImageList.vue";

export default {
    name: "Launches",
    components: {
        ViewBody,
        ListView,
        ImageList
    },
    data: function() {
        return {
            contentList: {
                title: "Upcoming launches",
                items: [
                    {
                        imageSrc:
                            "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launcher_images/falcon25209_image_20190224025007.jpeg",
                        imageTitle: "CAPE CANAVERAL, FLORIDA, USA",
                        title: "Starlink 12",
                        subTitle: "T- 00D 09H 55M",
                        description: "SpaceX | Falcon 9 Block 5",
                        id: 123
                    },
                    {
                        imageSrc:
                            "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launcher_images/falcon25209_image_20190224025007.jpeg",
                        imageTitle: "CAPE CANAVERAL, FLORIDA, USA",
                        title: "Starlink 13",
                        subTitle: "T- 00D 09H 55M",
                        description: "SpaceX | Falcon 9 Block 5",
                        id: 124
                    },
                    {
                        imageSrc:
                            "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launcher_images/falcon25209_image_20190224025007.jpeg",
                        imageTitle: "CAPE CANAVERAL, FLORIDA, USA",
                        title: "Starlink 14",
                        subTitle: "T- 00D 09H 55M",
                        description: "SpaceX | Falcon 9 Block 5",
                        id: 125
                    }
                ],
                urlPrefix: "/launches/"
            }
        };
    }
};
</script>
