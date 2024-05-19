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
        const isCategoryIdValid =
            tableID === 0
                ? data.category.id.includes(formData.category_id)
                : true;

        let isCategoryNameValid =
            tableID === 1 ? formData.category_name !== "" : true;
        isCategoryNameValid =
            tableID === 1
                ? !data.category.name.includes(formData.category_name)
                : true;

        if (
            isFileValid &&
            isMenuNameValid &&
            isCategoryIdValid &&
            isCategoryNameValid
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

    async function handle_menu() {
        await add_data(0);
        window.location.reload();
    }

    async function handle_category() {
        await add_data(1);
        window.location.reload();
    }

    async function handle_remove(event, tableID, itemID) {
        // Hide visual item once pressed
        event.target.parentNode.parentNode.style.display = "none";

        await remove_data(tableID, itemID);
        window.location.reload();
    }

    // TODO: look into handling removing the submission button on bad input (bug)
    function hide_button(event) {
        // Hide button once pressed
        event.target.style.display = "none";
    }
</script>

<mark>Delete database (WARNING Irreversible):</mark>
<button on:click={() => alert("That was close :P")}>delete</button>

<h2>info: removing a category removes all its items</h2>
<h1>[ Category ]</h1>
{#if data.category.name[0]}
    <hr />
    {#each data.category.name as name, index}
        <div class="visual-item">
            <button
                class="remove-button"
                on:click={(event) =>
                    handle_remove(event, 1, data.category.id[index])}
            >
                <img src="remove.svg" alt="remove item" />
            </button>
            <p>{name}</p>
        </div>
    {/each}
    <hr />
{:else}
    <h2>- no categories found</h2>
{/if}

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
    <button type="submit" on:click={(event) => hide_button(event)}
        >Submit</button
    >
</form>

<br />

<h1>[ Menu ]</h1>
{#if data.menu.name[0]}
    <hr />
    {#each data.menu.name as name, index}
        <div class="visual-item">
            <button
                class="remove-button"
                on:click={(event) =>
                    handle_remove(event, 0, data.menu.img_url[index])}
            >
                <img src="remove.svg" alt="remove item" />
            </button>
            <p>{name}</p>
        </div>
    {/each}
    <hr />
{:else}
    <h2>- no items found</h2>
{/if}

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
        Name: <input required type="text" bind:value={formData.menu_name} />
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
    <button type="submit" on:click={(event) => hide_button(event)}
        >Submit</button
    >
</form>

<style>
    .visual-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;
    }

    .visual-item > *:not(:first-child) {
        padding-left: 10px;
    }
</style>
