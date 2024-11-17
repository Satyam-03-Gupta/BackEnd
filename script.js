const textarea = document.querySelector('label');
        
textarea.addEventListener('input', () => {
    document.body.style.backgroundColor = textarea.value ? '#e8f0ff' : '#fff';
});