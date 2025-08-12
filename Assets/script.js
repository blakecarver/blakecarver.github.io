// scripts.js
// This file contains all the consolidated JavaScript for the website.

// This IIFE (Immediately Invoked Function Expression) wraps all the code to avoid global scope pollution.
(function() {

    // Helper function to load HTML content from a given URL into a placeholder
    async function loadHtml(url, placeholderId) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            const placeholder = document.getElementById(placeholderId);
            if (placeholder) {
                placeholder.innerHTML = html;
            }
        } catch (error) {
            console.error(`Failed to load ${url}:`, error);
        }
    }

    // Function to load the header content
    function loadHeader() {
        const currentPath = window.location.pathname.split('/').pop();

        const headerHtml = `
            <div class="bg-white shadow-sm">
                <header class="container mx-auto px-4 py-6 md:py-8">
                    <div class="flex flex-col md:flex-row items-center justify-between">
                        <!-- Branding and Logo -->
                        <div class="text-center md:text-left">
                            <a href="index.html" class="text-3xl md:text-4xl font-bold text-[#4a4a4a] hover:text-blue-600 transition-colors">
                                BLAKE CARVER
                            </a>
                        </div>

                        <!-- Search Form -->
                        <div class="mt-4 md:mt-0 flex items-center w-full md:w-auto justify-center">
                            <form class="flex items-center space-x-2 w-full max-w-sm">
                                <input type="text" placeholder="Search..." class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full">
                                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </form>
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
    }
    
    // Function to load the footer content
    function loadFooter() {
        const footerHtml = `
            <footer class="bg-black text-white text-center py-4 mt-8">
                <div class="container mx-auto px-4">
                    <p class="text-sm">&copy; 2025 Blake Carver. All rights reserved.</p>
                    <a href="#" class="text-gray-400 hover:text-white transition-colors text-sm mt-2 block">Back to top</a>
                </div>
            </footer>
        `;
        
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = footerHtml;
        }
    }

    // Function to fetch posts from the Tumblr API (only for the blog page)
    async function fetchTumblrPosts() {
        const postsContainer = document.getElementById('tumblr-posts-container');
        if (!postsContainer) return; // Exit if not on the blog page

        const blogName = 'blake-carver';
        const apiKey = 'SEunCCCyDWjENmY8QrNeDBPqCw2LNKp6OxJ8BurD1gymtajQPH';
        
        try {
            postsContainer.innerHTML = '<p class="text-center text-gray-500">Loading posts...</p>';
            
            const tumblrApiUrl = `https://api.tumblr.com/v2/blog/${blogName}.tumblr.com/posts?api_key=${apiKey}&limit=5`;
            
            const response = await fetch(tumblrApiUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            postsContainer.innerHTML = '';
            
            if (data?.response?.posts && data.response.posts.length > 0) {
                const posts = data.response.posts;
                
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.className = 'tumblr-post';
                    
                    switch (post.type) {
                        case 'text':
                            postElement.innerHTML = `
                                <h2 class="text-2xl blog-heading-font post-title">${post.title || 'Untitled Post'}</h2>
                                <div class="post-body">${post.body || 'No content.'}</div>
                                <a href="${post.post_url}" target="_blank" class="read-more-link">Read more &rarr;</a>
                            `;
                            break;
                        case 'photo':
                            const caption = post.caption || '';
                            let photosHtml = '';
                            if (post.photos && post.photos.length > 0) {
                                photosHtml = post.photos.map(photo => {
                                    const photoUrl = photo.alt_sizes[0]?.url || 'https://placehold.co/600x400';
                                    return `<img src="${photoUrl}" alt="Tumblr Photo Post" class="rounded-lg w-full h-auto object-cover">`;
                                }).join('');
                            }
                            
                            postElement.innerHTML = `
                                <h2 class="text-2xl blog-heading-font post-title">Photo Post</h2>
                                <div class="grid grid-cols-2 gap-6 mt-4">
                                    ${photosHtml}
                                </div>
                                <div class="post-caption mt-4">${caption}</div>
                                <a href="${post.post_url}" target="_blank" class="read-more-link">View post &rarr;</a>
                            `;
                            break;
                        case 'quote':
                            const quote = post.text || 'No quote.';
                            const source = post.source || '';
                            postElement.innerHTML = `
                                <blockquote class="post-quote">"${quote}"</blockquote>
                                ${source ? `<div class="post-source text-right text-gray-500 mt-2 italic">${source}</div>` : ''}
                                <a href="${post.post_url}" target="_blank" class="read-more-link">View post &rarr;</a>
                            `;
                            break;
                        case 'link':
                            const linkTitle = post.title || 'Link Post';
                            const linkUrl = post.url || '#';
                            const description = post.description || '';
                            postElement.innerHTML = `
                                <h2 class="text-2xl blog-heading-font post-title"><a href="${linkUrl}" target="_blank" class="post-link-title">${linkTitle}</a></h2>
                                <div class="post-description">${description}</div>
                                <a href="${post.post_url}" target="_blank" class="read-more-link">View post &rarr;</a>
                            `;
                            break;
                        default:
                            postElement.innerHTML = `
                                <h2 class="text-2xl blog-heading-font post-title">${post.type.charAt(0).toUpperCase() + post.type.slice(1)} Post</h2>
                                <a href="${post.post_url}" target="_blank" class="read-more-link">View post &rarr;</a>
                            `;
                    }
                    
                    postsContainer.appendChild(postElement);
                });
            } else {
                postsContainer.innerHTML = '<p class="text-center text-gray-500">No posts were found. This may be due to an incorrect blog name or an invalid API key.</p>';
            }
        } catch (error) {
            console.error('Failed to fetch Tumblr posts:', error);
            postsContainer.innerHTML = '<p class="text-center text-red-500">Failed to load posts. Please check your network connection, blog name, and API key.</p>';
        }
    }

    // A function to initialize all page-specific functionality
    function initializePageScripts() {
        // Run the Tumblr post fetcher if the blog post container exists
        fetchTumblrPosts();

        // Add the grayscale hover effect to the author image on the bio page
        const authorImage = document.querySelector('.author-image');
        if (authorImage) {
            authorImage.addEventListener('load', () => {
                authorImage.classList.add('grayscale-image');
            });
        }
    }

    // Call the functions once the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        loadHeader();
        loadFooter();
        initializePageScripts();
    });
})();

