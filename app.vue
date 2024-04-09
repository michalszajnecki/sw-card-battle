<script setup lang="ts">
useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - SW Battle` : 'SW Battle';
    }
})
</script>

<template>
    <!-- <NuxtLoadingIndicator :throttle="0" :height="2" class="bg-orange" /> -->
    <NuxtLayout>
        <!-- <SeoKit />
        <OgImageScreenshot />
        <OgImageStatic /> -->
        <v-app>
            <NuxtPage />
        </v-app>
    </NuxtLayout>
    <!-- <UNotifications /> -->
</template>