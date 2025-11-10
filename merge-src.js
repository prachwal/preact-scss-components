#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = 'src';
const OUTPUT_FILE = process.argv[2] || 'merged-src-node.txt';

console.log(`Scalanie plików z folderu ${SRC_DIR} do ${OUTPUT_FILE}...`);

// Funkcja do rekursywnego przetwarzania plików
function processDirectory(dirPath, relativePath = '') {
    const items = fs.readdirSync(dirPath);
    let content = '';

    items.forEach(item => {
        const fullPath = path.join(dirPath, item);
        const relPath = relativePath ? `${relativePath}/${item}` : item;
        const stat = fs.statSync(fullPath);

        if (stat.isFile()) {
            // Dodaj separator z nazwą pliku
            content += '='.repeat(80) + '\n';
            content += `FILE: ${relPath}\n`;
            content += '='.repeat(80) + '\n\n';

            // Dodaj zawartość pliku
            try {
                const fileContent = fs.readFileSync(fullPath, 'utf8');
                content += fileContent + '\n\n';
            } catch (error) {
                content += `Error reading file: ${error.message}\n\n`;
            }
        } else if (stat.isDirectory()) {
            // Rekursywnie przetwórz podkatalog
            content += processDirectory(fullPath, relPath);
        }
    });

    return content;
}

// Sprawdź czy folder src istnieje
if (!fs.existsSync(SRC_DIR)) {
    console.error(`Błąd: Folder ${SRC_DIR} nie istnieje!`);
    process.exit(1);
}

// Utwórz zawartość pliku
let output = `MERGED SOURCE CODE - ${new Date().toString()}\n`;
output += `Generated from folder: ${SRC_DIR}\n\n`;
output += processDirectory(SRC_DIR);

// Zapisz do pliku
fs.writeFileSync(OUTPUT_FILE, output, 'utf8');

console.log(`Zakończono! Plik wyjściowy: ${OUTPUT_FILE}`);
console.log(`Liczba linii: ${output.split('\n').length}`);