document.addEventListener('DOMContentLoaded', function() {
    const thankYouMessage = document.getElementById('thank-you');
    const contactNumber = document.getElementById('contact-number');
    const numberDisplay = document.getElementById('number');

    // Obtener la nota publicada
    const noteView = document.getElementById('note-view');

    // Mostrar la nota en la vista
    noteView.textContent = localStorage.getItem('note') || "Aquí aparecerá la nota del administrador.";

    document.getElementById('send-order').addEventListener('click', function() {
        const name = document.getElementById('name-input').value;
        const order = document.getElementById('order-input').value;

        if (name && order) {
            // Aquí se integraría EmailJS para enviar el mensaje
            thankYouMessage.style.display = 'block';
            contactNumber.style.display = 'block';
            numberDisplay.textContent = 'Número aquí'; // Añadir el número real después
            document.getElementById('name-input').value = '';
            document.getElementById('order-input').value = '';
        } else {
            alert("Por favor, completa todos los campos.");
        }
    });
});