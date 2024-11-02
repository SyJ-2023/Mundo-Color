document.addEventListener('DOMContentLoaded', function() {
    const publishNoteButton = document.getElementById('publish-note');
    const noteInput = document.getElementById('note-input');
    const noteView = document.getElementById('note-view');

    const fileInput = document.getElementById('file-input');
    const publishFileButton = document.getElementById('publish-file');
    const filePreview = document.getElementById('file-preview');
    const publishedFiles = document.getElementById('published-files');

    const curriculumInput = document.getElementById('curriculum-input');
    const curriculumPriceInput = document.getElementById('curriculum-price');
    const publishCurriculumButton = document.getElementById('publish-curriculum');
    const curriculumPreview = document.getElementById('curriculum-preview');
    const publishedCurriculums = document.getElementById('published-curriculums');
    const publishPriceButton = document.getElementById('publish-price');

    let globalPrice = ''; // Variable para almacenar el precio global de los currículums

    // Cargar nota desde localStorage
    const storedNote = localStorage.getItem('note');
    if (storedNote) {
        noteView.textContent = storedNote;
    }

    // Cargar precio global desde localStorage
    const storedGlobalPrice = localStorage.getItem('globalPrice');
    if (storedGlobalPrice) {
        globalPrice = storedGlobalPrice;
        alert(`Precio global restaurado a $${globalPrice}`);
    }

    // Manejo de notas
    publishNoteButton.addEventListener('click', function() {
        const note = noteInput.value;
        if (note) {
            localStorage.setItem('note', note); // Guardar la nota en localStorage
            noteView.textContent = note;
            noteInput.value = '';
        } else {
            alert("Por favor, escribe una nota.");
        }
    });

    // Manejo de publicaciones (archivos)
    fileInput.addEventListener('change', function() {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                filePreview.innerHTML = `<img src="${e.target.result}" alt="Preview" />`;
            };
            reader.readAsDataURL(file);
        }
    });

    publishFileButton.addEventListener('click', function() {
        const file = fileInput.files[0];
        if (file) {
            const fileDiv = document.createElement('div');
            fileDiv.className = 'published-file';
            fileDiv.innerHTML = `
                <img src="${URL.createObjectURL(file)}" alt="${file.name}" />
                <p>${file.name}</p>
                <button class="remove-file">Eliminar</button>
            `;
            publishedFiles.appendChild(fileDiv);
            fileInput.value = ''; // Limpiar la entrada de archivo
            filePreview.innerHTML = ''; // Limpiar la vista previa

            // Manejar la eliminación
            fileDiv.querySelector('.remove-file').addEventListener('click', function() {
                publishedFiles.removeChild(fileDiv);
            });
        } else {
            alert("Por favor, selecciona un archivo.");
        }
    });

    // Manejo de currículums
    curriculumInput.addEventListener('change', function() {
        const file = curriculumInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                curriculumPreview.innerHTML = `<img src="${e.target.result}" alt="Curriculum Preview" />`;
            };
            reader.readAsDataURL(file);
        }
    });

    publishCurriculumButton.addEventListener('click', function() {
        const file = curriculumInput.files[0];
        if (file) {
            const curriculumDiv = document.createElement('div');
            curriculumDiv.className = 'published-curriculum';
            curriculumDiv.innerHTML = `
                <img src="${URL.createObjectURL(file)}" alt="${file.name}" />
                <p>${globalPrice ? `$${globalPrice}` : 'Precio no establecido'}</p>
                <button class="remove-curriculum">Eliminar</button>
            `;
            publishedCurriculums.appendChild(curriculumDiv);
            curriculumInput.value = ''; // Limpiar la entrada de currículum
            curriculumPreview.innerHTML = ''; // Limpiar la vista previa

            // Manejar la eliminación
            curriculumDiv.querySelector('.remove-curriculum').addEventListener('click', function() {
                publishedCurriculums.removeChild(curriculumDiv);
            });
        } else {
            alert("Por favor, selecciona un currículum.");
        }
    });

    // Manejo de precio global
    publishPriceButton.addEventListener('click', function() {
        const price = curriculumPriceInput.value;
        if (price) {
            globalPrice = price;
            localStorage.setItem('globalPrice', globalPrice); // Guardar el precio en localStorage
            alert(`Precio global establecido a $${globalPrice}`);
            curriculumPriceInput.value = ''; // Limpiar el campo de precio
        } else {
            alert("Por favor, ingresa un precio.");
        }
    });
});