<script setup lang="ts">
useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - SW Battle` : 'SW Battle';
    }
})

useSeoMeta({
    title: 'SW Battle Cards',
    ogTitle: 'SW Battle Cards',
    description: 'Unleash the Force in epic battles! Choose your side, master strategy, and dominate the galaxy in this Star Wars card game.',
    ogDescription: 'Unleash the Force in epic battles! Choose your side, master strategy, and dominate the galaxy in this Star Wars card game.',
    ogImage: 'https://sw-battle.vercel.app/login-screen.jpg',
    twitterCard: 'summary_large_image',
})
</script>

<template>
    <NuxtLayout>
        <v-app>
            <NuxtPage />
        </v-app>
    </NuxtLayout>
</template>