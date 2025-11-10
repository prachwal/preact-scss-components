#!/bin/bash

# Skrypt do scalania wszystkich plików z folderu src do jednego pliku txt
# Użycie: ./merge-src.sh [output-file.txt]

OUTPUT_FILE="${1:-merged-src.txt}"
SRC_DIR="src"

echo "Scalanie plików z folderu $SRC_DIR do $OUTPUT_FILE..."
echo "" > "$OUTPUT_FILE"

# Funkcja do rekursywnego przetwarzania plików
process_files() {
    local dir="$1"
    local prefix="$2"

    # Przetwórz pliki w bieżącym katalogu
    for file in "$dir"/*; do
        if [ -f "$file" ]; then
            # Dodaj separator z nazwą pliku
            echo "==================================================================================" >> "$OUTPUT_FILE"
            echo "FILE: $prefix$(basename "$file")" >> "$OUTPUT_FILE"
            echo "==================================================================================" >> "$OUTPUT_FILE"
            echo "" >> "$OUTPUT_FILE"

            # Dodaj zawartość pliku
            cat "$file" >> "$OUTPUT_FILE"
            echo "" >> "$OUTPUT_FILE"
            echo "" >> "$OUTPUT_FILE"
        elif [ -d "$file" ]; then
            # Rekursywnie przetwórz podkatalog
            process_files "$file" "$prefix$(basename "$file")/"
        fi
    done
}

# Sprawdź czy folder src istnieje
if [ ! -d "$SRC_DIR" ]; then
    echo "Błąd: Folder $SRC_DIR nie istnieje!"
    exit 1
fi

# Dodaj nagłówek
echo "MERGED SOURCE CODE - $(date)" > "$OUTPUT_FILE"
echo "Generated from folder: $SRC_DIR" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Rozpocznij przetwarzanie
process_files "$SRC_DIR" ""

echo "Zakończono! Plik wyjściowy: $OUTPUT_FILE"
echo "Liczba linii: $(wc -l < "$OUTPUT_FILE")"