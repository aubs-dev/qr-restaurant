import supabase from '$lib/db';

export async function load() {
  let {data: menu} = await supabase.from('menu').select('*');
  let {data: category} = await supabase.from('categories').select('*');

  return {
    menu: {
      img_url: menu.map(row => row.img_url),
      name: menu.map(row => row.name),
      price: menu.map(row => row.price),
      category_id: menu.map(row => row.category_id),
    },
    category: {
      id: category.map(row => row.id),
      name: category.map(row => row.name),
      amount: category.map(row => row.amount),
    }
  };
}