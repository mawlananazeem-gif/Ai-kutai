// Database kamus buatan (Bisa kamu tambah sendiri kosakatanya)
const kamusKutai = {
    "saya": "aku",
    "kamu": "awak / ikam",
    "tidak": "ndik",
    "ada": "bisi",
    "tidak ada": "ndik bisi",
    "apa": "apa",
    "kenapa": "gembela",
    "siapa": "hapa",
    "dimana": "ko tang mana",
    "ke mana": "ko mana",
    "makan": "makan",
    "tidur": "guring",
    "pergi": "tulah",
    "pulang": "bebulik",
    "malu": "supan",
    "cantik": "bungas",
    "bodoh": "pengintel",
    "bohong": "bual",
    "bicara": "kesah",
    "sangat": "benar",
    "bagus": "langkar",
    "kamu mau ke mana": "ikam ndak ko mana",
    "saya tidak tahu": "aku ndik tau",
    "jangan begitu": "ndik usah gito"
};

function sendMessage() {
    const inputEl = document.getElementById("userInput");
    const query = inputEl.value.trim().toLowerCase();
    
    if (query === "") return;

    // 1. Tampilkan pesan user di chat box
    appendMessage(inputEl.value, "user-msg");
    inputEl.value = ""; // Reset input

    // 2. Beri efek loading seolah-olah AI sedang mikir
    setTimeout(() => {
        let jawaban = translateKeKutai(query);
        appendMessage(jawaban, "bot-msg");
    }, 500);
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function appendMessage(text, className) {
    const chatBox = document.getElementById("chatBox");
    const messageEl = document.createElement("div");
    messageEl.classList.add("message", className);
    messageEl.innerText = text;
    chatBox.appendChild(messageEl);
    
    // Auto scroll ke bawah
    chatBox.scrollTop = chatBox.scrollHeight;
}

function translateKeKutai(kalimat) {
    // Cek apakah satu kalimat utuh ada di kamus
    if (kamusKutai[kalimat]) {
        return `Bahasa Kutai-nya: "${kamusKutai[kalimat]}"`;
    }

    // Jika tidak ada kalimat utuh, coba translate per kata
    let kataKata = kalimat.split(" ");
    let hasilTranslate = kataKata.map(kata => {
        // Hapus tanda baca ringan kalau ada
        let kataBersih = kata.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        return kamusKutai[kataBersih] ? kamusKutai[kataBersih] : kata;
    });

    let hasilAkhir = hasilTranslate.join(" ");

    // Jika sama sekali tidak ada perubahan kata
    if (hasilAkhir === kalimat) {
        return "Maaf, aku ndik tau maknanya. Kosakata itu belum masuk ke otak AI-ku.";
    }

    return `Kira-kira arti Kutai-nya: "${hasilAkhir}"`;
}
