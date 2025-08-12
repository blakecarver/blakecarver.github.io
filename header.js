// header.js
// This script dynamically loads the header HTML into the 'header-placeholder' div.
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop();

    const headerHtml = `
        <div class="site-header bg-white shadow-sm">
            <header class="container mx-auto px-4 py-6 md:py-8">
                <div class="flex flex-col md:flex-row items-center justify-between">
                    <!-- Branding and Logo -->
                    <div class="text-center md:text-left">
                        <a href="index.html" class="text-3xl md:text-4xl font-bold text-[#4a4a4a] hover:text-blue-600 transition-colors">
                            BLAKE CARVER
                        </a>
                    </div>
                </div>

                <!-- Navigation Menu -->
                <nav class="mt-6">
                    <ul class="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 text-center md:text-left">
                        <li><a href="index.html" class="block p-2 rounded-lg text-gray-700 hover:bg-blue-100 transition-colors ${currentPath === 'index.html' || currentPath === '' ? 'font-semibold bg-blue-100 text-blue-600' : ''}">Home</a></li>
                        <li><a href="bio.html" class="block p-2 rounded-lg text-gray-700 hover:bg-blue-100 transition-colors ${currentPath === 'bio.html' ? 'font-semibold bg-blue-100 text-blue-600' : ''}">Bio</a></li>
                        <li><a href="blog.html" class="block p-2 rounded-lg text-gray-700 hover:bg-blue-100 transition-colors ${currentPath === 'blog.html' ? 'font-semibold bg-blue-100 text-blue-600' : ''}">Blog</a></li>
                        <!-- The 'Books' link is a direct link with a submenu -->
                        <li class="relative group z-20">
                            <a href="books.html" class="block p-2 rounded-lg text-gray-700 hover:bg-blue-100 transition-colors w-full ${currentPath === 'books.html' || currentPath === 'the-sinners-lot.html' || currentPath === 'the-mephisto-parable.html' ? 'font-semibold bg-blue-100 text-blue-600' : ''}">Books</a>
                            <ul class="absolute hidden group-hover:block bg-white shadow-lg rounded-lg min-w-[250px]">
                                <li><a href="the-sinners-lot.html" class="block px-4 py-2 hover:bg-blue-100 transition-colors">The Sinner's Lot</a></li>
                                <li><a href="the-mephisto-parable.html" class="block px-4 py-2 hover:bg-blue-100 transition-colors">The Mephisto Parable</a></li>
                            </ul>
                        </li>
                        <li><a href="contact.html" class="block p-2 rounded-lg text-gray-700 hover:bg-blue-100 transition-colors ${currentPath === 'contact.html' ? 'font-semibold bg-blue-100 text-blue-600' : ''}">Contact</a></li>
                    </ul>
                </nav>
            </header>
        </div>
    `;
    
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHtml;
    }
});
