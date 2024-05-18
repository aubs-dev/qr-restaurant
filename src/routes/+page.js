import Papa from 'papaparse';

export async function load({fetch}) {
  const response = await fetch('/images.csv');
  const csvText = await response.text();
  const result = Papa.parse(csvText, {header: true});

  return {
    filename: result.data.map(row => row.filename),
    name: result.data.map(row => row.name),
  };
}