# Tugas Besar Strategi Algoritma
Kelompok:
1. Muhammad Fikri Wahidin (1301213505)
2. Mursyid Najib Muhana (1301210411)
3. Rashad Izza Andredi (1301213309)

Progress: 100%

# Tata Cara Mengakses Program Ini:
Daftar hal yang harus dilakukan sebelum menggunakan program kami:
1. Menginstall Text Editor (Visual Studio Code, Sublime Text, Notepad++, dll)

Anda dapat langsung mengakses program dengan membuka file “index.html” yang berada pada folder public.

# Tata Cara Memodifikasi Program Ini:

Daftar hal yang harus dilakukan sebelum menggunakan program kami:
1. Menginstall Text Editor (Visual Studio Code, Sublime Text, Notepad++, dll)
2. Menginstall node.js

Pertama-tama anda harus mengunduh atau melakukan clone terhadap file repository ini. Kemudian buka folder repositorynya menggunakan text editor anda (pada proses pengerjaan, kami menggunakan text editor Visual Studio Code). Setelah program dibuka, buka terminal sesuai dengan direktori file repository yang telah anda unduh. Kemudian ketikkan “npm run build” pada terminal dan tekan enter. Setelah itu anda dapat langsung mengakses program dengan membuka file “index.html” di dalam folder public. Jika anda ingin mengedit file css, maka edit file "input.css" yang berada pada folder src\css (pastikan sudah menjalankan "npm run build").

# Contoh input graf dengan format JSON:

Contoh graf 1:
{ 
"A": {"B": 4, "C": 2}, 
"B": {"C": 3, "D": 2, "E": 3}, 
"C": {"B": 1, "D": 4, "E": 5 }, 
"D": {"C": 5, "E": 2}, 
"E": {"D": 1} 
}

Contoh graf 2:
{ 
"A": {"B": 3}, 
"B": {"A": 3, "C": 4, "D": 5, "E": 3}, 
"C": {"B": 4, "H": 6 }, 
"D": {"B": 5, "F": 2}, 
"E": {"B": 3, "F": 4, "G": 2}, 
"F": {"D": 3, "E": 4}, 
"G": {"E": 2, "H": 4, "J": 3}, 
"H": {"G": 4, "I": 2, "C": 6}, 
"I": {"H": 2, "J": 5, "M": 10}, 
"J": {"G": 3, "I": 5, "K": 1}, 
"K": {"J": 1, "L": 4}, 
"L": {"M": 5, "K": 4}, 
"M": {"O": 2, "L": 5, "I": -10, "N": 6}, 
"N": {"M": 6, "P": 9}, 
"O": {"M": 2, "S": 10, "Z": -8}, 
"P": { "N": 9, "R": 3, "T": 4}, 
"Q": { "S": 4, "U": 2}, 
"R": { "P": 3, "AA": 2, "AC": 5 }, 
"S": { "O": 10, "Q": 4, "V": 2}, 
"T": {"P": 4, "U": 1, "W": 2, "AC": 3}, 
"U": { "Q": 2, "V": 3, "X": 2, "T": 1}, 
"V": { "S": 2, "Y": 3, "U": 3}, 
"W": { "T": 2, "AG": 3 }, 
"X": { "U": 2, "Y": 4}, 
"Y": {"V": 3, "X": 4}, 
"Z": {"AK": 3, "AA": 6},
"AA": {"AB": 3, "R": 2, "Z": 6, "AJ": 4}, 
"AB": {"AA": 3, "AI": 3, "AC": 2.5, "AD": 1.5}, 
"AC": {"R": 5, "AB": 2.5, "AE": 1.5, "T": 3 }, 
"AD": {"AB": 1.5, "AF": 1.5, "AE": 2}, 
"AE": {"AC": 1.5, "AG": 1.5, "AD": 2}, 
"AF": {"AD": 1.5, "AG": 4, "AH": 3}, 
"AG": {"W": 3, "AF": 4, "AE": 1.5}, 
"AH": {"AF": 3, "AI": 4, "AO": 2}, 
"AI": {"AH": 4, "AB": 3, "AJ": 2, "AN": 4}, 
"AJ": {"AI": 2, "AM": 3, "AK": 5, "AA": 4}, 
"AK": {"AL": 4, "Z": 3, "AJ": 5}, 
"AL": {"AK": 4, "AM": 6}, 
"AM": {"AL": 6, "AJ": 3, "AN": 3}, 
"AN": {"AM": 3, "AI": 4, "AO": 5}, 
"AO": {"AN": 5,  "AH": 2} 
}


