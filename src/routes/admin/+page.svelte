<script>
    export let data;

    let file;
    let formData = {
        table_id: 0, // 0 is menu, 1 is categories
        table_mode: 0, // 0 is add, 1 is remove
        remove_id: "", // id to remove
        // Menu
        img_url: "",
        menu_name: "",
        menu_price: 0,
        category_id: 0,
        // Category
        category_name: "",
        category_amount: 0,
    };

    async function add_data(tableID) {
        formData.table_id = tableID;
        formData.table_mode = 0;

        // Basic validation
        const isFileValid = tableID === 0 ? file.files[0] !== undefined : true;
        const isMenuNameValid =
            tableID === 0 ? formData.menu_name !== "" : true;
        // const isMenuNameUnique =
        // tableID == 0 ? !data.menu.name.includes(formData.menu_name) : true;
        const isCategoryIdValid =
            tableID === 0
                ? data.category.id.includes(formData.category_id)
                : true;

        const isCategoryNameValid =
            tableID === 1 ? formData.category_name !== "" : true;
        const isCategoryNameUnique =
            tableID === 1
                ? !data.category.name.includes(formData.category_name)
                : true;

        if (
            isFileValid &&
            isMenuNameValid &&
            // isMenuNameUnique &&
            isCategoryIdValid &&
            isCategoryNameValid &&
            isCategoryNameUnique
        ) {
            if (tableID == 0) {
                const fd = new FormData();
                fd.append("file", file.files[0]);

                const response = await fetch("/api/image", {
                    method: "POST",
                    body: fd,
                });

                // Prepare image url for data upload
                const result = await response.json();
                formData.img_url = result.url;
            }

            const response = await fetch("/api/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
        } else {
            alert("Incorrect form input, try again.");
        }
    }

    async function remove_data(tableID, itemID) {
        formData.table_id = tableID;
        formData.table_mode = 1;
        formData.remove_id = itemID;

        const response = await fetch("/api/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
    }

    function add_overlay() {
        const overlay = document.getElementById("loading-menu");
        overlay.style.display = "";
    }

    function do_reload() {
        setTimeout(() => {
            window.location.reload();
        }, 350);
    }

    async function handle_menu() {
        add_overlay();
        await add_data(0);
        do_reload();
    }

    async function handle_category() {
        add_overlay();
        await add_data(1);
        do_reload();
    }

    async function handle_remove(tableID, itemID) {
        add_overlay();
        await remove_data(tableID, itemID);
        do_reload();
    }

    async function nuke_database() {
        const isConfirmed = confirm(
            "Are you sure you want to delete the entire database? This action cannot be undone."
        );

        add_overlay();

        if (isConfirmed) {
            const response = await fetch("/api/nuke", {
                method: "POST",
                body: {},
            });
        }

        do_reload();
    }
</script>

<h1>ADMIN MENU</h1>

<h2>Category</h2>
<hr />
{#if data.category.name[0]}
    <mark>notice: removing a category removes all its items</mark>
    {#each data.category.name as name, index}
        <div class="visual-item">
            <button
                class="remove-button"
                on:click={() => handle_remove(1, data.category.id[index])}
            >
                <img src="remove.svg" alt="remove item" />
            </button>
            <p>{name}</p>
        </div>
    {/each}
{:else}
    <mark>no categories found</mark>
{/if}
<hr />

<form on:submit={handle_category}>
    <label>
        Name (no duplicates): <input
            required
            type="text"
            bind:value={formData.category_name}
        />
    </label>
    <br />
    <label>
        Amount: <input type="number" bind:value={formData.category_amount} />
    </label>
    <br />
    <button type="submit">Add Category</button>
</form>

<hr />

<h2>Menu</h2>
<hr />
{#if data.category.name[0]}
    {#if data.menu.name[0]}
        {#each data.category.id as id, category_index}
            <h3>( {data.category.name[category_index]} )</h3>
            {#if data.menu.category_id.includes(id)}
                {#each data.menu.name as name, index}
                    {#if data.menu.category_id[index] === id}
                        <div class="visual-item">
                            <button
                                class="remove-button"
                                on:click={(event) =>
                                    handle_remove(
                                        event,
                                        0,
                                        data.menu.img_url[index]
                                    )}
                            >
                                <img src="remove.svg" alt="remove item" />
                            </button>
                            <p>{name}</p>
                        </div>
                    {/if}
                {/each}
            {:else}
                <mark>category is empty</mark>
            {/if}
        {/each}
    {:else}
        <mark>no items found</mark>
    {/if}
{:else}
    <mark>no categories found</mark>
{/if}
<hr />

<form on:submit={handle_menu}>
    <label>
        Image: <input
            required
            type="file"
            accept="image/jpeg,image/png"
            autocomplete="off"
            bind:this={file}
        />
    </label>
    <br />
    <label>
        Name (no duplicates per category): <input
            required
            type="text"
            bind:value={formData.menu_name}
        />
    </label>
    <br />
    <label>
        Price: <input type="number" bind:value={formData.menu_price} />
    </label>
    <br />
    <label>
        Category:
        <select required bind:value={formData.category_id}>
            {#each data.category.id as id, index}
                <option value={id}>{data.category.name[index]}</option>
            {/each}
        </select>
    </label>
    <br />
    <button type="submit">Add Item</button>
</form>

<hr />
<br />

<!-- <mark>Delete database (WARNING Irreversible):</mark>
<button on:click={nuke_database}>delete</button> -->

<div id="loading-menu" class="overlay" style="display: none;">Loading</div>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap");
    @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

    h1,
    h2,
    h3 {
        font-family: "Roboto Slab", serif;
    }

    mark,
    label,
    p {
        font-family: "Poppins", sans-serif;
    }

    .visual-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;
    }

    .visual-item > *:not(:first-child) {
        padding-left: 10px;
    }

    .overlay {
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 64px;
        background-color: rgba(1, 1, 1, 0.75);
        bottom: 0;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
    }
</style>
