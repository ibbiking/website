// script.js - Global JavaScript for Entire Project

$(document).ready(function() {
    // Magnifying glass effect
    const magnifier = $('#magnifierOverlay');
    let activeProduct = null;

    $('.product-tumb').hover(
        function() {
            // Mouse enter
            activeProduct = $(this);
            magnifier.css('display', 'block');
            
            // Check if image is large enough to zoom
            const img = activeProduct.find('img');
            if (img.width() <= activeProduct.width()) {
                magnifier.css('display', 'none');
                return;
            }
        },
        function() {
            // Mouse leave
            magnifier.css('display', 'none');
            activeProduct = null;
        }
    );

    $('.product-tumb').mousemove(function(e) {
        if (!activeProduct) return;
        
        const container = activeProduct;
        const img = container.find('img');
        
        // Container position
        const containerOffset = container.offset();
        const x = e.pageX - containerOffset.left;
        const y = e.pageY - containerOffset.top;
        
        // Magnifier size
        const magnifierSize = 200;
        const halfSize = magnifierSize / 2;
        
        // Position magnifier (centered on cursor)
        let posX = e.pageX - halfSize;
        let posY = e.pageY - halfSize;
        
        // Keep magnifier within viewport bounds
        posX = Math.max(0, Math.min(posX, $(window).width() - magnifierSize));
        posY = Math.max(0, Math.min(posY, $(window).height() - magnifierSize));
        
        // Set magnifier position
        magnifier.css({
            left: posX + 'px',
            top: posY + 'px',
            backgroundImage: 'url(' + img.attr('src') + ')',
            backgroundSize: (img.width() * 2) + 'px ' + (img.height() * 2) + 'px',
            backgroundPosition: (-x * 2 + halfSize) + 'px ' + (-y * 2 + halfSize) + 'px'
        });
    });

    $('.product-tumb').each(function() {
        const $container = $(this);
        const $img = $container.find('img');
        
        $container.on('mousemove', function(e) {
            const containerOffset = $container.offset();
            const x = e.pageX - containerOffset.left;
            const y = e.pageY - containerOffset.top;
            
            // Position the pseudo-element
            $container.css('--pos-x', x + 'px');
            $container.css('--pos-y', y + 'px');
            
            // Adjust background position for zoom effect
            const bgPosX = -x * 1.5 + 75;
            const bgPosY = -y * 1.5 + 75;
            $img.css('transform-origin', `${x}px ${y}px`);
        });
    });

    // Hamburger menu toggle
    $('#hamburger').click(function() {
        $(this).toggleClass('active');
        $('#navLinks').toggleClass('active');
        $('body').toggleClass('no-scroll');
    });

    // Close menu when close button is clicked
    $('.close-menu').click(function() {
        $('#hamburger').removeClass('active');
        $('#navLinks').removeClass('active');
        $('body').removeClass('no-scroll');
    });

    // Close menu when clicking on a nav link
    $('.nav-links a').click(function() {
        if ($(window).width() <= 768) {
            $('#hamburger').removeClass('active');
            $('#navLinks').removeClass('active');
            $('body').removeClass('no-scroll');
        }
    });

    // Product gallery thumbnail click
    $('.thumbnail-gallery img').click(function() {
        const mainImg = $(this).attr('src').replace('-thumb', '-large');
        $('#zoom-image').attr('src', mainImg);
    });

    // Quantity selector
    $('.qty-plus').click(function() {
        const input = $(this).siblings('.qty-input');
        input.val(parseInt(input.val()) + 1);
    });

    $('.qty-minus').click(function() {
        const input = $(this).siblings('.qty-input');
        if (parseInt(input.val()) > 1) {
            input.val(parseInt(input.val()) - 1);
        }
    });

    // Tabs functionality
    $('.tab-btn').click(function() {
        const tabId = $(this).data('tab');
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
        $('.tab-pane').removeClass('active');
        $('#' + tabId).addClass('active');
    });

    // WhatsApp order
    $('#whatsappOrderBtn').click(function() {
        const productName = $('.product-info h1').text().trim();
        const quantity = $('.qty-input').val();
        sendWhatsAppOrder(productName, quantity);
    });

    // Order form
    $('.order-form-btn').click(function() {
    const productName = $('.product-info h1').text().trim();
    $('#popupProductName').val(productName);
    $('#orderPopup').addClass('active');
    // $('body').addClass('no-scroll'); // Prevent background scrolling
});

$('.close-popup').click(function() {
    $('#orderPopup').removeClass('active');
    $('body').removeClass('no-scroll'); // Re-enable scrolling
});

    // Submit order form
    $('#orderForm').submit(function(e) {
    e.preventDefault();
    try {
        const productName = $('#popupProductName').val();
        if (!productName) throw new Error("Product name missing");
        
        // Get product link from hidden field or current page
        let productLink = $('#popupProductLink').val() || window.location.href;
        
        sendWhatsAppOrder({
            productName: productName,
            productLink: productLink,
            quantity: $('#quantity').val() || 1,
            price: $('.product-price').first().text().trim() || 'Price not available',
            customerName: $('#customerName').val(),
            address: $('#address').val(),
            city: $('#city').val()
        });
        
        $('#orderPopup').removeClass('active');
    } catch (error) {
        console.error("Form error:", error);
        alert("Order failed: " + error.message);
    }
});

    // Close when clicking outside
    $(document).click(function(e) {
        if ($(e.target).hasClass('order-popup')) {
            $('#orderPopup').removeClass('active');
        }
    });

    // Wishlist toggle
    $('.wishlist-btn').click(function() {
        $(this).find('i').toggleClass('far fas');
        $(this).toggleClass('active');
    });

    // Add to cart animation
    $('.add-to-cart-btn').click(function() {
        const btn = $(this);
        btn.html('<i class="fas fa-check"></i> Added');
        btn.css('background-color', 'var(--success-color)');
        
        setTimeout(() => {
            btn.html('<i class="fas fa-shopping-cart"></i> Add to Cart');
            btn.css('background-color', 'var(--primary-color)');
        }, 2000);
    });

    // Contact form WhatsApp submission
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        // Get form values
        const name = $('#name').val();
        const email = $('#email').val();
        const phone = $('#phone').val();
        const subject = $('#subject').val();
        const message = $('#message').val();
        
        // Format the WhatsApp message
        const whatsappMessage = `New Contact Inquiry%0A%0A` +
                               `*Name:* ${name}%0A` +
                               `*Email:* ${email}%0A` +
                               `*Phone:* ${phone}%0A` +
                               `*Subject:* ${subject}%0A` +
                               `*Message:* ${message}`;
        
        // Replace with your WhatsApp number (with country code, remove +)
        const whatsappNumber = '923000297028';
        
        // Open WhatsApp with the pre-filled message
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
        
        // Optional: Reset form after submission
        $(this).trigger('reset');
    });

    // Initialize product image zoom on hover
    $('.product-tumb img').hover(
        function() {
            $(this).css('transform', 'scale(1.1)');
        },
        function() {
            $(this).css('transform', 'scale(1)');
        }
    );
});

function sendWhatsAppOrder({
    productName, 
    productLink, 
    quantity = 1, 
    price = '', 
    customerName = '', 
    address = '', 
    city = ''
}) {
    const whatsappNumber = '923006297028';
    const message = `*ORDER REQUEST*\n\n` +
                   `*Product:* ${productName}\n` +
                   `*Link:* ${productLink}\n` +
                   `*Quantity:* ${quantity}\n` +
                   `*Price:* ${price}\n` +
                   (customerName ? `*Name:* ${customerName}\n` : '') +
                   (address ? `*Address:* ${address}\n` : '') +
                   (city ? `*City:* ${city}\n` : '') +
                   `\nPlease confirm availability and total amount.`;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

// $(document).on('click', '.order-whatsapp', function() {
//     // Get product name from data attribute first, fallback to h4 text
//     const productName = $(this).data('product') || 
//                        $(this).closest('.product-details').find('h4 a').text().trim();
    
//     // Get price from the product card
//     const price = $(this).closest('.product-details').find('.product-price').text().trim();
    
//     // Default quantity to 1
//     const quantity = 1;
    
//     // Send WhatsApp message
//     sendWhatsAppOrder(productName, quantity, price);
// });

$(document).on('click', '.order-form-btn', function() {
    try {
        // Get product name
        let productName = $(this).data('product') || 
                        $(this).closest('.product-details').find('h4 a').text().trim() ||
                        $('.product-info h1').text().trim();
        
        // Get product link
        let productLink = window.location.href;
        if ($(this).closest('.product-card').length) {
            productLink = $(this).closest('.product-card').find('a.product-image-link').attr('href') || 
                         $(this).closest('.product-card').find('h4 a').attr('href') || 
                         window.location.href;
            
            // Make relative URLs absolute
            if (productLink.startsWith('/') || !productLink.startsWith('http')) {
                productLink = window.location.origin + (productLink.startsWith('/') ? '' : '/') + productLink;
            }
        }

        // Set form values
        $('#popupProductName').val(productName);
        $('#popupProductLink').val(productLink); // Add this hidden field to your form
        $('#orderPopup').addClass('active');
        
    } catch (error) {
        console.error("Order form error:", error);
        alert("Couldn't load product details: " + error.message);
    }
});

$(document).on('click', '.whatsapp-btn, .order-whatsapp, #whatsappOrderBtn', function() {
    try {
        // 1. Get Product Name (with fallback logic)
        let productName = $(this).data('product') || 
                        $(this).closest('.product-details').find('h4 a').text().trim() ||
                        $('.product-info h1').text().trim();
        
        if (!productName) throw new Error("Product name not found");

        // 2. Get Product Link
        let productLink = window.location.href; // Default to current page
        
        // If on listing page, get link from product card
        if ($(this).closest('.product-card').length) {
            productLink = $(this).closest('.product-card').find('a.product-image-link').attr('href') || 
                         $(this).closest('.product-card').find('h4 a').attr('href') || 
                         window.location.href;
            
            // Make relative URLs absolute
            if (productLink.startsWith('/') || !productLink.startsWith('http')) {
                productLink = window.location.origin + (productLink.startsWith('/') ? '' : '/') + productLink;
            }
        }

        // 3. Get Other Details
        let price = $(this).closest('.product-details').find('.product-price').text().trim() ||
                   $('.product-price').first().text().trim() || 
                   'Price not available';

        let quantity = $('.qty-input').val() || 1;

        // 4. Send WhatsApp Message with Product Link
        sendWhatsAppOrder({
            productName: productName,
            productLink: productLink,
            quantity: quantity,
            price: price
        });
        
    } catch (error) {
        console.error("Order error:", error);
        alert("Error preparing order: " + error.message);
    }
});
