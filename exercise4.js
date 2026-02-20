// exercise4.js

const editList = document.querySelector('#edit-list');

editList.addEventListener('dblclick', function(event) {

    // 1. Find closest .edit-item from event.target; return if null
    const item = event.target.closest('.edit-item');
    if (!item) return;
    
    // 2. Return early if item already has .editing class
    if (item.classList.contains('editing')) return;
    
    // 3. Save original text, clear item, create and append input
    const originalText = item.textContent;
    item.textContent = '';
    
    const input = document.createElement('input');
    input.value = originalText;
    item.appendChild(input);
    item.classList.add('editing');
    input.focus();
    
    // Flag to prevent double firing
    let committed = false;
    
    // -- Helper: commit the edit --
    function commitEdit() {
        if (committed) return;
        committed = true;
        
        const newText = input.value.trim() || originalText;
        
        // 4. Set item.textContent to newText, remove .editing
        item.textContent = newText;
        item.classList.remove('editing');
        
        // Clean up listeners
        input.removeEventListener('keydown', keyHandler);
        input.removeEventListener('blur', blurHandler);
    }
    
    // -- Helper: cancel the edit --
    function cancelEdit() {
        if (committed) return;
        committed = true;
        
        // 5. Restore originalText, remove .editing
        item.textContent = originalText;
        item.classList.remove('editing');
        
        // Clean up listeners
        input.removeEventListener('keydown', keyHandler);
        input.removeEventListener('blur', blurHandler);
    }
    
    // 6. Listen for 'keydown' on input
    function keyHandler(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            commitEdit();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            cancelEdit();
        }
    }
    input.addEventListener('keydown', keyHandler);
    
    // 7. Listen for 'blur' on input -> commitEdit()
    function blurHandler() {
        commitEdit();
    }
    input.addEventListener('blur', blurHandler);
});