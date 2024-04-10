<script setup lang="ts">
useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - SW Battle` : 'SW Battle';
    }
})
</script>

<template>
    <NuxtLayout>
        <v-app>
            <NuxtPage />
        </v-app>
    </NuxtLayout>
</template>