// exercise3.js

const filterBar = document.querySelector('#filter-bar');
const cards = document.querySelectorAll('.card');
const filterBtns = document.querySelectorAll('.filter-btn');

filterBar.addEventListener('click', function(event) {

    // 1. Guard: if event.target does not match '.filter-btn', return
    if (!event.target.matches('.filter-btn')) return;
    
    // 2. Update active class on all buttons
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // 3. Read the filter value from event.target.dataset.filter
    const filterValue = event.target.dataset.filter;
    
    // 4. Loop through cards
    cards.forEach(card => {

        // - If filter === 'all': remove .hidden from every card
        if (filterValue === 'all') {
            card.classList.remove('hidden');
        } 
        
        // - Otherwise: compare card.dataset.category to filter
        else {
            const shouldHide = card.dataset.category !== filterValue;
            card.classList.toggle('hidden', shouldHide);
        }
    });
});