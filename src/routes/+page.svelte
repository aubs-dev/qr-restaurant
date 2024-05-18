<script>
    export let data;
    // console.log("Images:", data.images);
</script>

<div class="grid">
    {#each data.images as image}
        <img src={`/images/${image}`} alt={image} />
    {/each}
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 10px;
    }
    .grid img {
        width: 100%;
        height: auto;
    }
</style>
