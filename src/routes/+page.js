import Papa from 'papaparse';

export async function load({fetch}) {
  const response = await fetch('/images.csv');
  const csvText = await response.text();
  // console.log(csvText);  // Check if the CSV content is fetched
  const result = Papa.parse(csvText, {header: true});
  // console.log(result.data);  // Check parsed CSV data
  return {images: result.data.map(row => row.filename)};
}