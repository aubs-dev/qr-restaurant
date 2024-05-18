<script>
    export let data;
    // console.log("Images:", data.images);
</script>

<div class="grid">
    {#each data.filename as filename, index}
        <div class="box">
            <img src={`/images/${filename}`} alt="sushi" />
            <h1>{data.name[index]}</h1>
        </div>
    {/each}
</div>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300&display=swap");

    .box {
        background-color: #a6a6a6;
    }

    h1 {
        font-family: "Noto Sans", sans-serif;
        font-size: 16px;
        text-align: center;
    }

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
