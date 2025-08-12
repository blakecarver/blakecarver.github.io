// footer.js
// This script contains the HTML for the footer and dynamically loads it into the page.

// Use an IIFE (Immediately Invoked Function Expression) to avoid polluting the global scope.
(function() {
    // HTML for the footer section
    const footerHtml = `
        <footer class="bg-black text-white text-center py-4 mt-8">
            <div class="container mx-auto px-4">
                <p class="text-sm">&copy; 2025 Blake Carver. All rights reserved.</p>
                <a href="#" class="text-gray-400 hover:text-white transition-colors text-sm mt-2 block">Back to top</a>
            </div>
        </footer>
    `;

    // Find the footer placeholder and insert the HTML
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHtml;
    }
})();
