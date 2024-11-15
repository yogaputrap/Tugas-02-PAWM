let isDropped = false;

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    if (!isDropped) {
        event.dataTransfer.setData("text", event.target.id);
        event.target.classList.add('dragging'); // Tambahkan class 'dragging' saat di-drag
    }
}

function drop(event) {
    event.preventDefault();
    if (!isDropped) {
        const draggedElementId = event.dataTransfer.getData("text");
        const draggedElement = document.getElementById(draggedElementId);
        const dropTarget = document.getElementById('kotak'); // Mendapatkan elemen kotak

        // Menghitung posisi kotak
        const dropTargetRect = dropTarget.getBoundingClientRect();

        // Memastikan elemen di-drop di atas kotak
        const isOverDropTarget = (
            event.clientX >= dropTargetRect.left &&
            event.clientX <= dropTargetRect.right &&
            event.clientY >= dropTargetRect.top &&
            event.clientY <= dropTargetRect.bottom
        );

        if (isOverDropTarget) {
            // Mengatur posisi elemen yang di-drop tepat di tengah kotak
            draggedElement.style.position = "absolute";
            draggedElement.style.left = `${dropTargetRect.left + dropTargetRect.width / 2 - draggedElement.width / 2}px`;
            draggedElement.style.top = `${dropTargetRect.top + dropTargetRect.height / 2 - draggedElement.height / 2}px`;

            document.body.appendChild(draggedElement); // Menambahkan elemen ke body agar bisa diposisikan

            draggedElement.classList.remove('dragging'); // Hapus class dragging setelah drop
            isDropped = true; // Prevents further drops

            // Menampilkan nilai berdasarkan elemen yang di-drop
            showValue(draggedElementId);

            // Mengaktifkan tombol restart
            activateRestartButton();

            // Hide instruction1 and show instruction2
            document.getElementById('instruction1').style.display = 'none';
            document.getElementById('instruction2').style.display = 'block';
        }
    }
}

function showValue(elementId) {
    const displayText = document.getElementById('displayText');
    displayText.style.display = 'block'; // Tampilkan nilai

    // Sembunyikan semua elemen nilai
    const allValues = ['nilaimg', 'nilaimn', 'nilaipb', 'nilaizn', 'nilaiba', 'nilaili'];
    allValues.forEach(id => {
        document.getElementById(id).style.display = 'none'; // Sembunyikan semua
    });

    // Tampilkan nilai sesuai dengan elemen yang di-drop
    switch (elementId) {
        case 'mg':
            document.getElementById('nilaimg').style.display = 'block';
            break;
        case 'mn':
            document.getElementById('nilaimn').style.display = 'block';
            break;
        case 'pb':
            document.getElementById('nilaipb').style.display = 'block';
            break;
        case 'zn':
            document.getElementById('nilaizn').style.display = 'block';
            break;
        case 'ba':
            document.getElementById('nilaiba').style.display = 'block';
            break;
        case 'li':
            document.getElementById('nilaili').style.display = 'block';
            break;
    }
}

function activateRestartButton() {
    const restartBtn = document.getElementById('restartBtn');
    restartBtn.classList.add('active'); // Tambahkan kelas aktif untuk mengubah gaya
}

function restartPage() {
    location.reload(); // Reload halaman untuk mengembalikan ke keadaan awal
    // Show instruction1 and hide instruction2 on restart
    document.getElementById('instruction1').style.display = 'block';
    document.getElementById('instruction2').style.display = 'none';
}