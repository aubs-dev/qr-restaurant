<script>
    export let data;
</script>

<header>Fresh Taste Sushi</header>
<div class="sub-header">
    ( 883 148 992
    <img src="whatsapp.svg" alt="whatsapp logo" /> )
</div>

{#each data.category.id as id, i}
    <h2>{data.category.name[i]} [ {data.category.amount[i]} SZT ]</h2>

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
    @import url("https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap");
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");

    * {
        margin: 0;
        padding: 0;
        list-style: none;
        text-decoration: none;
    }

    h2 {
        font-family: "Roboto Slab", serif;
        font-size: 1rem;
        color: #ffffff;
        background-color: #000000;
        padding: 0.25em 0.75em;
        width: 16em;
        border-radius: 0px 50px 50px 0px;
        margin-top: 1em;
    }

    h3 {
        margin-left: 8px;
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-size: 0.8rem;
    }

    p {
        width: 1.75rem;
        height: 1.75rem;
        color: #ffffff;
        background-color: #d5133a;
        font-family: "Poppins", sans-serif;
        font-size: 1rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        border-radius: 50%;
        position: absolute; /* Positions the element absolutely relative to the parent */
        top: 0; /* Aligns the top of the paragraph with the top of the parent */
        left: 0; /* Aligns the left of the paragraph with the left of the parent */
        z-index: 9999;
    }

    header {
        font-family: "Poppins", sans-serif;
        font-weight: 700;
        font-size: 1.25rem;

        width: 100%;
        color: #000;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 0.75rem;
        padding: 1em 0em;
    }

    .sub-header {
        color: #fff;
        background-color: #d5133a;
        font-family: "Poppins", sans-serif;
        font-weight: 700;
        font-size: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 0.5em 0em;
        border-bottom: 5px solid #000;
    }

    .sub-header > img {
        margin-left: 0.5em;
        width: 1.5rem;
    }

    .box {
        position: relative;
        background-color: #d6d6d6;
        border-radius: 10px;
        text-align: center;
    }

    .grid {
        padding: 10px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 0.25fr));
        gap: 10px;
    }
    .grid img {
        width: 100%;
        height: auto;
    }
</style>
