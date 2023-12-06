function tambahBuku() {
    const judulBuku = document.getElementById('judulBuku').value;
    const penulisBuku = document.getElementById('penulisBuku').value;
    const tahunBuku = parseInt(document.getElementById('tahunBuku').value);
    const idBuku = generateId(); 

    if (judulBuku !== '' && penulisBuku !== '' && !isNaN(tahunBuku)) {
        const bukuBaru = {
            id: idBuku,
            title: judulBuku,
            author: penulisBuku,
            year: tahunBuku,
            isComplete: false
        };

        let daftarBuku = JSON.parse(localStorage.getItem('daftarBuku')) || [];
        daftarBuku.push(bukuBaru);
        localStorage.setItem('daftarBuku', JSON.stringify(daftarBuku));

        tampilkanRakBuku();

        document.getElementById('judulBuku').value = '';
        document.getElementById('penulisBuku').value = '';
        document.getElementById('tahunBuku').value = '';
    }
}

function pindahkanBuku(id, rak) {
    let daftarBuku = JSON.parse(localStorage.getItem('daftarBuku')) || [];
    const index = daftarBuku.findIndex(buku => buku.id === id);

    if (index !== -1) {
        daftarBuku[index].isComplete = rak === 'selesaiDibaca';
        localStorage.setItem('daftarBuku', JSON.stringify(daftarBuku));

        tampilkanRakBuku();
    }
}

function hapusBuku(id) {
    let daftarBuku = JSON.parse(localStorage.getItem('daftarBuku')) || [];
    const index = daftarBuku.findIndex(buku => buku.id === id);

    if (index !== -1) {
        daftarBuku.splice(index, 1);
        localStorage.setItem('daftarBuku', JSON.stringify(daftarBuku));

        tampilkanRakBuku();
    }
}

function tampilkanRakBuku() {
    const rakBelumSelesai = document.getElementById('belumSelesaiDibaca');
    const rakSelesai = document.getElementById('selesaiDibaca');
    rakBelumSelesai.innerHTML = '';
    rakSelesai.innerHTML = '';

    let daftarBuku = JSON.parse(localStorage.getItem('daftarBuku')) || [];

    daftarBuku.forEach(buku => {
        const li = document.createElement('li');
        li.innerHTML = `${buku.title} oleh ${buku.author} (${buku.year})`;

        const pindahButton = document.createElement('button');
        pindahButton.textContent = buku.isComplete ? 'Pindahkan ke Belum Selesai' : 'Pindahkan ke Selesai';
        pindahButton.classList.add('bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded-lg', 'mt-2', 'mx-4','hover:bg-blue-600');
        pindahButton.addEventListener('click', () => pindahkanBuku(buku.id, buku.isComplete ? 'belumSelesaiDibaca' : 'selesaiDibaca'));

        const hapusButton = document.createElement('button');
        hapusButton.textContent = 'Hapus';
        hapusButton.classList.add('bg-red-500', 'text-white', 'px-4', 'py-2', 'rounded-lg', 'mt-2', 'hover:bg-red-600');
        hapusButton.addEventListener('click', () => hapusBuku(buku.id));

        li.appendChild(pindahButton);
        li.appendChild(hapusButton);

        if (buku.isComplete) {
            rakSelesai.appendChild(li);
        } else {
            rakBelumSelesai.appendChild(li);
        }
    });
}

tampilkanRakBuku();

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}
