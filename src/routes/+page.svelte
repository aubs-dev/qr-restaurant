<script>
    export let data;
    // console.log(data.menu.name[2]);
</script>

{#each data.category.id as id, i}
    <h2>{data.category.name[i]}</h2>
    <div class="grid">
        {#each data.menu.category_id as category_id, j}
            {#if category_id === id}
                <div class="box">
                    <img
                        src={`${data.menu.img_url[j]}`}
                        alt="sushi"
                        width="100%"
                    />
                    <h3>{data.menu.name[j]}</h3>
                    <p>{data.menu.price[j]}</p>
                </div>
            {/if}
        {/each}
    </div>
{/each}

<style>
    @import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300&display=swap");

    .box {
        background-color: #a6a6a6;
    }

    h1,
    p {
        font-family: "Noto Sans", sans-serif;
        font-size: 16px;
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
